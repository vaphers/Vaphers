
'use client';

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const METRIC_KEYS: Record<string, string> = {
  'Sessions': 'sessions',
  'Engaged Sessions': 'engagedSessions',
  'New Users': 'newUsers',
  'Users': 'users',
  'Views': 'views',
  'Avg. Engagement Time': 'avgEngagementTime',
  'Engagement Rate': 'engagementRate',
  'Conversions': 'conversions'
};

interface OrganicTrafficProps {
  rawData: any[];
  compareData?: any[] | null;
}

// Helper to turn GA4 '20260401' into 'Apr 01'
const formatGa4Date = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Helper to fill in missing days (GA4 drops rows if traffic is 0)
const fillMissingDates = (startStr: string, endStr: string) => {
  if (!startStr || !endStr) return [];
  const startDate = new Date(`${startStr.slice(0, 4)}-${startStr.slice(4, 6)}-${startStr.slice(6, 8)}T12:00:00Z`);
  const endDate = new Date(`${endStr.slice(0, 4)}-${endStr.slice(4, 6)}-${endStr.slice(6, 8)}T12:00:00Z`);
  const dateArray = [];

  for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    dateArray.push(`${y}${m}${d}`);
  }
  return dateArray;
};

export default function OrganicTraffic({ rawData, compareData }: OrganicTrafficProps) {
  const [activeMetric, setActiveMetric] = useState('Sessions');

  const displayData = useMemo(() => {
    if (!rawData || rawData.length === 0) return null;
    const activeDataKey = METRIC_KEYS[activeMetric] || 'sessions';

    // 1. FILTER
    const organicData = rawData.filter(row => row.channelGroup === 'Organic Search');
    const organicCompare = compareData ? compareData.filter(row => row.channelGroup === 'Organic Search') : [];

    // 2. AGGREGATE TOTALS (with correct averages math)
    const calculateTotals = (data: any[]) => {
      const summed = data.reduce((acc: any, curr: any) => {
        acc.sessions += (curr.sessions || 0);
        acc.engagedSessions += (curr.engagedSessions || 0);
        acc.newUsers += (curr.newUsers || 0);
        acc.users += (curr.users || 0);
        acc.views += (curr.views || 0);
        acc.conversions += (curr.conversions || 0);
        acc._totalEngagementTime += (parseFloat(curr.avgEngagementTime) || 0) * (curr.sessions || 0);
        return acc;
      }, {
        sessions: 0, engagedSessions: 0, newUsers: 0, users: 0, 
        views: 0, conversions: 0, _totalEngagementTime: 0
      });

      summed.engagementRate = summed.sessions > 0 ? summed.engagedSessions / summed.sessions : 0;
      summed.avgEngagementTime = summed.sessions > 0 ? summed._totalEngagementTime / summed.sessions : 0;
      return summed;
    };

    const totals = calculateTotals(organicData);
    const prevTotals = compareData ? calculateTotals(organicCompare) : null;

    // Helper to calculate % trend
    const getTrend = (current: number, previous?: number) => {
      if (!previous || previous === 0) return 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    const summary = [
      { title: 'Sessions', value: totals.sessions?.toLocaleString() || 0, trend: getTrend(totals.sessions, prevTotals?.sessions) },
      { title: 'Engaged Sessions', value: totals.engagedSessions?.toLocaleString() || 0, trend: getTrend(totals.engagedSessions, prevTotals?.engagedSessions) },
      { title: 'New Users', value: totals.newUsers?.toLocaleString() || 0, trend: getTrend(totals.newUsers, prevTotals?.newUsers) },
      { title: 'Users', value: totals.users?.toLocaleString() || 0, trend: getTrend(totals.users, prevTotals?.users) },
      { title: 'Views', value: totals.views?.toLocaleString() || 0, trend: getTrend(totals.views, prevTotals?.views) },
      { title: 'Avg. Engagement Time', value: totals.avgEngagementTime?.toFixed(1) || 0, isTime: true, trend: getTrend(totals.avgEngagementTime, prevTotals?.avgEngagementTime) },
      { title: 'Engagement Rate', value: ((totals.engagementRate || 0) * 100).toFixed(1), isPercent: true, trend: getTrend(totals.engagementRate, prevTotals?.engagementRate) },
      { title: 'Conversions', value: totals.conversions?.toLocaleString() || 0, trend: getTrend(totals.conversions, prevTotals?.conversions) }
    ];

    // 3. ENGINE BREAKDOWN
    const colors = ['bg-indigo-600', 'bg-blue-500', 'bg-sky-400', 'bg-slate-400', 'bg-slate-300'];
    const engineMap = organicData.reduce((acc: any, curr: any) => {
      const source = curr.source || 'Other';
      if (!acc[source]) acc[source] = { ...curr, name: source };
      else {
        acc[source].sessions += curr.sessions;
        acc[source].engagedSessions += curr.engagedSessions;
        acc[source].newUsers += curr.newUsers;
      }
      return acc;
    }, {});

    const engineBreakdown = Object.values(engineMap)
      .sort((a: any, b: any) => b.sessions - a.sessions)
      .slice(0, 5)
      .map((engine: any, i: number) => {
        const share = totals.sessions > 0 ? Math.round((engine.sessions / totals.sessions) * 100) : 0;
        return {
          name: engine.name,
          share,
          sessions: engine.sessions.toLocaleString(),
          engaged: engine.engagedSessions.toLocaleString(),
          newUsers: engine.newUsers.toLocaleString(),
          users: engine.users.toLocaleString(),
          views: engine.views.toLocaleString(),
          color: colors[i % colors.length],
        };
      });

    // 4. CHART DATA MAPPER (Continuous Timeline)
    const currentByDate = organicData.reduce((acc: any, curr: any) => {
      acc[curr.date] = (acc[curr.date] || 0) + (Number(curr[activeDataKey]) || 0);
      return acc;
    }, {});

    const compareByDate = organicCompare.reduce((acc: any, curr: any) => {
      acc[curr.date] = (acc[curr.date] || 0) + (Number(curr[activeDataKey]) || 0);
      return acc;
    }, {});

    const rawCurrentDates = Object.keys(currentByDate).sort();
    const rawCompareDates = Object.keys(compareByDate).sort();

    const fullCurrentDates = rawCurrentDates.length > 0 
      ? fillMissingDates(rawCurrentDates[0], rawCurrentDates[rawCurrentDates.length - 1]) 
      : [];
      
    const fullCompareDates = rawCompareDates.length > 0 
      ? fillMissingDates(rawCompareDates[0], rawCompareDates[rawCompareDates.length - 1]) 
      : [];

    const maxLength = Math.max(fullCurrentDates.length, fullCompareDates.length);

    const chart = Array.from({ length: maxLength }).map((_, index) => {
      const currDateStr = fullCurrentDates[index];
      const compDateStr = fullCompareDates[index];

      return {
        date: currDateStr ? formatGa4Date(currDateStr) : (compDateStr ? `Day ${index + 1}` : ''),
        current: currDateStr ? (currentByDate[currDateStr] || 0) : 0,
        compare: compDateStr ? (compareByDate[compDateStr] || 0) : null,
      };
    });

    return { summary, engineBreakdown, chart, isComparing: !!compareData };
  }, [rawData, compareData, activeMetric]);

  if (!displayData) return null;

  return (
    <div className="p-4 md:p-6">
      {/* SUMMARY CARDS */}
      <div className="flex flex-wrap w-full border-y border-slate-100 mb-8 bg-white">
        {displayData.summary?.map((metric: any, idx: number) => {
          const isActive = activeMetric === metric.title;
          return (
            <button 
              key={idx} 
              onClick={() => setActiveMetric(metric.title)}
              className="flex-1 min-w-[140px] text-left border-r border-slate-100 last:border-r-0 py-4 px-4 sm:px-6 transition-colors outline-none hover:bg-slate-50 cursor-pointer"
            >
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-[#4678e5]' : 'text-slate-500'}`}>
                {metric.title}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`text-2xl sm:text-3xl font-base ${isActive ? 'text-[#4678e5]' : 'text-slate-900'}`}>
                  {metric.value}{metric.isPercent ? '%' : ''}
                </span>
                
                {/* DYNAMIC TREND INDICATOR */}
                {displayData.isComparing && metric.trend !== 0 && (
                  <span className={`text-xs flex items-center font-medium ${metric.trend > 0 ? 'text-teal-700' : 'text-red-600'}`}>
                    {metric.trend > 0 ? '▲' : '▼'} {Math.abs(metric.trend)}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* TREND LINE */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 text-sm font-semibold text-slate-700 flex items-center gap-2">
            Organic {activeMetric} Trend
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData.chart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                
                {/* Current Data Line */}
                <Line type="monotone" dataKey="current" name="Current" stroke="#4678e5" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                
                {/* Dynamic Comparison Line */}
                {displayData.isComparing && (
                  <Line type="monotone" dataKey="compare" name="Previous" stroke="#cbd5e1" strokeWidth={2.5} strokeDasharray="6 4" dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ENGINE PROGRESS BARS */}
        <div className="w-full lg:w-80 flex flex-col justify-center gap-7 border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 pl-0 lg:pl-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Search Engines</h3>
          {displayData.engineBreakdown?.map((engine: any) => (
            <div key={engine.name}>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>{engine.name}</span>
                <span>{engine.share}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-1000 ${engine.color}`} style={{ width: `${engine.share}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto mt-12 border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 font-bold whitespace-nowrap">Search Engine</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Sessions</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Engaged</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">New Users</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Users</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {displayData.engineBreakdown?.map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{row.name}</td>
                <td className="px-6 py-4 text-right text-slate-600">{row.sessions}</td>
                <td className="px-6 py-4 text-right text-indigo-600 font-medium">{row.engaged}</td>
                <td className="px-6 py-4 text-right text-slate-600">{row.newUsers}</td>
                <td className="px-6 py-4 text-right text-slate-600">{row.users}</td>
                <td className="px-6 py-4 text-right text-slate-600">{row.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
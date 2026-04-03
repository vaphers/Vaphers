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
  dateRange: { start: string; end: string };
}

export default function OrganicTraffic({ rawData, dateRange }: OrganicTrafficProps) {
  const [activeMetric, setActiveMetric] = useState('Sessions');

  const displayData = useMemo(() => {
    // Note: In a production environment, you would filter your rawData 
    // where channelGroup === 'Organic Search' or fetch specific Source data.
    // Here we map the data to simulate Search Engine performance.
    
    if (!rawData || rawData.length === 0) return null;

    // Filter or Map data to represent Search Engines
    // For this design, we are assuming the backend provides search engine names 
    // or we are categorizing organic sources like Google, Bing, etc.
    const searchEngines = [
      { name: 'Google', sessions: 0.85 },
      { name: 'Bing', sessions: 0.08 },
      { name: 'DuckDuckGo', sessions: 0.04 },
      { name: 'Yahoo', sessions: 0.02 },
      { name: 'Ecosia', sessions: 0.01 },
    ];

    const totals = rawData.reduce((acc: any, curr: any) => {
      acc.sessions = (acc.sessions || 0) + curr.sessions;
      acc.engagedSessions = (acc.engagedSessions || 0) + curr.engagedSessions;
      acc.newUsers = (acc.newUsers || 0) + curr.newUsers;
      acc.users = (acc.users || 0) + curr.users;
      acc.views = (acc.views || 0) + curr.views;
      acc.conversions = (acc.conversions || 0) + curr.conversions;
      acc.avgEngagementTime = acc.avgEngagementTime || parseFloat(curr.avgEngagementTime); 
      acc.engagementRate = acc.engagementRate || parseFloat(curr.engagementRate);
      return acc;
    }, {});

    const summary = [
      { title: 'Sessions', value: totals.sessions?.toLocaleString() || 0 },
      { title: 'Engaged Sessions', value: totals.engagedSessions?.toLocaleString() || 0 },
      { title: 'New Users', value: totals.newUsers?.toLocaleString() || 0 },
      { title: 'Users', value: totals.users?.toLocaleString() || 0 },
      { title: 'Views', value: totals.views?.toLocaleString() || 0 },
      { title: 'Avg. Engagement Time', value: totals.avgEngagementTime?.toFixed(1) || 0, isTime: true },
      { title: 'Engagement Rate', value: ((totals.engagementRate || 0) * 100).toFixed(1), isPercent: true },
      { title: 'Conversions', value: totals.conversions?.toLocaleString() || 0 }
    ];

    const activeDataKey = METRIC_KEYS[activeMetric] || 'sessions';
    const totalForActiveMetric = totals[activeDataKey] || 1;

    const colors = ['bg-indigo-600', 'bg-blue-500', 'bg-sky-400', 'bg-slate-400', 'bg-slate-300'];

    // Mapping Search Engines with dynamic metrics based on the active selection
    const engineBreakdown = searchEngines.map((engine, i) => {
      const shareMultiplier = engine.sessions;
      const metricValue = activeDataKey === 'avgEngagementTime' || activeDataKey === 'engagementRate' 
        ? totals[activeDataKey] * (1 - i * 0.05) // Slight variation for rates
        : Math.round(totals[activeDataKey] * shareMultiplier);

      return {
        name: engine.name,
        share: Math.round(shareMultiplier * 100),
        sessions: Math.round(totals.sessions * shareMultiplier).toLocaleString(),
        engaged: Math.round(totals.engagedSessions * shareMultiplier).toLocaleString(),
        newUsers: Math.round(totals.newUsers * shareMultiplier).toLocaleString(),
        users: Math.round(totals.users * shareMultiplier).toLocaleString(),
        views: Math.round(totals.views * shareMultiplier).toLocaleString(),
        color: colors[i % colors.length],
        value: metricValue // used for the progress bars
      };
    });

    let dataPoints = 30; 
    if (dateRange.start === 'today') dataPoints = 24; 
    else if (dateRange.start === '7daysAgo') dataPoints = 7;
    else if (dateRange.start === '90daysAgo') dataPoints = 90;

    const chart = Array.from({ length: dataPoints }).map((_, i) => {
      const baseValue = totalForActiveMetric / dataPoints;
      const variance = baseValue * 0.25;
      const label = dateRange.start === 'today' ? `${i}:00` : `Day ${i + 1}`;
      return {
        date: label,
        current: Math.max(0, Math.round(baseValue + (Math.random() * variance * 2 - variance))),
        compare: Math.max(0, Math.round((baseValue * 0.85) + (Math.random() * variance * 2 - variance))),
      };
    });

    return { summary, engineBreakdown, chart };
  }, [rawData, activeMetric, dateRange.start]);

  if (!displayData) return null;

  return (
    <div className="p-4 md:p-6">
      {/* ORGANIC METRIC CARDS */}
      <div className="flex flex-wrap w-full border-y border-slate-100 mb-8 bg-white">
        {displayData.summary?.map((metric: any, idx: number) => {
          const isActive = activeMetric === metric.title;
          return (
            <button 
              key={idx} 
              onClick={() => setActiveMetric(metric.title)}
              className={`flex-1 min-w-[140px] text-left border-r border-slate-100 last:border-r-0 py-4 px-4 sm:px-6 transition-colors outline-none hover:bg-slate-50 cursor-pointer`}
            >
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                {metric.title}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`text-2xl sm:text-3xl font-medium ${isActive ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {metric.value}{metric.isPercent ? '%' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ORGANIC TREND LINE */}
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
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Line type="monotone" dataKey="current" stroke="#4f46e5" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="compare" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SEARCH ENGINE PROGRESS BARS */}
        <div className="w-full lg:w-80 flex flex-col justify-center gap-7 border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 pl-0 lg:pl-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Search Engines</h3>
          {displayData.engineBreakdown?.map((engine: any) => (
            <div key={engine.name}>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-2">{engine.name}</span>
                <span>{engine.share}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${engine.color}`} 
                  style={{ width: `${engine.share}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ORGANIC SEARCH ENGINE TABLE */}
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
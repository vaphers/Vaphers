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

interface PaidTrafficProps {
  rawData: any[];
  dateRange: { start: string; end: string };
}

export default function PaidTraffic({ rawData, dateRange }: PaidTrafficProps) {
  const [activeMetric, setActiveMetric] = useState('Sessions');

  const displayData = useMemo(() => {
    if (!rawData || rawData.length === 0) return null;

    // Simulating specific Ad Networks for the Paid Traffic breakdown
    const adNetworks = [
      { name: 'Google Ads', shareMultiplier: 0.55 },
      { name: 'Facebook Ads', shareMultiplier: 0.25 },
      { name: 'LinkedIn Ads', shareMultiplier: 0.12 },
      { name: 'TikTok Ads', shareMultiplier: 0.05 },
      { name: 'Twitter Ads', shareMultiplier: 0.03 },
    ];

    // Calculate base totals from the raw data 
    // (In a real scenario, you'd filter rawData for Paid channels only)
    const baseTotals = rawData.reduce((acc: any, curr: any) => {
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

    // Scale down the totals to represent Paid Traffic (e.g., 30% of overall traffic)
    const paidScale = 0.3; 
    const totals = {
      sessions: Math.round(baseTotals.sessions * paidScale),
      engagedSessions: Math.round(baseTotals.engagedSessions * paidScale),
      newUsers: Math.round(baseTotals.newUsers * paidScale),
      users: Math.round(baseTotals.users * paidScale),
      views: Math.round(baseTotals.views * paidScale),
      conversions: Math.round(baseTotals.conversions * paidScale),
      avgEngagementTime: baseTotals.avgEngagementTime * 0.8, // Paid traffic often has slightly lower avg time
      engagementRate: baseTotals.engagementRate * 0.9,       
    };

    const summary = [
      { title: 'Sessions', value: totals.sessions.toLocaleString() },
      { title: 'Engaged Sessions', value: totals.engagedSessions.toLocaleString() },
      { title: 'New Users', value: totals.newUsers.toLocaleString() },
      { title: 'Users', value: totals.users.toLocaleString() },
      { title: 'Views', value: totals.views.toLocaleString() },
      { title: 'Avg. Engagement Time', value: totals.avgEngagementTime.toFixed(1), isTime: true },
      { title: 'Engagement Rate', value: (totals.engagementRate * 100).toFixed(1), isPercent: true },
      { title: 'Conversions', value: totals.conversions.toLocaleString() }
    ];

    const activeDataKey = METRIC_KEYS[activeMetric] || 'sessions';
    const totalForActiveMetric = totals[activeDataKey as keyof typeof totals] || 1;

    // Using an Emerald/Teal palette to distinguish from Organic's Indigo/Blue
    const colors = ['bg-emerald-500', 'bg-teal-400', 'bg-cyan-500', 'bg-green-400', 'bg-lime-400'];

    // Map Ad Networks with dynamic metrics
    const networkBreakdown = adNetworks.map((network, i) => {
      const metricValue = activeDataKey === 'avgEngagementTime' || activeDataKey === 'engagementRate' 
        ? totals[activeDataKey as keyof typeof totals] * (1 - i * 0.05) 
        : Math.round(totals[activeDataKey as keyof typeof totals] * network.shareMultiplier);

      return {
        name: network.name,
        share: Math.round(network.shareMultiplier * 100),
        sessions: Math.round(totals.sessions * network.shareMultiplier).toLocaleString(),
        engaged: Math.round(totals.engagedSessions * network.shareMultiplier).toLocaleString(),
        newUsers: Math.round(totals.newUsers * network.shareMultiplier).toLocaleString(),
        users: Math.round(totals.users * network.shareMultiplier).toLocaleString(),
        views: Math.round(totals.views * network.shareMultiplier).toLocaleString(),
        color: colors[i % colors.length],
        value: metricValue 
      };
    });

    let dataPoints = 30; 
    if (dateRange.start === 'today') dataPoints = 24; 
    else if (dateRange.start === '7daysAgo') dataPoints = 7;
    else if (dateRange.start === '90daysAgo') dataPoints = 90;

    const chart = Array.from({ length: dataPoints }).map((_, i) => {
      const baseValue = totalForActiveMetric / dataPoints;
      // Paid traffic is often more volatile/spiky than organic
      const variance = baseValue * 0.4; 
      const label = dateRange.start === 'today' ? `${i}:00` : `Day ${i + 1}`;
      return {
        date: label,
        current: Math.max(0, Math.round(baseValue + (Math.random() * variance * 2 - variance))),
        compare: Math.max(0, Math.round((baseValue * 0.8) + (Math.random() * variance * 2 - variance))),
      };
    });

    return { summary, networkBreakdown, chart };
  }, [rawData, activeMetric, dateRange.start]);

  if (!displayData) return null;

  return (
    <div className="p-4 md:p-6">
      {/* PAID METRIC CARDS */}
      <div className="flex flex-wrap w-full border-y border-slate-100 mb-8 bg-white">
        {displayData.summary?.map((metric: any, idx: number) => {
          const isActive = activeMetric === metric.title;
          return (
            <button 
              key={idx} 
              onClick={() => setActiveMetric(metric.title)}
              className={`flex-1 min-w-[140px] text-left border-r border-slate-100 last:border-r-0 py-4 px-4 sm:px-6 transition-colors outline-none hover:bg-slate-50 cursor-pointer`}
            >
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {metric.title}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`text-2xl sm:text-3xl font-medium ${isActive ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {metric.value}{metric.isPercent ? '%' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* PAID TREND LINE */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 text-sm font-semibold text-slate-700 flex items-center gap-2">
            Paid {activeMetric} Trend
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
                <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="compare" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AD NETWORK PROGRESS BARS */}
        <div className="w-full lg:w-80 flex flex-col justify-center gap-7 border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 pl-0 lg:pl-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ad Networks</h3>
          {displayData.networkBreakdown?.map((network: any) => (
            <div key={network.name}>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-2">{network.name}</span>
                <span>{network.share}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${network.color}`} 
                  style={{ width: `${network.share}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* PAID TRAFFIC TABLE */}
      <div className="overflow-x-auto mt-12 border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 font-bold whitespace-nowrap">Ad Network</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Sessions</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Engaged</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">New Users</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Users</th>
              <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {displayData.networkBreakdown?.map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{row.name}</td>
                <td className="px-6 py-4 text-right text-slate-600">{row.sessions}</td>
                <td className="px-6 py-4 text-right text-emerald-600 font-medium">{row.engaged}</td>
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
'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowUp, ArrowDown, ChevronDown, Check, AlertCircle } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pass explicit dates to ensure the API doesn't fail on defaults
        // In a real app, tie these to a date picker state
const queryParams = new URLSearchParams({
          currentStart: '2026-02-01', // Use YYYY-MM-DD
          currentEnd: '2026-02-28',
          compareStart: '2026-01-01',
          compareEnd: '2026-01-31'
        });

        const res = await fetch(`/api/analytics/dashboard?${queryParams.toString()}`);
        
        // Catch HTTP errors (like 500 Internal Server Error)
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server Error: ${res.status}`);
        }

        const json = await res.json();
        
        // Catch API-level JSON errors
        if (json.error) {
          throw new Error(json.error);
        }

        // Ensure the data structure actually exists before setting it
        if (!json.summary || !json.chart || !json.channels) {
          throw new Error("API returned incomplete data structure.");
        }

        setData(json);
      } catch (err: any) {
        console.error("Dashboard failed to load:", err);
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans text-slate-500 gap-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse font-medium">Fetching live data from Google Analytics...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6">
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Failed to load Dashboard</h3>
          <p className="text-sm text-slate-600 bg-red-50 p-3 rounded-md border border-red-100 font-mono break-words">
            {error || "Unknown error occurred"}
          </p>
          <p className="text-xs text-slate-500 mt-4">Check your Next.js server console for detailed GA4 API logs.</p>
        </div>
      </div>
    );
  }

  // --- SUCCESS STATE (MAIN UI) ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-4 md:p-6">
      
      {/* --- TOP HEADER & CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
        <div className="flex gap-4">
          <div className="border border-slate-200 bg-white rounded-md p-2 flex items-center gap-2 text-sm shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="font-medium">Last 30 Days</span>
          </div>
          <div className="border border-slate-200 bg-white rounded-md p-2 flex items-center gap-2 text-sm shadow-sm opacity-70">
            <span className="text-slate-500">Compare to:</span>
            <span className="font-medium">Previous Period</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-colors">
            <span className="text-blue-500 font-bold">M</span> Connect Matomo Analytics
          </button>
          <button className="px-4 py-2 bg-[#5B5B8E] text-white rounded-md text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-[#4a4a75] transition-colors">
            <Check className="w-4 h-4" /> Google Analytics 4
          </button>
          <button className="px-4 py-2 bg-[#7C7C9E] text-white rounded-md text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-[#68688a] transition-colors">
            <Check className="w-4 h-4" /> Google Search Console
          </button>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm font-medium overflow-x-auto">
        <button className="pb-3 border-b-2 border-indigo-600 text-indigo-900 whitespace-nowrap">Traffic sources</button>
        <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">Audience</button>
        <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">Pages</button>
        <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">Conversions</button>
      </div>

      {/* --- SUB TABS --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 bg-white p-2 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          <button className="px-4 py-2 bg-[#5B5B8E] text-white rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap">Overview</button>
          {['Organic Traffic', 'Paid Traffic', 'Referral Traffic', 'Social Traffic'].map(tab => (
            <button key={tab} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded text-xs font-bold uppercase tracking-wider border border-transparent hover:border-slate-200 whitespace-nowrap">
              {tab}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 border border-slate-200 rounded text-sm font-medium flex items-center gap-2 bg-white hover:bg-slate-50 whitespace-nowrap">
          Google Analytics <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* --- MAIN DASHBOARD CONTAINER --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Overview <span className="text-indigo-400 text-sm cursor-pointer hover:text-indigo-600">i</span>
          </h2>

          {/* --- SUMMARY METRICS CARDS --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {data.summary?.map((metric: any, idx: number) => (
              <div key={idx} className="border-r border-slate-100 last:border-0 pr-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate" title={metric.title}>{metric.title}</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={`text-xl font-medium ${idx === 0 ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {metric.value}{metric.isPercent ? '%' : ''}
                  </span>
                  {metric.trend !== 0 && (
                    <span className={`text-xs flex items-center font-medium ${metric.trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {metric.trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(metric.trend)}{metric.isPercent ? '%' : ''}{metric.isTime && 's'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* --- RECHARTS LINE GRAPH --- */}
            <div className="flex-1 min-w-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chart} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="current" stroke="#7e22ce" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="compare" stroke="#eab308" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="flex gap-6 mt-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-600"></div> Current Period</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Previous Period</div>
              </div>
            </div>

            {/* --- RIGHT SIDE CHANNEL BARS --- */}
            <div className="w-full lg:w-72 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 pl-0 lg:pl-8">
              {data.channels?.map((channel: any) => (
                <div key={channel.name}>
                  <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
                    <span>{channel.name}</span>
                    <span>{channel.share}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${channel.color}`} style={{ width: `${channel.share}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DETAILED DATA TABLE --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Channel</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Sessions</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Engaged Sessions</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">New Users</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Users</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Views</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Avg. Engagement Time</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Engagement Rate</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {data.channels?.map((row: any, idx: number) => (
                <tr key={idx} className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{row.name}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.sessions}</span>
                      {row.sTrend !== 0 && <span className={`text-[10px] flex items-center ${row.sTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.sTrend > 0 ? '▲' : '▼'}{Math.abs(row.sTrend)}</span>}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600">{row.engaged}</span>
                      {row.eTrend !== 0 && <span className={`text-[10px] flex items-center ${row.eTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.eTrend > 0 ? '▲' : '▼'}{Math.abs(row.eTrend)}</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.newUsers}</span>
                      {row.nuTrend !== 0 && <span className={`text-[10px] flex items-center ${row.nuTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.nuTrend > 0 ? '▲' : '▼'}{Math.abs(row.nuTrend)}</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.users}</span>
                      {row.uTrend !== 0 && <span className={`text-[10px] flex items-center ${row.uTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.uTrend > 0 ? '▲' : '▼'}{Math.abs(row.uTrend)}</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.views}</span>
                      {row.vTrend !== 0 && <span className={`text-[10px] flex items-center ${row.vTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.vTrend > 0 ? '▲' : '▼'}{Math.abs(row.vTrend)}</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.avgTime}</span>
                      {row.tTrend !== 0 && <span className={`text-[10px] flex items-center ${row.tTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.tTrend > 0 ? '▲' : '▼'}{Math.abs(row.tTrend)}s</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{row.engRate}%</span>
                      {row.erTrend !== 0 && <span className={`text-[10px] flex items-center ${row.erTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{row.erTrend > 0 ? '▲' : '▼'}{Math.abs(row.erTrend)}%</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">{row.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
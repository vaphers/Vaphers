'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const METRICS = [
  { id: 'sessions', label: 'Sessions', isPercent: false, isDecimal: false },
  { id: 'engagedSessions', label: 'Engaged Sessions', isPercent: false, isDecimal: false },
  { id: 'newUsers', label: 'New Users', isPercent: false, isDecimal: false },
  { id: 'users', label: 'Users', isPercent: false, isDecimal: false },
  { id: 'views', label: 'Views', isPercent: false, isDecimal: false },
  { id: 'viewsPerSession', label: 'Views / Session', isPercent: false, isDecimal: true }, // Replaced Time
  { id: 'engagementRate', label: 'Engagement Rate', isPercent: true, isDecimal: false },
  { id: 'conversions', label: 'Conversions', isPercent: false, isDecimal: false }
];

interface DevicesTabProps {
  dateRange: { start: string; end: string };
  compareRange?: { start: string; end: string } | null;
}

export default function DevicesTab({ dateRange, compareRange }: DevicesTabProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [compareData, setCompareData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeMetric, setActiveMetric] = useState('sessions'); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          type: 'devices',
          startDate: dateRange.start,
          endDate: dateRange.end,
        });

        if (compareRange) {
          queryParams.append('compareStart', compareRange.start);
          queryParams.append('compareEnd', compareRange.end);
        }

        const res = await fetch(`/api/admin/analytics?${queryParams.toString()}`);
        const json = await res.json();
        
        if (!json.success) throw new Error(json.error || `Server Error`);

        setData(json.data);
        if (json.compareData) setCompareData(json.compareData);
        else setCompareData(null);
        
        setCurrentPage(1);

      } catch (err: any) {
        setError(err.message || "Failed to load device data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [dateRange, compareRange]);

  const displayState = useMemo(() => {
    if (!data) return null;

    const processData = (dataset: any[]) => {
      const deviceMap: Record<string, any> = {};
      const totals: any = { sessions: 0, engagedSessions: 0, newUsers: 0, users: 0, views: 0, conversions: 0 };
      
      let totalEngagementRateSum = 0;

      dataset.forEach(row => {
        const sessions = Number(row.sessions) || 0;
        const engagedSessions = Number(row.engagedSessions) || 0;
        const newUsers = Number(row.newUsers) || 0;
        const users = Number(row.users) || 0;
        const views = Number(row.views) || 0;
        const conversions = Number(row.conversions) || 0;
        const rowEngRate = parseFloat(row.engagementRate) || 0;

        totals.sessions += sessions;
        totals.engagedSessions += engagedSessions;
        totals.newUsers += newUsers;
        totals.users += users;
        totals.views += views;
        totals.conversions += conversions;
        
        totalEngagementRateSum += (rowEngRate * sessions);

        const category = row.deviceCategory || 'unknown';
        if (!deviceMap[category]) {
          deviceMap[category] = { 
            deviceCategory: category,
            sessions, engagedSessions, newUsers, users, views, conversions,
            _rateSum: rowEngRate * sessions
          };
        } else {
          deviceMap[category].sessions += sessions;
          deviceMap[category].users += users;
          deviceMap[category].engagedSessions += engagedSessions;
          deviceMap[category].views += views;
          deviceMap[category].newUsers += newUsers;
          deviceMap[category].conversions += conversions;
          deviceMap[category]._rateSum += (rowEngRate * sessions);
        }
      });

      totals.viewsPerSession = totals.sessions > 0 ? (totals.views / totals.sessions) : 0;
      totals.engagementRate = totals.sessions > 0 ? (totalEngagementRateSum / totals.sessions) : 0;

      const finalizeAverages = (mapObj: Record<string, any>) => {
        return Object.values(mapObj).map(item => {
          return {
            ...item,
            viewsPerSession: item.sessions > 0 ? (item.views / item.sessions) : 0,
            engagementRate: item.sessions > 0 ? (item._rateSum / item.sessions) : 0
          };
        }).sort((a: any, b: any) => b[activeMetric] - a[activeMetric]);
      };

      return { 
          totals, 
          deviceBreakdown: finalizeAverages(deviceMap),
      };
    };

    const current = processData(data);
    const compared = compareData ? processData(compareData) : null;

    // Build Chart Data
    const chartData = current.deviceBreakdown.map((deviceData: any) => {
        const compDevice = compared?.deviceBreakdown.find((d: any) => d.deviceCategory === deviceData.deviceCategory);
        return {
            name: deviceData.deviceCategory.toLowerCase(),
            current: Number(deviceData[activeMetric]) || 0,
            compare: compDevice ? (Number(compDevice[activeMetric]) || 0) : 0,
        }
    });

    return { current, compared, chartData };
  }, [data, compareData, activeMetric]);

  const renderDelta = (currentVal: number, compareVal: number | undefined, isPercent: boolean, isDecimal: boolean) => {
    if (compareVal === undefined || compareVal === null || compareVal === 0) return null;
    const diff = currentVal - compareVal;
    if (diff === 0) return null;
    
    const isPositive = diff > 0;
    const color = isPositive ? 'text-emerald-500' : 'text-rose-500';
    const arrow = isPositive ? '▲' : '▼';
    
    let formattedDiff = isPercent 
      ? (Math.abs(diff) * 100).toFixed(2) + '%'
      : isDecimal ? Math.abs(diff).toFixed(2) : Math.abs(diff).toLocaleString();

    return (
      <span className={`text-xs font-semibold ${color} ml-2 flex items-center`}>
        {arrow} {formattedDiff}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-slate-500 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#2383e2]" />
        <p className="font-medium animate-pulse">Loading Device Data...</p>
      </div>
    );
  }

  if (error || !displayState) {
    return (
      <div className="p-6">
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-700 font-medium">{error || "Data unavailable"}</p>
        </div>
      </div>
    );
  }

  const { current, compared, chartData } = displayState;
  
  const totalRows = current.deviceBreakdown.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = current.deviceBreakdown.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="bg-white">
      {/* 1. TOP METRIC CARDS */}
      <div className="flex flex-wrap w-full border-y border-slate-100 mb-8 bg-white">
        {METRICS.map((m) => {
          const val = current.totals[m.id];
          const compVal = compared?.totals[m.id];
          const isActive = activeMetric === m.id;
          
          let displayVal: string | number = val;
          if (m.isPercent) displayVal = `${(val * 100).toFixed(2)}%`;
          else if (m.isDecimal) displayVal = val.toFixed(2);
          else displayVal = val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toLocaleString();

          return (
            <button 
              key={m.id} 
              onClick={() => {
                setActiveMetric(m.id);
                setCurrentPage(1); 
              }}
              className={`flex-1 min-w-[140px] text-left border-r border-slate-100 last:border-r-0 py-4 px-4 sm:px-6 transition-colors outline-none hover:bg-slate-50 cursor-pointer ${isActive ? 'bg-indigo-50/30' : ''}`}
            >
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                {m.label}
              </div>
              <div className="flex items-baseline text-2xl font-normal text-slate-800">
                {displayVal}
                {compared && renderDelta(val, compVal, m.isPercent, m.isDecimal)}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. BAR CHART SECTION */}
      <div className="p-6 border-b border-slate-200">
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <RechartsTooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [
                          METRICS.find(m => m.id === activeMetric)?.isPercent ? `${(value * 100).toFixed(2)}%` : 
                          METRICS.find(m => m.id === activeMetric)?.isDecimal ? value.toFixed(2) : value.toLocaleString(),
                          METRICS.find(m => m.id === activeMetric)?.label
                        ]}
                    />
                    <Bar dataKey="current" fill="#818cf8" radius={[2, 2, 0, 0]} maxBarSize={120} name={`${dateRange.start} to ${dateRange.end}`} />
                    {compared && (
                        <Bar dataKey="compare" fill="#eab308" radius={[2, 2, 0, 0]} maxBarSize={120} name={`${compareRange?.start} to ${compareRange?.end}`} />
                    )}
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#64748b' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* 3. DATA TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] font-bold text-slate-500 uppercase bg-slate-50 border-y border-slate-200 tracking-wider">
            <tr>
              <th className="px-6 py-4">Device</th>
              <th className="px-6 py-4">Sessions</th>
              <th className="px-6 py-4">Engaged Sessions</th>
              <th className="px-6 py-4">New Users</th>
              <th className="px-6 py-4">Users</th>
              <th className="px-6 py-4">Views</th>
              <th className="px-6 py-4">Views / Session</th>
              <th className="px-6 py-4">Eng. Rate</th>
              <th className="px-6 py-4">Conversions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((row: any, idx: number) => {
              const compRow = compared?.deviceBreakdown.find((r: any) => r.deviceCategory === row.deviceCategory);

              return (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 capitalize">
                    {row.deviceCategory}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {row.sessions.toLocaleString()}
                      {compRow && renderDelta(row.sessions, compRow.sessions, false, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {row.engagedSessions.toLocaleString()}
                      {compRow && renderDelta(row.engagedSessions, compRow.engagedSessions, false, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {row.newUsers.toLocaleString()}
                      {compRow && renderDelta(row.newUsers, compRow.newUsers, false, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {row.users.toLocaleString()}
                      {compRow && renderDelta(row.users, compRow.users, false, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {row.views.toLocaleString()}
                      {compRow && renderDelta(row.views, compRow.views, false, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {Number(row.viewsPerSession).toFixed(2)}
                      {compRow && renderDelta(Number(row.viewsPerSession), Number(compRow.viewsPerSession), false, true)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {(Number(row.engagementRate) * 100).toFixed(2)}%
                      {compRow && renderDelta(Number(row.engagementRate), Number(compRow.engagementRate), true, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.conversions.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        {/* PAGINATION CONTROLS */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Rows per page:</span>
            <select 
              className="border border-slate-300 rounded text-sm text-slate-700 py-1 px-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); 
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-500">
              {totalRows > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + rowsPerPage, totalRows)} of {totalRows}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || totalRows === 0}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalRows === 0}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
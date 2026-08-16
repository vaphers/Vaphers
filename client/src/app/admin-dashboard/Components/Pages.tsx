'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Loader2, ChevronLeft, ChevronRight, Search, ExternalLink, TrendingUp, TrendingDown, Eye, Users, Clock, Percent } from 'lucide-react';

interface PagesTabProps {
  dateRange: { start: string; end: string };
  compareDateRange?: { start: string; end: string };
}

export default function PagesTab({ dateRange, compareDateRange }: PagesTabProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [compareData, setCompareData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'views' | 'users' | 'sessions' | 'avgDuration' | 'engagementRate'>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchPagesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: Record<string, string> = {
          type: 'pages',
          startDate: dateRange.start,
          endDate: dateRange.end,
        };

        if (compareDateRange?.start && compareDateRange?.end) {
          params.compareStart = compareDateRange.start;
          params.compareEnd = compareDateRange.end;
        }

        const queryParams = new URLSearchParams(params);
        const res = await fetch(`/api/admin/analytics?${queryParams.toString()}`);
        const json = await res.json();

        if (!json.success) throw new Error(json.error || 'Failed to fetch pages data');

        setData(json.data || []);
        setCompareData(json.compareData || null);
        setCurrentPage(1);
      } catch (err: any) {
        setError(err.message || 'Failed to load pages data');
      } finally {
        setLoading(false);
      }
    };

    fetchPagesData();
  }, [dateRange, compareDateRange]);

  // Aggregate stats
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return { totalViews: 0, totalUsers: 0, totalSessions: 0, avgDuration: 0, avgEngagement: 0, topPage: '-' };
    }

    const totalViews = data.reduce((acc, r) => acc + (Number(r.views) || 0), 0);
    const totalUsers = data.reduce((acc, r) => acc + (Number(r.users) || 0), 0);
    const totalSessions = data.reduce((acc, r) => acc + (Number(r.sessions) || 0), 0);
    const avgDuration = (data.reduce((acc, r) => acc + (parseFloat(r.avgDuration) || 0) * (Number(r.views) || 1), 0) / (totalViews || 1)).toFixed(1);
    const avgEngagement = ((data.reduce((acc, r) => acc + (parseFloat(r.engagementRate) || 0) * (Number(r.views) || 1), 0) / (totalViews || 1)) * 100).toFixed(1);

    const sortedByViews = [...data].sort((a, b) => b.views - a.views);
    const topPage = sortedByViews[0]?.pagePath || '-';

    return { totalViews, totalUsers, totalSessions, avgDuration, avgEngagement, topPage };
  }, [data]);

  // Map compare data for quick lookup
  const compareMap = useMemo(() => {
    if (!compareData) return {};
    const map: Record<string, any> = {};
    compareData.forEach(r => {
      map[r.pagePath] = r;
    });
    return map;
  }, [compareData]);

  // Filtered and Sorted Rows
  const filteredData = useMemo(() => {
    if (!data) return [];
    let list = data.filter((row) => {
      const q = search.toLowerCase();
      return (
        row.pagePath.toLowerCase().includes(q) ||
        row.pageTitle.toLowerCase().includes(q)
      );
    });

    list.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') aVal = parseFloat(aVal) || 0;
      if (typeof bVal === 'string') bVal = parseFloat(bVal) || 0;

      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return list;
  }, [data, search, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const formatSeconds = (sec: number | string) => {
    const s = Math.round(Number(sec) || 0);
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    if (mins === 0) return `${rem}s`;
    return `${mins}m ${rem}s`;
  };

  const getPercentDiff = (curr: number, prev: number) => {
    if (!prev) return null;
    const diff = ((curr - prev) / prev) * 100;
    return diff;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[400px] text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#2383e2] mb-3" />
        <p className="text-sm font-medium">Fetching real page analytics from Google Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 m-4 rounded border border-red-200 bg-red-50 text-red-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">Failed to load Page Analytics</h4>
          <p className="text-xs mt-1 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:px-6 pt-2">
        <div className="bg-slate-50/80 border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Total Pageviews</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-medium text-slate-900">{stats.totalViews.toLocaleString()}</p>
          <span className="text-xs text-slate-500 mt-1 block font-normal">Across all tracked URLs</span>
        </div>

        <div className="bg-slate-50/80 border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Unique Users</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-medium text-slate-900">{stats.totalUsers.toLocaleString()}</p>
          <span className="text-xs text-slate-500 mt-1 block font-normal">Individual site visitors</span>
        </div>

        <div className="bg-slate-50/80 border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Avg. Time on Page</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-medium text-slate-900">{formatSeconds(stats.avgDuration)}</p>
          <span className="text-xs text-slate-500 mt-1 block font-normal">Weighted avg engagement</span>
        </div>

        <div className="bg-slate-50/80 border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Avg. Engagement Rate</span>
            <Percent className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-medium text-slate-900">{stats.avgEngagement}%</p>
          <span className="text-xs text-slate-500 mt-1 block font-normal">Engaged session ratio</span>
        </div>
      </div>

      {/* Main Table & Filter Container */}
      <div className="p-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by URL path or page title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Show:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none"
            >
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded bg-white shadow-2xs">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100/75 border-b border-slate-200 text-xs font-medium text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[240px]">Page Path & Title</th>
                <th
                  onClick={() => handleSort('views')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-600 transition-colors select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Views</span>
                    {sortField === 'views' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('users')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-600 transition-colors select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Users</span>
                    {sortField === 'users' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sessions')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-600 transition-colors select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Sessions</span>
                    {sortField === 'sessions' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('avgDuration')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-600 transition-colors select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Avg. Duration</span>
                    {sortField === 'avgDuration' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('engagementRate')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-600 transition-colors select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Engagement</span>
                    {sortField === 'engagementRate' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </th>
                <th className="py-3 px-4 w-12 text-center">Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No pages matched your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => {
                  const itemIndex = (currentPage - 1) * rowsPerPage + idx + 1;
                  const comp = compareMap[row.pagePath];
                  const diffViews = comp ? getPercentDiff(row.views, comp.views) : null;
                  const engPercent = (parseFloat(row.engagementRate) * 100).toFixed(1);

                  return (
                    <tr key={row.pagePath + idx} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3 px-4 text-xs text-slate-400 text-center font-mono">
                        {itemIndex}
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <div className="font-medium text-slate-900 truncate" title={row.pagePath}>
                          {row.pagePath}
                        </div>
                        <div className="text-xs text-slate-500 truncate" title={row.pageTitle}>
                          {row.pageTitle || 'Untitled'}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-900">
                        {row.views.toLocaleString()}
                        {diffViews !== null && (
                          <span
                            className={`ml-1.5 inline-flex items-center text-[10px] font-medium ${
                              diffViews >= 0 ? 'text-emerald-600' : 'text-red-500'
                            }`}
                          >
                            {diffViews >= 0 ? '+' : ''}
                            {diffViews.toFixed(0)}%
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-700 font-medium">
                        {row.users.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-700">
                        {row.sessions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-slate-700">
                        {formatSeconds(row.avgDuration)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            parseFloat(engPercent) >= 60
                              ? 'bg-emerald-50 text-emerald-700'
                              : parseFloat(engPercent) >= 40
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {engPercent}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <a
                          href={row.pagePath.startsWith('http') ? row.pagePath : `https://www.vaphers.com${row.pagePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 inline-flex p-1 rounded hover:bg-slate-100 transition-colors"
                          title="Open live page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
            <div>
              Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
              {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} pages
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-1.5 border border-slate-200 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 font-medium text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 border border-slate-200 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

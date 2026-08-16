'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Plus,
  ExternalLink,
  Edit,
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import AdminLoader from '../Components/AdminLoader';

type Post = {
  id: string;
  title: string;
  slug?: string;
  status?: 'published' | 'draft' | 'scheduled';
  scheduledAt?: string | null;
  createdAt?: any;
  featuredImage?: string;
};

export default function ContentCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    fetch('/api/blogs?limit=500&includeAll=true')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch calendar posts:', err);
        setLoading(false);
      });
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getPostDate = (p: Post): Date | null => {
    if (p.status === 'scheduled' && p.scheduledAt) {
      return new Date(p.scheduledAt);
    }
    if (p.createdAt) {
      if (p.createdAt._seconds) return new Date(p.createdAt._seconds * 1000);
      return new Date(p.createdAt);
    }
    return null;
  };

  const postsByDate = useMemo(() => {
    const map: Record<string, Post[]> = {};
    posts.forEach((p) => {
      const d = getPostDate(p);
      if (d && !isNaN(d.getTime())) {
        const key = format(d, 'yyyy-MM-dd');
        if (!map[key]) map[key] = [];
        map[key].push(p);
      }
    });
    return map;
  }, [posts]);

  const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
  const selectedDatePosts = postsByDate[selectedDateKey] || [];

  const upcomingScheduled = useMemo(() => {
    return posts
      .filter((p) => p.status === 'scheduled')
      .sort((a, b) => {
        const da = a.scheduledAt ? new Date(a.scheduledAt).getTime() : 0;
        const db = b.scheduledAt ? new Date(b.scheduledAt).getTime() : 0;
        return da - db;
      })
      .slice(0, 5);
  }, [posts]);

  if (loading) {
    return <AdminLoader message="Loading content calendar..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      `,
        }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none font-normal"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Content Publishing Calendar
          </span>
        </div>

        <Link href="/admin-dashboard/posts/add-posts">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
            <Plus size={14} /> Add New Post
          </button>
        </Link>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Month Navigation & Legend Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-gray-200 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-medium text-slate-900 min-w-[160px]">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1.5 border border-gray-200 rounded hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-2.5 py-1 text-xs font-normal border border-gray-200 rounded hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1.5 border border-gray-200 rounded hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-normal text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Published
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Scheduled
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Drafts
            </span>
          </div>
        </div>

        {/* Main Grid + Sidebar Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50/80 border-b border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-2.5">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-gray-100">
              {calendarDays.map((day) => {
                const key = format(day, 'yyyy-MM-dd');
                const dayPosts = postsByDate[key] || [];
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={key}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[95px] p-2 transition-all cursor-pointer flex flex-col ${
                      !isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : 'bg-white text-slate-800'
                    } ${isSelected ? 'ring-2 ring-blue-500/40 ring-inset bg-blue-50/20' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday
                            ? 'bg-[#2383e2] text-white shadow-xs'
                            : isSelected
                            ? 'text-blue-600 font-medium'
                            : 'text-slate-700'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayPosts.length > 0 && (
                        <span className="text-[10px] font-normal text-slate-400">
                          {dayPosts.length} post{dayPosts.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-1 overflow-y-auto max-h-[70px] no-scrollbar">
                      {dayPosts.slice(0, 3).map((p) => {
                        const status = p.status || 'published';
                        return (
                          <div
                            key={p.id}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-normal truncate flex items-center gap-1 ${
                              status === 'published'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : status === 'scheduled'
                                ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                            title={p.title}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                status === 'published'
                                  ? 'bg-emerald-500'
                                  : status === 'scheduled'
                                  ? 'bg-indigo-500'
                                  : 'bg-amber-500'
                              }`}
                            />
                            <span className="truncate">{p.title}</span>
                          </div>
                        );
                      })}
                      {dayPosts.length > 3 && (
                        <span className="text-[10px] text-slate-500 block text-right font-normal">
                          +{dayPosts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Date Inspector & Upcoming */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-medium text-slate-900">
                    {format(selectedDate, 'EEEE, MMM d, yyyy')}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-normal">
                  {selectedDatePosts.length} article{selectedDatePosts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {selectedDatePosts.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-normal">
                  No blog posts scheduled or published on this date.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDatePosts.map((p) => {
                    const status = p.status || 'published';
                    return (
                      <div
                        key={p.id}
                        className="p-3 bg-slate-50/60 rounded border border-gray-200 space-y-2 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-medium text-slate-900 line-clamp-2">
                            {p.title}
                          </h4>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-normal rounded-full shrink-0 ${
                              status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : status === 'scheduled'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {status === 'scheduled' && p.scheduledAt && (
                          <div className="flex items-center gap-1 text-[11px] text-indigo-700 font-mono">
                            <Clock size={12} />
                            <span>
                              {new Date(p.scheduledAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60">
                          <Link
                            href={`/blogs/${p.slug || p.id}`}
                            target="_blank"
                            className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-normal"
                          >
                            <ExternalLink size={12} />
                            View
                          </Link>
                          <Link
                            href={`/admin-dashboard/edit-post/${p.slug || p.id}`}
                            className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Edit size={12} />
                            Edit
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4 text-indigo-900">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-medium text-slate-900">Upcoming Scheduled Posts</h3>
              </div>

              {upcomingScheduled.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs font-normal">
                  No upcoming scheduled posts in queue.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {upcomingScheduled.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 bg-indigo-50/40 border border-indigo-100 rounded flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-slate-900 truncate" title={p.title}>
                          {p.title}
                        </div>
                        <div className="text-[11px] text-indigo-700 font-mono mt-0.5">
                          {p.scheduledAt
                            ? format(new Date(p.scheduledAt), 'MMM d, yyyy · h:mm a')
                            : 'Date not set'}
                        </div>
                      </div>
                      <Link
                        href={`/admin-dashboard/edit-post/${p.slug || p.id}`}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded"
                        title="Edit schedule"
                      >
                        <Edit size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

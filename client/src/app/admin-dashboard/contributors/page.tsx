'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  User,
  Search,
  RefreshCw,
  Edit,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Clock,
  Sparkles,
  Globe,
  Loader2,
  CheckCircle2,
  Plus,
  Mail,
  ExternalLink,
  Calendar,
  Filter,
  ArrowRight,
  Eye,
  DollarSign,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import AdminLoader from '../Components/AdminLoader';

type ArticleItem = {
  id: string;
  title: string;
  slug?: string;
  publishedSlug?: string;
  status: string;
  paid: boolean;
  paidAmount?: number;
  categories?: string[];
  createdAt: string;
  updatedAt: string;
};

type Contributor = {
  id: string;
  uid: string;
  name: string;
  email: string;
  bio?: string;
  website?: string;
  registrationIp?: string;
  accountStatus?: 'active' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
  latestDraftAt?: string | null;
  latestActivityAt?: string;
  draftCount: number;
  paidCount: number;
  totalSubmissions: number;
  drafts: ArticleItem[];
  paidArticles: ArticleItem[];
};

export default function ContributorManagementPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'has_drafts' | 'today' | 'this_week' | 'paid' | 'no_drafts'>('all');
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const fetchContributors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contributors');
      const data = await res.json();
      setContributors(data.contributors || []);
    } catch (err) {
      console.error('Failed to load contributors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Helper for date checks
  const isToday = (dateStr?: string | null) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const isThisWeek = (dateStr?: string | null) => {
    if (!dateStr) return false;
    const d = new Date(dateStr).getTime();
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return now - d <= sevenDaysMs;
  };

  const counts = useMemo(() => {
    return {
      all: contributors.length,
      has_drafts: contributors.filter((c) => c.draftCount > 0).length,
      today: contributors.filter((c) => isToday(c.latestDraftAt) || isToday(c.latestActivityAt) || isToday(c.createdAt)).length,
      this_week: contributors.filter((c) => isThisWeek(c.latestDraftAt) || isThisWeek(c.latestActivityAt) || isThisWeek(c.createdAt)).length,
      paid: contributors.filter((c) => c.paidCount > 0).length,
      no_drafts: contributors.filter((c) => c.totalSubmissions === 0).length,
    };
  }, [contributors]);

  const filteredContributors = useMemo(() => {
    return contributors.filter((c) => {
      if (filterTab === 'has_drafts' && c.draftCount === 0) return false;
      if (filterTab === 'paid' && c.paidCount === 0) return false;
      if (filterTab === 'no_drafts' && c.totalSubmissions > 0) return false;
      if (filterTab === 'today' && !isToday(c.latestDraftAt) && !isToday(c.latestActivityAt) && !isToday(c.createdAt)) return false;
      if (filterTab === 'this_week' && !isThisWeek(c.latestDraftAt) && !isThisWeek(c.latestActivityAt) && !isThisWeek(c.createdAt)) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = c.name?.toLowerCase().includes(q);
        const matchEmail = c.email?.toLowerCase().includes(q);
        const matchWebsite = c.website?.toLowerCase().includes(q);
        const matchDrafts = c.drafts.some((d) => d.title.toLowerCase().includes(q));
        const matchPaid = c.paidArticles.some((p) => p.title.toLowerCase().includes(q));
        return matchName || matchEmail || matchWebsite || matchDrafts || matchPaid;
      }
      return true;
    });
  }, [contributors, filterTab, search]);

  const generateReminderMailto = (c: Contributor) => {
    const draftTitle = c.drafts.length > 0 ? c.drafts[0].title : 'your guest post draft';
    const subject = encodeURIComponent(`Reminder: Your draft "${draftTitle}" on Vaphers`);
    const body = encodeURIComponent(
      `Hi ${c.name || 'there'},\n\nWe noticed you started drafting an article ("${draftTitle}") on the Vaphers Contributor Portal.\n\nWhenever you are ready to publish and earn high-authority DoFollow backlinks, you can finalize your draft and publish it directly from your dashboard:\nhttps://www.vaphers.com/write-for-us/dashboard\n\nIf you have any questions or need editorial assistance, reply directly to this email or reach out through your dashboard support desk!\n\nBest regards,\nVaphers Editorial Team\nhttps://www.vaphers.com`
    );
    return `mailto:${c.email}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return <AdminLoader message="Loading contributors CRM & draft analytics..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-16 montserrat-regular">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      `,
        }}
      />

      {/* Header matching Admin Studio */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none font-normal"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Contributor CRM &amp; Draft Analytics
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchContributors}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <Link href="/admin-dashboard/guest-posts">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer">
              <FileText size={13} />
              <span>All Submissions</span>
            </button>
          </Link>
          <Link href="/admin-dashboard/support">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
              <Mail size={13} />
              <span>Support Inbox</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="w-full px-4 md:px-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded bg-white border border-gray-200 shadow-xs space-y-1">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">
              Registered Authors
            </span>
            <div className="text-3xl font-bold text-slate-900">{counts.all}</div>
            <span className="text-[11px] text-gray-400 block">Total signed up contributors</span>
          </div>

          <div className="p-5 rounded bg-blue-50/70 border border-blue-200 shadow-xs space-y-1">
            <span className="text-xs text-[#1a6cb8] font-medium uppercase tracking-wider block">
              Authors with Drafts
            </span>
            <div className="text-3xl font-bold text-[#2383e2]">{counts.has_drafts}</div>
            <span className="text-[11px] text-slate-600 block">Unfinished or ready to publish</span>
          </div>

          <div className="p-5 rounded bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-1">
            <span className="text-xs text-emerald-800 font-medium uppercase tracking-wider block">
              Paid &amp; Live Authors
            </span>
            <div className="text-3xl font-bold text-emerald-600">{counts.paid}</div>
            <span className="text-[11px] text-slate-600 block">Published live on /blogs</span>
          </div>

          <div className="p-5 rounded bg-amber-50/70 border border-amber-200 shadow-xs space-y-1">
            <span className="text-xs text-amber-800 font-medium uppercase tracking-wider block">
              Active / Drafted Today
            </span>
            <div className="text-3xl font-bold text-amber-600">{counts.today}</div>
            <span className="text-[11px] text-slate-600 block">Active in last 24 hours</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-gray-200 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-gray-200 hover:bg-slate-50'
              }`}
            >
              All Writers ({counts.all})
            </button>
            <button
              onClick={() => setFilterTab('has_drafts')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTab === 'has_drafts'
                  ? 'bg-[#2383e2] text-white shadow-xs'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              <FileText size={12} />
              <span>Has Drafts ({counts.has_drafts})</span>
            </button>
            <button
              onClick={() => setFilterTab('today')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterTab === 'today'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              Drafted Today ({counts.today})
            </button>
            <button
              onClick={() => setFilterTab('this_week')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterTab === 'this_week'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              Active This Week ({counts.this_week})
            </button>
            <button
              onClick={() => setFilterTab('paid')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTab === 'paid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 size={12} />
              <span>Paid &amp; Live ({counts.paid})</span>
            </button>
            <button
              onClick={() => setFilterTab('no_drafts')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterTab === 'no_drafts'
                  ? 'bg-gray-700 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50'
              }`}
            >
              No Drafts ({counts.no_drafts})
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by author, email, or draft title..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-sm bg-white focus:outline-none focus:border-blue-500 font-normal"
            />
          </div>
        </div>

        {/* Contributors CRM Table */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Author Profile &amp; Contact</th>
                  <th className="px-6 py-3.5">Drafted Content</th>
                  <th className="px-6 py-3.5">Paid &amp; Live Articles</th>
                  <th className="px-6 py-3.5">Recent Activity</th>
                  <th className="px-6 py-3.5 text-right">Outreach &amp; Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-normal">
                {filteredContributors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-gray-400 text-xs font-normal">
                      <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      No contributors match the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredContributors.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Author Profile Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {c.name ? c.name[0].toUpperCase() : 'W'}
                          </div>
                          <div className="flex flex-col space-y-0.5 max-w-xs">
                            <span className="font-semibold text-slate-900 text-sm">{c.name}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-gray-500 font-mono select-all">
                                {c.email || 'No email'}
                              </span>
                              {c.email && (
                                <button
                                  onClick={() => handleCopyEmail(c.email)}
                                  className="text-gray-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                                  title="Copy email address"
                                >
                                  {copiedEmail === c.email ? (
                                    <Check size={11} className="text-emerald-600" />
                                  ) : (
                                    <Copy size={11} />
                                  )}
                                </button>
                              )}
                            </div>
                            {c.website && (
                              <a
                                href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 truncate font-mono"
                              >
                                <Globe size={10} />
                                <span>{c.website.replace(/^https?:\/\//, '')}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Draft Content Column */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5 max-w-sm">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                c.draftCount > 0
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {c.draftCount} {c.draftCount === 1 ? 'Draft' : 'Drafts'}
                            </span>
                            {c.latestDraftAt && isToday(c.latestDraftAt) && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">
                                Updated Today
                              </span>
                            )}
                          </div>

                          {c.drafts.length > 0 ? (
                            <div className="space-y-1">
                              {c.drafts.slice(0, 2).map((d) => (
                                <div key={d.id} className="flex items-center justify-between gap-2 text-xs">
                                  <Link
                                    href={`/admin-dashboard/guest-posts/edit/${d.id}`}
                                    className="font-medium text-slate-800 hover:text-blue-600 truncate hover:underline"
                                    title={d.title}
                                  >
                                    &bull; {d.title}
                                  </Link>
                                </div>
                              ))}
                              {c.drafts.length > 2 && (
                                <button
                                  onClick={() => setSelectedContributor(c)}
                                  className="text-[11px] text-blue-600 hover:underline font-medium cursor-pointer"
                                >
                                  + {c.drafts.length - 2} more drafts...
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">No active drafts</span>
                          )}
                        </div>
                      </td>

                      {/* Paid & Live Articles Column */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5 max-w-xs">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                c.paidCount > 0
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {c.paidCount} {c.paidCount === 1 ? 'Live Article' : 'Live Articles'}
                            </span>
                          </div>

                          {c.paidArticles.length > 0 ? (
                            <div className="space-y-1">
                              {c.paidArticles.slice(0, 2).map((p) => (
                                <div key={p.id} className="flex items-center gap-1.5 text-xs truncate">
                                  <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                                  <Link
                                    href={`/blogs/${p.publishedSlug || p.slug}`}
                                    target="_blank"
                                    className="text-slate-800 hover:text-emerald-700 truncate hover:underline"
                                  >
                                    {p.title}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">0 paid articles</span>
                          )}
                        </div>
                      </td>

                      {/* Recent Activity Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                        <div className="flex flex-col">
                          <span>
                            {c.latestActivityAt
                              ? new Date(c.latestActivityAt).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Never'}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            Joined:{' '}
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'Recently'}
                          </span>
                        </div>
                      </td>

                      {/* Actions & Outreach Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          {c.email && (
                            <a
                              href={generateReminderMailto(c)}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1a6cb8] border border-blue-200 rounded text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs"
                              title="Send pre-filled draft reminder email to author"
                            >
                              <Mail size={12} />
                              <span>Email Author</span>
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedContributor(c)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Eye size={12} />
                            <span>Details</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detailed Contributor Inspection Modal */}
      {selectedContributor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <span>Contributor Portfolio:</span>
                  <strong className="text-blue-700">{selectedContributor.name}</strong>
                </h3>
                <span className="text-xs text-gray-500 font-mono">{selectedContributor.email}</span>
              </div>
              <button
                onClick={() => setSelectedContributor(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Profile Card */}
              <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Author Profile Information
                </span>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Author Byline</span>
                    <span className="font-medium">{selectedContributor.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Target Portfolio Website</span>
                    {selectedContributor.website ? (
                      <a
                        href={selectedContributor.website}
                        target="_blank"
                        className="text-blue-600 hover:underline font-mono text-[11px]"
                      >
                        {selectedContributor.website}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">None provided</span>
                    )}
                  </div>
                </div>
                {selectedContributor.bio && (
                  <div>
                    <span className="text-gray-400 block text-[11px]">Bio</span>
                    <p className="italic text-slate-600 bg-white p-2.5 rounded border border-gray-100 text-[11px]">
                      "{selectedContributor.bio}"
                    </p>
                  </div>
                )}
              </div>

              {/* Drafts Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                    <FileText size={14} className="text-[#2383e2]" />
                    <span>Unfinished &amp; Active Drafts ({selectedContributor.drafts.length})</span>
                  </h4>
                </div>

                {selectedContributor.drafts.length === 0 ? (
                  <p className="text-gray-400 italic text-[11px]">No active drafts found.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedContributor.drafts.map((d) => (
                      <div
                        key={d.id}
                        className="p-3 rounded bg-white border border-gray-200 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-0.5 max-w-md">
                          <span className="font-medium text-slate-900 block truncate">{d.title}</span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            Last updated:{' '}
                            {d.updatedAt ? new Date(d.updatedAt).toLocaleString() : 'Recently'}
                          </span>
                        </div>
                        <Link
                          href={`/admin-dashboard/guest-posts/edit/${d.id}`}
                          className="px-3 py-1.5 bg-[#2383e2] hover:bg-[#1c6ebf] text-white rounded text-xs font-medium shrink-0 flex items-center gap-1"
                        >
                          <span>Open in Editor</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Paid Articles Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Paid &amp; Published Live Articles ({selectedContributor.paidArticles.length})</span>
                  </h4>
                </div>

                {selectedContributor.paidArticles.length === 0 ? (
                  <p className="text-gray-400 italic text-[11px]">No published articles yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedContributor.paidArticles.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded bg-emerald-50/50 border border-emerald-200 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5 max-w-md">
                          <span className="font-medium text-slate-900 block truncate">{p.title}</span>
                          <span className="text-[10px] text-emerald-700 font-mono">
                            Published &bull; $25 Paid &bull; Permanent Backlink
                          </span>
                        </div>
                        <Link
                          href={`/blogs/${p.publishedSlug || p.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium shrink-0 flex items-center gap-1"
                        >
                          <span>View Live</span>
                          <ExternalLink size={11} />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <a
                href={generateReminderMailto(selectedContributor)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium flex items-center gap-1.5 shadow-xs"
              >
                <Mail size={13} />
                <span>Send Draft Reminder Email</span>
              </a>
              <button
                onClick={() => setSelectedContributor(null)}
                className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-slate-700 rounded text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

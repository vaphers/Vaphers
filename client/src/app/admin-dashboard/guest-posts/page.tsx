'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Search,
  RefreshCw,
  ExternalLink,
  Loader2,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Plus,
} from 'lucide-react';
import AdminLoader from '../Components/AdminLoader';

type GuestSubmission = {
  id: string;
  title: string;
  slug?: string;
  contentHtml?: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  categories?: string[];
  authorId?: string;
  authorName?: string;
  authorEmail?: string;
  authorWebsite?: string;
  targetDomains?: string[];
  clientIp?: string;
  fraudRisk?: 'high' | 'medium' | 'low';
  fraudReasons?: string[];
  sharedAccountsCount?: number;
  status: 'draft' | 'pending' | 'needs_revision' | 'approved' | 'rejected';
  feedbackNote?: string;
  publishedSlug?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function GuestPostsAdminPage() {
  const [submissions, setSubmissions] = useState<GuestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'needs_revision' | 'approved' | 'rejected'>('pending');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<GuestSubmission | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/guest-posts');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Failed to load guest posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleAction = async (action: 'approve' | 'request_revision' | 'reject') => {
    if (!selectedPost) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/guest-posts/${selectedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, feedbackNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');

      setPreviewModalOpen(false);
      setSelectedPost(null);
      setFeedbackNote('');
      fetchSubmissions();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const counts = useMemo(() => {
    return {
      all: submissions.length,
      pending: submissions.filter((s) => s.status === 'pending').length,
      needs_revision: submissions.filter((s) => s.status === 'needs_revision').length,
      approved: submissions.filter((s) => s.status === 'approved').length,
      rejected: submissions.filter((s) => s.status === 'rejected').length,
    };
  }, [submissions]);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (activeTab !== 'all' && s.status !== activeTab) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = s.title?.toLowerCase().includes(q);
        const matchAuthor = s.authorName?.toLowerCase().includes(q) || s.authorEmail?.toLowerCase().includes(q);
        const matchDomain = s.targetDomains?.some((d) => d.toLowerCase().includes(q));
        return matchTitle || matchAuthor || matchDomain;
      }
      return true;
    });
  }, [submissions, activeTab, search]);

  if (loading) {
    return <AdminLoader message="Loading guest submissions..." />;
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

      {/* Sticky Header matching Posts.tsx */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none font-normal"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Guest Submissions &amp; Approvals
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <Link href="/admin-dashboard/contributors">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
              <User size={13} />
              <span>Manage Writers</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Status Filter Tabs matching Posts.tsx */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Pending Review ({counts.pending})
          </button>
          <button
            onClick={() => setActiveTab('needs_revision')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'needs_revision'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            Needs Revision ({counts.needs_revision})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'approved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Approved &amp; Live ({counts.approved})
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'rejected'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
            }`}
          >
            Rejected ({counts.rejected})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-gray-200 hover:bg-slate-50'
            }`}
          >
            All Submissions ({counts.all})
          </button>
        </div>

        {/* Search Bar matching Posts.tsx */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by article, author, or backlink domain..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-sm bg-white focus:outline-none focus:border-blue-500 font-normal"
            />
          </div>

          <span className="text-xs text-slate-500 font-normal">
            Showing {filtered.length} of {submissions.length} articles
          </span>
        </div>

        {/* Submissions Table matching Posts.tsx layout */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Article Title</th>
                  <th className="px-6 py-3.5">Author Attribution</th>
                  <th className="px-6 py-3.5">Anti-Abuse Audit</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Submitted</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-normal">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400 text-xs font-normal">
                      <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      No submissions found in this category.
                    </td>
                  </tr>
                ) : (
                  filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col max-w-md">
                          <span className="font-medium text-slate-900 text-sm line-clamp-1">
                            {sub.title || 'Untitled Post'}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[11px] text-gray-400 font-mono">
                              {sub.categories?.[0] || 'Marketing'}
                            </span>
                            {sub.targetDomains && sub.targetDomains.length > 0 && (
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-mono">
                                🔗 {sub.targetDomains[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-xs">
                            {sub.authorName ? sub.authorName[0].toUpperCase() : 'W'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-800">
                              {sub.authorName || 'Guest Contributor'}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {sub.authorEmail || ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Anti-Abuse Security Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.fraudRisk === 'high' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
                            <ShieldAlert size={12} className="text-red-600" />
                            Multi-Account Alert
                          </span>
                        ) : sub.fraudRisk === 'medium' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertCircle size={12} className="text-amber-600" />
                            Shared Network
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                            <ShieldCheck size={12} className="text-emerald-600" />
                            Clean Account
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.status === 'pending' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            Pending Review
                          </span>
                        )}
                        {sub.status === 'needs_revision' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Needs Revision
                          </span>
                        )}
                        {sub.status === 'approved' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Approved &amp; Live
                          </span>
                        )}
                        {sub.status === 'rejected' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                            Rejected
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                        {sub.updatedAt
                          ? new Date(sub.updatedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          {sub.status === 'approved' && sub.publishedSlug && (
                            <Link
                              href={`/blogs/${sub.publishedSlug}`}
                              target="_blank"
                              className="p-1.5 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded text-xs flex items-center gap-1 font-medium"
                            >
                              <ExternalLink size={12} />
                              <span>Live</span>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setSelectedPost(sub);
                              setFeedbackNote(sub.feedbackNote || '');
                              setPreviewModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs font-medium rounded-sm transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>Review</span>
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
      </div>

      {/* Review Modal */}
      {previewModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 border border-gray-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[11px] font-medium text-[#2383e2] uppercase tracking-wider">
                  Guest Post Editorial Review
                </span>
                <h3 className="text-base font-medium text-slate-900 truncate max-w-xl">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Anti-Abuse Security Alert Warning */}
              {selectedPost.fraudReasons && selectedPost.fraudReasons.length > 0 && (
                <div className="p-4 bg-red-50/90 border border-red-200 rounded space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-800">
                    <ShieldAlert size={15} className="text-red-600 shrink-0" />
                    <span>Multi-Account &amp; Fraud Risk Detected:</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-red-700 space-y-1 font-normal">
                    {selectedPost.fraudReasons.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Author & Backlink Metadata Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded border border-gray-200 text-xs">
                <div>
                  <span className="text-gray-500 font-normal block mb-0.5">Author</span>
                  <span className="font-medium text-slate-800 block">
                    {selectedPost.authorName || 'Guest Contributor'}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {selectedPost.authorEmail}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500 font-normal block mb-0.5">Target Backlink Domains</span>
                  {selectedPost.targetDomains && selectedPost.targetDomains.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.targetDomains.map((d) => (
                        <span key={d} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px]">
                          {d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 font-normal">No external links</span>
                  )}
                </div>

                <div>
                  <span className="text-gray-500 font-normal block mb-0.5">Client Network IP</span>
                  <span className="font-mono text-slate-700 text-xs">
                    {selectedPost.clientIp || '127.0.0.1'}
                  </span>
                </div>
              </div>

              {selectedPost.metaDescription && (
                <div className="bg-blue-50/60 p-3 rounded border border-blue-200/60 text-xs">
                  <span className="font-medium text-blue-900 block mb-1">Meta Description:</span>
                  <p className="text-blue-800 font-normal">{selectedPost.metaDescription}</p>
                </div>
              )}

              {/* Article Preview */}
              <div className="border border-gray-200 rounded p-6 bg-white">
                <h2 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
                  Article Body &amp; Media Preview
                </h2>
                <div
                  className="prose max-w-none text-slate-800 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedPost.contentHtml || '<p>No content</p>' }}
                />
              </div>

              {/* Feedback Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Editorial Feedback / Revision Note (Sent to author):
                </label>
                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="e.g. Please update the introduction with real stats and ensure featured image is under 200KB..."
                  rows={3}
                  className="w-full p-3 text-xs border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 font-normal"
                />
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-gray-200/60 rounded cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('reject')}
                  disabled={actionLoading}
                  className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  Reject Submission
                </button>
                <button
                  onClick={() => handleAction('request_revision')}
                  disabled={actionLoading}
                  className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  Request Revisions
                </button>
                <button
                  onClick={() => handleAction('approve')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {actionLoading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={14} />
                  )}
                  Approve &amp; Publish to /blogs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

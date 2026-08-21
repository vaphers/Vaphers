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
  Send,
  DollarSign,
  Settings,
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
  paid?: boolean;
  paidAmount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function GuestPostsAdminPage() {
  const [submissions, setSubmissions] = useState<GuestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'draft' | 'needs_revision'>('all');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<GuestSubmission | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSending, setTicketSending] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Dynamic Pricing State
  const [pricing, setPricing] = useState<{ price: number; currency: string; updatedAt?: string }>({
    price: 25,
    currency: 'USD',
  });
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [priceInput, setPriceInput] = useState('25');
  const [pricingSaving, setPricingSaving] = useState(false);

  const fetchPricing = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();
      if (typeof data.price === 'number') {
        setPricing({ price: data.price, currency: data.currency || 'USD', updatedAt: data.updatedAt });
        setPriceInput(String(data.price));
      }
    } catch (err) {
      console.error('Failed to load pricing:', err);
    }
  };

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
    fetchPricing();
  }, []);

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(priceInput);
    if (isNaN(num) || num < 1) {
      alert('Please enter a valid price (minimum $1).');
      return;
    }

    setPricingSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: num, currency: 'USD' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update pricing');

      setPricing({ price: num, currency: 'USD', updatedAt: new Date().toISOString() });
      setPricingModalOpen(false);
      alert(`Guest post publication price successfully set to $${num} USD! It is now updated everywhere.`);
    } catch (err: any) {
      alert(`Error updating price: ${err.message}`);
    } finally {
      setPricingSaving(false);
    }
  };

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

  const handleCreatePostTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !ticketMessage.trim() || ticketSending) return;

    setTicketSending(true);
    try {
      const res = await fetch('/api/support/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedPost.authorId || 'unknown_author',
          userName: selectedPost.authorName || 'Guest Writer',
          userEmail: selectedPost.authorEmail || '',
          topic: `Post Policy Notice: "${selectedPost.title.slice(0, 35)}..."`,
          initialMessage: ticketMessage.trim(),
          postId: selectedPost.id,
          postTitle: selectedPost.title,
          postSlug: selectedPost.publishedSlug || selectedPost.slug,
          initiatedBy: 'admin',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create resolution ticket');

      alert(`Resolution ticket opened for "${selectedPost.title}". The author can reply directly from their dashboard.`);
      setTicketModalOpen(false);
      setTicketMessage('');
      setSelectedPost(null);
    } catch (err: any) {
      alert(`Error opening ticket: ${err.message}`);
    } finally {
      setTicketSending(false);
    }
  };

  const counts = useMemo(() => {
    return {
      all: submissions.length,
      approved: submissions.filter((s) => s.status === 'approved').length,
      draft: submissions.filter((s) => s.status === 'draft').length,
      needs_revision: submissions.filter((s) => s.status === 'needs_revision').length,
    };
  }, [submissions]);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (activeTab === 'approved' && s.status !== 'approved') return false;
      if (activeTab === 'draft' && s.status !== 'draft') return false;
      if (activeTab === 'needs_revision' && s.status !== 'needs_revision') return false;

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

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none font-normal"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Guest Posts &amp; Editorial Oversight
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Change Pricing Button */}
          <button
            onClick={() => setPricingModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs montserrat-medium transition-colors cursor-pointer shadow-xs"
            title="Set global publication price for guest articles"
          >
            <DollarSign size={13} className="text-emerald-700" />
            <span>Price: <strong>${pricing.price} USD</strong></span>
          </button>

          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <Link href="/admin-dashboard/support">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer">
              <MessageSquare size={13} className="text-[#2383e2]" />
              <span>Support Inbox</span>
            </button>
          </Link>
          <Link href="/admin-dashboard/contributors">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
              <User size={13} />
              <span>Manage Writers</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
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
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'approved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Published &amp; Live ({counts.approved})
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'draft'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Drafts in Progress ({counts.draft})
          </button>
          {counts.needs_revision > 0 && (
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
          )}
        </div>

        {/* Search Bar */}
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

        {/* Submissions Table */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Article Title</th>
                  <th className="px-6 py-3.5">Author Attribution</th>
                  <th className="px-6 py-3.5">Anti-Abuse Audit</th>
                  <th className="px-6 py-3.5">Status &amp; Payment</th>
                  <th className="px-6 py-3.5">Updated</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-normal">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400 text-xs font-normal">
                      <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      No submissions found.
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
                        {sub.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} />
                            Live on /blogs (${sub.paidAmount || pricing.price} Paid)
                          </span>
                        ) : sub.status === 'draft' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Draft (Unpublished)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            Needs Revision
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
                          <Link
                            href={`/admin-dashboard/guest-posts/edit/${sub.id}`}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-sm transition-colors flex items-center gap-1 cursor-pointer"
                            title="Edit article in full rich text studio"
                          >
                            <span>Edit in Editor</span>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedPost(sub);
                              setTicketModalOpen(true);
                            }}
                            className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded text-xs transition-colors cursor-pointer"
                            title="Open support ticket for this post"
                          >
                            <MessageSquare size={13} className="text-[#2383e2]" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPost(sub);
                              setFeedbackNote(sub.feedbackNote || '');
                              setPreviewModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs font-medium rounded-sm transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>Quick Review</span>
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

      {/* Global Pricing Management Modal */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-600" />
                <h3 className="text-sm font-medium text-slate-900">
                  Set Article Publication Pricing
                </h3>
              </div>
              <button
                onClick={() => setPricingModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="p-6 space-y-4 text-xs font-normal">
              <p className="text-slate-600 leading-relaxed">
                Changing this price will immediately update all public landing cards, writer dashboard KPI badges, contributor editor buttons, and Razorpay checkout orders globally.
              </p>

              <div>
                <label className="block text-slate-700 font-medium mb-1.5">
                  Guest Post Price (USD $):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    required
                    className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded font-semibold bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {pricing.updatedAt && (
                <div className="text-[11px] text-gray-400 font-mono">
                  Last updated: {new Date(pricing.updatedAt).toLocaleString()}
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pricingSaving || !priceInput}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {pricingSaving ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                  <span>Save Pricing Globally</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Resolution Ticket Modal */}
      {ticketModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-sm font-medium text-slate-900">
                  Open Post Policy Ticket
                </h3>
                <span className="text-[11px] text-gray-500 truncate max-w-xs block">
                  Article: {selectedPost.title}
                </span>
              </div>
              <button
                onClick={() => setTicketModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePostTicket} className="p-6 space-y-4 text-xs font-normal">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-slate-700 space-y-1">
                <span className="font-semibold text-blue-900 block text-xs">Target Contributor:</span>
                <span className="font-medium text-slate-800">{selectedPost.authorName || 'Guest Contributor'}</span>
                <span className="text-gray-500 font-mono text-[11px] block">{selectedPost.authorEmail}</span>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Revision Request / Policy Violation Notice:
                </label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe the issue (e.g., 'Please update the target backlink anchor text and provide a real person author bio per our guidelines')..."
                  rows={4}
                  required
                  className="w-full p-3 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-blue-500 font-normal"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setTicketModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ticketSending || !ticketMessage.trim()}
                  className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white rounded font-medium flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {ticketSending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                  <span>Open Ticket Thread</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                          🔗 {d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 font-normal">No external links</span>
                  )}
                </div>

                <div>
                  <span className="text-gray-500 font-normal block mb-0.5">Publication Status</span>
                  <span className="font-semibold text-slate-800 text-xs">
                    {selectedPost.status === 'approved' ? `Live on /blogs ($${selectedPost.paidAmount || pricing.price} Paid)` : 'Draft (Unpublished)'}
                  </span>
                </div>
              </div>

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
                <Link
                  href={`/admin-dashboard/guest-posts/edit/${selectedPost.id}`}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors"
                >
                  Open in Full Editor &rarr;
                </Link>
                <button
                  onClick={() => {
                    setPreviewModalOpen(false);
                    setTicketModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  Open Policy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

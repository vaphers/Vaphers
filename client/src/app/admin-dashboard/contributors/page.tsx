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
  FileCheck2,
  Clock,
  Sparkles,
  Globe,
  Loader2,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import AdminLoader from '../Components/AdminLoader';

type Contributor = {
  id: string;
  uid: string;
  name: string;
  email: string;
  bio?: string;
  website?: string;
  monthlyQuota: number;
  submissionsThisMonth: number;
  totalSubmissions: number;
  approvedPosts: number;
  pendingPosts: number;
  registrationIp?: string;
  accountStatus?: 'active' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
};

export default function ContributorManagementPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);
  const [quotaInput, setQuotaInput] = useState(2);
  const [statusInput, setStatusInput] = useState<'active' | 'suspended'>('active');
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleUpdateQuota = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContributor) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/contributors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: editingContributor.uid,
          monthlyQuota: quotaInput,
          status: statusInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update contributor');

      setEditingContributor(null);
      fetchContributors();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return contributors.filter((c) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.website?.toLowerCase().includes(q)
      );
    });
  }, [contributors, search]);

  if (loading) {
    return <AdminLoader message="Loading registered contributors..." />;
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
            Contributor Writers &amp; Quotas
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
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
              <FileCheck2 size={13} />
              <span>Review Submissions</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-xs space-y-1">
            <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">
              Total Contributors
            </span>
            <div className="text-2xl font-medium text-slate-900">{contributors.length}</div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-xs space-y-1">
            <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">
              Standard Monthly Quota
            </span>
            <div className="text-2xl font-medium text-[#2383e2]">2 Blogs / Contributor</div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-xs space-y-1">
            <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">
              Total Approved Live Posts
            </span>
            <div className="text-2xl font-medium text-emerald-600">
              {contributors.reduce((acc, c) => acc + c.approvedPosts, 0)}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or backlink website..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-sm bg-white focus:outline-none focus:border-blue-500 font-normal"
            />
          </div>

          <span className="text-xs text-slate-500 font-normal">
            Showing {filtered.length} of {contributors.length} contributors
          </span>
        </div>

        {/* Contributors Table */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Author Name &amp; Email</th>
                  <th className="px-6 py-3.5">Backlink Portfolio</th>
                  <th className="px-6 py-3.5">Monthly Quota</th>
                  <th className="px-6 py-3.5">Submissions</th>
                  <th className="px-6 py-3.5">Joined</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-normal">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400 text-xs font-normal">
                      <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      No contributors found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-xs">
                            {c.name ? c.name[0].toUpperCase() : 'W'}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900 text-sm">
                              {c.name || 'Guest Contributor'}
                            </span>
                            <span className="text-[11px] text-gray-400 font-mono">
                              {c.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {c.website ? (
                          <a
                            href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-mono text-xs inline-flex items-center gap-1"
                          >
                            <Globe size={12} />
                            <span>{c.website.replace(/^https?:\/\//, '')}</span>
                          </a>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">Not provided</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {c.monthlyQuota} / Month
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            ({c.submissionsThisMonth} used)
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
                            {c.approvedPosts} Live
                          </span>
                          <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] font-medium border border-amber-200">
                            {c.pendingPosts} In Review
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => {
                            setEditingContributor(c);
                            setQuotaInput(c.monthlyQuota || 2);
                            setStatusInput(c.accountStatus || 'active');
                          }}
                          className="px-3 py-1.5 bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs font-medium rounded-sm transition-colors inline-flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Edit size={12} />
                          <span>Adjust Quota</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Adjust Monthly Quota Modal */}
      {editingContributor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="text-sm font-medium text-slate-900">
                Adjust Monthly Publishing Quota
              </h3>
              <button
                onClick={() => setEditingContributor(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateQuota} className="p-6 space-y-4 text-xs font-normal">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 space-y-1">
                <div className="font-medium text-slate-900">{editingContributor.name}</div>
                <div className="text-slate-500 font-mono text-[11px]">{editingContributor.email}</div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Monthly Allowed Publishing Slots:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={quotaInput}
                    onChange={(e) => setQuotaInput(Number(e.target.value))}
                    className="w-24 p-2 border border-gray-300 rounded text-sm bg-white font-medium text-center focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setQuotaInput(2)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 text-xs cursor-pointer"
                    >
                      Default (2)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuotaInput((prev) => prev + 1)}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs cursor-pointer"
                    >
                      +1 Slot ($35)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuotaInput((prev) => prev + 5)}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs cursor-pointer"
                    >
                      +5 Agency
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Account Status:
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="active">Active (Permitted to Submit)</option>
                  <option value="suspended">Suspended (Blocked from Submitting)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingContributor(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white rounded font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {actionLoading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={14} />}
                  <span>Save Quota</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

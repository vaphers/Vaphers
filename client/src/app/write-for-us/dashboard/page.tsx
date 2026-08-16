'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import {
  PenTool,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  LogOut,
  Sparkles,
  ExternalLink,
  Edit3,
  Plus,
  MessageSquare,
  Loader2,
  FileText,
  ShieldCheck,
  Search,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  User as UserIcon,
  DollarSign,
} from 'lucide-react';
import SupportChatModal from '@/PageComponents/GuestComponents/SupportChatModal';
import WriterProfileModal from '@/PageComponents/GuestComponents/WriterProfileModal';

type WriterProfile = {
  uid: string;
  name: string;
  email: string;
  bio?: string;
  website?: string;
  monthlyQuota?: number;
  submissionsThisMonth?: number;
  weeklyQuota?: number;
  submissionsThisWeek?: number;
  remainingQuota: number;
};

type Submission = {
  id: string;
  title: string;
  slug?: string;
  status: 'draft' | 'pending' | 'needs_revision' | 'approved' | 'rejected';
  feedbackNote?: string;
  publishedSlug?: string;
  categories?: string[];
  updatedAt?: string;
  createdAt?: string;
};

export default function WriterDashboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const [profile, setProfile] = useState<WriterProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'needs_revision' | 'approved' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatInitialTopic, setChatInitialTopic] = useState('Extra Post Quota Request ($35)');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) {
      router.push('/write-for-us/login');
      return;
    }

    const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '';
    const fallbackName = user.fullName || user.firstName || primaryEmail.split('@')[0] || 'Contributor';

    loadProfileAndSubmissions(user.id, primaryEmail, fallbackName);
  }, [isLoaded, isSignedIn, user, router]);

  const loadProfileAndSubmissions = async (uid: string, email: string, displayName: string) => {
    try {
      setLoading(true);
      const profRes = await fetch(
        `/api/guest/profile?uid=${uid}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(displayName)}`
      );
      const profData = await profRes.json();
      if (profData.profile || profData.writer) {
        setProfile(profData.profile || profData.writer);
      }

      const subsRes = await fetch(`/api/guest/submissions?authorId=${uid}`);
      const subsData = await subsRes.json();
      if (subsData.submissions) {
        setSubmissions(subsData.submissions);
      }
    } catch (err) {
      console.error('Failed to load contributor dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/write-for-us');
  };

  const counts = useMemo(() => {
    return {
      all: submissions.length,
      pending: submissions.filter((s) => s.status === 'pending').length,
      needs_revision: submissions.filter((s) => s.status === 'needs_revision').length,
      approved: submissions.filter((s) => s.status === 'approved').length,
      draft: submissions.filter((s) => s.status === 'draft').length,
    };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (activeTab !== 'all' && s.status !== activeTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title?.toLowerCase().includes(q);
        const matchCategory = s.categories?.some((c) => c.toLowerCase().includes(q));
        return matchTitle || matchCategory;
      }
      return true;
    });
  }, [submissions, activeTab, searchQuery]);

  const quota = profile?.monthlyQuota || profile?.weeklyQuota || 2;
  const submissionsThisMonth =
    profile?.submissionsThisMonth !== undefined
      ? profile.submissionsThisMonth
      : profile?.submissionsThisWeek || 0;
  const remainingQuota = profile?.remainingQuota !== undefined ? profile.remainingQuota : Math.max(0, quota - submissionsThisMonth);

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 libre-franklin-regular">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2383e2]" />
          <span className="text-sm font-medium text-slate-500">Loading contributor portal...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 libre-franklin-regular pb-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        .libre-franklin-regular { font-family: 'Libre Franklin', sans-serif !important; font-weight: 400 !important; }
        .libre-franklin-medium { font-family: 'Libre Franklin', sans-serif !important; font-weight: 500 !important; }
        .libre-franklin-semibold { font-family: 'Libre Franklin', sans-serif !important; font-weight: 600 !important; }
      `,
        }}
      />

      {/* Enterprise Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Vaphers"
                width={130}
                height={34}
                priority
                quality={90}
                className="w-auto h-8"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm libre-franklin-medium text-slate-600">
              <Link href="/write-for-us/dashboard" className="text-[#2383e2] font-semibold border-b-2 border-[#2383e2] py-5">
                Overview
              </Link>
              <Link href="/write-for-us" target="_blank" className="hover:text-slate-900 transition-colors py-5 flex items-center gap-1">
                <span>Guidelines &amp; Rules</span>
                <ExternalLink size={12} className="text-slate-400" />
              </Link>
              <Link href="/blogs" target="_blank" className="hover:text-slate-900 transition-colors py-5 flex items-center gap-1">
                <span>Published Blogs</span>
                <ExternalLink size={12} className="text-slate-400" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Support Desk Ticket Button */}
            <button
              onClick={() => {
                setChatInitialTopic('General Support & Editorial Inquiry');
                setChatModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs libre-franklin-medium transition-colors cursor-pointer"
            >
              <MessageSquare size={14} className="text-[#2383e2]" />
              <span>Support Desk</span>
            </button>

            <Link href="/write-for-us/editor">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs sm:text-sm libre-franklin-medium transition-colors shadow-2xs cursor-pointer">
                <Plus size={15} />
                <span>New Article</span>
              </button>
            </Link>

            {/* Profile Avatar & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div
                className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs libre-franklin-semibold"
                title={user?.primaryEmailAddress?.emailAddress || ''}
              >
                {profile?.name ? profile.name[0].toUpperCase() : 'W'}
              </div>
              <button
                onClick={handleSignOut}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl libre-franklin-semibold text-slate-900 tracking-tight">
              Welcome, {profile?.name || user?.fullName || user?.firstName || 'Contributor'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {profile?.bio
                ? profile.bio
                : 'Manage your technical publications, draft revisions, and monthly publishing quota.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs libre-franklin-medium transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <UserIcon size={14} className="text-[#2383e2]" />
              <span>Edit Author Profile &amp; Bio</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 pl-2 border-l border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Enterprise KPI & Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Monthly Quota Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs libre-franklin-medium text-slate-500 uppercase tracking-wider">
              <span>Monthly Quota</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                {quota} / Month
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl libre-franklin-semibold text-slate-900">
                {remainingQuota} <span className="text-xs font-normal text-slate-400">slots remaining</span>
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#2383e2] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (submissionsThisMonth / (quota || 2)) * 100)}%` }}
              />
            </div>
            <button
              onClick={() => {
                setChatInitialTopic('Extra Post Quota Request ($35)');
                setChatModalOpen(true);
              }}
              className="text-[11px] text-[#2383e2] hover:underline libre-franklin-medium inline-flex items-center gap-1 pt-1 cursor-pointer"
            >
              <DollarSign size={12} className="text-emerald-600" />
              <span>Need More? Request Slot ($35) &rarr;</span>
            </button>
          </div>

          {/* Published Articles Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs libre-franklin-medium text-slate-500 uppercase tracking-wider">
              <span>Live on Blog</span>
              <FileCheck2 size={16} className="text-emerald-600" />
            </div>
            <div className="text-2xl libre-franklin-semibold text-slate-900">
              {counts.approved}
            </div>
            <p className="text-[11px] text-slate-400">
              Permanent DoFollow indexed articles
            </p>
          </div>

          {/* Under Review Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs libre-franklin-medium text-slate-500 uppercase tracking-wider">
              <span>Pending Review</span>
              <Clock size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl libre-franklin-semibold text-slate-900">
              {counts.pending}
            </div>
            <p className="text-[11px] text-slate-400">
              48h peer editorial review cycle
            </p>
          </div>

          {/* Needs Revision Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs libre-franklin-medium text-slate-500 uppercase tracking-wider">
              <span>Action Required</span>
              <AlertCircle size={16} className="text-indigo-600" />
            </div>
            <div className="text-2xl libre-franklin-semibold text-slate-900">
              {counts.needs_revision}
            </div>
            <p className="text-[11px] text-slate-400">
              Editorial revision notes pending update
            </p>
          </div>
        </div>

        {/* Submissions Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs libre-franklin-medium transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Articles ({counts.all})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs libre-franklin-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'pending'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                In Review ({counts.pending})
              </button>
              <button
                onClick={() => setActiveTab('needs_revision')}
                className={`px-3 py-1.5 rounded-lg text-xs libre-franklin-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'needs_revision'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Needs Action ({counts.needs_revision})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-1.5 rounded-lg text-xs libre-franklin-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'approved'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Live ({counts.approved})
              </button>
              <button
                onClick={() => setActiveTab('draft')}
                className={`px-3 py-1.5 rounded-lg text-xs libre-franklin-medium transition-colors cursor-pointer ${
                  activeTab === 'draft'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Drafts ({counts.draft})
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Submissions List / Empty States */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2383e2] flex items-center justify-center mx-auto">
                <PenTool size={20} />
              </div>
              <h3 className="text-sm libre-franklin-semibold text-slate-900">
                {searchQuery ? 'No matching articles found' : 'No publications yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {searchQuery
                  ? 'Try searching with a different keyword or clear the search filter.'
                  : 'Start writing your first technical guest article to publish on the Vaphers blog network.'}
              </p>
              {!searchQuery && (
                <div className="pt-2">
                  <Link href="/write-for-us/editor">
                    <button className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs libre-franklin-medium rounded-lg transition-colors cursor-pointer shadow-xs">
                      Create Your First Article &rarr;
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-5 transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm libre-franklin-semibold text-slate-900 truncate">
                        {sub.title || 'Untitled Draft'}
                      </h3>

                      {/* Status Badges */}
                      {sub.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded text-[11px] libre-franklin-medium bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                          <Clock size={11} />
                          <span>In Review</span>
                        </span>
                      )}
                      {sub.status === 'needs_revision' && (
                        <span className="px-2 py-0.5 rounded text-[11px] libre-franklin-medium bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                          <AlertCircle size={11} />
                          <span>Action Needed</span>
                        </span>
                      )}
                      {sub.status === 'approved' && (
                        <span className="px-2 py-0.5 rounded text-[11px] libre-franklin-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Live</span>
                        </span>
                      )}
                      {sub.status === 'draft' && (
                        <span className="px-2 py-0.5 rounded text-[11px] libre-franklin-medium bg-slate-100 text-slate-600 border border-slate-200">
                          Draft
                        </span>
                      )}
                      {sub.status === 'rejected' && (
                        <span className="px-2 py-0.5 rounded text-[11px] libre-franklin-medium bg-red-50 text-red-700 border border-red-200">
                          Rejected
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>Category: {sub.categories?.[0] || 'Digital Marketing'}</span>
                      <span>&bull;</span>
                      <span>
                        Updated:{' '}
                        {sub.updatedAt
                          ? new Date(sub.updatedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </span>
                    </div>

                    {/* Revision Feedback Callout */}
                    {sub.feedbackNote && sub.status === 'needs_revision' && (
                      <div className="mt-2 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 leading-snug">
                        <strong className="font-semibold text-indigo-800">Editorial Revision Note: </strong>
                        {sub.feedbackNote}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {sub.status === 'approved' && sub.publishedSlug && (
                      <Link
                        href={`/blogs/${sub.publishedSlug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs libre-franklin-medium flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Live Post</span>
                      </Link>
                    )}

                    <Link href={`/write-for-us/editor/${sub.id}`}>
                      <button className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs libre-franklin-medium flex items-center gap-1 transition-colors cursor-pointer">
                        <Edit3 size={13} />
                        <span>{sub.status === 'draft' || sub.status === 'needs_revision' ? 'Edit Article' : 'View Draft'}</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Support Chat / Extra Quota Ticket Modal */}
      {user && (
        <SupportChatModal
          isOpen={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
          userId={user.id}
          userName={profile?.name || user.fullName || user.firstName || 'Writer'}
          userEmail={user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''}
          initialTopic={chatInitialTopic}
        />
      )}

      {/* Author Profile Settings Modal */}
      {user && (
        <WriterProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          uid={user.id}
          initialName={profile?.name || user.fullName || user.firstName || ''}
          initialBio={profile?.bio || ''}
          initialWebsite={profile?.website || ''}
          onProfileUpdated={(updated) => {
            if (profile) {
              setProfile({ ...profile, ...updated });
            }
          }}
        />
      )}
    </div>
  );
}

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
};

type Submission = {
  id: string;
  title: string;
  slug?: string;
  status: 'draft' | 'pending' | 'needs_revision' | 'approved' | 'rejected';
  feedbackNote?: string;
  publishedSlug?: string;
  categories?: string[];
  paid?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function WriterDashboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const [profile, setProfile] = useState<WriterProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'approved' | 'needs_revision'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedPostForChat, setSelectedPostForChat] = useState<{ id: string; title: string } | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [publishSuccessSlug, setPublishSuccessSlug] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(25);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) {
      router.push('/write-for-us/login');
      return;
    }

    // Fetch dynamic pricing
    fetch('/api/guest/pricing')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.price === 'number') setPrice(d.price);
      })
      .catch(() => {});

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
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const counts = useMemo(() => {
    return {
      all: submissions.length,
      draft: submissions.filter((s) => s.status === 'draft').length,
      approved: submissions.filter((s) => s.status === 'approved').length,
      needs_revision: submissions.filter((s) => s.status === 'needs_revision').length,
    };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (activeTab === 'draft' && s.status !== 'draft') return false;
      if (activeTab === 'approved' && s.status !== 'approved') return false;
      if (activeTab === 'needs_revision' && s.status !== 'needs_revision') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.slug?.toLowerCase().includes(q) ||
          s.categories?.some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [submissions, activeTab, searchQuery]);

  // Handle direct 1-click Razorpay publish from dashboard
  const handleDirectPublish = async (sub: Submission) => {
    if (!user) return;
    setPublishingId(sub.id);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Razorpay SDK failed to load');

      const orderRes = await fetch('/api/guest/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: sub.id,
          authorId: user.id,
          authorEmail: user.primaryEmailAddress?.emailAddress || '',
          authorName: profile?.name || user.fullName || 'Contributor',
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to initialize payment');

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'USD',
        name: 'Vaphers',
        description: `Publish: "${sub.title.slice(0, 30)}..."`,
        image: 'https://www.vaphers.com/logo.svg',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/guest/payments/verify-and-publish', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                submissionId: sub.id,
                authorId: user.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

            setPublishSuccessSlug(verifyData.publishedSlug);
            const primaryEmail = user.primaryEmailAddress?.emailAddress || '';
            loadProfileAndSubmissions(user.id, primaryEmail, profile?.name || 'Contributor');
          } catch (err: any) {
            alert(`Error: ${err.message}`);
          }
        },
        prefill: {
          name: profile?.name || user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
        },
        theme: {
          color: '#2383e2',
        },
        modal: {
          ondismiss: function () {
            setPublishingId(null);
          },
        },
      };

      const paymentObj = new (window as any).Razorpay(options);
      paymentObj.open();
    } catch (err: any) {
      alert(`Error starting checkout: ${err.message}`);
    } finally {
      setPublishingId(null);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2383e2]" />
          <span className="text-sm font-medium">Connecting to Contributor Desk...</span>
        </div>
      </div>
    );
  }

  const primaryEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Vaphers"
              width={125}
              height={32}
              priority
              className="w-auto h-7"
            />
          </Link>
          <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2383e2] border border-blue-200">
            Contributor Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Author Profile Button */}
          <button
            onClick={() => setProfileModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <UserIcon size={14} className="text-[#2383e2]" />
            <span className="hidden sm:inline">Author Profile</span>
          </button>

          {/* Support Ticket Desk */}
          <button
            onClick={() => {
              setSelectedPostForChat(null);
              setChatModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <MessageSquare size={14} className="text-[#2383e2]" />
            <span className="hidden sm:inline">Support Desk</span>
          </button>

          {/* New Article Draft Button */}
          <Link href="/write-for-us/editor">
            <button className="px-4 py-2 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
              <Plus size={14} />
              <span>Create New Draft</span>
            </button>
          </Link>

          {/* Logout */}
          <button
            onClick={() => signOut(() => router.push('/write-for-us/login'))}
            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Active Article Drafts
            </span>
            <div className="text-3xl font-bold text-slate-900">{counts.draft}</div>
            <span className="text-[11px] text-slate-400 block">Compose and edit for free</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Published Live Articles
            </span>
            <div className="text-3xl font-bold text-emerald-600">{counts.approved}</div>
            <span className="text-[11px] text-slate-400 block">Live on /blogs with DoFollow links</span>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-2xs space-y-1">
            <span className="text-xs font-semibold text-[#1a6cb8] uppercase tracking-wider block">
              Instant Publication Fee
            </span>
            <div className="text-3xl font-bold text-[#2383e2]">${price} / Post</div>
            <span className="text-[11px] text-slate-600 block">Secure checkout via Razorpay</span>
          </div>
        </div>

        {/* Tab Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Articles ({counts.all})
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'draft'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Drafts ({counts.draft})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'approved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              Live ({counts.approved})
            </button>
            {counts.needs_revision > 0 && (
              <button
                onClick={() => setActiveTab('needs_revision')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'needs_revision'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                Needs Revision ({counts.needs_revision})
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by article title..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-2xs">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">No articles found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                  Start by drafting your first technical marketing or SEO guest post.
                </p>
              </div>
              <Link href="/write-for-us/editor">
                <button className="px-5 py-2.5 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5">
                  <Plus size={14} />
                  <span>Start a New Draft</span>
                </button>
              </Link>
            </div>
          ) : (
            filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                      {sub.categories?.[0] || 'Marketing'}
                    </span>

                    {sub.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={12} />
                        Live on /blogs
                      </span>
                    )}

                    {sub.status === 'draft' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        Draft
                      </span>
                    )}

                    {sub.status === 'needs_revision' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertCircle size={12} />
                        Revision Note
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {sub.title || 'Untitled Post'}
                  </h3>

                  {sub.feedbackNote && (
                    <p className="text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                      <strong>Editorial note:</strong> {sub.feedbackNote}
                    </p>
                  )}

                  <div className="text-[11px] text-slate-400 font-mono">
                    Last updated:{' '}
                    {sub.updatedAt
                      ? new Date(sub.updatedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Recently'}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  {/* Post-Linked Support Ticket */}
                  <button
                    onClick={() => {
                      setSelectedPostForChat({ id: sub.id, title: sub.title });
                      setChatModalOpen(true);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#2383e2] hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Open ticket for this post"
                  >
                    <MessageSquare size={16} />
                  </button>

                  <Link href={`/write-for-us/editor?id=${sub.id}`}>
                    <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer">
                      <Edit3 size={14} />
                      <span>Edit Post</span>
                    </button>
                  </Link>

                  {sub.status === 'approved' && sub.publishedSlug ? (
                    <Link
                      href={`/blogs/${sub.publishedSlug}`}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <ExternalLink size={14} />
                      <span>View Live</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleDirectPublish(sub)}
                      disabled={publishingId === sub.id}
                      className="px-4 py-2 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {publishingId === sub.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <DollarSign size={13} />
                      )}
                      <span>Publish (${price})</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Support Chat Modal */}
      {user && (
        <SupportChatModal
          isOpen={chatModalOpen}
          onClose={() => {
            setChatModalOpen(false);
            setSelectedPostForChat(null);
          }}
          userId={user.id}
          userName={profile?.name || user.fullName || user.firstName || 'Writer'}
          userEmail={primaryEmail}
          postId={selectedPostForChat?.id}
          postTitle={selectedPostForChat?.title}
        />
      )}

      {/* Writer Profile Edit Modal */}
      {user && (
        <WriterProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          uid={user.id}
          initialName={profile?.name || user.fullName || ''}
          initialBio={profile?.bio || ''}
          initialWebsite={profile?.website || ''}
          onProfileUpdated={(updated: { name: string; bio: string; website: string }) => {
            setProfile((prev) => (prev ? { ...prev, ...updated } : null));
          }}
        />
      )}

      {/* Instant Publish Celebration Modal */}
      {publishSuccessSlug && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Article Published Live!</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Payment verified. Your blog post is now active on Vaphers with your verified author attribution and permanent DoFollow backlinks.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href={`/blogs/${publishSuccessSlug}`}
                target="_blank"
                className="w-full py-3 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Live Article &rarr;</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => setPublishSuccessSlug(null)}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import {
  Save,
  ArrowLeft,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  FileText,
  User,
  Globe,
  Upload,
  Image as ImageIcon,
  DollarSign,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import Tiptap from '@/PageComponents/Admin Components/Editor';
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import SupportChatModal from './SupportChatModal';

const CATEGORIES = [
  'Marketing',
  'Technical SEO',
  'Performance Marketing',
  'Engineering',
  'Design & UI',
  'Growth Strategy',
  'AI & Automation',
];

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

type GuestEditorProps = {
  submissionId?: string;
};

export default function GuestEditor({ submissionId: propSubmissionId }: GuestEditorProps = {}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = propSubmissionId || searchParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [category, setCategory] = useState('Marketing');
  const [featuredImage, setFeaturedImage] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(editId || null);
  const [submissionStatus, setSubmissionStatus] = useState<string>('draft');
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(25);

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [publishSuccessModalOpen, setPublishSuccessModalOpen] = useState(false);
  const [publishedLiveSlug, setPublishedLiveSlug] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Author Profile & Draft data & Dynamic Pricing
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/write-for-us/login');
      return;
    }

    const initData = async () => {
      try {
        // Fetch pricing
        fetch('/api/guest/pricing')
          .then((r) => r.json())
          .then((d) => {
            if (typeof d.price === 'number') setPrice(d.price);
          })
          .catch(() => {});

        const profRes = await fetch(`/api/guest/profile?uid=${user.id}`);
        const profData = await profRes.json();
        setProfile(profData.profile || null);

        if (editId) {
          const subRes = await fetch(`/api/guest/submissions/${editId}`);
          const subData = await subRes.json();
          if (subData.submission) {
            const sub = subData.submission;
            setTitle(sub.title || '');
            setContent(sub.contentHtml || '');
            setSlug(sub.slug || '');
            setMetaTitle(sub.metaTitle || '');
            setMetaDescription(sub.metaDescription || '');
            setCategory(sub.categories?.[0] || 'Marketing');
            setFeaturedImage(sub.featuredImage || '');
            setSubmissionStatus(sub.status || 'draft');
            setFeedbackNote(sub.feedbackNote || null);
            if (sub.publishedSlug) setPublishedLiveSlug(sub.publishedSlug);
          }
        }
      } catch (err) {
        console.error('Failed to load editor data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    initData();
  }, [user, isLoaded, editId, router]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      setError(`Image too large (${(file.size / 1024).toFixed(1)} KB). All media must be compressed strictly under 200 KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFeaturedImage(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  // Helper to save current draft in Firestore
  const saveDraftSilently = async (): Promise<string | null> => {
    if (!user) return null;

    const effectiveSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const payload = {
      title: title.trim() || 'Untitled Post',
      slug: effectiveSlug,
      contentHtml: content,
      metaTitle: metaTitle || title.trim(),
      metaDescription: metaDescription.trim(),
      categories: [category],
      featuredImage,
      authorId: user.id,
      authorName: profile?.name || user.fullName || user.firstName || 'Contributor',
      authorBio: profile?.bio || '',
      authorWebsite: profile?.website || '',
      authorEmail: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
      status: submissionStatus === 'approved' ? 'approved' : 'draft',
    };

    const url = submissionId ? `/api/guest/submissions/${submissionId}` : '/api/guest/submissions';
    const method = submissionId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save post');

    const newId = data.submission?.id || submissionId;
    if (newId) setSubmissionId(newId);
    return newId;
  };

  // Save Draft handler (Free, unlimited)
  const handleSaveDraft = async () => {
    if (!user) return;
    if (!title || !title.trim() || title === 'Add a spectacular title...') {
      setError('Please enter a title for your article draft.');
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await saveDraftSilently();
      setSuccessMsg('Draft saved successfully! You can continue editing or publish when ready.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  // Instant Publishing with Razorpay Checkout ($25)
  const handlePublishWithRazorpay = async () => {
    if (!user) return;

    if (!title || title === 'Add a spectacular title...' || title.trim() === '') {
      setError('Please enter a valid title for your article before publishing.');
      return;
    }

    if (!content || content === '<p></p>' || content.trim() === '') {
      setError('Please add content to your article before publishing.');
      return;
    }

    setError(null);
    setPaying(true);

    try {
      // 1. Ensure latest changes are saved and get submissionId
      const targetSubId = await saveDraftSilently();
      if (!targetSubId) throw new Error('Could not prepare submission draft');

      // 2. Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay checkout SDK. Please check your internet connection.');
      }

      // 3. Create Razorpay order on server
      const orderRes = await fetch('/api/guest/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: targetSubId,
          authorId: user.id,
          authorEmail: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
          authorName: profile?.name || user.fullName || user.firstName || 'Contributor',
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to initialize payment');

      // 4. Launch Razorpay modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'USD',
        name: 'Vaphers',
        description: `Publish: "${orderData.submissionTitle.slice(0, 30)}..."`,
        image: 'https://www.vaphers.com/logo.svg',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setSaving(true);
            const verifyRes = await fetch('/api/guest/payments/verify-and-publish', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                submissionId: targetSubId,
                authorId: user.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

            setSubmissionStatus('approved');
            setPublishedLiveSlug(verifyData.publishedSlug);
            setPublishSuccessModalOpen(true);
          } catch (verErr: any) {
            setError(`Payment verification error: ${verErr.message}`);
          } finally {
            setSaving(false);
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
            setPaying(false);
          },
        },
      };

      const paymentObj = new (window as any).Razorpay(options);
      paymentObj.open();
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed');
    } finally {
      setPaying(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2383e2]" />
          <span className="text-sm font-medium">Loading contributor editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            href="/write-for-us/dashboard"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
              {title && title !== 'Add a spectacular title...' ? title : 'Draft Contributor Article'}
            </span>
            {submissionStatus === 'approved' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Live on /blogs
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                Draft
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Post Linked Support Ticket Button */}
          <button
            onClick={() => setChatModalOpen(true)}
            className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Open a ticket for this post"
          >
            <MessageSquare size={14} className="text-[#2383e2]" />
            <span className="hidden sm:inline">Post Ticket</span>
          </button>

          <button
            onClick={handleSaveDraft}
            disabled={saving || paying}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>Save Draft</span>
          </button>

          {submissionStatus === 'approved' && publishedLiveSlug ? (
            <Link
              href={`/blogs/${publishedLiveSlug}`}
              target="_blank"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>View Live Article</span>
            </Link>
          ) : (
            <button
              onClick={handlePublishWithRazorpay}
              disabled={saving || paying}
              className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {paying || saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <DollarSign size={14} />
              )}
              <span>Publish Article (${price})</span>
            </button>
          )}
        </div>
      </header>

      {/* Editor Body + Sidebar Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Editor & MetaSEO Area */}
        <div className="flex-1 h-full overflow-y-auto p-4 sm:p-8 no-scrollbar space-y-6 pb-24">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs sm:text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-700 flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {feedbackNote && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
              <strong className="font-semibold text-amber-800 flex items-center gap-1.5">
                <AlertCircle size={15} /> Editorial Note:
              </strong>
              <p className="leading-relaxed">{feedbackNote}</p>
            </div>
          )}

          {/* Clean TipTap Rich Editor (No marketing widgets for guest writers) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-2 sm:p-4">
            <Tiptap
              title={title}
              onTitleChange={handleTitleChange}
              content={content}
              onChange={setContent}
              hideWidgets={true}
            />
          </div>

          {/* MetaSEO Preview Component */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6">
            <MetaSEOPreview
              slug={slug}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              onSlugChange={setSlug}
              onMetaTitleChange={setMetaTitle}
              onMetaDescriptionChange={setMetaDescription}
              baseUrl="https://www.vaphers.com/blogs"
            />
          </div>
        </div>

        {/* Right Sidebar: Contributor Settings & Author Bio */}
        <aside className="w-full md:w-80 lg:w-96 border-l border-slate-200 bg-slate-50/50 p-6 overflow-y-auto space-y-6 shrink-0">
          {/* Instant Publication Card */}
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#2383e2] font-semibold text-xs uppercase tracking-wider">
              <Sparkles size={15} />
              <span>Instant Publishing</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Compose drafts for free. Click <strong>"Publish Article (${price})"</strong> to checkout securely with Razorpay and instantly go live on <strong>/blogs</strong> with permanent DoFollow backlinks.
            </p>
          </div>

          {/* Author Attribution Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User size={16} className="text-[#2383e2]" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Author Attribution
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Author Byline</span>
                <span className="font-semibold text-slate-800">
                  {profile?.name || user?.fullName || 'Individual Author'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Target Portfolio Backlink</span>
                {profile?.website ? (
                  <a
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                  >
                    <Globe size={11} />
                    <span>{profile.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                ) : (
                  <span className="text-amber-600 text-[11px]">No website URL set in profile</span>
                )}
              </div>

              {profile?.bio && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Author Bio Preview</span>
                  <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                    "{profile.bio}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Category Selector */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block border-b border-slate-100 pb-2">
              Primary Category
            </span>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Featured Cover Image
              </span>
              <span className="text-[10px] font-mono text-[#2383e2] bg-blue-50 px-1.5 py-0.5 rounded font-semibold">
                &lt; 200 KB
              </span>
            </div>

            {featuredImage ? (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200">
                <Image
                  src={featuredImage}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => setFeaturedImage('')}
                  className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-white rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <ImageIcon size={24} />
                <span className="text-xs font-medium">Upload Image (&lt;200 KB)</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </aside>
      </div>

      {/* Post-Linked Support Chat Modal */}
      {user && (
        <SupportChatModal
          isOpen={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
          userId={user.id}
          userName={profile?.name || user.fullName || user.firstName || 'Contributor'}
          userEmail={user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''}
          postId={submissionId || undefined}
          postTitle={title || 'Draft Article'}
          initialTopic={`Question regarding post: "${title || 'Draft Article'}"`}
        />
      )}

      {/* Instant Publishing Celebratory Modal */}
      {publishSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Article Published Live!</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Your payment was verified and your article is now live on Vaphers with your verified author attribution and permanent DoFollow backlinks.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href={`/blogs/${publishedLiveSlug}`}
                target="_blank"
                className="w-full py-3 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Live Article &rarr;</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => {
                  setPublishSuccessModalOpen(false);
                  router.push('/write-for-us/dashboard');
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

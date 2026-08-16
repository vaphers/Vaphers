'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Tiptap from '../Admin Components/Editor';
import MetaSEOPreview from '../Admin Components/MetaSEOPreview';
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
  User as UserIcon,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Edit,
} from 'lucide-react';
import WriterProfileModal from './WriterProfileModal';

const CATEGORIES = [
  'Digital Marketing',
  'Search Engine Optimization (SEO)',
  'Web Development & Next.js',
  'Conversion Rate Optimization (CRO)',
  'AI in Marketing & Tech',
  'Software Architecture',
  'PPC Advertising',
  'Content Marketing',
];

type Props = {
  submissionId?: string;
};

export default function GuestEditor({ submissionId }: Props) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [profile, setProfile] = useState<{ name: string; bio: string; website: string } | null>(null);

  // Editor states matching Admin Panel
  const [title, setTitle] = useState('Add a spectacular title...');
  const [content, setContent] = useState('<p>Start typing your guest article...</p>');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'pending' | 'needs_revision' | 'approved'>('draft');

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) {
      router.push('/write-for-us/login');
      return;
    }

    const loadData = async () => {
      const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '';
      const fallbackName = user.fullName || user.firstName || primaryEmail.split('@')[0] || 'Contributor';

      // 1. Fetch Writer Profile
      try {
        const profRes = await fetch(`/api/guest/profile?uid=${user.id}`);
        const profData = await profRes.json();
        const p = profData.profile || profData.writer;
        if (p) {
          setProfile({
            name: p.name || fallbackName,
            bio: p.bio || '',
            website: p.website || '',
          });
        } else {
          setProfile({
            name: fallbackName,
            bio: '',
            website: '',
          });
        }
      } catch (err) {
        console.error('Error fetching profile in editor:', err);
      }

      // 2. Fetch Existing Submission if ID provided
      if (submissionId) {
        try {
          const res = await fetch(`/api/guest/submissions/${submissionId}?authorId=${user.id}`);
          const data = await res.json();
          if (data.submission) {
            const sub = data.submission;
            setTitle(sub.title || 'Add a spectacular title...');
            setContent(sub.contentHtml || '<p>Start typing your guest article...</p>');
            setSlug(sub.slug || '');
            setMetaTitle(sub.metaTitle || '');
            setMetaDescription(sub.metaDescription || '');
            setCategory(sub.categories?.[0] || CATEGORIES[0]);
            setFeaturedImage(sub.featuredImage || null);
            setFeedbackNote(sub.feedbackNote || null);
            setSubmissionStatus(sub.status || 'draft');
          }
        } catch (err) {
          console.error('Error loading draft for editing:', err);
        }
      }
      setInitialLoading(false);
    };

    loadData();
  }, [isLoaded, isSignedIn, user, submissionId, router]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!submissionId && (!slug || slug === '')) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      alert(`⚠️ Image size exceeds 200 KB limit (${(file.size / 1024).toFixed(1)} KB). Please compress before uploading.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFeaturedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (targetStatus: 'draft' | 'pending') => {
    if (!user) return;

    if (!title || title === 'Add a spectacular title...' || title === 'Untitled' || !title.trim()) {
      setError('Please enter a valid title for your guest article.');
      return;
    }

    if (!content || content === '<p></p>' || content.trim() === '') {
      setError('Please add body content to your post.');
      return;
    }

    const effectiveSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    setError(null);
    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
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
        status: targetStatus,
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

      setSuccessMsg(
        targetStatus === 'pending'
          ? 'Article successfully submitted for editorial peer review!'
          : 'Draft saved successfully!'
      );

      setTimeout(() => {
        router.push('/write-for-us/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to submit article');
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2383e2]" />
          <span className="text-sm font-medium">Loading full contributor editor...</span>
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
            {submissionStatus === 'needs_revision' && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Action Needed
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('pending')}
            disabled={saving}
            className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            <span>Submit for Review</span>
          </button>
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

          {feedbackNote && submissionStatus === 'needs_revision' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-900 space-y-1">
              <strong className="font-semibold text-indigo-800 flex items-center gap-1.5">
                <AlertCircle size={15} /> Editorial Revision Note:
              </strong>
              <p className="leading-relaxed">{feedbackNote}</p>
            </div>
          )}

          {/* Same Admin TipTap Rich Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-2 sm:p-4">
            <Tiptap
              title={title}
              onTitleChange={handleTitleChange}
              content={content}
              onChange={setContent}
            />
          </div>

          {/* Same Admin MetaSEO Preview Component */}
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
          {/* Author Attribution Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Author Attribution
              </span>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="text-xs text-[#2383e2] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit size={12} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shrink-0">
                {profile?.name ? profile.name[0].toUpperCase() : 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-slate-900 truncate">
                  {profile?.name || 'Author Name'}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                  {profile?.bio || 'No author bio set yet. Click "Edit Profile" to add one.'}
                </p>
                {profile?.website && (
                  <span className="text-[11px] text-blue-600 truncate block mt-1">
                    {profile.website}
                  </span>
                )}
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-tight flex items-start gap-1.5">
              <ShieldAlert size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Author name must be an individual person's name, not a company or brand name.
              </span>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Featured Cover Image (&lt; 200 KB)
            </label>

            {featuredImage ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
                <img
                  src={featuredImage}
                  alt="Featured cover preview"
                  className="w-full aspect-[16/9] object-cover"
                />
                <button
                  onClick={() => setFeaturedImage(null)}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded text-[11px] font-semibold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-700">Upload Header Image</span>
                  <span className="text-[11px] text-slate-400">Strictly under 200 KB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Post Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer font-medium"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </aside>
      </div>

      {/* Author Profile Settings Modal */}
      {user && (
        <WriterProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          uid={user.id}
          initialName={profile?.name || user.fullName || user.firstName || ''}
          initialBio={profile?.bio || ''}
          initialWebsite={profile?.website || ''}
          onProfileUpdated={(updated) => setProfile(updated)}
        />
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Loader2,
  User,
  Globe,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Image as ImageIcon,
  Send,
} from 'lucide-react';
import Tiptap from '@/PageComponents/Admin Components/Editor';
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import AdminLoader from '../../../Components/AdminLoader';

const AVAILABLE_CATEGORIES = [
  'Marketing',
  'Technical SEO',
  'Engineering',
  'Design & UI',
  'Growth Strategy',
  'AI & Automation',
  'Content Marketing',
];

export default function AdminEditGuestPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submission, setSubmission] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categories, setCategories] = useState<string[]>(['Marketing']);
  const [feedbackNote, setFeedbackNote] = useState('');

  const fetchSubmission = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/guest-posts/${id}`);
      const data = await res.json();
      if (data.submission) {
        const s = data.submission;
        setSubmission(s);
        setTitle(s.title || '');
        setSlug(s.slug || '');
        setContent(s.contentHtml || '');
        setMetaTitle(s.metaTitle || s.title || '');
        setMetaDescription(s.metaDescription || '');
        setFeaturedImage(s.featuredImage || '');
        setCategories(s.categories || ['Marketing']);
        setFeedbackNote(s.feedbackNote || '');
      }
    } catch (err) {
      console.error('Failed to load submission:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const handleSave = async (action: 'save_only' | 'approve' | 'request_revision' | 'reject') => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/guest-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          title,
          slug,
          contentHtml: content,
          metaTitle,
          metaDescription,
          featuredImage,
          categories,
          feedbackNote,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update submission');

      if (action === 'approve') {
        alert('Success! Guest post approved and published live to /blogs.');
        router.push('/admin-dashboard/guest-posts');
      } else {
        alert(
          action === 'save_only'
            ? 'Changes saved successfully.'
            : action === 'request_revision'
            ? 'Revision request sent to author.'
            : 'Submission rejected.'
        );
        fetchSubmission();
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLoader message="Loading article in editor..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-16 montserrat-regular flex flex-col">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      `,
        }}
      />

      {/* Sticky Action Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin-dashboard/guest-posts"
            className="p-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-3">
            <h1
              className="text-xl tracking-tight text-slate-900 leading-none font-normal"
              style={{ fontFamily: '"Bungee Shade", cursive' }}
            >
              V<span className="text-[#2383e2]">aphers</span>
            </h1>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-3">
              Editorial Studio &bull; Guest Post Editor
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSave('save_only')}
            disabled={saving}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span>Save Changes</span>
          </button>

          <button
            onClick={() => handleSave('request_revision')}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs montserrat-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <span>Request Revision</span>
          </button>

          <button
            onClick={() => handleSave('approve')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
            <span>Approve &amp; Publish to /blogs</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 w-full px-4 md:px-8 flex flex-col lg:flex-row gap-6">
        {/* Left Side: Rich Editor & SEO Preview */}
        <div className="flex-1 space-y-6">
          {/* TipTap Full Rich Editor (with Widgets enabled for Admin) */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-4 sm:p-6">
            <Tiptap
              title={title}
              onTitleChange={handleTitleChange}
              content={content}
              onChange={setContent}
              hideWidgets={false}
            />
          </div>

          {/* Meta SEO Preview */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-6">
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

        {/* Right Sidebar: Article Metadata & Author Inspector */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          {/* Author Attribution Card */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <User size={15} className="text-[#2383e2]" />
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Contributor Attribution
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">Author Name</span>
                <span className="font-medium text-slate-900">
                  {submission?.authorName || 'Guest Writer'}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[11px]">Author Email</span>
                <span className="font-mono text-slate-600 text-[11px]">
                  {submission?.authorEmail || 'N/A'}
                </span>
              </div>

              {submission?.authorWebsite && (
                <div>
                  <span className="text-gray-400 block text-[11px]">Backlink Website</span>
                  <a
                    href={
                      submission.authorWebsite.startsWith('http')
                        ? submission.authorWebsite
                        : `https://${submission.authorWebsite}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                  >
                    <Globe size={11} />
                    <span>{submission.authorWebsite.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              )}

              {submission?.authorBio && (
                <div>
                  <span className="text-gray-400 block text-[11px]">Author Bio</span>
                  <p className="text-slate-600 italic bg-gray-50 p-2 rounded border border-gray-100">
                    "{submission.authorBio}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Publishing Category Selector */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block border-b border-gray-100 pb-2">
              Primary Category
            </span>
            <div className="space-y-1.5">
              {AVAILABLE_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-1.5 rounded hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={categories.includes(cat)}
                    onChange={() => setCategories([cat])}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Editorial Notes to Contributor */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block border-b border-gray-100 pb-2">
              Editorial Notes / Feedback
            </span>
            <textarea
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="Leave revision guidelines for author..."
              rows={4}
              className="w-full p-2.5 text-xs border border-gray-300 rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 font-normal"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

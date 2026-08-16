'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Edit,
  ExternalLink,
  Search,
  RefreshCw,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Sliders,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

type Blog = {
  id: string;
  title: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  categories?: string[];
  contentHtml?: string;
  status?: string;
  createdAt?: any;
};

type SeoAuditResult = {
  post: Blog;
  score: number; // 0 to 100
  issues: {
    type: 'critical' | 'warning' | 'good';
    message: string;
    field: string;
  }[];
  wordCount: number;
  hasMetaTitle: boolean;
  hasMetaDesc: boolean;
  hasFeaturedImg: boolean;
  hasCategory: boolean;
};

export default function SeoHealthPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'perfect'>('all');

  const fetchBlogs = () => {
    setLoading(true);
    fetch('/api/blogs?limit=500&includeAll=true')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Compute SEO audit for every blog
  const auditResults: SeoAuditResult[] = useMemo(() => {
    return blogs.map((post) => {
      const issues: SeoAuditResult['issues'] = [];
      let score = 100;

      // 1. Meta Title Check
      const metaTitle = post.metaTitle || post.title || '';
      const hasMetaTitle = Boolean(post.metaTitle);
      if (!post.metaTitle) {
        issues.push({
          type: 'warning',
          message: 'Missing custom Meta Title (using default title)',
          field: 'metaTitle',
        });
        score -= 10;
      } else if (metaTitle.length < 30) {
        issues.push({
          type: 'warning',
          message: `Meta title is short (${metaTitle.length} chars, ideal is 40-60)`,
          field: 'metaTitle',
        });
        score -= 5;
      } else if (metaTitle.length > 65) {
        issues.push({
          type: 'warning',
          message: `Meta title may truncate on Google (${metaTitle.length} chars, max 60 recommended)`,
          field: 'metaTitle',
        });
        score -= 5;
      }

      // 2. Meta Description Check
      const metaDesc = post.metaDescription || '';
      const hasMetaDesc = Boolean(post.metaDescription && post.metaDescription.trim().length > 0);
      if (!hasMetaDesc) {
        issues.push({
          type: 'critical',
          message: 'Missing Meta Description (hurts Google CTR & ranking snippet)',
          field: 'metaDescription',
        });
        score -= 25;
      } else if (metaDesc.length < 60) {
        issues.push({
          type: 'warning',
          message: `Meta description is too short (${metaDesc.length} chars, ideal is 120-160)`,
          field: 'metaDescription',
        });
        score -= 10;
      } else if (metaDesc.length > 165) {
        issues.push({
          type: 'warning',
          message: `Meta description is too long (${metaDesc.length} chars, may truncate on SERP)`,
          field: 'metaDescription',
        });
        score -= 5;
      }

      // 3. Featured Image Check
      const hasFeaturedImg = Boolean(post.featuredImage);
      if (!hasFeaturedImg) {
        issues.push({
          type: 'critical',
          message: 'Missing Featured Image (harms social shares & Google Discover)',
          field: 'featuredImage',
        });
        score -= 20;
      }

      // 4. Categories Check
      const hasCategory = Boolean(post.categories && post.categories.length > 0);
      if (!hasCategory) {
        issues.push({
          type: 'warning',
          message: 'No category assigned (weakens site internal taxonomy)',
          field: 'categories',
        });
        score -= 10;
      }

      // 5. Word Count Check
      const rawText = (post.contentHtml || '').replace(/<[^>]*>?/gm, ' ');
      const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount < 400) {
        issues.push({
          type: 'critical',
          message: `Thin content (${wordCount} words). Google favors in-depth 800+ word guides.`,
          field: 'contentHtml',
        });
        score -= 25;
      } else if (wordCount < 750) {
        issues.push({
          type: 'warning',
          message: `Moderate length (${wordCount} words). Consider adding more examples or FAQs.`,
          field: 'contentHtml',
        });
        score -= 10;
      }

      const finalScore = Math.max(0, Math.min(100, score));

      if (issues.length === 0) {
        issues.push({
          type: 'good',
          message: 'All on-page SEO parameters are optimal!',
          field: 'all',
        });
      }

      return {
        post,
        score: finalScore,
        issues,
        wordCount,
        hasMetaTitle,
        hasMetaDesc,
        hasFeaturedImg,
        hasCategory,
      };
    });
  }, [blogs]);

  // Overall Site Health Score
  const aggregateScore = useMemo(() => {
    if (auditResults.length === 0) return 0;
    const total = auditResults.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(total / auditResults.length);
  }, [auditResults]);

  const criticalIssuesCount = useMemo(() => {
    return auditResults.reduce(
      (acc, curr) => acc + curr.issues.filter((i) => i.type === 'critical').length,
      0
    );
  }, [auditResults]);

  const missingMetaDescCount = useMemo(() => {
    return auditResults.filter((r) => !r.hasMetaDesc).length;
  }, [auditResults]);

  const missingImageCount = useMemo(() => {
    return auditResults.filter((r) => !r.hasFeaturedImg).length;
  }, [auditResults]);

  // Filtered List
  const filteredResults = useMemo(() => {
    return auditResults.filter((item) => {
      const matchSearch = item.post.title.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;

      if (filterType === 'critical') {
        return item.issues.some((i) => i.type === 'critical');
      }
      if (filterType === 'warning') {
        return item.issues.some((i) => i.type === 'warning');
      }
      if (filterType === 'perfect') {
        return item.score >= 90;
      }
      return true;
    });
  }, [auditResults, search, filterType]);

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

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            SEO Health & Content Audit
          </span>
        </div>

        <button
          onClick={fetchBlogs}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          Re-Audit Articles
        </button>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Top KPI Scorecards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall SEO Score */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Overall SEO Health
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {aggregateScore}
                  <span className="text-lg font-bold text-slate-400">/100</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Across {blogs.length} indexed articles
              </p>
            </div>
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 ${
                aggregateScore >= 80
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                  : aggregateScore >= 60
                  ? 'border-amber-500 text-amber-600 bg-amber-50'
                  : 'border-red-500 text-red-600 bg-red-50'
              }`}
            >
              {aggregateScore}%
            </div>
          </div>

          {/* Critical Issues */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Critical Blockers
              </span>
              <div className="text-3xl font-extrabold text-red-600 mt-1">
                {criticalIssuesCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Requires immediate attention</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <XCircle size={24} />
            </div>
          </div>

          {/* Missing Meta Descriptions */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Missing Meta Descriptions
              </span>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">
                {missingMetaDescCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Affects search click-through</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText size={24} />
            </div>
          </div>

          {/* Missing Featured Images */}
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Missing Cover Images
              </span>
              <div className="text-3xl font-extrabold text-slate-800 mt-1">
                {missingImageCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Social cards & rich snippets</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ImageIcon size={24} />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-sm border border-slate-200 shadow-2xs">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audited articles by title..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm bg-slate-50/50 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Articles ({auditResults.length})
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                filterType === 'critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              }`}
            >
              Has Critical Issues
            </button>
            <button
              onClick={() => setFilterType('warning')}
              className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                filterType === 'warning'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Warnings
            </button>
            <button
              onClick={() => setFilterType('perfect')}
              className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                filterType === 'perfect'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              Score 90+
            </button>
          </div>
        </div>

        {/* Audit Results Table */}
        <div className="bg-white border border-slate-200 rounded-sm shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5 w-24">Score</th>
                  <th className="px-6 py-3.5">Post Title & Slug</th>
                  <th className="px-6 py-3.5 w-32">Words</th>
                  <th className="px-6 py-3.5">Detected SEO Diagnostics</th>
                  <th className="px-6 py-3.5 w-32 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 text-xs">
                      No blog posts match the selected SEO filters.
                    </td>
                  </tr>
                ) : (
                  filteredResults.map(({ post, score, issues, wordCount }) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Score Gauge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center justify-center w-11 h-11 rounded-lg font-extrabold text-sm border ${
                            score >= 80
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : score >= 60
                              ? 'bg-amber-50 border-amber-200 text-amber-700'
                              : 'bg-red-50 border-red-200 text-red-700'
                          }`}
                        >
                          {score}
                        </div>
                      </td>

                      {/* Post Title */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <Link
                            href={`/blogs/${post.slug || post.id}`}
                            target="_blank"
                            className="font-bold text-slate-900 hover:text-blue-600 text-sm line-clamp-1 flex items-center gap-1"
                          >
                            {post.title}
                            <ExternalLink size={12} className="shrink-0 text-slate-400" />
                          </Link>
                          <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                            /{post.slug || post.id}
                          </span>
                        </div>
                      </td>

                      {/* Words */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold font-mono ${
                            wordCount < 400
                              ? 'text-red-600 font-bold'
                              : wordCount < 750
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {wordCount} words
                        </span>
                      </td>

                      {/* Issues / Diagnostics */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 max-w-lg">
                          {issues.map((iss, idx) => (
                            <div
                              key={idx}
                              className={`text-xs flex items-center gap-1.5 ${
                                iss.type === 'critical'
                                  ? 'text-red-700 font-medium'
                                  : iss.type === 'warning'
                                  ? 'text-amber-700'
                                  : 'text-emerald-700 font-medium'
                              }`}
                            >
                              {iss.type === 'critical' && (
                                <XCircle size={13} className="shrink-0 text-red-600" />
                              )}
                              {iss.type === 'warning' && (
                                <AlertTriangle size={13} className="shrink-0 text-amber-600" />
                              )}
                              {iss.type === 'good' && (
                                <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
                              )}
                              <span>{iss.message}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/admin-dashboard/edit-post/${post.slug || post.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors"
                        >
                          <Edit size={12} />
                          Fix in Editor
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

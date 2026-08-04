"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { ChevronRight, ChevronLeft, Search, Sparkles, Folder, ArrowRight, Compass, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";

type Blog = {
  id: string;
  slug: string;
  title: string;
  featuredImage?: string | null;
  categories: string[];
  metaDescription: string;
  createdAt?: any;
  authorName?: string;
};

const BLOGS_PER_PAGE = 9;

type InteriorBlogListProps = {
  initialBlogs: Blog[];
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function formatDate(createdAt: any) {
  if (!createdAt) return "Recent";
  let date: Date | null = null;
  if (typeof createdAt === "string" || typeof createdAt === "number") {
    date = new Date(createdAt);
  } else if (createdAt?._seconds) {
    date = new Date(createdAt._seconds * 1000);
  }
  if (!date || isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse h-full flex flex-col shadow-xs">
      <div className="aspect-video bg-slate-200 w-full" />
      <div className="p-5 flex-1 flex flex-col space-y-3">
        <div className="h-4 w-20 bg-slate-200 rounded-md" />
        <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
        <div className="h-4 w-full bg-slate-100 rounded-md" />
        <div className="h-4 w-2/3 bg-slate-100 rounded-md" />
      </div>
    </div>
  );
}

export default function InteriorBlogList({ initialBlogs = [] }: InteriorBlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const searchLower = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        blog.title?.toLowerCase().includes(searchLower) ||
        blog.metaDescription?.toLowerCase().includes(searchLower);

      const matchesCategory =
        categoryFilter === "all" ||
        blog.categories?.includes(categoryFilter);

      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, debouncedSearch, categoryFilter]);

  const activeCategories = useMemo(() => {
    const countsMap = new Map<string, number>();

    initialBlogs.forEach((blog) => {
      if (blog.categories && Array.isArray(blog.categories)) {
        blog.categories.forEach((cat) => {
          const trimmed = cat.trim();
          if (trimmed) {
            countsMap.set(trimmed, (countsMap.get(trimmed) || 0) + 1);
          }
        });
      }
    });

    return Array.from(countsMap.entries())
      .filter(([_, count]) => count > 0)
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [initialBlogs]);

  useEffect(() => setPage(1), [debouncedSearch, categoryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  const heroBlog = page === 1 && paginatedBlogs.length > 0 ? paginatedBlogs[0] : null;
  const standardBlogs = heroBlog ? paginatedBlogs.slice(1) : paginatedBlogs;

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-b from-blue-700 via-blue-600 via-blue-100 to-slate-50 pt-24 pb-16 lg:pt-36 lg:pb-24 text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 xl:px-0 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Interior Design Marketing Insights</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white drop-shadow-sm bungee-shade leading-tight">
              Marketing for Interior Designers
            </h1>
            <p className="text-base sm:text-lg text-blue-50 font-medium max-w-2xl mx-auto leading-relaxed">
              Actionable guides, proven SEO strategies, and high-ticket client acquisition playbooks built exclusively for interior design studios.
            </p>

            {/* SEARCH INPUT */}
            <div className="relative max-w-2xl mx-auto mt-8 flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5 z-10 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search interior design marketing articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full bg-white text-gray-900 border-2 border-white/60 shadow-2xl focus:ring-4 focus:ring-blue-400/50 text-base w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto py-12 px-6 xl:px-0">
        {/* TOPIC FILTER TABS */}
        <div className="mb-12 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Filter by Topic</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-gray-900"
              }`}
            >
              All Articles ({initialBlogs.length})
            </button>
            {activeCategories.map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-gray-900"
                }`}
              >
                {cat} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        {paginatedBlogs.length === 0 ? (
          filteredBlogs.length === 0 && initialBlogs.length > 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <Search className="w-14 h-14 text-slate-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">No articles found</h3>
              <p className="text-gray-500 text-sm mt-1">Try searching another keyword or clearing your topic filter.</p>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <Palette className="w-14 h-14 text-blue-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">No interior design marketing blogs published yet</h3>
              <p className="text-gray-500 text-sm mt-1">Stay tuned! Exciting growth strategies and articles are on the way.</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* HERO FEATURED CARD */}
            {heroBlog && (
              <Link
                href={`/interior-design-marketing/${heroBlog.slug}`}
                key={heroBlog.id}
                className="group block col-span-1 sm:col-span-2 lg:col-span-2 focus:outline-none"
              >
                <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden h-full flex flex-col md:flex-row hover:border-blue-400/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-gradient-to-br from-white via-blue-50/20 to-slate-50 border-b md:border-b-0 md:border-r border-slate-200/80">
                    <div>
                      <div className="mb-4 flex items-center gap-2 flex-wrap">
                        {heroBlog.categories?.slice(0, 2).map((cat) => (
                          <span key={cat} className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 border border-blue-200/80 text-[10px] font-bold tracking-widest uppercase rounded-md">
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors mb-3">
                        {heroBlog.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
                        {heroBlog.metaDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-gray-500 font-semibold">
                      <span>{formatDate(heroBlog.createdAt)}</span>
                      <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                  {heroBlog.featuredImage && (
                    <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-slate-100 min-h-[260px]">
                      <img
                        src={heroBlog.featuredImage}
                        alt={heroBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </Link>
            )}

            {/* STANDARD CARDS */}
            {standardBlogs.map((blog) => (
              <Link
                href={`/interior-design-marketing/${blog.slug}`}
                key={blog.id}
                className="group flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-400/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none"
              >
                {blog.featuredImage ? (
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                    <Compass className="w-12 h-12 opacity-80" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {blog.categories?.slice(0, 2).map((cat) => (
                        <span key={cat} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold tracking-wider uppercase rounded-sm">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {blog.metaDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => goToPage(num)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition ${
                  page === num
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

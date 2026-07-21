"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ChevronRight, ChevronLeft, Search, HelpCircle, Folder, Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import QuestionThumbnail from "./QuestionThumbnail";

type CommonQuestion = {
  id: string;
  slug: string;
  title: string;
  featuredImage?: string | null;
  categories: string[];
  metaDescription: string;
  createdAt?: any;
};

type CommonQuestionsListProps = {
  initialQuestions: CommonQuestion[];
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
  if (createdAt._seconds) {
    date = new Date(createdAt._seconds * 1000);
  } else if (createdAt.seconds) {
    date = new Date(createdAt.seconds * 1000);
  } else if (typeof createdAt === "string" || typeof createdAt === "number") {
    date = new Date(createdAt);
  }
  if (!date || isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommonQuestionsList({ initialQuestions }: CommonQuestionsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categoryPages, setCategoryPages] = useState<Record<string, number>>({});

  const debouncedSearch = useDebounce(searchQuery, 300);

  const setCategoryPage = (categoryName: string, newPage: number) => {
    setCategoryPages((prev) => ({
      ...prev,
      [categoryName]: newPage,
    }));
  };

  // Filter questions based on search & selected category
  const filteredQuestions = useMemo(() => {
    return initialQuestions.filter((item) => {
      const searchLower = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        item.title.toLowerCase().includes(searchLower) ||
        item.metaDescription.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "all" ||
        item.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [initialQuestions, debouncedSearch, selectedCategory]);

  // Group filtered questions by category
  const groupedCategories = useMemo(() => {
    const map = new Map<string, CommonQuestion[]>();

    filteredQuestions.forEach((q) => {
      const cats = q.categories && q.categories.length > 0 ? q.categories : ["General Questions"];
      cats.forEach((cat) => {
        if (selectedCategory !== "all" && cat !== selectedCategory) return;
        if (!map.has(cat)) map.set(cat, []);
        const list = map.get(cat)!;
        if (!list.some((existing) => existing.id === q.id)) {
          list.push(q);
        }
      });
    });

    return Array.from(map.entries());
  }, [filteredQuestions, selectedCategory]);

  // Extract all unique categories present in the dataset
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    initialQuestions.forEach((q) => {
      if (q.categories && q.categories.length > 0) {
        q.categories.forEach((c) => set.add(c));
      } else {
        set.add("General Questions");
      }
    });
    return Array.from(set).sort();
  }, [initialQuestions]);

  return (
    <div className="min-h-screen bg-slate-50/50 lg:-mt-40">
      {/* HERO SECTION WITH DYNAMIC GRADIENTS & AMBIENT GLOW */}
      <section className="bg-gradient-to-b from-blue-700 via-blue-600 via-blue-100 to-slate-50 pt-24 pb-16 lg:pt-48 lg:pb-24 text-white relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 xl:px-0 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Expert Knowledge Base</span>
            </div> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white drop-shadow-sm bungee-shade leading-tight">
              Common Questions Answered
            </h1>
            <p className="text-base sm:text-lg text-blue-50 font-medium max-w-2xl mx-auto leading-relaxed">
              Discover clear, data-backed solutions and expert answers on SEO, PPC marketing, web development, and growth strategies.
            </p>

            {/* SEARCH INPUT WITH GLASSMORPHISM SHADOW */}
            <div className="relative max-w-2xl mx-auto mt-8 flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5 z-10 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search common questions & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full bg-white text-gray-900 border-2 border-white/60 shadow-2xl focus:ring-4 focus:ring-blue-400/50 text-base w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto py-12 px-6 xl:px-0">
        {/* CATEGORY FILTER PILLS */}
        {allCategories.length > 0 && (
          <div className="mb-12 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Folder className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Browse by Topic</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-gray-900"
                }`}
              >
                All Categories ({initialQuestions.length})
              </button>
              {allCategories.map((cat) => {
                const count = initialQuestions.filter((q) =>
                  q.categories?.includes(cat) || (cat === "General Questions" && (!q.categories || q.categories.length === 0))
                ).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-gray-900"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GROUPED QUESTIONS BY CATEGORY */}
        {groupedCategories.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <HelpCircle className="w-14 h-14 text-slate-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">No answered questions found</h3>
            <p className="text-gray-500 text-sm mt-1">Try broadening your search query or choosing another topic category.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {groupedCategories.map(([categoryName, questions]) => {
              const currentPage = categoryPages[categoryName] || 0;
              const pageSize = 5;
              const totalPages = Math.ceil(questions.length / pageSize);
              const currentQuestions = questions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

              const heroQuestion = currentPage === 0 && currentQuestions.length > 0 ? currentQuestions[0] : null;
              const standardQuestions = heroQuestion ? currentQuestions.slice(1) : currentQuestions;

              return (
                <section key={categoryName} id={categoryName.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                  {/* CATEGORY HEADER BAR WITH NEXT/PREV ARROWS */}
                  <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-blue-600">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-md shadow-xs" />
                      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight montserrat-bold">
                        {categoryName}
                      </h2>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200">
                        {questions.length} {questions.length === 1 ? "Question" : "Questions"}
                      </span>
                    </div>

                    {/* SLIDE ARROW BUTTONS (< and >) */}
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-semibold tracking-wider mr-1 hidden sm:inline">
                          Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCategoryPage(categoryName, currentPage - 1)}
                          disabled={currentPage === 0}
                          className="w-8.5 h-8.5 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xs cursor-pointer"
                          aria-label="Previous questions"
                          title="Previous page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCategoryPage(categoryName, currentPage + 1)}
                          disabled={currentPage >= totalPages - 1}
                          className="w-8.5 h-8.5 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xs cursor-pointer"
                          aria-label="Next questions"
                          title="Next page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* MISTRAL AI STYLE GRID CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* FEATURED WIDE HERO CARD (First Item on Page 0) */}
                    {heroQuestion && (
                      <Link
                        href={`/common-questions/${heroQuestion.slug}`}
                        key={heroQuestion.id}
                        className="group block col-span-1 sm:col-span-2 lg:col-span-2 focus:outline-none"
                      >
                        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden h-full flex flex-col md:flex-row hover:border-blue-400/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          {/* LEFT CONTENT AREA */}
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-gradient-to-br from-white via-blue-50/20 to-slate-50 border-b md:border-b-0 md:border-r border-slate-200/80">
                            <div>
                              <div className="mb-4 flex items-center gap-2">
                                <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 border border-blue-200/80 text-[10px] font-bold tracking-widest uppercase rounded-md">
                                  {heroQuestion.categories?.[0] || "FEATURED"}
                                </span>
                              </div>

                              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 leading-snug group-hover:text-blue-600 transition-colors mb-3 font-sans">
                                {heroQuestion.title}
                              </h3>

                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                                {heroQuestion.metaDescription}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-gray-500 font-semibold">
                              <span>{formatDate(heroQuestion.createdAt)}</span>
                              <span>By Vaphers</span>
                              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center shadow-xs">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>

                          {/* RIGHT THUMBNAIL (Vibrant Blue 600 Procedural Art) */}
                          <div className="w-full md:w-1/2 aspect-video md:aspect-auto shrink-0 overflow-hidden">
                            <QuestionThumbnail
                              title={heroQuestion.title}
                              slug={heroQuestion.slug}
                              featuredImage={heroQuestion.featuredImage}
                              aspectRatio="aspect-full"
                              className="h-full"
                            />
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* STANDARD 1-COLUMN CARDS */}
                    {standardQuestions.map((q) => (
                      <Link
                        href={`/common-questions/${q.slug}`}
                        key={q.id}
                        className="group block h-full focus:outline-none"
                      >
                        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden h-full flex flex-col hover:border-blue-400/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          {/* TOP THUMBNAIL */}
                          <div className="border-b border-slate-200/80">
                            <QuestionThumbnail
                              title={q.title}
                              slug={q.slug}
                              featuredImage={q.featuredImage}
                              aspectRatio="aspect-[16/9]"
                            />
                          </div>

                          {/* MIDDLE CONTENT AREA */}
                          <div className="p-5 flex-1 flex flex-col bg-white">
                            <div className="mb-3">
                              <span className="inline-block px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold tracking-widest uppercase rounded-md">
                                {q.categories?.[0] || "GENERAL"}
                              </span>
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 font-sans">
                              {q.title}
                            </h3>

                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-6 flex-1 font-normal">
                              {q.metaDescription}
                            </p>
                          </div>

                          {/* MISTRAL BOTTOM FOOTER BAR */}
                          <div className="bg-slate-50/80 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                            <span>{formatDate(q.createdAt)}</span>
                            <span>By Vaphers</span>
                            <div className="w-7 h-7 border border-slate-200 bg-white rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-xs">
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

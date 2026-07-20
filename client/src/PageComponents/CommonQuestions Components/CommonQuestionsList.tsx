"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight, Search, HelpCircle, Sparkles, Folder } from "lucide-react";
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

export default function CommonQuestionsList({ initialQuestions }: CommonQuestionsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const debouncedSearch = useDebounce(searchQuery, 300);

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
        // Prevent duplicate cards within the same category array
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
    <div className="min-h-screen bg-white lg:-mt-40">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-600 via-blue-500 via-blue-100 to-white pt-24 pb-16 lg:pt-48 lg:pb-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 xl:px-0 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-blue-200" />
              <span>Knowledge Base & FAQs</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm montserrat-bold">
              Common Questions Answered
            </h1>
            <p className="text-base sm:text-lg text-blue-50 font-medium max-w-2xl mx-auto">
              Clear, expert answers to the most frequently asked questions about digital marketing, SEO, PPC, and web development.
            </p>

            {/* SEARCH INPUT */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search common questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full bg-white text-gray-900 border-none shadow-xl focus:ring-2 focus:ring-blue-400 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto py-12 px-6 xl:px-0">
        {/* CATEGORY FILTER PILLS */}
        {allCategories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Folder className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Browse by Category</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">No answered questions found</h3>
            <p className="text-gray-500 text-sm mt-1">Try broadening your search query or choosing a different category.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {groupedCategories.map(([categoryName, questions]) => (
              <section key={categoryName} id={categoryName.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <div className="flex items-center gap-3 pb-4 mb-8 border-b-2 border-blue-600">
                  <div className="w-3 h-8 bg-blue-600 rounded-full" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight montserrat-bold">
                    {categoryName}
                  </h2>
                  <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {questions.length} {questions.length === 1 ? "Question" : "Questions"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {questions.map((q) => (
                    <Link
                      href={`/common-questions/${q.slug}`}
                      key={q.id}
                      className="group block h-full focus:outline-none"
                    >
                      <Card className="shadow-xs hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 hover:border-blue-300 overflow-hidden h-full flex flex-col bg-white">
                        <CardHeader className="p-0">
                          <QuestionThumbnail
                            title={q.title}
                            slug={q.slug}
                            featuredImage={q.featuredImage}
                            category={q.categories?.[0]}
                          />
                        </CardHeader>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {q.categories?.map((c) => (
                              <Badge key={c} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs">
                                {c}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
                            {q.title}
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                            {q.metaDescription}
                          </p>

                          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                            <span>Read Full Answer</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

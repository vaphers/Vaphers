"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const customCategories = [
  "Blog", "SEO", "Paid Media", "Social", "Programming", 
  "React JS", "How To", "Beginner Guides", "Myth Busting", 
  "Case Studies", "Tips & Tricks",
];

type Blog = {
  id: string;
  slug: string;
  title: string;
  featuredImage?: string | null;
  categories: string[];
  metaDescription: string;
  createdAt?: any;
};

const BLOGS_PER_PAGE = 9;

type BlogListProps = {
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

function BlogCardSkeleton() {
  return (
    <Card className="animate-pulse shadow-none overflow-hidden rounded-lg border pt-0 h-full">
      <CardHeader className="p-0">
        <div className="aspect-video bg-blue-100 w-full border-b" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-6 w-20 bg-blue-200 rounded-full mb-4" />
        <div className="h-6 w-44 bg-blue-200 rounded mb-3" />
        <div className="h-4 w-full bg-blue-100 rounded mb-2" />
        <div className="h-4 w-3/4 bg-blue-50 rounded" />
      </CardContent>
    </Card>
  );
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const searchLower = debouncedSearch.toLowerCase().trim();
      const matchesSearch = 
        !searchLower ||
        blog.title.toLowerCase().includes(searchLower) ||
        blog.metaDescription.toLowerCase().includes(searchLower);
        
      const matchesCategory = 
        categoryFilter === "all" || 
        blog.categories.includes(categoryFilter);
        
      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, debouncedSearch, categoryFilter]);

  useEffect(() => setPage(1), [debouncedSearch, categoryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background lg:-mt-40">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:pb-18 lg:pt-45">
        <div className="max-w-7xl mx-auto px-6 xl:px-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-blue-600 bungee-inline-regular">
              Explore Our Articles
            </h1>
            <p className="text-lg text-gray-600">Discover insights, tips, and stories from our experts</p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{categoryFilter === "all" ? "All Categories" : categoryFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {customCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {paginatedBlogs.length === 0 ? (
          filteredBlogs.length === 0 && initialBlogs.length > 0 ? (
            <div className="text-center py-20 text-gray-500">
              No articles found matching your criteria.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(9).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          )
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog, index) => (
              <Link 
                href={`/blogs/${blog.slug}`} 
                key={blog.id} 
                className="group/blog-container block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                <Card className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-200 pt-0 h-full flex flex-col group-hover/blog-container:border-blue-300">
                  <CardHeader className="p-0">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={800}
                        height={450}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={60}
                        priority={index < 3}
                        className="aspect-video w-full object-cover group-hover/blog-container:scale-[1.02] transition-transform duration-200"
                      />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 w-full border-b group-hover/blog-container:from-blue-200 group-hover/blog-container:to-indigo-200 transition-colors duration-200" />
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {blog.categories.slice(0, 3).map((cat) => (
                        <Badge key={cat} className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight leading-tight group-hover/blog-container:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                      {blog.metaDescription}
                    </p>
                    <div className="mt-auto">
                      <Button 
                        size="sm" 
                        tabIndex={-1}
                        className="shadow-none bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto transition-all duration-200 group-hover/blog-container:scale-[1.02] group-hover/blog-container:shadow-md"
                      >
                        Read more <ChevronRight className="w-4 h-4 ml-1 group-hover/blog-container:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {filteredBlogs.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center pt-12 gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="w-28 h-10"
            >
              Previous
            </Button>

            {/* Simplified safe pagination for performance */}
            <div className="text-sm font-medium px-4">
               Page {page} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="w-28 h-10"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}











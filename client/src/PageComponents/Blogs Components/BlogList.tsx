'use client';

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

// Your custom list of categories (can be any values you want)
const customCategories = [
  "Technology",
  "Design",
  "Blog",
  "testing category",
  "Lifestyle",
  "Programming",
  "DevOps",
  "Tutorial"
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

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/blogs?limit=${BLOGS_PER_PAGE}`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs || []);
        setFetchError(null);
      })
      .catch(err => {
        setFetchError("Failed to load blogs.");
        setBlogs([]);
      });
  }, [page]);

  // Filter blogs by search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      (blog.metaDescription || "").toLowerCase().includes(searchQuery.trim().toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || blog.categories.includes(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  // Paginate locally
  const paginatedBlogs = filteredBlogs.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);

  if (fetchError) {
    return <div className="text-center py-20 text-xl text-red-500">{fetchError}</div>;
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        No blogs found. Add blogs in Firestore or clear filters.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:-mt-40">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:pb-18 lg:pt-45">
        <div className="max-w-7xl mx-auto px-6 xl:px-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-blue-600 bungee-inline-regular">
              Explore Our Articles
            </h1>
            <p className="text-lg text-gray-600">
              Discover insights, tips, and stories from our experts
            </p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
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

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          {/* Category select with custom categories */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {categoryFilter === "all" ? "All Categories" : categoryFilter}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {customCategories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {paginatedBlogs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No blogs match your filter/search.</div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map(blog => (
            <Card
              key={blog.id}
              className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group pt-0"
              onClick={() => window.location.href = `/blogs/${blog.slug}`}
            >
              <CardHeader className="p-0">
                {blog.featuredImage ? (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-blue-100 w-full border-b" />
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  {blog.categories.map(cat => (
                    <Badge key={cat} className="bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                  {blog.metaDescription}
                </p>
                <Button
                  size="sm"
                  className="mt-6 shadow-none bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/blogs/${blog.slug}`;
                  }}
                >
                  Read more <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Shadcn Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => page > 1 && setPage(page - 1)}
                isActive={false}
              >
                Previous
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  page * BLOGS_PER_PAGE < filteredBlogs.length && setPage(page + 1)
                }
                isActive={false}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BlogList;

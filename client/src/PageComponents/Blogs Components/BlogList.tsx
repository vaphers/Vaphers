"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

// Custom categories
const customCategories = [
  "Technology", "Design", "Blog", "testing category", "Lifestyle", "Programming", "DevOps", "Tutorial"
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

// Skeleton loader component
function BlogListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: BLOGS_PER_PAGE }).map((_, i) => (
        <Card key={i} className="animate-pulse shadow-none overflow-hidden rounded-lg border pt-0">
          <CardHeader className="p-0">
            <div className="aspect-video bg-blue-100 w-full border-b" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-20 bg-blue-200 rounded-full" />
              <div className="h-4 w-12 bg-blue-50 rounded" />
            </div>
            <div className="h-6 w-44 bg-blue-200 rounded mb-3" />
            <div className="h-4 w-full bg-blue-100 rounded mb-2" />
            <div className="h-4 w-3/4 bg-blue-50 rounded mb-2" />
            <div className="h-10 w-24 bg-blue-200 rounded mt-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const BlogList = ({ initialBlogs }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs] = useState<Blog[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Client filtering (search and category), instant
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      (blog.metaDescription || "").toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || blog.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const paginatedBlogs = filteredBlogs.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);

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
        {paginatedBlogs.length === 0 ? (
          <BlogListSkeleton />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map(blog => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="block group">
                <Card className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group pt-0">
                  <CardHeader className="p-0">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={800}
                        height={450}
                        quality={60}
                        className="aspect-video w-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="aspect-video bg-blue-100 w-full border-b" />
                    )}
                  </CardHeader>
                  {/* <CardContent className="p-6">
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
                    <Link href={`/blogs/${blog.slug}`} passHref>
                      <Button
                        size="sm"
                        className="mt-6 shadow-none bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={e => e.stopPropagation()}
                      >
                        Read more <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent> */}
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
                      onClick={e => e.stopPropagation()}
                    >
                      Read more <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>

                </Card>
              </Link>
            ))}
          </div>
        )}
        {/* Shadcn Pagination */}
        <Pagination className="pt-8">
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

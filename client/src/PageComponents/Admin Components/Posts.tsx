'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

// Types
type Post = {
  id: string;
  title: string;
  featuredImage: string;
  authorId: string;
  categories: string[];
  slug?: string;
};

type Author = {
  id: string;
  name: string;
  avatar?: string;
};

type Category = {
  id: string;
  name: string;
};

const POSTS_PER_PAGE = 15;

const AdminPostsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch all data in parallel
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/blogs?limit=100').then(res => res.json()),
      fetch('/api/authors').then(res => res.json()),
      fetch('/api/categories').then(res => res.json()),
    ])
      .then(([blogData, authorData, categoryData]) => {
        setPosts(blogData.blogs || []);
        setAuthors(authorData || []);
        setCategories(categoryData || []);
        setLoading(false);
      });
  }, []);

  // Helper: get author name by id
  const getAuthorName = (authorId: string) => {
    if (!authorId) return "Unknown";
    const author = authors.find(a => String(a.id) === String(authorId));
    return author?.name || "Unknown";
  };

  // Filter posts by search and category
  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter(post =>
      selectedCategory === "all"
        ? true
        : post.categories.includes(selectedCategory)
    );

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // Skeleton loader rows
  const skeletonRows = Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
    <div key={i} className="grid grid-cols-[3rem_1fr_12rem_1fr] items-center px-6 py-2 border-b animate-pulse">
      <div className="h-10 w-10 rounded bg-blue-100" />
      <div className="pl-4 h-3 bg-blue-100 rounded w-1/2" />
      <div className="pl-4 h-3 bg-blue-100 rounded w-1/3" />
      <div className="flex gap-2 pl-4">
        <div className="h-3 w-12 bg-blue-100 rounded" />
        <div className="h-3 w-8 bg-blue-50 rounded" />
      </div>
    </div>
  ));

  // Page change handler
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle filter changes (reset page)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Posts</h1>
          <Link href="/add-posts">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Add Post
            </button>
          </Link>
        </div>
        <div className="mb-8 flex flex-wrap gap-3">
          <input
            type="search"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts by title..."
            className="w-full max-w-xs px-4 py-2 rounded shadow-inner border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full max-w-xs px-3 py-2 border rounded bg-white shadow-inner border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-md border">
          <div className="grid grid-cols-[3rem_1fr_12rem_1fr] items-center px-6 py-2 border-b font-semibold text-gray-600">
            <span>Image</span>
            <span>Title</span>
            <span>Author</span>
            <span>Categories</span>
          </div>
          {loading
            ? skeletonRows
            : paginatedPosts.map((post) => (
                <div key={post.id} className="grid grid-cols-[3rem_1fr_12rem_1fr] items-center px-6 py-2 border-b hover:bg-blue-50 transition">
                  {/* Thumbnail */}
                  <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded bg-gray-100">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover rounded" />
                    ) : (
                      <div className="text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  {/* Title (clickable) */}
                  <div className="pl-4">
                    <Link href={`/blogs/${post.slug || post.id}`}>
                      <span className="text-blue-700 font-medium hover:underline">{post.title}</span>
                    </Link>
                  </div>
                  {/* Author name */}
                  <div className="pl-4">
                    <span className="text-gray-800">{getAuthorName(post.authorId)}</span>
                  </div>
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 pl-4">
                    {post.categories.map(cat => (
                      <span
                        key={cat}
                        className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
        </div>
        {!loading && paginatedPosts.length === 0 && (
          <div className="mt-12 text-center text-gray-400 text-lg">
            No posts found.
          </div>
        )}

        {/* Pagination controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              &larr; Prev
            </button>
            <span className="px-4 py-1 bg-blue-50 rounded text-blue-900 font-semibold">
              {page} / {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostsPage;

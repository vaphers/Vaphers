'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Image as ImageIcon, ChevronLeft, ChevronRight, FileText, User, Edit } from "lucide-react";

type Post = {
  id: string;
  title: string;
  featuredImage: string;
  authorId: string;
  categories: string[];
  slug?: string;
};

type Author = { id: string; name: string; avatar?: string; };
type Category = { id: string; name: string; };

const POSTS_PER_PAGE = 15;

export default function AdminPostsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/blogs?limit=100').then((res) => res.json()),
      fetch('/api/authors').then((res) => res.json()),
      fetch('/api/categories').then((res) => res.json()),
    ])
      .then(([blogData, authorData, categoryData]) => {
        setPosts(blogData.blogs || []);
        setAuthors(authorData || []);
        setCategories(categoryData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      });
  }, []);

  const getAuthor = (authorId: string) => {
    if (!authorId) return { name: "Unknown", avatar: null };
    const author = authors.find((a) => String(a.id) === String(authorId));
    return author || { name: "Unknown", avatar: null };
  };

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase().trim()))
    .filter((post) => selectedCategory === "all" ? true : post.categories.includes(selectedCategory));

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const skeletonRows = Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="border-b border-gray-100 animate-pulse bg-white">
      <td className="px-6 py-4 whitespace-nowrap w-20"><div className="h-12 w-16 rounded-md bg-gray-200" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2" /><div className="h-3 bg-gray-100 rounded w-1/2" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-gray-200" /><div className="h-4 bg-gray-200 rounded w-24" /></div></td>
      <td className="px-6 py-4 whitespace-nowrap"><div className="flex gap-2"><div className="h-6 w-16 bg-gray-200 rounded-full" /><div className="h-6 w-20 bg-gray-100 rounded-full" /></div></td>
      <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-8 w-8 bg-gray-200 rounded-md inline-block" /></td>
    </tr>
  ));

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 py-10 font-sans">
      <div className="max-w-full mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-base text-gray-900 tracking-tight">Posts</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and organize your blog content.</p>
          </div>
          <Link href="/add-posts">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-xs font-medium hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
              <Plus size={18} /> Add New Post
            </button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 bg-white p-4 rounded-sm border border-gray-200 shadow-xs">
          <div className="relative flex-1 min-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search posts by title..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 0.75rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-sm  border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-24">Media</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Title & Details</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-56">Author</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-64">Categories</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? skeletonRows : paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post) => {
                    const author = getAuthor(post.authorId);
                    return (
                      <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-16 flex items-center justify-center overflow-hidden rounded-md bg-gray-100 border border-gray-200/60 shrink-0">
                            {post.featuredImage ? <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-400 w-5 h-5" />}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col justify-center">
                            <Link href={`/blogs/${post.slug || post.id}`} className="text-gray-900 font-semibold text-base hover:text-blue-600 hover:underline line-clamp-1 transition-colors">
                              {post.title}
                            </Link>
                            <span className="text-gray-400 text-xs mt-0.5 font-mono">/{post.slug || post.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {author.avatar ? <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" /> : <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200"><User size={14} className="text-blue-600" /></div>}
                            <span className="text-gray-700 font-medium text-sm">{author.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {post.categories.length > 0 ? post.categories.map((cat) => (
                                <span key={cat} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-white transition-colors">{cat}</span>
                              )) : <span className="text-gray-400 text-xs italic">Uncategorized</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link 
                            href={`/admin-dashboard/edit-post/${post.slug || post.id}`} 
                            className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-100 transition-colors inline-flex rounded-sm shadow-sm border border-transparent hover:border-blue-100"
                            title="Edit Post"
                          >
                            <Edit size={18} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No posts found</p>
                        <p className="text-sm">We couldn't find any posts matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!loading && filteredPosts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{(page - 1) * POSTS_PER_PAGE + 1}</span> to <span className="font-medium text-gray-900">{Math.min(page * POSTS_PER_PAGE, filteredPosts.length)}</span> of <span className="font-medium text-gray-900">{filteredPosts.length}</span> posts
              </span>
              <div className="flex items-center space-x-2">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 shadow-sm"><ChevronLeft size={16} /></button>
                <div className="px-3 py-1.5 text-sm font-medium text-gray-700">Page {page} of {totalPages}</div>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 shadow-sm"><ChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
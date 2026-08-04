'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  Edit,
  Trash2,
  Zap,
  Loader2,
  ExternalLink,
  Sparkles,
  Palette
} from 'lucide-react';
import { Fragment } from 'react';
import AdminLoader from '../../app/admin-dashboard/Components/AdminLoader';

type Post = {
  id: string;
  title: string;
  featuredImage?: string | null;
  authorId?: string;
  authorName?: string;
  categories?: string[];
  slug: string;
  createdAt?: string;
  metaDescription?: string;
};

type Author = { id: string; name: string; avatar?: string };
type Category = { id: string; name: string };

const POSTS_PER_PAGE = 15;

const defaultInteriorCategories = [
  'SEO for Interior Designers',
  'Interior Design Marketing',
  'Lead Generation',
  'High-Ticket Clients',
  'Instagram & Visuals',
  'Google Ads for Designers',
  'Portfolio & Website SEO',
  'Branding Strategies',
  'Local SEO',
  'Client Acquisition',
];

export default function InteriorPosts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultInteriorCategories);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // States for Delete and Quick Edit
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', slug: '', category: '', authorId: '' });

  const loadBlogs = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/interior-design-marketing/blogs?limit=100').then((res) => res.json()),
      fetch('/api/authors').then((res) => res.json()).catch(() => []),
      fetch('/api/categories').then((res) => res.json()).catch(() => []),
    ])
      .then(([blogData, authorData, categoryData]) => {
        setPosts(blogData.blogs || []);
        if (Array.isArray(authorData)) setAuthors(authorData);
        if (Array.isArray(categoryData) && categoryData.length > 0) {
          const apiCatNames = categoryData.map((c: any) => c.name);
          const merged = Array.from(new Set([...defaultInteriorCategories, ...apiCatNames]));
          setCategories(merged);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching interior admin data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const getAuthorName = (post: Post) => {
    if (post.authorName && post.authorName !== 'Unknown') return post.authorName;
    if (!post.authorId) return 'Vaphers Team';
    const author = authors.find((a) => String(a.id) === String(post.authorId));
    return author?.name || post.authorId || 'Vaphers Team';
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/interior-design-marketing/blogs/${postToDelete.slug || postToDelete.id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== postToDelete.id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting post');
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  const handleQuickEditSave = async () => {
    if (!postToEdit) return;
    setIsSavingEdit(true);
    try {
      const res = await fetch(
        `/api/interior-design-marketing/blogs/${postToEdit.slug || postToEdit.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editForm.title,
            slug: editForm.slug,
            authorId: editForm.authorId,
            categories: editForm.category ? [editForm.category] : [],
          }),
        }
      );
      if (res.ok) {
        setPosts(
          posts.map((p) => {
            if (p.id === postToEdit.id) {
              return {
                ...p,
                title: editForm.title,
                slug: editForm.slug,
                authorId: editForm.authorId,
                categories: editForm.category ? [editForm.category] : [],
              };
            }
            return p;
          })
        );
        setPostToEdit(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update post');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating post');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const filteredPosts = posts
    .filter((post) => post.title?.toLowerCase().includes(search.toLowerCase().trim()))
    .filter((post) =>
      selectedCategory === 'all' ? true : post.categories?.includes(selectedCategory)
    );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const skeletonRows = Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="border-b border-gray-100 animate-pulse bg-white">
      <td className="px-6 py-4 whitespace-nowrap w-20">
        <div className="h-12 w-16 rounded-md bg-gray-200" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="h-8 w-8 bg-gray-200 rounded-md inline-block" />
      </td>
    </tr>
  ));

  if (loading) {
    return <AdminLoader message="Loading Interior Design Marketing posts from MongoDB..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      `,
        }}
      />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:inline border-l border-slate-200 pl-4">
            Blog Posts Management
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/interior-design-marketing/blogs"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium transition"
          >
            <ExternalLink size={13} /> Live Listing
          </Link>
          <Link href="/admin-dashboard/interior-design-marketing/new">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#165fab] hover:bg-[#124d8f] text-white text-xs font-medium transition shadow-sm cursor-pointer">
              <Plus size={14} /> Add Interior Blog
            </button>
          </Link>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Search and Category Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 bg-white p-4 rounded-sm border border-gray-200 shadow-xs">
          <div className="relative flex-1 min-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search interior design blogs by title..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm"
            />
          </div>

          <div className="w-full sm:w-72">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.2em 1.2em',
              }}
            >
              <option value="all">All Topics ({posts.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-24">
                    Media
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Title &amp; Live URL
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-56">
                    Author
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-64">
                    Categories
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-36 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  skeletonRows
                ) : paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post) => {
                    const authorName = getAuthorName(post);
                    return (
                      <Fragment key={post.id}>
                        <tr className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-12 w-16 flex items-center justify-center overflow-hidden rounded-md bg-gray-100 border border-gray-200/60 shrink-0">
                              {post.featuredImage ? (
                                <img
                                  src={post.featuredImage}
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="text-gray-400 w-5 h-5" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col justify-center">
                              <Link
                                href={`/interior-design-marketing/${post.slug}`}
                                target="_blank"
                                className="text-gray-900 font-semibold text-base hover:text-blue-600 hover:underline line-clamp-1 transition-colors flex items-center gap-1.5"
                              >
                                {post.title}
                                <ExternalLink size={13} className="opacity-40" />
                              </Link>
                              <span className="text-gray-400 text-xs mt-0.5 font-mono">
                                /interior-design-marketing/{post.slug}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                                <User size={13} className="text-blue-600" />
                              </div>
                              <span className="text-gray-700 font-medium text-sm">
                                {authorName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              {post.categories && post.categories.length > 0 ? (
                                post.categories.map((cat) => (
                                  <span
                                    key={cat}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-white transition-colors"
                                  >
                                    {cat}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-xs italic">
                                  Uncategorized
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  if (postToEdit?.id === post.id) {
                                    setPostToEdit(null);
                                  } else {
                                    setPostToEdit(post);
                                    setEditForm({
                                      title: post.title || '',
                                      slug: post.slug || '',
                                      category: post.categories?.[0] || '',
                                      authorId: post.authorId || '',
                                    });
                                  }
                                }}
                                className={`p-2 transition-colors inline-flex rounded-sm shadow-xs border ${
                                  postToEdit?.id === post.id
                                    ? 'text-amber-700 bg-amber-100 border-amber-200'
                                    : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50 border-transparent hover:border-amber-100'
                                }`}
                                title="Quick Edit"
                              >
                                <Zap size={17} />
                              </button>
                              <Link
                                href={`/admin-dashboard/interior-design-marketing/edit/${post.slug || post.id}`}
                                className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-100 transition-colors inline-flex rounded-sm shadow-xs border border-transparent hover:border-blue-100"
                                title="Full Edit"
                              >
                                <Edit size={17} />
                              </Link>
                              <button
                                onClick={() => setPostToDelete(post)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors inline-flex rounded-sm shadow-xs border border-transparent hover:border-red-100"
                                title="Delete Post"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Quick Edit Row */}
                        {postToEdit?.id === post.id && (
                          <tr className="bg-amber-50/30 border-y border-amber-100 shadow-inner">
                            <td colSpan={5} className="px-6 py-4">
                              <div className="bg-white p-4 rounded-md border border-amber-200 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
                                <div className="flex-1 w-full space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                                        Title
                                      </label>
                                      <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) =>
                                          setEditForm({ ...editForm, title: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                                        Slug
                                      </label>
                                      <input
                                        type="text"
                                        value={editForm.slug}
                                        onChange={(e) =>
                                          setEditForm({ ...editForm, slug: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                                        Topic Category
                                      </label>
                                      <select
                                        value={editForm.category}
                                        onChange={(e) =>
                                          setEditForm({ ...editForm, category: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                                      >
                                        <option value="">Uncategorized</option>
                                        {categories.map((cat) => (
                                          <option key={cat} value={cat}>
                                            {cat}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                                        Author
                                      </label>
                                      <select
                                        value={editForm.authorId}
                                        onChange={(e) =>
                                          setEditForm({ ...editForm, authorId: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                                      >
                                        <option value="admin">Vaphers Team</option>
                                        {authors.map((author) => (
                                          <option key={author.id} value={author.id}>
                                            {author.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                  <button
                                    onClick={() => setPostToEdit(null)}
                                    className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition w-full sm:w-auto"
                                    disabled={isSavingEdit}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleQuickEditSave}
                                    disabled={isSavingEdit}
                                    className="px-4 py-2 bg-amber-600 text-white rounded text-sm font-medium hover:bg-amber-700 transition flex items-center justify-center min-w-[80px] shadow-sm w-full sm:w-auto"
                                  >
                                    {isSavingEdit ? (
                                      <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                      'Update'
                                    )}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900 mb-1">
                          No interior design blogs found
                        </p>
                        <p className="text-sm mb-4">
                          Get started by adding your first interior design marketing article to MongoDB.
                        </p>
                        <Link href="/admin-dashboard/interior-design-marketing/new">
                          <button className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#165fab] hover:bg-[#124d8f] text-white text-xs font-semibold transition">
                            <Plus size={14} /> Add First Blog
                          </button>
                        </Link>
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
                Showing{' '}
                <span className="font-medium text-gray-900">
                  {(page - 1) * POSTS_PER_PAGE + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium text-gray-900">
                  {Math.min(page * POSTS_PER_PAGE, filteredPosts.length)}
                </span>{' '}
                of <span className="font-medium text-gray-900">{filteredPosts.length}</span>{' '}
                interior posts
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 shadow-xs"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 shadow-xs"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Interior Blog</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">
                  &ldquo;{postToDelete.title}&rdquo;
                </span>{' '}
                from MongoDB? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition flex items-center justify-center min-w-[80px]"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

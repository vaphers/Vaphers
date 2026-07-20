'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Image as ImageIcon, ChevronLeft, ChevronRight, HelpCircle, User, Edit, Trash2 } from "lucide-react";

type CommonQuestion = {
  id: string;
  title: string;
  featuredImage: string;
  authorId: string;
  categories: string[];
  slug?: string;
};

type Author = { id: string; name: string; avatar?: string; };
type Category = { id: string; name: string; };

const ITEMS_PER_PAGE = 15;

export default function AdminCommonQuestionsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [questions, setQuestions] = useState<CommonQuestion[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/common-questions').then((res) => res.json()),
      fetch('/api/authors').then((res) => res.json()),
      fetch('/api/categories').then((res) => res.json()),
    ])
      .then(([cqData, authorData, categoryData]) => {
        setQuestions(cqData.questions || cqData.blogs || []);
        setAuthors(authorData || []);
        setCategories(categoryData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching common questions admin data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/common-questions/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Question deleted successfully');
        loadData();
      } else {
        alert('Failed to delete question');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting question');
    }
  };

  const getAuthor = (authorId: string) => {
    if (!authorId) return { name: "Vaphers Team", avatar: null };
    const author = authors.find((a) => String(a.id) === String(authorId));
    return author || { name: "Vaphers Team", avatar: null };
  };

  const filteredQuestions = questions
    .filter((q) => q.title.toLowerCase().includes(search.toLowerCase().trim()))
    .filter((q) => selectedCategory === "all" ? true : q.categories?.includes(selectedCategory));

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE) || 1;
  const paginatedQuestions = filteredQuestions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 py-10 font-sans">
      <div className="max-w-full mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-base text-gray-900 tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" /> Common Questions
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage and organize questions answered under /common-questions.</p>
          </div>
          <Link href="/admin-dashboard/common-questions/add">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2383e2] text-white rounded-xs font-medium hover:bg-[#1d6fc2] transition-all shadow-sm cursor-pointer">
              <Plus size={18} /> Add Common Question
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
              placeholder="Search common questions..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-sm bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-24">Media</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Question & Slug</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-56">Author</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-64">Categories</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading questions...</td>
                  </tr>
                ) : paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((q) => {
                    const author = getAuthor(q.authorId);
                    return (
                      <tr key={q.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-16 flex items-center justify-center overflow-hidden rounded-md bg-gray-100 border border-gray-200/60 shrink-0">
                            {q.featuredImage ? (
                              <img src={q.featuredImage} alt={q.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
                                FAQ
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col justify-center">
                            <Link href={`/common-questions/${q.slug || q.id}`} target="_blank" className="text-gray-900 font-semibold text-base hover:text-blue-600 hover:underline line-clamp-1 transition-colors">
                              {q.title}
                            </Link>
                            <span className="text-gray-400 text-xs mt-0.5 font-mono">/common-questions/{q.slug || q.id}</span>
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
                            {q.categories && q.categories.length > 0 ? q.categories.map((cat) => (
                              <span key={cat} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-white transition-colors">{cat}</span>
                            )) : <span className="text-gray-400 text-xs italic">Uncategorized</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <Link 
                            href={`/admin-dashboard/common-questions/edit/${q.slug || q.id}`} 
                            className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-100 transition-colors inline-flex rounded-sm shadow-sm border border-transparent"
                            title="Edit Question"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(q.slug || q.id, q.title)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors inline-flex rounded-sm shadow-sm border border-transparent cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <HelpCircle className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No common questions found</p>
                        <p className="text-sm">Click "Add Common Question" above to add your first question.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

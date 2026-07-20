'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Tiptap from '@/PageComponents/Admin Components/Editor'; 
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import Sidebar from '@/PageComponents/Admin Components/BlogPageSidebar';

export default function EditCommonQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params.slug as string;

  const [loading, setLoading] = useState(true);

  // Form States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Sidebar states
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState<{id: string, name: string}[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState('admin');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [cqRes, authRes, catRes] = await Promise.all([
          fetch(`/api/common-questions/${slugParam}`),
          fetch('/api/authors'),
          fetch('/api/categories')
        ]);

        if (!cqRes.ok) throw new Error('Common question not found');
        
        const cqData = await cqRes.json();
        const authorData = await authRes.json();
        const categoryData = await catRes.json();

        setTitle(cqData.title || '');
        setContent(cqData.contentHtml || '<p></p>'); 
        setSlug(cqData.slug || '');
        setMetaTitle(cqData.metaTitle || '');
        setMetaDescription(cqData.metaDescription || '');
        setFeaturedImage(cqData.featuredImage || null);
        setCurrentAuthor(cqData.authorId || cqData.author || 'admin');
        setSelectedCategories(cqData.categories || []);

        setAuthors(authorData || []);
        setCategories(categoryData.map((c: any) => c.name) || []);

      } catch (err) {
        console.error("Error loading edit common question page:", err);
        alert('Could not load common question data.');
      } finally {
        setLoading(false);
      }
    };

    if (slugParam) loadAllData();
  }, [slugParam]);

  const addAuthor = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setAuthors([...authors, { id, name }]);
    setCurrentAuthor(id);
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) setCategories([...categories, name]);
    setSelectedCategories([...selectedCategories, name]);
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        title,
        contentHtml: content,          
        slug,
        metaTitle,
        metaDescription,
        featuredImage,
        authorId: currentAuthor,
        categories: selectedCategories,
      };

      const res = await fetch(`/api/common-questions/${slugParam}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Failed to update common question: ' + (err.error || res.statusText));
        return;
      }

      alert('Common Question updated successfully!');
      router.push('/admin-dashboard/common-questions');
    } catch (err) {
      console.error(err);
      alert('Unexpected error while updating');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2383e2]"></div>
        <p className="text-gray-500 font-medium">Loading Question Data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row mx-auto w-full min-h-screen pt-4 lg:pt-10 px-4 lg:px-10">
      <div className="flex-1 w-full min-w-0 p-0 lg:p-5 mb-8 lg:mb-0">
        <div className="mb-4 pb-2 border-b border-gray-200">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Common Questions</span>
          <h2 className="text-2xl font-bold text-gray-900">Edit Common Question</h2>
        </div>

        <Tiptap
          title={title}
          onTitleChange={setTitle}
          content={content}
          onChange={setContent}
        />
        
        <MetaSEOPreview
          slug={slug}
          metaTitle={metaTitle}
          metaDescription={metaDescription}
          onSlugChange={setSlug}
          onMetaTitleChange={setMetaTitle}
          onMetaDescriptionChange={setMetaDescription}
          baseUrl="https://www.vaphers.com/common-questions"
        />
      </div>

      <Sidebar
        title={title}
        onPublish={handleUpdate}
        featuredImage={featuredImage}
        setFeaturedImage={setFeaturedImage}
        authors={authors}
        currentAuthor={currentAuthor}
        setCurrentAuthor={setCurrentAuthor}
        addAuthor={addAuthor}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        addCategory={addCategory}
        className="max-w-full"
      />
    </div>
  );
}

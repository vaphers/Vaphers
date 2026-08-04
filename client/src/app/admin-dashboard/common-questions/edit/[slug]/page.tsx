'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Tiptap from '@/PageComponents/Admin Components/Editor';
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import Sidebar from '@/PageComponents/Admin Components/BlogPageSidebar';
import AdminLoader from '@/app/admin-dashboard/Components/AdminLoader';

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
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState('admin');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [cqRes, authRes, catRes] = await Promise.all([
          fetch(`/api/common-questions/${slugParam}`),
          fetch('/api/authors').catch(() => null),
          fetch('/api/categories').catch(() => null),
        ]);

        if (!cqRes.ok) throw new Error('Common question not found');

        const cqData = await cqRes.json();
        const authorData = authRes ? await authRes.json() : [];
        const categoryData = catRes ? await catRes.json() : [];

        setTitle(cqData.title || '');
        setContent(cqData.contentHtml || cqData.content || '<p></p>');
        setSlug(cqData.slug || slugParam);
        setMetaTitle(cqData.metaTitle || '');
        setMetaDescription(cqData.metaDescription || '');
        setFeaturedImage(cqData.featuredImage || null);
        setCurrentAuthor(cqData.authorId || cqData.author || 'admin');
        setSelectedCategories(cqData.categories || []);

        if (Array.isArray(authorData) && authorData.length > 0) {
          setAuthors(authorData);
        }
        if (Array.isArray(categoryData) && categoryData.length > 0) {
          setCategories(categoryData.map((c: any) => c.name));
        }
      } catch (err) {
        console.error('Error loading edit common question page:', err);
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
    if (!title.trim()) {
      alert('Please provide a question title');
      return;
    }

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
      if (slug !== slugParam) {
        router.push(`/admin-dashboard/common-questions/edit/${slug}`);
      } else {
        router.push('/admin-dashboard/common-questions');
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error while updating');
    }
  };

  if (loading) {
    return <AdminLoader message="Loading Question Data..." />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full md:h-screen md:overflow-hidden bg-white">
      {/* Center Editor and Meta area */}
      <div className="flex-1 w-full min-w-0 md:h-full md:overflow-y-auto p-4 md:p-8 no-scrollbar pb-24 md:pb-12">
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

      {/* Sidebar on the right */}
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
        publishButtonText="Update Question"
      />
    </div>
  );
}

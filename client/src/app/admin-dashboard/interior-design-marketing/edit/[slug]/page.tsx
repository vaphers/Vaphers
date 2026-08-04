'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Tiptap from '@/PageComponents/Admin Components/Editor';
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import Sidebar from '@/PageComponents/Admin Components/BlogPageSidebar';
import AdminLoader from '@/app/admin-dashboard/Components/AdminLoader';

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

export default function EditInteriorPostPage() {
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
  const [categories, setCategories] = useState<string[]>(defaultInteriorCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch existing post from MongoDB API
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [postRes, authRes, catRes] = await Promise.all([
          fetch(`/api/interior-design-marketing/blogs/${slugParam}`),
          fetch('/api/authors').catch(() => null),
          fetch('/api/categories').catch(() => null),
        ]);

        if (!postRes.ok) throw new Error('Interior marketing post not found');

        const postData = await postRes.json();
        const authorData = authRes ? await authRes.json() : [];
        const categoryData = catRes ? await catRes.json() : [];

        // Populate Form Data
        setTitle(postData.title || '');
        setContent(postData.contentHtml || '<p></p>');
        setSlug(postData.slug || slugParam);
        setMetaTitle(postData.metaTitle || '');
        setMetaDescription(postData.metaDescription || '');
        setFeaturedImage(postData.featuredImage || null);
        setCurrentAuthor(postData.authorId || 'admin');
        setSelectedCategories(postData.categories || ['Interior Design Marketing']);

        // Populate Sidebar Master Lists
        if (Array.isArray(authorData) && authorData.length > 0) {
          setAuthors(authorData);
        }
        if (Array.isArray(categoryData) && categoryData.length > 0) {
          const apiCats = categoryData.map((c: any) => c.name);
          setCategories(Array.from(new Set([...defaultInteriorCategories, ...apiCats])));
        }
      } catch (err) {
        console.error('Error loading interior edit page:', err);
        alert('Could not load interior design marketing post.');
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
      alert('Please provide a title');
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

      const res = await fetch(`/api/interior-design-marketing/blogs/${slugParam}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Failed to update interior blog: ' + (err.error || res.statusText));
        return;
      }

      alert('Interior blog updated successfully!');

      if (slug !== slugParam) {
        router.push(`/admin-dashboard/interior-design-marketing/edit/${slug}`);
      } else {
        router.push('/admin-dashboard/interior-design-marketing/posts');
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error while updating');
    }
  };

  if (loading) {
    return <AdminLoader message="Loading Interior Design Marketing post..." />;
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
          baseUrl="https://www.vaphers.com/interior-design-marketing"
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
        publishButtonText="Update Post"
      />
    </div>
  );
}

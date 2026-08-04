'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Editor';
import MetaSEOPreview from './MetaSEOPreview';
import Sidebar from './BlogPageSidebar';

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

export default function InteriorTiptapWrapper() {
  const router = useRouter();

  const [title, setTitle] = useState('Add an interior marketing title...');
  const [content, setContent] = useState('<p>Start typing your interior marketing blog...</p>');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Sidebar state
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState([
    { id: 'muhammad-asad', name: 'Muhammad Asad' },
  ]);
  const [currentAuthor, setCurrentAuthor] = useState('muhammad-asad');
  const [categories, setCategories] = useState<string[]>(defaultInteriorCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Interior Design Marketing']);

  const addAuthor = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setAuthors([...authors, { id, name }]);
    setCurrentAuthor(id);
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) setCategories([...categories, name]);
    setSelectedCategories([...selectedCategories, name]);
  };

  const handlePublish = async () => {
    if (!title || title === 'Add an interior marketing title...' || title === 'Untitled') {
      alert('Please enter a valid title for the interior blog post.');
      return;
    }
    if (!slug) {
      alert('Please enter a URL slug.');
      return;
    }

    try {
      const payload = {
        title,
        contentHtml: content,
        slug,
        metaTitle: metaTitle || title,
        metaDescription,
        featuredImage,
        authorId: currentAuthor,
        categories: selectedCategories,
      };

      const res = await fetch('/api/interior-design-marketing/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        alert('Failed to publish interior blog: ' + (err.error || res.statusText));
        return;
      }

      alert('Interior blog published successfully!');
      router.push('/admin-dashboard/interior-design-marketing/posts');
    } catch (err) {
      console.error(err);
      alert('Unexpected error while publishing');
    }
  };

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
        onPublish={handlePublish}
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
        publishButtonText="Publish Post"
      />
    </div>
  );
}

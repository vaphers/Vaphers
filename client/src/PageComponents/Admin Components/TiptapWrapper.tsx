'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Editor';
import MetaSEOPreview from './MetaSEOPreview';
import Sidebar from './BlogPageSidebar';

export default function TiptapWrapper() {
  const router = useRouter();

  const [title, setTitle] = useState('Add a spectacular title...');
  const [content, setContent] = useState('<p>Start typing your blog...</p>');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Sidebar state
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState([
    { id: 'muhammad-asad', name: 'Muhammad Asad' },
  ]);
  const [currentAuthor, setCurrentAuthor] = useState('muhammad-asad');
  const [categories, setCategories] = useState(['Blog', 'Digital Marketing', 'SEO', 'Web Design']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Blog']);
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [scheduledAt, setScheduledAt] = useState<string>('');

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
    if (!title || title === 'Add a spectacular title...' || title === 'Untitled') {
      alert('Please enter a valid title for the blog post.');
      return;
    }
    if (!slug) {
      alert('Please enter a URL slug.');
      return;
    }

    if (status === 'scheduled' && !scheduledAt) {
      alert('Please select a future date and time for scheduled publication.');
      return;
    }

    try {
      const payload = {
        title,
        content,
        slug,
        metaTitle: metaTitle || title,
        metaDescription,
        featuredImage,
        author: currentAuthor,
        categories: selectedCategories,
        status,
        scheduledAt: status === 'scheduled' ? scheduledAt : null,
      };

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        alert('Failed to save blog: ' + (err.error || res.statusText));
        return;
      }

      const msg =
        status === 'draft'
          ? 'Blog saved as draft!'
          : status === 'scheduled'
          ? 'Blog successfully scheduled!'
          : 'Blog published successfully!';
      alert(msg);
      router.push('/admin-dashboard/posts');
    } catch (err) {
      console.error(err);
      alert('Unexpected error while saving blog');
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
          baseUrl="https://www.vaphers.com/blogs"
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
        status={status}
        setStatus={setStatus}
        scheduledAt={scheduledAt}
        setScheduledAt={setScheduledAt}
      />
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from '@/PageComponents/Admin Components/Editor';
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import Sidebar from '@/PageComponents/Admin Components/BlogPageSidebar'; 

export default function AddCommonQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('Add a question title...');
  const [content, setContent] = useState('<p>Write the detailed answer here...</p>');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Sidebar state
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([
    { id: 'admin', name: 'Admin' },
  ]);
  const [currentAuthor, setCurrentAuthor] = useState('admin');
  const [categories, setCategories] = useState(['SEO', 'Paid Media', 'Programming', 'Web Development', 'General']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['SEO']);

  useEffect(() => {
    Promise.all([
      fetch('/api/authors').then((r) => r.json()).catch(() => []),
      fetch('/api/categories').then((r) => r.json()).catch(() => []),
    ]).then(([authData, catData]) => {
      if (Array.isArray(authData) && authData.length > 0) setAuthors(authData);
      if (Array.isArray(catData) && catData.length > 0) {
        setCategories(catData.map((c: any) => c.name));
      }
    });
  }, []);

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
    if (!title || title === 'Add a question title...') {
      alert('Please enter a valid title for the question.');
      return;
    }
    if (!slug) {
      alert('Please enter a unique URL slug.');
      return;
    }

    try {
      const payload = {
        title,
        content,          
        slug,
        metaTitle,
        metaDescription,
        featuredImage,
        author: currentAuthor,
        categories: selectedCategories,
      };

      const res = await fetch('/api/common-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Failed to publish common question: ' + (err.error || res.statusText));
        return;
      }

      alert('Common Question published successfully!');
      router.push('/admin-dashboard/common-questions');
    } catch (err) {
      console.error(err);
      alert('Unexpected error while publishing');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto pt-0 w-full min-h-screen">
      <div className="flex-1 w-full min-w-0 p-4 lg:p-6">
        {/* <div className="mb-4 pb-2 border-b border-gray-200">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Common Questions</span>
          <h2 className="text-2xl font-bold text-gray-900">Add New Common Question</h2>
        </div> */}
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
        className="max-w-full"
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Tiptap from './Editor';
import MetaSEOPreview from './MetaSEOPreview';
import Sidebar from './BlogPageSidebar'; 

export default function TiptapWrapper() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Start typing your blog...</p>');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Sidebar state
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState([
    { id: 'admin', name: 'Admin' },
    { id: 'john', name: 'John Doe' },
  ]);
  const [currentAuthor, setCurrentAuthor] = useState('admin');
  const [categories, setCategories] = useState(['Blog', 'Car Detailing', 'Car Polishing', 'Car Wash']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Blog']);

  // Handler functions
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
  try {
    const payload = {
      title,
      content,           // HTML from TipTap
      slug,
      metaTitle,
      metaDescription,
      featuredImage,
      author: currentAuthor,
      categories: selectedCategories,
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
      alert('Failed to publish blog: ' + (err.error || res.statusText));
      return;
    }

    const data = await res.json();
    console.log('Blog created with id:', data.id);
    alert('Blog published successfully!');
    // Optionally: reset state or redirect to /blogs/[slug]
  } catch (err) {
    console.error(err);
    alert('Unexpected error while publishing');
  }
};


  return (
    <div className="flex px-10 mx-auto pt-0">
      {/* Center Editor and Meta area */}
      <div className="flex-1 p-5" >
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
          baseUrl="https://www.vaphers.com"
        />
        {/* Publish Button */}
        <button
          onClick={handlePublish}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </div>

      {/* Sidebar on the right */}
      <Sidebar
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

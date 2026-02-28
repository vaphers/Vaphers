'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Tiptap from '@/PageComponents/Admin Components/Editor'; 
import MetaSEOPreview from '@/PageComponents/Admin Components/MetaSEOPreview';
import Sidebar from '@/PageComponents/Admin Components/BlogPageSidebar';

export default function EditPostPage() {
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

  // 1. Fetch existing post data on mount
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [postRes, authRes, catRes] = await Promise.all([
          fetch(`/api/blogs/${slugParam}`),
          fetch('/api/authors'),
          fetch('/api/categories')
        ]);

        if (!postRes.ok) throw new Error('Post not found');
        
        const postData = await postRes.json();
        const authorData = await authRes.json();
        const categoryData = await catRes.json();

        // Populate Form Data
        setTitle(postData.title || '');
        
        // FIX: Look for contentHtml from the database
        setContent(postData.contentHtml || '<p></p>'); 
        
        setSlug(postData.slug || '');
        setMetaTitle(postData.metaTitle || '');
        setMetaDescription(postData.metaDescription || '');
        setFeaturedImage(postData.featuredImage || null);
        setCurrentAuthor(postData.authorId || postData.author || 'admin');
        setSelectedCategories(postData.categories || []);

        // Populate Sidebar Master Lists
        setAuthors(authorData || []);
        setCategories(categoryData.map((c: any) => c.name) || []);

      } catch (err) {
        console.error("Error loading edit page:", err);
        alert('Could not load blog post data.');
      } finally {
        setLoading(false); // Done loading!
      }
    };

    if (slugParam) loadAllData();
  }, [slugParam]);

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

  const handleUpdate = async () => {
    try {
      // FIX: Map the local 'content' state back to 'contentHtml' for the database
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

      const res = await fetch(`/api/blogs/${slugParam}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Failed to update blog: ' + (err.error || res.statusText));
        return;
      }

      alert('Blog updated successfully!');
      
      // If slug changed, redirect to new URL. Otherwise, go back to posts list.
      if (slug !== slugParam) {
        router.push(`/admin-dashboard/edit-post/${slug}`);
      } else {
        router.push('/admin-dashboard/posts');
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error while updating');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 font-medium">Loading Post Data...</p>
      </div>
    );
  }

  return (
    <div className="flex px-10 mx-auto pt-10">
      <div className="flex-1 p-5">
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
        
        <div className="mt-10 flex justify-end border-t pt-6">
          <button
            onClick={handleUpdate}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>

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
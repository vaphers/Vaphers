// 'use client';

// import React, { useState } from 'react';
// import Tiptap from './Editor';
// import MetaSEOPreview from './MetaSEOPreview';
// import Sidebar from './BlogPageSidebar'; 

// export default function TiptapWrapper() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('<p>Start typing your blog...</p>');
//   const [slug, setSlug] = useState('');
//   const [metaTitle, setMetaTitle] = useState('');
//   const [metaDescription, setMetaDescription] = useState('');

//   // Sidebar state
//   const [featuredImage, setFeaturedImage] = useState<string | null>(null);
//   const [authors, setAuthors] = useState([
//     { id: 'admin', name: 'Admin' },
//     { id: 'john', name: 'John Doe' },
//   ]);
//   const [currentAuthor, setCurrentAuthor] = useState('admin');
//   const [categories, setCategories] = useState([
//     'Blog','Car Detailing','Car Polishing','Car Wash'
//   ]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(['Blog']);

//   // Handler functions
//   const addAuthor = (name: string) => {
//     const id = name.toLowerCase().replace(/\s+/g, '-');
//     setAuthors([...authors, { id, name }]);
//     setCurrentAuthor(id);
//   };

//   const addCategory = (name: string) => {
//     if (!categories.includes(name)) setCategories([...categories, name]);
//     setSelectedCategories([...selectedCategories, name]);
//   };

//   return (
//     <div className="flex max-w-full mx-auto pt-0">
//       {/* Center Editor and Meta area */}
//       <div className="flex-1 max-w-7xl p-6 space-y-6">
//         <Tiptap
//           title={title}
//           onTitleChange={setTitle}
//           content={content}
//           onChange={setContent}
//         />
//         <MetaSEOPreview
//           slug={slug}
//           metaTitle={metaTitle}
//           metaDescription={metaDescription}
//           onSlugChange={setSlug}
//           onMetaTitleChange={setMetaTitle}
//           onMetaDescriptionChange={setMetaDescription}
//           baseUrl="https://vaphers.com"
//         />
//       </div>

//       {/* Sidebar on the right */}
//       <Sidebar
//         featuredImage={featuredImage}
//         setFeaturedImage={setFeaturedImage}
//         authors={authors}
//         currentAuthor={currentAuthor}
//         setCurrentAuthor={setCurrentAuthor}
//         addAuthor={addAuthor}
//         categories={categories}
//         selectedCategories={selectedCategories}
//         setSelectedCategories={setSelectedCategories}
//         addCategory={addCategory}
//         className="absolute top-0 right-0 h-screen sticky"
//       />
//     </div>
//   );
// }





'use client';

import React, { useState } from 'react';
import Tiptap from './Editor';
import MetaSEOPreview from './MetaSEOPreview';
import Sidebar from './BlogPageSidebar'; // Make sure the path is correct

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

  // Publish button click handler
  const handlePublish = () => {
    // Replace this with logic to send data to your backend API
    console.log('Publishing blog post with data:', {
      title,
      content,
      slug,
      metaTitle,
      metaDescription,
      featuredImage,
      author: currentAuthor,
      categories: selectedCategories,
    });
    alert('Publish clicked! Implement backend POST request here.');
  };

  return (
    <div className="flex max-w-full mx-auto pt-0">
      {/* Center Editor and Meta area */}
      <div className="flex-1 max-w-7xl p-6 space-y-6">
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
          baseUrl="https://vaphers.com"
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
        className="absolute top-0 right-0 h-screen sticky"
      />
    </div>
  );
}

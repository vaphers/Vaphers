// 'use client';

// import React from 'react';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Globe } from 'lucide-react';

// type MetaSEOPreviewProps = {
//   metaTitle: string;
//   metaDescription: string;
//   slug: string;
//   onMetaTitleChange: (value: string) => void;
//   onMetaDescriptionChange: (value: string) => void;
//   onSlugChange: (value: string) => void;
//   baseUrl?: string;
//   siteName?: string;
// };

// const MetaSEOPreview: React.FC<MetaSEOPreviewProps> = ({
//   metaTitle,
//   metaDescription,
//   slug,
//   onMetaTitleChange,
//   onMetaDescriptionChange,
//   onSlugChange,
//   baseUrl = 'https://www.vaphers.com/blogs',
//   siteName = 'Vaphers',
// }) => {
//   const titleCharCount = metaTitle.length;
//   const descCharCount = metaDescription.length;
//   const titleLimit = 60;
//   const descLimit = 160;

//   // Truncate for preview display
//   const displayTitle = metaTitle.length > titleLimit 
//     ? metaTitle.substring(0, titleLimit) + '...' 
//     : metaTitle || 'Your Blog Title Here';
  
//   const displayDesc = metaDescription.length > descLimit 
//     ? metaDescription.substring(0, descLimit) + '...' 
//     : metaDescription || 'Your meta description will appear here. It should be compelling and describe what your blog post is about.';

//   // Generate full URL with slug
//   const fullUrl = slug ? `${baseUrl}/${slug}` : `${baseUrl}/your-blog-slug`;
  
//   // Extract domain from baseUrl
//   const domain = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

//   // Sanitize slug input
//   const handleSlugChange = (value: string) => {
//     // Convert to lowercase, replace spaces with hyphens, remove special characters
//     const sanitized = value
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-z0-9-]/g, '');
//     onSlugChange(sanitized);
//   };

//   return (
//     <div className="max-w-7xl space-y-6 mx-auto mt-8">
      
//       <Separator className="my-6" />
      
//       <h2 className="text-3xl font-base ">Edit Meta Data</h2>
      
//       {/* SERP Preview - Improved Design */}
//       <Card className="max-w-2xl p-6 bg-gray-50 shadow-none ">
//         <div className="flex items-center justify-between">
//           <Label className="text-2xl font-base text-gray-800 ml-2">Search Appearance</Label>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Globe size={14} />
//             <span>Google Preview</span>
//           </div>
//         </div>
        
//         <div className="bg-white p-5 rounded-lg border-2 border-gray-200 shadow-sm">
//           {/* Breadcrumb/URL */}
//           <div className="flex items-center gap-1.5 mb-2">
//             <div className="flex items-center gap-1.5 text-sm">
//               <div className="w-5 h-5 rounded-sm bg-gray-200 flex items-center justify-center">
//                 <Globe size={12} className="text-gray-600" />
//               </div>
//               <span className="text-gray-700 font-medium">{domain}</span>
//               <span className="text-gray-400">›</span>
//               <span className="text-gray-600">{slug || 'your-blog-slug'}</span>
//             </div>
//           </div>
          
//           {/* Title */}
//           <h3 className="text-blue-700 text-xl font-normal mb-2 hover:underline cursor-pointer leading-snug">
//             {displayTitle}
//           </h3>
          
//           {/* Description */}
//           <p className="text-sm text-gray-700 leading-relaxed">
//             {displayDesc}
//           </p>
//         </div>

//         {/* Character count indicators
//         <div className="flex gap-4 text-xs">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-600">Title:</span>
//             <span className={`font-semibold ${titleCharCount > titleLimit ? 'text-red-600' : titleCharCount > titleLimit * 0.9 ? 'text-orange-600' : 'text-green-600'}`}>
//               {titleCharCount}/{titleLimit}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-gray-600">Description:</span>
//             <span className={`font-semibold ${descCharCount > descLimit ? 'text-red-600' : descCharCount > descLimit * 0.9 ? 'text-orange-600' : 'text-green-600'}`}>
//               {descCharCount}/{descLimit}
//             </span>
//           </div>
//         </div> */}
//       </Card>

//       {/* Slug Input */}
//       <div className="space-y-2">
//         <Label htmlFor="slug" className="text-base font-semibold">
//           URL Slug
//         </Label>
//         <div className="flex items-stretch gap-0 border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
//           <span className="flex items-center px-3 bg-gray-100 text-sm text-gray-600 border-r border-gray-300">
//             {baseUrl}/
//           </span>
//           <Input
//             id="slug"
//             type="text"
//             placeholder="your-blog-post-slug"
//             value={slug}
//             onChange={(e) => handleSlugChange(e.target.value)}
//             className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//           />
//         </div>
//         <p className="text-xs text-gray-500">
//           Auto-formatted: lowercase, hyphens instead of spaces, no special characters.
//         </p>
//       </div>

//       {/* Meta Title Input */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           <Label htmlFor="meta-title" className="text-base font-semibold">
//             Meta Title
//           </Label>
//           <span className={`text-sm font-semibold ${titleCharCount > titleLimit ? 'text-red-600' : titleCharCount > titleLimit * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
//             {titleCharCount} / {titleLimit}
//           </span>
//         </div>
//         <Input
//           id="meta-title"
//           type="text"
//           placeholder="Enter SEO meta title (recommended: 50-60 characters)"
//           value={metaTitle}
//           onChange={(e) => onMetaTitleChange(e.target.value)}
//           className={`${titleCharCount > titleLimit ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
//         />
//         {titleCharCount > titleLimit && (
//           <p className="text-xs text-red-600 flex items-center gap-1">
//             <span>⚠️</span>
//             Title exceeds recommended length and may be truncated in search results.
//           </p>
//         )}
//       </div>

//       {/* Meta Description Input */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           <Label htmlFor="meta-description" className="text-base font-semibold">
//             Meta Description
//           </Label>
//           <span className={`text-sm font-semibold ${descCharCount > descLimit ? 'text-red-600' : descCharCount > descLimit * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
//             {descCharCount} / {descLimit}
//           </span>
//         </div>
//         <Textarea
//           id="meta-description"
//           placeholder="Enter SEO meta description (recommended: 150-160 characters)"
//           value={metaDescription}
//           onChange={(e) => onMetaDescriptionChange(e.target.value)}
//           rows={4}
//           className={`${descCharCount > descLimit ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
//         />
//         {descCharCount > descLimit && (
//           <p className="text-xs text-red-600 flex items-center gap-1">
//             <span>⚠️</span>
//             Description exceeds recommended length and may be truncated in search results.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MetaSEOPreview;




'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Smartphone, Monitor, MoreVertical, ChevronUp } from 'lucide-react';

type MetaSEOPreviewProps = {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  baseUrl?: string;
  siteName?: string;
};

const MetaSEOPreview: React.FC<MetaSEOPreviewProps> = ({
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
  baseUrl = 'https://vaphers.com',
  siteName = 'vaphers.com',
}) => {
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');

  const titleLimit = 60;
  const descLimit = 160;

  const displayTitle = metaTitle || 'Enter a title - Vaphers';
  const displayDesc = metaDescription || 'Please provide a meta description by editing the snippet below. If you don’t, Google will try to find a relevant part of your post to show in the search results.';
  
  const domain = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const currentDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());

  const handleSlugChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSlugChange(sanitized);
  };

  const insertVariable = (variable: string) => {
    const newValue = metaTitle ? `${metaTitle} ${variable}` : variable;
    onMetaTitleChange(newValue);
  };

  return (
    <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-sm bg-white font-sans text-[#1e1e1e] shadow-xs mt-10">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-[17px] font-semibold text-gray-800">Search appearance</h2>
      </div>

      <div className="p-6 space-y-8">
        <p className="text-[14px] text-gray-600 mb-6">
          Determine how your post should look in the search results.
        </p>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-gray-800">Google preview</h3>
            
            {/* Device Toggle */}
            <div className="flex items-center gap-3 text-[14px]">
              <span className={`cursor-pointer ${previewMode === 'mobile' ? 'text-gray-900 font-medium' : 'text-gray-500'}`} onClick={() => setPreviewMode('mobile')}>
                Mobile
              </span>
              <div className="relative inline-flex items-center w-12 h-6 rounded-full bg-[#2383e2] cursor-pointer transition-colors" onClick={() => setPreviewMode(previewMode === 'mobile' ? 'desktop' : 'mobile')}>
                <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center ${previewMode === 'mobile' ? 'translate-x-0.5' : 'translate-x-[26px]'}`}>
                  {previewMode === 'mobile' ? <Smartphone size={12} className="text-blue-600" /> : <Monitor size={12} className="text-blue-600" />}
                </div>
              </div>
              <span className={`cursor-pointer ${previewMode === 'desktop' ? 'text-gray-900 font-medium' : 'text-gray-500'}`} onClick={() => setPreviewMode('desktop')}>
                Desktop
              </span>
            </div>
          </div>

          {/* SERP Card */}
          <div className={`bg-white rounded-sm border border-gray-200 shadow-xs p-4 overflow-hidden ${previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[600px]'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {/* Placeholder for favicon */}
                  <img src="/favicon.ico" alt="Favicon" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[14px] text-[#202124] truncate">{siteName}</span>
                  {/* Updated this span to dynamically show the slug with a breadcrumb arrow */}
                  <span className="text-[12px] text-[#4d5156] tracking-wide truncate">
                    {domain} {slug ? ` › ${slug}` : ''}
                  </span>
                </div>
              </div>
              <MoreVertical size={16} className="text-gray-500 mt-1 shrink-0" />
            </div>
            
            <h3 className="text-[#1a0dab] text-[20px] font-normal mb-1 cursor-pointer leading-[1.3] hover:underline break-words whitespace-normal">
              {displayTitle}
            </h3>
            
            <p className="text-[14px] text-[#4d5156] leading-[1.58] break-words whitespace-normal">
              {currentDate} — {displayDesc}
            </p>
          </div>
        </div>

        {/* Inputs Section */}
        <div className="space-y-6 ">
          
          {/* SEO Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-[14px] font-bold text-gray-800">SEO title</Label>
            </div>
            
            {/* Simulating the Yoast Pill Input Box */}
            <div className="relative border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 min-h-[42px] flex flex-wrap items-center gap-1.5 p-1.5 bg-white">
              {!metaTitle && (
                <>                </>
              )}
              <input 
                type="text" 
                className="flex-1 outline-none text-[14px] px-2 min-w-[100px] text-gray-800 bg-transparent"
                value={metaTitle}
                onChange={(e) => onMetaTitleChange(e.target.value)}
              />
            </div>
            {/* Progress indicator bar */}
            <div className="h-1.5 w-full bg-gray-200 mt-2 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${metaTitle.length > titleLimit ? 'bg-red-500' : metaTitle.length > 10 ? 'bg-[#7ad03a]' : 'bg-orange-400'}`} 
                style={{ width: `${Math.min((metaTitle.length / titleLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-1">
            <Label className="text-[14px] font-bold text-gray-800">Slug</Label>
            <Input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="border-gray-300 h-10 text-[14px] focus-visible:ring-blue-500 focus-visible:border-blue-500"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-[14px] font-bold text-gray-800">Meta description</Label>
            </div>
            <Textarea
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              rows={3}
              className="border-gray-300 text-[14px] focus-visible:ring-blue-500 focus-visible:border-blue-500 resize-y"
            />
             {/* Progress indicator bar */}
             <div className="h-1.5 w-full bg-gray-200 mt-2 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${metaDescription.length > descLimit ? 'bg-red-500' : metaDescription.length > 50 ? 'bg-[#7ad03a]' : 'bg-orange-400'}`} 
                style={{ width: `${Math.min((metaDescription.length / descLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MetaSEOPreview;
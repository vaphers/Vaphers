'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Globe } from 'lucide-react';

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
  baseUrl = 'https://www.vaphers.com/blogs',
  siteName = 'Vaphers',
}) => {
  const titleCharCount = metaTitle.length;
  const descCharCount = metaDescription.length;
  const titleLimit = 60;
  const descLimit = 160;

  // Truncate for preview display
  const displayTitle = metaTitle.length > titleLimit 
    ? metaTitle.substring(0, titleLimit) + '...' 
    : metaTitle || 'Your Blog Title Here';
  
  const displayDesc = metaDescription.length > descLimit 
    ? metaDescription.substring(0, descLimit) + '...' 
    : metaDescription || 'Your meta description will appear here. It should be compelling and describe what your blog post is about.';

  // Generate full URL with slug
  const fullUrl = slug ? `${baseUrl}/${slug}` : `${baseUrl}/your-blog-slug`;
  
  // Extract domain from baseUrl
  const domain = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Sanitize slug input
  const handleSlugChange = (value: string) => {
    // Convert to lowercase, replace spaces with hyphens, remove special characters
    const sanitized = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    onSlugChange(sanitized);
  };

  return (
    <div className="w-full space-y-6 mt-8">
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-bold bungee-inline-regular">Edit Meta Data</h2>
      
      {/* SERP Preview - Improved Design */}
      <Card className="max-w-2xl p-6 bg-gray-50 shadow-none ">
        <div className="flex items-center justify-between">
          <Label className="text-base font-bold text-gray-800 ">Search Appearance</Label>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Globe size={14} />
            <span>Google Preview</span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border-2 border-gray-200 shadow-sm">
          {/* Breadcrumb/URL */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-5 h-5 rounded-sm bg-gray-200 flex items-center justify-center">
                <Globe size={12} className="text-gray-600" />
              </div>
              <span className="text-gray-700 font-medium">{domain}</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">{slug || 'your-blog-slug'}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-blue-700 text-xl font-normal mb-2 hover:underline cursor-pointer leading-snug">
            {displayTitle}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Character count indicators */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Title:</span>
            <span className={`font-semibold ${titleCharCount > titleLimit ? 'text-red-600' : titleCharCount > titleLimit * 0.9 ? 'text-orange-600' : 'text-green-600'}`}>
              {titleCharCount}/{titleLimit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Description:</span>
            <span className={`font-semibold ${descCharCount > descLimit ? 'text-red-600' : descCharCount > descLimit * 0.9 ? 'text-orange-600' : 'text-green-600'}`}>
              {descCharCount}/{descLimit}
            </span>
          </div>
        </div>
      </Card>

      {/* Slug Input */}
      <div className="space-y-2">
        <Label htmlFor="slug" className="text-base font-semibold">
          URL Slug
        </Label>
        <div className="flex items-stretch gap-0 border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
          <span className="flex items-center px-3 bg-gray-100 text-sm text-gray-600 border-r border-gray-300">
            {baseUrl}/
          </span>
          <Input
            id="slug"
            type="text"
            placeholder="your-blog-post-slug"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <p className="text-xs text-gray-500">
          Auto-formatted: lowercase, hyphens instead of spaces, no special characters.
        </p>
      </div>

      {/* Meta Title Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="meta-title" className="text-base font-semibold">
            Meta Title
          </Label>
          <span className={`text-sm font-semibold ${titleCharCount > titleLimit ? 'text-red-600' : titleCharCount > titleLimit * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
            {titleCharCount} / {titleLimit}
          </span>
        </div>
        <Input
          id="meta-title"
          type="text"
          placeholder="Enter SEO meta title (recommended: 50-60 characters)"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          className={`${titleCharCount > titleLimit ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        />
        {titleCharCount > titleLimit && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            Title exceeds recommended length and may be truncated in search results.
          </p>
        )}
      </div>

      {/* Meta Description Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="meta-description" className="text-base font-semibold">
            Meta Description
          </Label>
          <span className={`text-sm font-semibold ${descCharCount > descLimit ? 'text-red-600' : descCharCount > descLimit * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
            {descCharCount} / {descLimit}
          </span>
        </div>
        <Textarea
          id="meta-description"
          placeholder="Enter SEO meta description (recommended: 150-160 characters)"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          rows={4}
          className={`${descCharCount > descLimit ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        />
        {descCharCount > descLimit && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            Description exceeds recommended length and may be truncated in search results.
          </p>
        )}
      </div>
    </div>
  );
};

export default MetaSEOPreview;

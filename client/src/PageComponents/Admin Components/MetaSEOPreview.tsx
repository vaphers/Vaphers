'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Smartphone, Monitor, MoreVertical } from 'lucide-react';

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
  const displayDesc =
    metaDescription ||
    'Please provide a meta description by editing the snippet below. If you don’t, Google will try to find a relevant part of your post to show in the search results.';

  const domain = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const handleSlugChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSlugChange(sanitized);
  };

  return (
    <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg bg-white font-sans text-[#1e1e1e] shadow-xs mt-10 no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-[17px] font-semibold text-gray-800">Search appearance</h2>
      </div>

      <div className="p-6 space-y-8 no-scrollbar">
        <p className="text-[14px] text-gray-600 mb-6">
          Determine how your post should look in the search results.
        </p>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-gray-800">Google preview</h3>

            {/* Device Toggle */}
            <div className="flex items-center gap-3 text-[14px]">
              <span
                className={`cursor-pointer ${
                  previewMode === 'mobile' ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setPreviewMode('mobile')}
              >
                Mobile
              </span>
              <div
                className="relative inline-flex items-center w-12 h-6 rounded-full bg-[#2383e2] cursor-pointer transition-colors"
                onClick={() => setPreviewMode(previewMode === 'mobile' ? 'desktop' : 'mobile')}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    previewMode === 'mobile' ? 'translate-x-0.5' : 'translate-x-[26px]'
                  }`}
                >
                  {previewMode === 'mobile' ? (
                    <Smartphone size={12} className="text-blue-600" />
                  ) : (
                    <Monitor size={12} className="text-blue-600" />
                  )}
                </div>
              </div>
              <span
                className={`cursor-pointer ${
                  previewMode === 'desktop' ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setPreviewMode('desktop')}
              >
                Desktop
              </span>
            </div>
          </div>

          {/* SERP Card */}
          <div
            className={`bg-white rounded-lg border border-gray-200 shadow-xs p-4 overflow-hidden ${
              previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[600px]'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/favicon.ico" alt="Favicon" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[14px] text-[#202124] truncate">{siteName}</span>
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
        <div className="space-y-6">
          {/* SEO Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-[14px] font-bold text-gray-800">SEO title</Label>
            </div>

            <div className="relative border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 min-h-[42px] flex flex-wrap items-center gap-1.5 p-1.5 bg-white">
              <input
                type="text"
                className="flex-1 outline-none text-[14px] px-2 min-w-[100px] text-gray-800 bg-transparent"
                value={metaTitle}
                onChange={(e) => onMetaTitleChange(e.target.value)}
                placeholder="Enter SEO meta title"
              />
            </div>
            {/* Progress indicator bar */}
            <div className="h-1.5 w-full bg-gray-200 mt-2 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  metaTitle.length > titleLimit
                    ? 'bg-red-500'
                    : metaTitle.length > 10
                    ? 'bg-[#7ad03a]'
                    : 'bg-orange-400'
                }`}
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
              placeholder="url-slug"
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
              placeholder="Enter SEO meta description"
            />
            {/* Progress indicator bar */}
            <div className="h-1.5 w-full bg-gray-200 mt-2 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  metaDescription.length > descLimit
                    ? 'bg-red-500'
                    : metaDescription.length > 50
                    ? 'bg-[#7ad03a]'
                    : 'bg-orange-400'
                }`}
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
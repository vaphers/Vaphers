'use client';

import React, { useState } from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { Youtube, ExternalLink, Globe, Images, Trash2, Loader2, AlertCircle } from 'lucide-react';

// ==========================================
// 1. IMAGE SIZE LIMITER UTILITY (< 200KB)
// ==========================================
export const MAX_IMAGE_SIZE_BYTES = 200 * 1024; // 204,800 bytes

export function validateImageSize(file: File, maxBytes = MAX_IMAGE_SIZE_BYTES): { valid: boolean; error?: string } {
  if (file.size > maxBytes) {
    const sizeInKb = Math.round(file.size / 1024);
    return {
      valid: false,
      error: `Image is too large (${sizeInKb} KB). Maximum allowed image size is 200 KB to ensure lightning fast page load speeds.`,
    };
  }
  return { valid: true };
}

// ==========================================
// 2. YOUTUBE EMBED NODE & COMPONENT
// ==========================================
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}`;
  }
  return null;
}

const YouTubeEmbedComponent = ({ node, updateAttributes, deleteNode }: any) => {
  const [isEditing, setIsEditing] = useState(!node.attrs.src);
  const [inputUrl, setInputUrl] = useState(node.attrs.src || '');
  const embedUrl = getYouTubeEmbedUrl(node.attrs.src);

  const handleApply = () => {
    const cleanEmbed = getYouTubeEmbedUrl(inputUrl);
    if (!cleanEmbed) {
      alert('Please enter a valid YouTube video URL');
      return;
    }
    updateAttributes({ src: inputUrl });
    setIsEditing(false);
  };

  return (
    <NodeViewWrapper className="my-8 not-prose">
      {isEditing || !embedUrl ? (
        <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl max-w-xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Youtube className="w-5 h-5 text-red-600" />
            <span>Embed YouTube Video</span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Embed
            </button>
            <button
              onClick={deleteNode}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative group max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md border border-slate-200 aspect-video bg-black">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/70 backdrop-blur-xs p-1.5 rounded-lg">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-white text-slate-800 text-xs font-medium rounded hover:bg-slate-100"
            >
              Change URL
            </button>
            <button
              onClick={deleteNode}
              className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
              title="Delete video"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export const YouTubeEmbedNode = Node.create({
  name: 'youtubeEmbed',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="youtube-embed"]',
        getAttrs: (dom) => ({
          src: (dom as HTMLElement).getAttribute('data-src') || '',
        }),
      },
      {
        tag: 'iframe[src*="youtube"]',
        getAttrs: (dom) => ({
          src: (dom as HTMLIFrameElement).getAttribute('src') || '',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getYouTubeEmbedUrl(HTMLAttributes.src);
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'youtube-embed',
        'data-src': HTMLAttributes.src,
        class: 'relative aspect-video max-w-3xl mx-auto my-8 rounded-xl overflow-hidden shadow-md border border-slate-200',
      }),
      [
        'iframe',
        {
          src: embedUrl || HTMLAttributes.src,
          class: 'w-full h-full border-0',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: 'true',
        },
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YouTubeEmbedComponent);
  },
});

// ==========================================
// 3. WEBSITE CARD (OG PREVIEW) NODE & COMPONENT
// ==========================================
const WebsiteCardComponent = ({ node, updateAttributes, deleteNode }: any) => {
  const [isEditing, setIsEditing] = useState(!node.attrs.url);
  const [inputUrl, setInputUrl] = useState(node.attrs.url || '');
  const [loading, setLoading] = useState(false);

  const fetchOg = async (urlToFetch: string) => {
    if (!urlToFetch) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/og-preview?url=${encodeURIComponent(urlToFetch)}`);
      const og = await res.json();
      updateAttributes({
        url: og.url || urlToFetch,
        title: og.title || urlToFetch,
        description: og.description || '',
        image: og.image || null,
        siteName: og.siteName || new URL(urlToFetch).hostname,
        favicon: og.favicon || null,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      updateAttributes({ url: urlToFetch, title: urlToFetch });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NodeViewWrapper className="my-8 not-prose">
      {isEditing ? (
        <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl max-w-xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Embed Website Bookmark Card</span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/article"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => fetchOg(inputUrl)}
              disabled={loading || !inputUrl}
              className="px-4 py-2 bg-[#2383e2] hover:bg-[#1a66b2] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : 'Fetch Preview'}
            </button>
            <button
              onClick={deleteNode}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative group max-w-2xl mx-auto">
          <a
            href={node.attrs.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-stretch border border-slate-200 hover:border-blue-300 rounded-xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group/card block"
          >
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {node.attrs.favicon ? (
                    <img src={node.attrs.favicon} alt="" className="w-4 h-4 rounded-xs shrink-0" />
                  ) : (
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    {node.attrs.siteName || 'Website'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover/card:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                  {node.attrs.title}
                </h4>
                {node.attrs.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {node.attrs.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-auto pt-2">
                <span className="truncate max-w-[280px]">{node.attrs.url}</span>
                <ExternalLink size={12} className="shrink-0" />
              </div>
            </div>

            {node.attrs.image && (
              <div className="sm:w-52 h-40 sm:h-auto shrink-0 bg-slate-100 overflow-hidden border-t sm:border-t-0 sm:border-l border-slate-100">
                <img
                  src={node.attrs.image}
                  alt={node.attrs.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </a>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200 shadow-xs">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 rounded"
            >
              Edit URL
            </button>
            <button
              onClick={deleteNode}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Delete card"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export const WebsiteCardNode = Node.create({
  name: 'websiteCard',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: { default: '' },
      title: { default: '' },
      description: { default: '' },
      image: { default: null },
      siteName: { default: '' },
      favicon: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="website-card"]',
        getAttrs: (dom) => {
          const el = dom as HTMLElement;
          return {
            url: el.getAttribute('data-url') || '',
            title: el.getAttribute('data-title') || '',
            description: el.getAttribute('data-desc') || '',
            image: el.getAttribute('data-image') || null,
            siteName: el.getAttribute('data-sitename') || '',
            favicon: el.getAttribute('data-favicon') || null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { url, title, description, image, siteName, favicon } = HTMLAttributes;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'website-card',
        'data-url': url,
        'data-title': title,
        'data-desc': description,
        'data-image': image || '',
        'data-sitename': siteName,
        'data-favicon': favicon || '',
        class: 'website-card-wrapper my-8 not-prose max-w-2xl mx-auto',
      }),
      [
        'a',
        {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'flex flex-col sm:flex-row items-stretch border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all block',
        },
        [
          'div',
          { class: 'p-5 flex-1 flex flex-col justify-between' },
          [
            'div',
            {},
            [
              'div',
              { class: 'flex items-center gap-2 mb-1.5' },
              favicon ? ['img', { src: favicon, alt: '', class: 'w-4 h-4 rounded-xs shrink-0' }] : '',
              ['span', { class: 'text-xs font-semibold text-slate-500 uppercase tracking-wider' }, siteName || 'Website'],
            ],
            ['h4', { class: 'text-base font-bold text-slate-900 mb-1.5' }, title || url],
            description ? ['p', { class: 'text-xs text-slate-500 mb-3' }, description] : '',
          ],
          ['span', { class: 'text-xs text-blue-600 font-medium' }, url],
        ],
        image
          ? [
              'div',
              { class: 'sm:w-52 h-40 sm:h-auto shrink-0 bg-slate-100 overflow-hidden' },
              ['img', { src: image, alt: title, class: 'w-full h-full object-cover' }],
            ]
          : '',
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WebsiteCardComponent);
  },
});

// ==========================================
// 4. IMAGE GALLERY NODE & COMPONENT
// ==========================================
const ImageGalleryComponent = ({ node, updateAttributes, deleteNode }: any) => {
  const images: { src: string; caption?: string }[] = node.attrs.images || [];
  const columns: number = node.attrs.columns || 2;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError(null);

    // Validate size of each file (< 200KB)
    for (const file of files) {
      const check = validateImageSize(file);
      if (!check.valid) {
        setError(check.error || 'One or more files exceed the 200KB limit.');
        return;
      }
    }

    setUploading(true);
    const newUploaded: { src: string; caption: string }[] = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'nextjs_blog_uploads');

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'disuctlvg';
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          newUploaded.push({ src: data.secure_url, caption: '' });
        }
      } catch (err) {
        console.error('Gallery image upload failed:', err);
      }
    }

    setUploading(false);
    updateAttributes({ images: [...images, ...newUploaded] });
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, idx) => idx !== index);
    updateAttributes({ images: updated });
  };

  const handleCaptionChange = (index: number, newCap: string) => {
    const updated = images.map((img, idx) => (idx === index ? { ...img, caption: newCap } : img));
    updateAttributes({ images: updated });
  };

  return (
    <NodeViewWrapper className="my-8 not-prose">
      <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Images className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800">
              Image Gallery ({images.length} photos)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Layout:</label>
            <select
              value={columns}
              onChange={(e) => updateAttributes({ columns: parseInt(e.target.value, 10) })}
              className="px-2 py-1 text-xs border border-slate-200 rounded bg-white font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>

            <label className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs">
              {uploading ? <Loader2 size={13} className="animate-spin" /> : '+ Add Images'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImages}
                className="hidden"
                disabled={uploading}
              />
            </label>

            <button
              onClick={deleteNode}
              className="p-1 text-slate-400 hover:text-red-600 rounded"
              title="Delete entire gallery"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {images.length === 0 ? (
          <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
            No images in gallery yet. Click <span className="font-semibold text-indigo-600">+ Add Images</span> above (each must be under 200 KB).
          </div>
        ) : (
          <div
            className={`grid gap-4 ${
              columns === 4
                ? 'grid-cols-2 sm:grid-cols-4'
                : columns === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {images.map((img, idx) => (
              <div
                key={img.src + idx}
                className="relative group/item bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.caption || `Gallery photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Optional caption..."
                  value={img.caption || ''}
                  onChange={(e) => handleCaptionChange(idx, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs text-slate-600 border-t border-slate-100 focus:outline-none focus:bg-slate-50"
                />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 text-white rounded opacity-0 group-hover/item:opacity-100 transition-all cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export const ImageGalleryNode = Node.create({
  name: 'imageGallery',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      images: { default: [] },
      columns: { default: 2 },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-gallery"]',
        getAttrs: (dom) => {
          const el = dom as HTMLElement;
          const jsonStr = el.getAttribute('data-images') || '[]';
          let images = [];
          try {
            images = JSON.parse(jsonStr);
          } catch {
            images = [];
          }
          return {
            images,
            columns: parseInt(el.getAttribute('data-columns') || '2', 10),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const images = HTMLAttributes.images || [];
    const columns = HTMLAttributes.columns || 2;
    const gridColsClass =
      columns === 4
        ? 'grid-cols-2 md:grid-cols-4'
        : columns === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2';

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'image-gallery',
        'data-images': JSON.stringify(images),
        'data-columns': String(columns),
        class: 'my-10 not-prose',
      }),
      [
        'div',
        { class: `grid ${gridColsClass} gap-4` },
        ...images.map((img: any) => [
          'figure',
          { class: 'rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs m-0' },
          [
            'img',
            {
              src: img.src,
              alt: img.caption || '',
              class: 'w-full aspect-[4/3] object-cover block m-0',
            },
          ],
          img.caption
            ? ['figcaption', { class: 'p-2 text-center text-xs text-slate-500 italic' }, img.caption]
            : '',
        ]),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageGalleryComponent);
  },
});

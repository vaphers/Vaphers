"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, FileJson, Download, CheckCircle2, XCircle, AlertTriangle, Eye, Loader2, X, Trash2, Edit as EditIcon, Image as ImageIcon } from "lucide-react";
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/PageComponents/Admin Components/Editor'), {
  ssr: false,
});

type BlogData = {
  title: string;
  slug: string;
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  authorId?: string;
  categories?: string[];
  widgets?: any[];
};

type ProcessedBlog = BlogData & {
  _status: 'READY' | 'INVALID' | 'UPLOADED' | 'SKIPPED' | 'ERROR';
  _reason?: string;
  _widgetsInjected?: number;
};

// --- AUTO WIDGET INJECTOR ---
const injectWidgets = (contentHtml: string, widgets: any[], slug: string): { html: string, injectedCount: number } => {
  if (!widgets || !Array.isArray(widgets) || widgets.length === 0) return { html: contentHtml, injectedCount: 0 };
  
  if (typeof window === "undefined") return { html: contentHtml, injectedCount: 0 };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const nodes = Array.from(doc.body.children);
    
    const injectionPoints: number[] = [];
    nodes.forEach((node, idx) => {
      if (idx === 0 || idx === nodes.length - 1) return;
      if (node.tagName.match(/^H[2-6]$/i)) {
        injectionPoints.push(idx); // Before heading
        return;
      }
      if (node.tagName === 'P') {
        const text = node.textContent?.trim() || "";
        if (text.length >= 120) {
          injectionPoints.push(idx + 0.1); // After paragraph
        }
      }
    });

    const selectedPoints: number[] = [];
    let lastUsedIndex = -999;
    
    for (const point of injectionPoints) {
      if (Math.floor(point) - Math.floor(lastUsedIndex) >= 3) {
        selectedPoints.push(point);
        lastUsedIndex = point;
        if (selectedPoints.length >= widgets.length) break;
      }
    }
    
    let injectedCount = 0;

    widgets.forEach((widget, i) => {
      const point = selectedPoints[i];
      let htmlSnippet = '';
      
      if (widget.type === 'faq') {
        const itemsHtml = (widget.items || []).map((item: any) => `
          <p style="color: #1A56DB; font-size: 1.05rem; font-weight: 500; margin: 0; padding-right: 2rem; position: relative;">${item.q || ''}</p>
          <p style="color: #37352f; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(219, 234, 254, 0.6); font-size: 15px; line-height: 1.625;">${item.a || ''}</p>
        `).join('</div><div data-type="faq" style="background-color: #F4F8FD; border-radius: 0.5rem; padding: 1rem 1.5rem; margin-bottom: 0.75rem; border: 1px solid transparent;">');
        
        htmlSnippet = `<div data-type="faq" style="background-color: #F4F8FD; border-radius: 0.5rem; padding: 1rem 1.5rem; margin-bottom: 0.75rem; border: 1px solid transparent;">${itemsHtml}</div>`;
      } else if (widget.type === 'cta') {
        htmlSnippet = `
          <div data-type="cta" style="background-color: #0f172a; border-radius: 0.375rem; padding: 3.5rem 2rem; margin: 2rem 0; text-align: center; position: relative; overflow: hidden;">
            <h2 style="color: white; font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem; margin-top: 0; position: relative; z-index: 10;">${widget.heading || 'CTA'}</h2>
            <p style="color: #e2e8f0; font-size: 1.125rem; margin-bottom: 2rem; max-width: 42rem; margin-left: auto; margin-right: auto; position: relative; z-index: 10;">${widget.description || ''}</p>
            <p style="position: relative; z-index: 10;"><a href="${widget.buttonUrl || '#'}" style="display: inline-block; background-color: #fbbf24; color: #0f172a; font-weight: bold; padding: 0.75rem 2rem; border-radius: 0.375rem; text-decoration: none;">${widget.buttonText || 'Click Here'}</a></p>
          </div>
        `;
      } else if (widget.type === 'testimonial') {
        htmlSnippet = `
          <div data-type="testimonial" style="background-color: #247CE5; border-radius: 0.75rem; padding: 3.5rem 1.5rem; margin: 2rem 0; text-align: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden;">
            <h2 style="color: white; font-size: 1.875rem; font-weight: 800; margin-bottom: 0.25rem; margin-top: 0; position: relative; z-index: 10;">${widget.heading || 'Testimonial'}</h2>
            <div style="color: #FACC15; font-size: 1.875rem; letter-spacing: 0.15em; margin: 1rem auto; position: relative; z-index: 10;">★★★★★</div>
            <p style="color: white; font-size: 1.15rem; margin-bottom: 2rem; max-width: 56rem; margin-left: auto; margin-right: auto; line-height: 1.625; font-weight: 500; position: relative; z-index: 10;">"${widget.quote || ''}"</p>
            <p style="color: white; font-size: 1.05rem; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; position: relative; z-index: 10;">${widget.author || ''}</p>
          </div>
        `;
      } else if (widget.type === 'image') {
        htmlSnippet = `
          <figure class="image-wrapper" style="margin: 2rem 0; display: flex; flex-direction: column; align-items: center;">
            <img src="${widget.src || ''}" alt="${widget.alt || ''}" style="max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);" />
            ${widget.caption ? `<figcaption style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; text-align: center;">${widget.caption}</figcaption>` : ''}
          </figure>
        `;
      }
      
      if (!htmlSnippet) return;

      const wrapper = document.createElement('div');
      wrapper.innerHTML = htmlSnippet;
      const widgetNode = wrapper.firstElementChild;
      if (!widgetNode) return;
      
      if (point !== undefined) {
        if (Number.isInteger(point)) {
          const target = nodes[point];
          target.parentNode?.insertBefore(widgetNode, target);
        } else {
          const idx = Math.floor(point);
          const target = nodes[idx];
          if (target.nextSibling) {
            target.parentNode?.insertBefore(widgetNode, target.nextSibling);
          } else {
            target.parentNode?.appendChild(widgetNode);
          }
        }
      } else {
        doc.body.appendChild(widgetNode);
      }

      injectedCount++;
    });
    
    return { html: doc.body.innerHTML, injectedCount };
  } catch (error) {
    console.error("Widget injection failed:", error);
    return { html: contentHtml, injectedCount: 0 };
  }
};


export default function BulkUploadPage() {
  const [blogs, setBlogs] = useState<ProcessedBlog[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Modal State
  const [editBlog, setEditBlog] = useState<ProcessedBlog | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'metadata' | 'content'>('metadata');
  
  // Data for Selects
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/authors').then((res) => res.json()),
      fetch('/api/categories').then((res) => res.json()),
    ]).then(([authorData, categoryData]) => {
      setAuthors(authorData || []);
      setCategories(categoryData || []);
    }).catch(err => console.error("Error fetching dependencies", err));
  }, []);

  const downloadTemplate = () => {
    const template = [
      {
        title: "The Ultimate Guide to Digital Marketing",
        slug: "ultimate-guide-digital-marketing",
        metaTitle: "Ultimate Guide to Digital Marketing | Vaphers",
        metaDescription: "Learn the secrets of modern digital marketing including SEO, content strategies, and widget implementations.",
        featuredImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772005005/Logo_edsgzp.jpg",
        authorId: "admin",
        categories: ["Marketing"],
        contentHtml: "<h2>Introduction to Modern Marketing</h2><p>Digital marketing is constantly evolving. In this guide, we will explore the core strategies that drive growth. This paragraph is intentionally long (over 120 characters) to ensure that the auto-widget injector has plenty of space to analyze and inject interactive elements like CTAs or Testimonials exactly where they fit best without breaking the flow.</p><h3>Why Content is King</h3><p>As Bill Gates famously said, <blockquote>\"Content is King\"</blockquote> This still holds true today. High-quality content builds trust and authority.</p><p>Here is a list of essential marketing tools:</p><ul><li><strong>SEO:</strong> Search Engine Optimization for organic reach.</li><li><em>PPC:</em> Pay-Per-Click advertising for quick wins.</li><li><a href=\"https://vaphers.com\" target=\"_blank\">Vaphers Platform</a>: The ultimate growth tool.</li></ul><h3>Data Tracking</h3><p>To track success, you need to measure analytics. For developers, this often means looking at the <code>dataLayer</code> or implementing custom <code>fetch()</code> requests to your tracking endpoints. Make sure to log everything accurately.</p><table style=\"width: 100%; border-collapse: collapse;\"><tbody><tr><td style=\"border: 1px solid #ccc; padding: 8px;\"><strong>Metric</strong></td><td style=\"border: 1px solid #ccc; padding: 8px;\"><strong>Target</strong></td></tr><tr><td style=\"border: 1px solid #ccc; padding: 8px;\">Bounce Rate</td><td style=\"border: 1px solid #ccc; padding: 8px;\">< 40%</td></tr><tr><td style=\"border: 1px solid #ccc; padding: 8px;\">Conversion</td><td style=\"border: 1px solid #ccc; padding: 8px;\">> 3%</td></tr></tbody></table><p>We hope this guide provides a solid foundation. Keep testing, keep optimizing, and always provide value to your readers. Another long paragraph here to act as a buffer for the auto injector to place the final widget effectively at the bottom of the article!</p>",
        widgets: [
          {
            type: "cta",
            heading: "Ready to 10x Your Traffic?",
            description: "Join Vaphers today and get access to exclusive marketing tools.",
            buttonText: "Get Started Free",
            buttonUrl: "https://vaphers.com/signup"
          },
          {
            type: "testimonial",
            heading: "What Our Clients Say",
            quote: "Using these strategies, our traffic skyrocketed by 300% in just two months. It completely changed our business trajectory.",
            author: "Jane Doe, CEO of TechCorp"
          },
          {
            type: "faq",
            items: [
              { q: "What is SEO?", a: "Search Engine Optimization is the process of improving your website to increase its visibility in Google." },
              { q: "How long does it take to see results?", a: "Typically, organic SEO takes 3 to 6 months to show significant results." }
            ]
          },
          {
            type: "image",
            src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772005005/Logo_edsgzp.jpg",
            alt: "Marketing Graph",
            caption: "Organic traffic growth over 6 months"
          }
        ]
      }
    ];
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vaphers_bulk_blog_template.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFile = (file: File) => {
    setErrorMsg(null);
    if (!file.name.endsWith('.json')) {
      setErrorMsg("Please upload a .json file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File is too large (max 10MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (!Array.isArray(json)) {
          setErrorMsg("Expected a JSON array at the top level.");
          return;
        }
        if (json.length === 0) {
          setErrorMsg("The file contains an empty array.");
          return;
        }

        const processed: ProcessedBlog[] = [];
        const seenSlugs = new Set<string>();

        json.forEach((item: any) => {
          const blog: ProcessedBlog = { ...item, _status: 'READY' };
          
          if (!blog.title || !blog.slug || !blog.contentHtml) {
            blog._status = 'INVALID';
            blog._reason = 'Missing required fields (title, slug, contentHtml)';
          } else {
            const originalSlug = blog.slug;
            blog.slug = blog.slug.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            if (originalSlug !== blog.slug) {
              blog._reason = 'Slug was auto-sanitized';
            }

            if (seenSlugs.has(blog.slug)) {
              blog._status = 'INVALID';
              blog._reason = 'Duplicate slug within this file';
            } else {
              seenSlugs.add(blog.slug);
              
              if (blog.widgets && Array.isArray(blog.widgets) && blog.widgets.length > 0) {
                const { html, injectedCount } = injectWidgets(blog.contentHtml, blog.widgets, blog.slug);
                blog.contentHtml = html;
                blog._widgetsInjected = injectedCount;
              }
            }
          }
          processed.push(blog);
        });
        setBlogs(processed);
      } catch (err) {
        setErrorMsg(`Invalid JSON: ${(err as Error).message}`);
      }
    };
    reader.readAsText(file);
  };

  const uploadBlogs = async () => {
    const readyBlogs = blogs.filter(b => b._status === 'READY' || (b._status === 'UPLOADED' || b._status === 'SKIPPED') === false);
    if (readyBlogs.length === 0) return;
    setIsUploading(true);

    try {
      const response = await fetch('/api/blogs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogs: readyBlogs.map(b => {
          const { _status, _reason, _widgetsInjected, ...apiData } = b;
          return apiData;
        })})
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed');

      const resultsMap = new Map();
      data.results?.forEach((res: any) => resultsMap.set(res.slug, res));

      setBlogs(prev => prev.map(b => {
        if (b._status === 'INVALID') return b;
        const result = resultsMap.get(b.slug);
        if (result) {
          return {
            ...b,
            _status: result.status === 'success' ? 'UPLOADED' : result.status === 'skipped' ? 'SKIPPED' : 'ERROR',
            _reason: result.reason || undefined,
          };
        }
        return b;
      }));
    } catch (error) {
      setErrorMsg((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBlog = (idx: number) => {
    const newBlogs = [...blogs];
    newBlogs.splice(idx, 1);
    setBlogs(newBlogs);
  };

  const saveEditBlog = () => {
    if (editIndex === null || !editBlog) return;
    
    // Revalidate
    const isInvalid = !editBlog.title || !editBlog.slug || !editBlog.contentHtml;
    
    const newBlogs = [...blogs];
    newBlogs[editIndex] = {
      ...editBlog,
      slug: editBlog.slug.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      _status: isInvalid ? 'INVALID' : 'READY',
      _reason: isInvalid ? 'Missing required fields' : undefined,
    };
    
    setBlogs(newBlogs);
    setEditBlog(null);
    setEditIndex(null);
  };

  const readyCount = blogs.filter(b => b._status === 'READY').length;
  const invalidCount = blogs.filter(b => b._status === 'INVALID').length;
  const uploadedCount = blogs.filter(b => b._status === 'UPLOADED').length;
  const skippedCount = blogs.filter(b => b._status === 'SKIPPED').length;
  const errorCount = blogs.filter(b => b._status === 'ERROR').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Upload Blogs</h1>
          <p className="text-gray-500 mt-1">Upload multiple blogs via JSON with automatic widget injection.</p>
        </div>
        <button onClick={downloadTemplate} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={16} /> Template JSON
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
          <AlertTriangle size={20} className="shrink-0 mt-0.5" />
          <p className="font-medium text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Drop Zone */}
      {!blogs.length && !errorMsg && (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" className="hidden" ref={fileInputRef} accept=".json" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
          <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileJson size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Click or drag JSON file to upload</h3>
          <p className="text-gray-500 text-sm">Supports automatic widget injection and safe sanitization.</p>
        </div>
      )}

      {/* Table Section */}
      {blogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-4 text-sm font-medium">
              <span className="text-gray-700">Total: {blogs.length}</span>
              {readyCount > 0 && <span className="text-blue-600">{readyCount} Ready</span>}
              {invalidCount > 0 && <span className="text-red-600">{invalidCount} Invalid</span>}
              {uploadedCount > 0 && <span className="text-green-600">{uploadedCount} Uploaded</span>}
              {skippedCount > 0 && <span className="text-yellow-600">{skippedCount} Skipped</span>}
              {errorCount > 0 && <span className="text-red-600">{errorCount} Error</span>}
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => { setBlogs([]); setErrorMsg(null); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Clear
              </button>
              <button onClick={uploadBlogs} disabled={isUploading || readyCount === 0} className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${isUploading || readyCount === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {isUploading ? 'Uploading...' : `Upload ${readyCount} Blogs`}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Slug</th>
                  <th className="px-4 py-3 font-medium">Widgets</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog, idx) => (
                  <tr key={idx} className={blog._status === 'INVALID' ? 'bg-red-50/50' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3">
                      {blog._status === 'READY' && <span className="inline-flex items-center gap-1 text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded text-xs"><CheckCircle2 size={14}/> Ready</span>}
                      {blog._status === 'INVALID' && <span className="inline-flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded text-xs"><XCircle size={14}/> Invalid</span>}
                      {blog._status === 'UPLOADED' && <span className="inline-flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded text-xs"><CheckCircle2 size={14}/> Uploaded</span>}
                      {blog._status === 'SKIPPED' && <span className="inline-flex items-center gap-1 text-yellow-700 font-medium bg-yellow-50 px-2 py-1 rounded text-xs"><AlertTriangle size={14}/> Skipped</span>}
                      {blog._status === 'ERROR' && <span className="inline-flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded text-xs"><XCircle size={14}/> Error</span>}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div className="max-w-[200px] truncate" title={blog.title}>{blog.title || <span className="text-red-400">Missing Title</span>}</div>
                      {blog._reason && <div className="text-xs text-gray-500 font-normal mt-0.5 truncate max-w-[200px]" title={blog._reason}>{blog._reason}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="max-w-[150px] truncate" title={blog.slug}>{blog.slug || <span className="text-red-400">Missing Slug</span>}</div>
                    </td>
                    <td className="px-4 py-3">
                      {blog._widgetsInjected !== undefined ? (
                        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">{blog._widgetsInjected} Injected</span>
                      ) : <span className="text-gray-400 text-xs">None</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setEditBlog({...blog}); setEditIndex(idx); setActiveTab('metadata'); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit & Preview">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => handleRemoveBlog(idx)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Remove">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal - Full Screen like TiptapWrapper */}
      {editBlog && (
        <div className="fixed inset-0 z-[100] bg-[#F8FAFC] overflow-y-auto">
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setEditBlog(null)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">Edit Blog for Bulk Upload</h2>
              </div>
              <button onClick={saveEditBlog} className="px-6 py-2 bg-[#2383e2] text-white rounded-md text-sm font-semibold hover:bg-[#1d6fc2] transition-colors shadow-sm">
                Save & Queue
              </button>
            </div>

            {/* Main Content Area mimicking Add Post Layout */}
            <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1400px] mx-auto p-4 lg:p-6 gap-6">
              
              {/* Left Column: Editor & Main Meta */}
              <div className="flex-1 min-w-0 space-y-6">
                
                {/* Editor Container (Moved to First) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                   <Editor 
                     content={editBlog.contentHtml} 
                     onChange={(html) => setEditBlog({...editBlog, contentHtml: html})} 
                     title={editBlog.title} 
                     onTitleChange={(title) => setEditBlog({...editBlog, title})} 
                   />
                </div>
                
                {/* Meta Fields (Title, Slug, SEO) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Metadata & SEO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                      <input type="text" value={editBlog.title} onChange={e => setEditBlog({...editBlog, title: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2383e2] transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                      <input type="text" value={editBlog.slug} onChange={e => setEditBlog({...editBlog, slug: e.target.value})} className="w-full font-mono border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2383e2] transition-shadow" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                      <input type="text" value={editBlog.metaTitle || ''} onChange={e => setEditBlog({...editBlog, metaTitle: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2383e2] transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                      <input type="text" value={editBlog.metaDescription || ''} onChange={e => setEditBlog({...editBlog, metaDescription: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2383e2] transition-shadow" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Sidebar Meta */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="sticky top-20 bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-5">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Publishing</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Author</label>
                        <select value={editBlog.authorId || ''} onChange={e => setEditBlog({...editBlog, authorId: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2383e2] bg-white">
                          <option value="">Select Author</option>
                          {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Category</label>
                        <select value={editBlog.categories?.[0] || ''} onChange={e => setEditBlog({...editBlog, categories: e.target.value ? [e.target.value] : []})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2383e2] bg-white">
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Featured Image URL</h4>
                    <input 
                      type="url" 
                      value={editBlog.featuredImage || ''} 
                      onChange={e => setEditBlog({...editBlog, featuredImage: e.target.value})} 
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2383e2] transition-shadow" 
                    />
                    {editBlog.featuredImage && (
                      <div className="mt-3 aspect-video rounded-md overflow-hidden bg-gray-100 border border-gray-200 relative">
                        <img src={editBlog.featuredImage} alt="Featured" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

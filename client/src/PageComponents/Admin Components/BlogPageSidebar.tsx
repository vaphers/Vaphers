'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Send, Upload, Image as ImageIcon, Calendar, Clock, FileText, CheckCircle2 } from 'lucide-react';

type Author = { id: string; name: string; avatar?: string };

type SidebarProps = {
  title: string;
  onPublish: () => void;
  featuredImage: string | null;
  setFeaturedImage: (url: string) => void;
  authors: { id: string; name: string; avatar?: string }[];
  currentAuthor: string;
  setCurrentAuthor: (id: string) => void;
  addAuthor: (name: string) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  addCategory: (name: string) => void;
  className?: string;
  publishButtonText?: string;
  status?: 'published' | 'draft' | 'scheduled';
  setStatus?: (status: 'published' | 'draft' | 'scheduled') => void;
  scheduledAt?: string;
  setScheduledAt?: (dt: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  title,
  onPublish,
  featuredImage,
  setFeaturedImage,
  authors,
  currentAuthor,
  setCurrentAuthor,
  categories,
  selectedCategories,
  setSelectedCategories,
  publishButtonText,
  status = 'published',
  setStatus,
  scheduledAt = '',
  setScheduledAt,
}) => {
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [internalStatus, setInternalStatus] = useState<'published' | 'draft' | 'scheduled'>(status);
  const [internalScheduledAt, setInternalScheduledAt] = useState(scheduledAt);

  const currentStatus = status || internalStatus;
  const handleStatusChange = (val: 'published' | 'draft' | 'scheduled') => {
    if (setStatus) setStatus(val);
    setInternalStatus(val);
  };

  const handleScheduledAtChange = (val: string) => {
    if (setScheduledAt) setScheduledAt(val);
    setInternalScheduledAt(val);
  };

  const [authorsData, setAuthorsData] = useState<Author[]>(authors);
  const [categoriesData, setCategoriesData] = useState<string[]>(categories);

  const displayTitle =
    !title ||
    title === 'Add a spectacular title...' ||
    title === 'Add an interior marketing title...' ||
    title === 'Add a question title...' ||
    title === 'Untitled'
      ? 'Untitled Post'
      : title;

  useEffect(() => {
    fetch('/api/authors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const asad = data.find(
            (a: any) =>
              a.name?.toLowerCase().includes('asad') ||
              a.id?.toLowerCase().includes('asad')
          );
          const merged = asad
            ? data
            : [{ id: 'muhammad-asad', name: 'Muhammad Asad' }, ...data];
          setAuthorsData(merged);

          if (!currentAuthor || currentAuthor === 'admin') {
            setCurrentAuthor(asad ? asad.id : 'muhammad-asad');
          }
        } else {
          const defaultList = [{ id: 'muhammad-asad', name: 'Muhammad Asad' }];
          setAuthorsData(defaultList);
          if (!currentAuthor || currentAuthor === 'admin') {
            setCurrentAuthor('muhammad-asad');
          }
        }
      })
      .catch(() => {
        const defaultList = [{ id: 'muhammad-asad', name: 'Muhammad Asad' }];
        setAuthorsData(defaultList);
        if (!currentAuthor || currentAuthor === 'admin') {
          setCurrentAuthor('muhammad-asad');
        }
      });

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const fetchedNames = data.map((c: any) => c.name);
          setCategoriesData((prev) => Array.from(new Set([...prev, ...fetchedNames])));
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addAuthor = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return alert('Author name is required');
    try {
      const res = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) throw new Error('Failed to add author');
      const data = await res.json();
      const newAuthor: Author = { id: data.id, name: trimmed };
      setAuthorsData([...authorsData, newAuthor]);
      setCurrentAuthor(data.id);
      setNewAuthorName('');
    } catch (e) {
      alert('Error adding author');
      console.error(e);
    }
  };

  const addCategory = async (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return alert('Category name is required');
    if (categoriesData.includes(trimmedName)) return alert('Category already exists');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName }),
      });
      if (!res.ok) throw new Error('Failed to add category');
      setCategoriesData([...categoriesData, trimmedName]);
      setSelectedCategories([...selectedCategories, trimmedName]);
      setNewCategory('');
    } catch (e) {
      alert('Error adding category');
      console.error(e);
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.secure_url) {
        setFeaturedImage(json.secure_url);
      } else {
        console.error('Cloudinary upload error', json);
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Image upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside
      className={`w-full md:w-[340px] lg:w-[360px] shrink-0 border-t md:border-t-0 md:border-l border-gray-200 bg-white md:h-full md:overflow-y-auto no-scrollbar z-20 ${className}`}
    >
      <div className="p-5 md:p-6 flex flex-col gap-6 no-scrollbar pb-24 md:pb-12">
        {/* Post Title Preview */}
        <section className="space-y-1.5">
          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Post Title</Label>
          <h3
            className="text-[16px] font-bold text-[#37352f] leading-snug line-clamp-3 break-words"
            title={displayTitle}
          >
            {displayTitle}
          </h3>
        </section>

        <Separator className="hidden md:block" />

        {/* Featured Image and Author Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
          {/* Featured Image */}
          <section className="space-y-2.5">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Featured Image
            </Label>
            <div className="relative group flex flex-col items-center justify-center w-full h-38 border-2 border-dashed border-[#2383e2]/60 hover:border-[#2383e2] rounded-lg bg-blue-50/20 hover:bg-blue-50/40 transition-colors overflow-hidden cursor-pointer">
              {featuredImage ? (
                <>
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium px-2.5 py-1 rounded bg-black/40 backdrop-blur-xs">
                      Change Image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-500 gap-1.5 p-3 text-center">
                  <ImageIcon className="w-8 h-8 text-[#2383e2]" />
                  <span className="text-xs font-medium text-gray-700">
                    {isUploading ? 'Uploading...' : 'Click to upload image'}
                  </span>
                  <span className="text-[11px] text-gray-400">PNG, JPG, WebP up to 10MB</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          </section>

          {/* Author Selection */}
          <section className="space-y-2.5">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Author</Label>
            <Select value={currentAuthor} onValueChange={setCurrentAuthor}>
              <SelectTrigger className="w-full h-10 border-gray-200">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {authorsData.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        {author.avatar ? (
                          <AvatarImage src={author.avatar} alt={author.name} />
                        ) : (
                          <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700 font-semibold">
                            {author.name[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-xs font-medium">{author.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs font-medium border-[#2383e2] text-[#2383e2] hover:bg-[#2383e2] hover:text-white rounded-md cursor-pointer transition-colors"
                >
                  + Add New Author
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new author</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="e.g. Jane Doe"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAuthor(newAuthorName)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    className="bg-[#2383e2] hover:bg-[#1a66b2] text-white cursor-pointer"
                    onClick={() => addAuthor(newAuthorName)}
                  >
                    Create Author
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </div>

        <Separator className="hidden lg:block" />

        {/* Post Status & Scheduling Section */}
        <section className="space-y-3">
          <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Publication Status
          </Label>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => handleStatusChange('published')}
              className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === 'published'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle2 size={13} className={currentStatus === 'published' ? 'text-emerald-600' : 'text-gray-400'} />
              Publish
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange('draft')}
              className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === 'draft'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText size={13} className={currentStatus === 'draft' ? 'text-amber-600' : 'text-gray-400'} />
              Draft
            </button>

            <button
              type="button"
              onClick={() => {
                handleStatusChange('scheduled');
                if (!internalScheduledAt) {
                  // Default to tomorrow 10:00 AM
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(10, 0, 0, 0);
                  const formatted = tomorrow.toISOString().slice(0, 16);
                  handleScheduledAtChange(formatted);
                }
              }}
              className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === 'scheduled'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar size={13} className={currentStatus === 'scheduled' ? 'text-blue-600' : 'text-gray-400'} />
              Schedule
            </button>
          </div>

          {currentStatus === 'scheduled' && (
            <div className="space-y-1.5 p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg animate-in fade-in duration-200">
              <label className="text-[11px] font-semibold text-blue-900 flex items-center gap-1">
                <Clock size={12} className="text-blue-600" />
                Select Date & Time (Auto-Publishes):
              </label>
              <input
                type="datetime-local"
                value={internalScheduledAt ? internalScheduledAt.slice(0, 16) : ''}
                onChange={(e) => handleScheduledAtChange(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full bg-white border border-blue-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          )}
        </section>

        <Separator className="hidden lg:block" />

        {/* Categories Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <section className="space-y-2.5">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Categories
            </Label>

            <div className="h-[180px] overflow-y-auto rounded-md border border-gray-200 bg-gray-50/60 p-3 no-scrollbar space-y-2.5">
              {categoriesData.map((cat) => (
                <label
                  key={cat}
                  htmlFor={`cat-${cat}`}
                  className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-700 hover:text-gray-900 select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    id={`cat-${cat}`}
                    className="w-4 h-4 rounded border-gray-300 text-[#2383e2] focus:ring-[#2383e2] cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
              {categoriesData.length === 0 && (
                <p className="text-xs text-gray-400 italic">No categories yet.</p>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <Input
                placeholder="New category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCategory(newCategory)}
                className="h-8.5 text-xs"
              />
              <Button
                size="sm"
                className="h-8.5 px-3.5 bg-[#2383e2] hover:bg-[#1a66b2] text-white text-xs cursor-pointer"
                onClick={() => addCategory(newCategory)}
              >
                Add
              </Button>
            </div>
          </section>

          {/* Publish Action Button */}
          <section className="space-y-2.5 flex flex-col justify-end">
            <Button
              onClick={onPublish}
              className={`w-full text-white font-semibold py-4.5 flex items-center justify-center gap-2 transition-colors rounded-lg cursor-pointer shadow-xs ${
                currentStatus === 'draft'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : currentStatus === 'scheduled'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-[#2383e2] hover:bg-[#1a66b2]'
              }`}
            >
              {currentStatus === 'draft' ? (
                <>
                  <FileText size={15} />
                  {publishButtonText || 'Save as Draft'}
                </>
              ) : currentStatus === 'scheduled' ? (
                <>
                  <Calendar size={15} />
                  {publishButtonText || 'Schedule Publication'}
                </>
              ) : (
                <>
                  <Send size={15} />
                  {publishButtonText || 'Publish Post Now'}
                </>
              )}
            </Button>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
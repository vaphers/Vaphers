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
import { ScrollArea } from '@/components/ui/scroll-area';

type Author = { id: string; name: string; avatar?: string };

type SidebarProps = {
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
};

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  featuredImage,
  setFeaturedImage,
  authors,
  currentAuthor,
  setCurrentAuthor,
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  // Local dialog/input states
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Local copies of authors and categories
  const [authorsData, setAuthorsData] = useState<Author[]>(authors);
  const [categoriesData, setCategoriesData] = useState<string[]>(categories);

  // Fetch authors and categories on mount
  useEffect(() => {
    fetch('/api/authors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAuthorsData(data);
          if (!currentAuthor && data.length > 0) setCurrentAuthor(data[0].id);
        }
      })
      .catch(console.error);

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategoriesData(data.map((c: any) => c.name));
        }
      })
      .catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addAuthor = async (name: string) => {
    if (!name.trim()) return alert('Author name is required');
    try {
      const res = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to add author');
      const data = await res.json();
      const newAuthor: Author = { id: data.id, name };
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
      className={`w-[340px] shrink-0 border-l border-gray-200 bg-white sticky top-0 h-screen overflow-y-auto ${className}`}
    >
      <div className="p-6 space-y-8">
        
        {/* Featured Image Section */}
        <section className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900 tracking-tight">
            Featured Image
          </Label>
          <div className="relative group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden cursor-pointer">
            {featuredImage ? (
              <>
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Change Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-sm">{isUploading ? 'Uploading...' : 'Click to upload'}</span>
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

        <Separator />

        {/* Author Selection Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-gray-900 tracking-tight">Author</Label>
          </div>
          <Select value={currentAuthor} onValueChange={setCurrentAuthor}>
            <SelectTrigger className="w-full">
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
                        <AvatarFallback className="text-[10px]">{author.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <span>{author.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="w-full text-xs font-medium">
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
                <Button onClick={() => addAuthor(newAuthorName)}>Create Author</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <Separator />

        {/* Categories Section */}
        <section className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900 tracking-tight">Categories</Label>
          
          <ScrollArea className="h-[280px] rounded-md border border-gray-200 bg-gray-50/50 p-3">
            <div className="space-y-3 p-2">
              {categoriesData.map((cat) => (
                <div key={cat} className="flex items-center gap-3 ">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    id={`cat-${cat}`}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <Label
                    htmlFor={`cat-${cat}`}
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
              {categoriesData.length === 0 && (
                <p className="text-sm text-gray-500 italic">No categories yet.</p>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-1">
            <Input
              placeholder="New category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory(newCategory)}
              className="h-9"
            />
            <Button size="sm" className="h-9 px-4" onClick={() => addCategory(newCategory)}>
              Add
            </Button>
          </div>
        </section>
        
      </div>
    </aside>
  );
};

export default Sidebar;
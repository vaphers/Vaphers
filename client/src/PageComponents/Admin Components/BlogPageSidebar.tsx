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
import { Card } from '@/components/ui/card';
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
  addAuthor: (name: string) => void;          // Add these two function props
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  addCategory: (name: string) => void;        // Add this
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

  // Fetch authors and categories on mount
  useEffect(() => {
    // Fetch authors
    fetch('/api/authors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Normally you'd lift authors state up; here simply replace array
          setAuthorsData(data);
          // Select first author if none selected yet
          if (!currentAuthor && data.length > 0) setCurrentAuthor(data[0].id);
        }
      })
      .catch(console.error);

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Map array of {id,name} to string array of names for checkboxes
          setCategoriesData(data.map((c: any) => c.name));
        }
      })
      .catch(console.error);
  }, []); // run once on load

  // Because authors and categories come as props but we want to replace them, local copies:
  const [authorsData, setAuthorsData] = useState<Author[]>(authors);
  const [categoriesData, setCategoriesData] = useState<string[]>(categories);

  // Add a new author POST to backend + update UI
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

  // Add new category POST to backend + update UI
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
      const data = await res.json();
      setCategoriesData([...categoriesData, trimmedName]);
      // Select newly added category by default
      setSelectedCategories([...selectedCategories, trimmedName]);
      setNewCategory('');
    } catch (e) {
      alert('Error adding category');
      console.error(e);
    }
  };

  // Cloudinary upload for featured image (you already have this)
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      e.target.value = '';
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside
      className={`w-[340px] p-4 space-y-6 border-l border-gray-300 bg-white min-h-[650px] ${className}`}
    >
      {/* Featured Image */}
      <Card className="p-4 space-y-3">
        <Label className="font-semibold">Featured image</Label>
        {featuredImage ? (
          <img
            src={featuredImage}
            alt="Featured"
            className="rounded w-full h-32 object-cover"
          />
        ) : (
          <div className="bg-gray-100 border-dashed border-2 border-gray-300 rounded w-full h-32 flex flex-col items-center justify-center text-gray-400">
            No image selected
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleFeaturedImageUpload}
          className="mt-1"
        />
      </Card>

      <Separator />

      {/* Author Selection */}
      <Card className="p-4 space-y-3">
        <Label className="font-semibold">Author</Label>
        <Select value={currentAuthor} onValueChange={setCurrentAuthor}>
          <SelectTrigger>
            <SelectValue placeholder="Select author" />
          </SelectTrigger>
          <SelectContent>
            {authorsData.map(author => (
              <SelectItem key={author.id} value={author.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    {author.avatar ? (
                      <AvatarImage src={author.avatar} alt={author.name} />
                    ) : (
                      <AvatarFallback>{author.name[0]}</AvatarFallback>
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
            <Button size="sm" variant="outline" className="w-full">
              Create Author
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new author</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Author name"
              value={newAuthorName}
              onChange={e => setNewAuthorName(e.target.value)}
              className="mt-3"
            />
            <DialogFooter>
              <Button onClick={() => addAuthor(newAuthorName)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <Separator />

      {/* Categories */}
      <Card className="p-4 space-y-3">
        <Label className="font-semibold">Categories</Label>
        <ScrollArea className="h-32 rounded border p-2">
          {categoriesData.map(cat => (
            <div key={cat} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                id={`cat-${cat}`}
              />
              <Label htmlFor={`cat-${cat}`} className="cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-1 mt-2">
          <Input
            placeholder="New category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <Button size="sm" onClick={() => addCategory(newCategory)}>
            Add
          </Button>
        </div>
      </Card>
    </aside>
  );
};

export default Sidebar;

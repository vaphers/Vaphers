'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarProps = {
  featuredImage: string | null;
  setFeaturedImage: (url: string) => void;
  authors: { id: string, name: string, avatar?: string }[];
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
  addAuthor,
  categories,
  selectedCategories,
  setSelectedCategories,
  addCategory,
 

}) => {
  // State for dialogs/inputs
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Simulated upload (replace with real Cloudinary/File upload)
  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFeaturedImage(URL.createObjectURL(file));
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside className="w-[340px] p-4 space-y-6 border-l border-gray-300 bg-white min-h-[650px] ${className}">
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
        <Input type="file" accept="image/*" onChange={handleFeaturedImageUpload} className="mt-1" />
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
            {authors.map(author => (
              <SelectItem key={author.id} value={author.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{author.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="w-full">Create Author</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new author</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Author name"
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
              className="mt-3"
            />
            <DialogFooter>
              <Button onClick={() => {
                if (newAuthorName) { addAuthor(newAuthorName); setNewAuthorName(''); }
              }}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <Separator />

      {/* Categories */}
      <Card className="p-4 space-y-3">
        <Label className="font-semibold">Categories</Label>
        <ScrollArea className="h-32 rounded border p-2">
          {categories.map(cat => (
            <div key={cat} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                id={`cat-${cat}`}
              />
              <Label htmlFor={`cat-${cat}`} className="cursor-pointer">{cat}</Label>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-1 mt-2">
          <Input
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button size="sm" onClick={() => {
            if (newCategory) { addCategory(newCategory); setNewCategory(''); }
          }}>Add</Button>
        </div>
      </Card>
      {/* Add other controls: Excerpt, Status, Publish option, etc. */}
    </aside>
  );
};

export default Sidebar;

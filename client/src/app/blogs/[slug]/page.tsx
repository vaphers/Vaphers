'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const BlogDetail = () => {
  const params = useParams();
  const router = useRouter();
  // Safely get slug or redirect if missing
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : undefined;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (!slug) {
      router.replace("/blogs");
      return;
    }
    fetch(`/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => setBlog(data));
  }, [slug, router]);

  if (!slug) return null;
  if (!blog) return <div>Loading...</div>;
  if (blog.error) return <div>Not Found</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      {blog.featuredImage && (
        <img src={blog.featuredImage} alt={blog.title} className="w-full rounded-lg mb-6" />
      )}
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <div className="flex gap-2 mb-4">
        {blog.categories.map((cat: string) => (
          <Badge key={cat} className="bg-blue-100 text-blue-700">{cat}</Badge>
        ))}
      </div>
      <div className="text-lg mb-6 text-muted-foreground">{blog.metaDescription}</div>
      <div className="prose prose-xl" dangerouslySetInnerHTML={{ __html: blog.contentHtml ?? '' }} />
    </div>
  );
};
export default BlogDetail;

// lib/schemaGenerator.ts
interface SchemaParams {
  title: string;
  description: string;
  author: string;
  slug: string;
  category: string;
  featuredImage: string;
}

export function generateSchema(params: SchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    author: {
      "@type": "Person",
      name: params.author,
    },
    url: `https://yourdomain.com/blog/${params.slug}`,
    articleSection: params.category,
    mainEntityOfPage: `https://yourdomain.com/blog/${params.slug}`,
    thumbnailUrl: params.featuredImage,
    datePublished: new Date().toISOString(),    
  };
}

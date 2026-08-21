import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import ContactSection from '@/PageComponents/Landing Home/ContactSection';
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc';
import BlogLeadForm from '@/PageComponents/Blogs Components/BlogLeadForm';
import SummarizeButtons from '@/PageComponents/Blogs Components/SummarizeButtons';
import GooglePreferredSourceBadge from '@/PageComponents/Global Components/GooglePreferredSourceBadge';
import { Calendar, User, Clock, ChevronRight, Compass } from 'lucide-react';
import { getInteriorBlogBySlug, getAllInteriorBlogs } from '@/lib/interiorBlogs';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

// --- DATA FETCHING FUNCTIONS ---
async function fetchInteriorBlog(slug: string) {
  return await getInteriorBlogBySlug(slug);
}

async function fetchLatestInteriorBlogs(excludeSlug: string) {
  try {
    const all = await getAllInteriorBlogs({ limit: 7 });
    return all
      .filter((b) => b.slug !== excludeSlug)
      .slice(0, 6)
      .map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        featuredImage: b.featuredImage || null,
        categories: b.categories || [],
        createdAt: b.createdAt,
      }));
  } catch (error) {
    console.error('Error fetching latest interior blogs:', error);
    return [];
  }
}

// --- TOC GENERATOR ---
function processHtmlForToc(html: string) {
  if (!html) return { toc: [], processedHtml: '' };

  const toc: { id: string; text: string; level: number }[] = [];
  const headingRegex = /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi;

  const processedHtml = html.replace(headingRegex, (match, tag, attrs, innerHtml) => {
    const cleanText = innerHtml.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) return match;

    const id = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    toc.push({ id, text: cleanText, level: parseInt(tag.charAt(1), 10) });
    return `<${tag} id="${id}"${attrs}>${innerHtml}</${tag}>`;
  });

  return { toc, processedHtml };
}

// --- READ TIME CALCULATOR ---
function calculateReadTime(html: string) {
  if (!html) return '1 min read';
  const text = html.replace(/<[^>]+>/g, ' ');
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 225);
  return `${minutes || 1} min read`;
}

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchInteriorBlog(slug);

  if (!blog) {
    return {
      title: 'Interior Design Marketing Article Not Found | Vaphers',
      description: 'The requested interior design marketing article could not be found.',
    };
  }

  const pageUrl = `https://www.vaphers.com/interior-design-marketing/${slug}`;

  return {
    title: `${blog.metaTitle || blog.title} | Vaphers Interior Marketing`,
    description: blog.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      url: pageUrl,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : undefined,
    },
  };
}

// --- PAGE COMPONENT ---
export default async function InteriorBlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchInteriorBlog(slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-white font-sans text-gray-900">
        <NavBar />
        <div className="max-w-2xl mx-auto py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The interior design marketing guide you are looking for might have been moved or removed.
          </p>
          <Link
            href="/interior-design-marketing/blogs"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse All Interior Marketing Articles
          </Link>
        </div>
        <ContactSection />
        <Footer />
      </main>
    );
  }

  const { toc, processedHtml } = processHtmlForToc(blog.contentHtml ?? '');
  const latestBlogs = await fetchLatestInteriorBlogs(blog.slug);

  let formattedDate: string | null = null;
  if (blog.createdAt) {
    const d = new Date(blog.createdAt);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }

  const blogUrl = `https://www.vaphers.com/interior-design-marketing/${slug}`;
  const dynamicReadTime = calculateReadTime(blog.contentHtml ?? '');

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vaphers.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Interior Design Marketing',
        item: 'https://www.vaphers.com/interior-design-marketing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blogs',
        item: 'https://www.vaphers.com/interior-design-marketing/blogs',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: blog.title,
        item: blogUrl,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.featuredImage ? [blog.featuredImage] : [],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      '@type': 'Person',
      name: blog.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vaphers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772005005/Logo_edsgzp.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth lg:-mt-36">
      <Script
        id="interior-blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="interior-blog-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <NavBar />

      {/* TOP HEADER & GRADIENT SECTION */}
      <div className="relative w-full pt-12 pb-6 bg-gradient-to-b from-blue-600 via-blue-400 via-blue-200 via-blue-50 to-white lg:pt-46">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center justify-center text-xs text-white font-semibold tracking-wider uppercase mb-10 drop-shadow-sm">
            <Link href="/" className="hover:text-blue-100 transition">Home</Link>
            <ChevronRight className="w-3 h-3 mx-2 text-white/70" />
            <Link href="/interior-design-marketing" className="hover:text-blue-100 transition">Interior Marketing</Link>
            <ChevronRight className="w-3 h-3 mx-2 text-white/70" />
            <Link href="/interior-design-marketing/blogs" className="hover:text-blue-100 transition">Blogs</Link>
            <ChevronRight className="w-3 h-3 mx-2 text-white/70" />
            <span className="truncate max-w-[220px] sm:max-w-none text-white font-medium">{blog.title}</span>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] mb-8 text-white">
            {blog.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 text-gray-600 text-sm mb-8 pb-8 border-b border-gray-200/60 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-100">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <strong className="text-gray-900 font-medium">{blog.authorName}</strong>
              </span>

              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              )}

              <span className="flex items-center gap-1.5 hidden sm:flex">
                <Clock className="w-4 h-4" />
                {dynamicReadTime}
              </span>
            </div>

            {/* AI Summary Buttons */}
            <SummarizeButtons title={blog.title} blogUrl={blogUrl} />
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8 xl:gap-16">
            {/* LEFT SIDEBAR: TOC & Share */}
            <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 space-y-10 order-3 lg:order-1 mt-10 lg:mt-0">
              {toc.length > 0 && (
                <div className="hidden lg:block border border-gray-200 rounded-md p-5 bg-gray-50/50">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Table of Contents
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600 font-medium max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={`hover:text-blue-600 transition ${
                          item.level === 3 ? 'ml-4 text-gray-500 text-[13px]' : 'text-gray-700'
                        }`}
                      >
                        <a href={`#${item.id}`} className="block line-clamp-2 leading-relaxed">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Share this article
                </h4>
                <div className="flex items-center gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    <img
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000879/Platform_Facebook_Color_Original_kwwle4.svg"
                      alt="Share on Facebook"
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    <img
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000877/Platform_X_Twitter_Color_Original_qdvllx.png"
                      alt="Share on X"
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    <img
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000875/Platform_LinkedIn_Color_Original_gbuviy.svg"
                      alt="Share on LinkedIn"
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    <img
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000873/Platform_Reddit_Color_Original_m07wa6.png"
                      alt="Share on Reddit"
                      className="w-6 h-6 object-contain"
                    />
                  </a>
                </div>
              </div>
            </aside>

            {/* CENTER: MAIN ARTICLE CONTENT */}
            <article className="w-full max-w-[800px] flex-1 shrink-1 order-1 lg:order-2">
              {blog.featuredImage && (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg mb-10 border border-gray-100 shadow-sm"
                  loading="eager"
                />
              )}

              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-figure:my-8 prose-figure:flex prose-figure:flex-col prose-figure:items-center prose-figcaption:text-[15px] prose-figcaption:text-gray-500 prose-figcaption:mt-3 prose-figcaption:text-center prose-img:rounded-lg prose-img:shadow-sm"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              <div className="mt-16 border-t border-gray-200 pt-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772005005/Logo_edsgzp.jpg"
                    alt="Vaphers Logo"
                    className="w-16 h-16 rounded-md object-cover border border-gray-200 shrink-0"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      About Vaphers Interior Design Marketing
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Vaphers specializes in high-impact SEO, luxury branding, Google Ads, and custom digital marketing solutions crafted exclusively for interior designers, architects, and home staging professionals. We turn your design portfolio into a reliable client-acquisition engine.
                    </p>
                    <Link
                      href="/interior-design-marketing"
                      className="inline-block mt-3 text-blue-600 font-medium text-sm hover:underline"
                    >
                      Explore Interior Marketing Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* RIGHT SIDEBAR: Preferred Source & Lead Card */}
            <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 space-y-6 order-2 lg:order-3 mt-10 lg:mt-0">
              <GooglePreferredSourceBadge />

              <div className="border border-gray-200 bg-white rounded-md p-5 shadow-sm">
                <img
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000439/ChatGPT_Image_Feb_25_2026_11_50_44_AM_tgsao7.png"
                  alt="Interior Design Marketing Growth"
                  className="w-full rounded-md mb-4 border border-gray-100"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center leading-snug">
                  Get High-Ticket Interior Clients
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed text-center">
                  Learn how custom SEO &amp; PPC can book your interior design studio for months in advance.
                </p>
                <BlogLeadForm />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Recent Posts Grid */}
      {latestBlogs.length > 0 && (
        <section className="w-full py-16 bg-white border-t border-gray-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <h3 className="text-2xl lg:text-4xl font-bold text-gray-900">
                More in Interior Design Marketing
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {latestBlogs.map((item) => {
                const d = item.createdAt ? new Date(item.createdAt) : null;
                const sidebarDate = d && !isNaN(d.getTime())
                  ? d.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '';

                return (
                  <Link
                    key={item.id}
                    href={`/interior-design-marketing/${item.slug}`}
                    className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
                  >
                    {item.featuredImage ? (
                      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-gray-100">
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/10] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                        <Compass className="w-10 h-10 opacity-70" />
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="text-[17px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                        {item.title}
                      </h4>

                      <div className="mt-auto text-sm font-medium text-gray-500">
                        {sidebarDate && <span>{sidebarDate} &bull; </span>}
                        <span>5 min read</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <MarketingPriceCalculator />
      <ContactSection />
      <Footer />
    </div>
  );
}

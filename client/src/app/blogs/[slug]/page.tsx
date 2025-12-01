import { Badge } from "@/components/ui/badge";
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Single blog by slug
async function fetchBlog(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

// Authors list
async function fetchAuthors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/authors`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

// Latest blogs excluding current, by id
async function fetchLatestBlogsExcludeCurrent(currentId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?limit=5`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  const blogs = Array.isArray(data.blogs) ? data.blogs : [];
  return blogs.filter((b: any) => b && b.id && b.id !== currentId);
}

// Blog with authorName
async function fetchBlogWithAuthor(slug: string) {
  const blog = await fetchBlog(slug);
  if (!blog) return null;

  const authors = await fetchAuthors();
  const author = authors.find((a: any) => a.id === blog.authorId);

  return { ...blog, authorName: author?.name ?? "Unknown" };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog || blog.error) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : undefined,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const blog = await fetchBlogWithAuthor(slug);
  if (!blog || blog.error) {
    return (
      <>
        <NavBar />
        <main className="max-w-2xl mx-auto py-32 text-center text-2xl text-red-600">
          Blog Not Found
        </main>
        <Footer />
      </>
    );
  }

  const latestBlogs = await fetchLatestBlogsExcludeCurrent(blog.id);

  // Date for main post
  const createdAtDate =
    blog.createdAt && typeof blog.createdAt.toDate === "function"
      ? blog.createdAt.toDate()
      : blog.createdAt && blog.createdAt.seconds
      ? new Date(blog.createdAt.seconds * 1000)
      : null;

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* MAIN CONTENT */}
          <article className="lg:col-span-3">
            <h1 className="text-4xl sm:text-5xl font-base leading-tight mb-4 tracking-tight text-gray-900">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-10">
              <span>
                By{" "}
                <strong className="text-gray-900 font-semibold">
                  {blog.authorName}
                </strong>
              </span>
              {formattedDate && <span>• {formattedDate}</span>}
              {blog.categories?.length > 0 && (
                <div className="flex gap-2">
                  {blog.categories.map((cat: string) => (
                    <Badge
                      key={cat}
                      className="bg-gray-100 text-gray-700 cursor-default"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full aspect-video object-cover rounded-lg shadow mb-10"
                loading="eager"
              />
            )}

            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.contentHtml ?? "" }}
            />
          </article>

          {/* RECENT POSTS SIDEBAR */}
          <aside className="lg:col-span-1 border-l">
            <div className="sticky top-30 pl-5">
              <h4 className="text-3xl  font-base mb-6 text-gray-900">
                Recent Posts - 
              </h4>

              {latestBlogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No other posts yet.</p>
              ) : (
                <ul className="space-y-6">
                  {latestBlogs.map((item: any) => {
                    // Compute date for each sidebar post
                    const d =
                      item.createdAt && typeof item.createdAt.toDate === "function"
                        ? item.createdAt.toDate()
                        : item.createdAt && item.createdAt.seconds
                        ? new Date(item.createdAt.seconds * 1000)
                        : null;

                    const sidebarDate = d
                      ? d.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "";

                    return (
                      <li key={item.id}>
                        <a
                          href={`/blogs/${item.slug}`}
                          className="block group"
                        >
                          <h3 className="text-2xl font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-300">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {blog.authorName}
                            {sidebarDate ? ` | ${sidebarDate}` : ""}
                          </p>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}



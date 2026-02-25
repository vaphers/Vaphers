import { Badge } from "@/components/ui/badge";
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";
import type { Metadata } from "next";
import ContactForm from "@/PageComponents/Global Components/Contact";
import CTA from "@/PageComponents/Global Components/CTA";
import { Calendar } from "lucide-react";
import BlogLeadForm from "@/PageComponents/Blogs Components/BlogLeadForm";

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

// Latest blogs excluding current
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

// Blog with author
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
        <ContactForm />
        <Footer />
      </>
    );
  }

  const latestBlogs = await fetchLatestBlogsExcludeCurrent(blog.id);

  // Date formatting
  let createdAtDate: Date | null = null;

  if (blog.createdAt?._seconds) {
    createdAtDate = new Date(blog.createdAt._seconds * 1000);
  }

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // ChatGPT Summary Kind Of 

const blogUrl = `https://www.vaphers.com/blogs/${slug}`;

const summaryPrompt = `
Summarize this helpful article from SEO and PPC leader Vaphers:

Title: "${blog.title}"
URL: ${blogUrl}

Please provide:
• A concise summary
• Key takeaways
• Who this article is for
`;

const encodedPrompt = encodeURIComponent(summaryPrompt);

const chatGptUrl = `https://chat.openai.com/?q=${encodedPrompt}`;

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* ARTICLE */}
            <article className="w-full max-w-4xl mx-auto lg:mx-0 flex-1">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 tracking-tight text-gray-900">
                {blog.title}
              </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-8">

                  {/* Author */}
                  <span>
                     {" "}
                    <strong className="text-gray-900 font-semibold">
                      Author: {blog.authorName}
                    </strong>
                  </span>
                  {/* Date */}
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-gray-800">
                      <Calendar className="w-4 h-4 text-gray-800" />
                      Published: {formattedDate}
                    </span>
                  )}

                  {/* ChatGTP Summarization */}
                  <a
                    href={chatGptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-gray-700 rounded-full text-xs font-semibold hover:bg-blue-100 transition"
                  >
                    <img
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png"
                      alt="ChatGPT"
                      className="w-4 h-4"
                    />
                    Summarize with ChatGPT
                  </a>

                </div>

              {blog.featuredImage && (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full aspect-video object-cover rounded-xl shadow mb-8"
                  loading="eager"
                />
              )}

              <div
                className="prose prose-base sm:prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: blog.contentHtml ?? "" }}
              />

              {/* Author / Company Bio Section */}
              <div className="mt-2 border-t pt-10">
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-sm border">
                  
                  {/* Profile Image */}
                  <img
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772005005/Logo_edsgzp.jpg"
                    alt="Vaphers Logo"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Content */}
                  <div>
                    {/* <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      About Vaphers
                    </h3> */}

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      The Vaphers team consists of SEO strategists, PPC specialists, web designers, 
                      and analytics experts dedicated to driving measurable digital growth. 
                      Using data-driven strategies, advanced search marketing techniques, and 
                      conversion-focused design, Vaphers helps businesses increase visibility, 
                      generate qualified leads, and scale revenue sustainably.
                    </p>

                    <div className="mt-4">
                      <a
                        href="https://www.vaphers.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold text-sm hover:underline"
                      >
                        www.vaphers.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </article>

            {/* SIDEBAR */}
            <aside className="w-full max-w-sm mx-auto lg:mx-0">
              <div className="lg:sticky lg:top-32 space-y-8">

                {/* Share Section */}
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                    Share this article
                  </h4>

                  <div className="flex items-center gap-5">

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                    >
                      <img
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000879/Platform_Facebook_Color_Original_kwwle4.svg"
                        alt="Share on Facebook"
                        className="w-7 h-7"
                      />
                    </a>

                    {/* X */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${blogUrl}&text=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                    >
                      <img
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000877/Platform_X_Twitter_Color_Original_qdvllx.png"
                        alt="Share on X"
                        className="w-7 h-7 object-contain"
                      />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                    >
                      <img
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000875/Platform_LinkedIn_Color_Original_gbuviy.svg"
                        alt="Share on LinkedIn"
                        className="w-7 h-7"
                      />
                    </a>

                    {/* Reddit */}
                    <a
                      href={`https://www.reddit.com/submit?url=${blogUrl}&title=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                    >
                      <img
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000873/Platform_Reddit_Color_Original_m07wa6.png"
                        alt="Share on Reddit"
                        className="w-7 h-7 object-contain"
                      />
                    </a>

                  </div>
                </div>

                {/* Lead Card */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border">

                  <img
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000439/ChatGPT_Image_Feb_25_2026_11_50_44_AM_tgsao7.png"
                    alt="Local SEO growth"
                    className="w-full rounded-xl mb-6"
                  />

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    Outrank Your Competitors This Season
                  </h3>

                  <p className="text-gray-600 text-sm mb-6 text-center">
                    See how you can dominate Google search results and book more jobs.
                  </p>
                  <BlogLeadForm/>

                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* Recent Posts */}
      <section className="w-full py-12 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <h3 className="text-3xl sm:text-3xl md:text-5xl font-bold mb-10 text-gray-800 bungee-inline-regular text-center sm:text-left">
            What To Read Next?
          </h3>

          {latestBlogs.length === 0 ? (
            <p className="text-gray-500">No other posts yet.</p>
          ) : (
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-6 
              sm:gap-8
            ">
              {latestBlogs.slice(0, 6).map((item: any) => {
                const d =
                  item.createdAt?._seconds
                    ? new Date(item.createdAt._seconds * 1000)
                    : null;

                const sidebarDate = d
                  ? d.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "";

                return (
                  <a
                    key={item.id}
                    href={`/blogs/${item.slug}`}
                    className="
                      group 
                      border 
                      rounded-2xl 
                      overflow-hidden 
                      bg-white
                      hover:shadow-xl 
                      transition-all 
                      duration-300
                    "
                  >
                    {item.featuredImage && (
                      <div className="
                        relative 
                        w-full 
                        aspect-[16/10] 
                        overflow-hidden
                      ">
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="
                            w-full 
                            h-full 
                            object-cover 
                            group-hover:scale-105 
                            transition 
                            duration-500
                          "
                        />
                      </div>
                    )}

                    <div className="p-5 sm:p-6">
                      <h3 className="
                        text-base 
                        sm:text-lg 
                        font-semibold 
                        text-gray-900 
                        group-hover:text-blue-600 
                        transition 
                        mb-2
                      ">
                        {item.title}
                      </h3>

                      {sidebarDate && (
                        <p className="text-sm text-gray-500">
                          {sidebarDate}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
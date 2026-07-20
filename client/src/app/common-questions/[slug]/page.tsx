import { Badge } from "@/components/ui/badge";
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";
import type { Metadata } from "next";
import ContactSection from "@/PageComponents/Landing Home/ContactSection";
import MarketingPriceCalculator from "@/PageComponents/Global Components/PriceCalc";
import BlogLeadForm from "@/PageComponents/Blogs Components/BlogLeadForm";
import SummarizeButtons from "@/PageComponents/Blogs Components/SummarizeButtons";
import QuestionThumbnail from "@/PageComponents/CommonQuestions Components/QuestionThumbnail";
import { Calendar, User, Clock, ChevronRight, HelpCircle } from "lucide-react";
import Script from "next/script";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- DATA FETCHING FUNCTIONS ---
async function fetchQuestion(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/common-questions/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

async function fetchAuthors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/authors`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

async function fetchLatestQuestionsExcludeCurrent(currentId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/common-questions`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  const questions = Array.isArray(data.questions) ? data.questions : [];
  return questions.filter((q: any) => q && q.id && q.id !== currentId);
}

async function fetchQuestionWithAuthor(slug: string) {
  const item = await fetchQuestion(slug);
  if (!item || item.error) return null;
  const authors = await fetchAuthors();
  const author = authors.find((a: any) => a.id === item.authorId);
  return { ...item, authorName: author?.name ?? "Vaphers Team" };
}

// --- TOC GENERATOR ---
function processHtmlForToc(html: string) {
  if (!html) return { toc: [], processedHtml: "" };

  const toc: { id: string; text: string; level: number }[] = [];

  const headingRegex = /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi;

  const processedHtml = html.replace(headingRegex, (match, tag, attrs, innerHtml) => {
    const cleanText = innerHtml.replace(/<[^>]*>?/gm, "").trim();
    if (!cleanText) return match;

    const id = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    toc.push({ id, text: cleanText, level: parseInt(tag.charAt(1)) });

    return `<${tag} id="${id}"${attrs}>${innerHtml}</${tag}>`;
  });

  return { toc, processedHtml };
}

// --- READ TIME CALCULATOR ---
function calculateReadTime(html: string) {
  if (!html) return "1 min read";
  const text = html.replace(/<[^>]+>/g, ' ');
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 225);
  return `${minutes || 1} min read`;
}

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchQuestion(slug);

  if (!item || item.error) {
    return {
      title: "Question Not Found",
      description: "This common question could not be found.",
    };
  }

  return {
    title: item.metaTitle || item.title,
    description: item.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/common-questions/${slug}`,
    },
    openGraph: {
      title: item.metaTitle || item.title,
      description: item.metaDescription,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/common-questions/${slug}`,
      images: item.featuredImage ? [{ url: item.featuredImage }] : undefined,
    },
  };
}

// --- PAGE COMPONENT ---
export default async function CommonQuestionSinglePage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchQuestionWithAuthor(slug);

  if (!item || item.error) {
    return (
      <>
        <NavBar />
        <main className="max-w-2xl mx-auto py-32 text-center text-2xl text-red-600 font-semibold">
          Question Not Found
        </main>
        <ContactSection />
        <Footer />
      </>
    );
  }

  const { toc, processedHtml } = processHtmlForToc(item.contentHtml ?? "");
  const latestQuestions = await fetchLatestQuestionsExcludeCurrent(item.id);

  let createdAtDate: Date | null = null;
  if (item.createdAt?._seconds) {
    createdAtDate = new Date(item.createdAt._seconds * 1000);
  }
  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;

  const pageUrl = `https://www.vaphers.com/common-questions/${slug}`;
  const dynamicReadTime = calculateReadTime(item.contentHtml ?? "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": item.title,
      "text": item.title,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.metaDescription || item.title,
        "url": pageUrl
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth lg:-mt-36">
      <Script
        id="faq-schema-single-cq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NavBar />

      {/* TOP HEADER & GRADIENT SECTION */}
      <div className="relative w-full pt-12 pb-6 bg-gradient-to-b from-blue-600 via-blue-400 via-blue-200 via-blue-50 to-white lg:pt-46">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center justify-center text-xs text-white font-semibold tracking-wider uppercase mb-10 drop-shadow-sm">
            <a href="/" className="hover:text-blue-100 transition">Home</a>
            <ChevronRight className="w-3 h-3 mx-2 text-white/70" />
            <a href="/common-questions" className="hover:text-blue-100 transition">Common Questions</a>
            <ChevronRight className="w-3 h-3 mx-2 text-white/70" />
            <span className="truncate max-w-[200px] sm:max-w-none text-white montserrat-medium">{item.title}</span>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] mb-8 text-white montserrat-medium">
            {item.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 text-gray-600 text-sm mb-8 pb-8 border-b border-gray-200/60 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-100">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <strong className="text-gray-900 font-medium">{item.authorName}</strong>
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

            <SummarizeButtons title={item.title} blogUrl={pageUrl} />
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
                    {toc.map((t) => (
                      <li
                        key={t.id}
                        className={`hover:text-blue-600 transition ${t.level === 3 ? "ml-4 text-gray-500 text-[13px]" : "text-gray-700"}`}
                      >
                        <a href={`#${t.id}`} className="block line-clamp-2 leading-relaxed">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Share this answer
                </h4>
                <div className="flex items-center gap-4">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
                    <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000879/Platform_Facebook_Color_Original_kwwle4.svg" alt="Share on Facebook" className="w-6 h-6" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${item.title}`} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
                    <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000877/Platform_X_Twitter_Color_Original_qdvllx.png" alt="Share on X" className="w-6 h-6" />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
                    <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000875/Platform_LinkedIn_Color_Original_gbuviy.svg" alt="Share on LinkedIn" className="w-6 h-6" />
                  </a>
                  <a href={`https://www.reddit.com/submit?url=${pageUrl}&title=${item.title}`} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
                    <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000873/Platform_Reddit_Color_Original_m07wa6.png" alt="Share on Reddit" className="w-6 h-6 object-contain" />
                  </a>
                </div>
              </div>
            </aside>

            {/* CENTER: MAIN ARTICLE CONTENT */}
            <article className="w-full max-w-[800px] flex-1 shrink-1 order-1 lg:order-2">
              <QuestionThumbnail
                title={item.title}
                slug={item.slug}
                featuredImage={item.featuredImage}
                category={item.categories?.[0]}
                aspectRatio="aspect-[16/9]"
                className="rounded-lg mb-10 border border-gray-100 shadow-sm"
              />

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
                      About Vaphers
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      The Vaphers team consists of SEO strategists, PPC specialists, web designers,
                      and analytics experts dedicated to driving measurable digital growth.
                      Using data-driven strategies, advanced search marketing techniques, and
                      conversion-focused design, Vaphers helps businesses increase visibility,
                      generate qualified leads, and scale revenue sustainably.
                    </p>
                    <a
                      href="https://www.vaphers.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-blue-600 font-medium text-sm hover:underline"
                    >
                      Visit Vaphers Website &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* RIGHT SIDEBAR: Lead Card */}
            <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 space-y-10 order-2 lg:order-3 mt-10 lg:mt-0">
              <div className="border border-gray-200 bg-white rounded-md p-5 shadow-sm">
                <img
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772000439/ChatGPT_Image_Feb_25_2026_11_50_44_AM_tgsao7.png"
                  alt="Local SEO growth"
                  className="w-full rounded-md mb-4 border border-gray-100"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center leading-snug">
                  Outrank Your Competitors This Season
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  See how you can dominate Google search results and book more jobs.
                </p>
                <BlogLeadForm />
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* Related Common Questions */}
      <section className="w-full py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 montserrat-medium">More Common Questions</h3>
          </div>

          {latestQuestions.length === 0 ? (
            <p className="text-gray-500 text-center lg:text-left">No other answered questions yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {latestQuestions.slice(0, 6).map((q: any) => {
                const d = q.createdAt?._seconds ? new Date(q.createdAt._seconds * 1000) : null;
                const sidebarDate = d ? d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
                const sidebarReadTime = calculateReadTime(q.contentHtml ?? "");

                return (
                  <a
                    key={q.id}
                    href={`/common-questions/${q.slug}`}
                    className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
                  >
                    <QuestionThumbnail
                      title={q.title}
                      slug={q.slug}
                      featuredImage={q.featuredImage}
                      category={q.categories?.[0]}
                      aspectRatio="aspect-[16/10]"
                    />

                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="text-[17px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                        {q.title}
                      </h4>

                      <div className="mt-auto text-sm font-medium text-gray-500">
                        {sidebarDate && <span>{sidebarDate} &bull; </span>}
                        <span>{sidebarReadTime}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <MarketingPriceCalculator />
      <ContactSection />
      <Footer />
    </div>
  );
}

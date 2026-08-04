
import { MetadataRoute } from "next";
import admin from "firebase-admin";
import { getInteriorBlogsCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 1. Initialize Firebase Admin securely on the server
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// 2. Fetch directly from Firestore instead of using fetch() to your own API
async function getBlogs() {
  try {
    const snapshot = await db.collection("blogs").get();
    
    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
    return [];
  }
}

async function getCommonQuestions() {
  try {
    const snapshot = await db.collection("common_questions").get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching common questions for sitemap:", error);
    return [];
  }
}

async function getInteriorBlogs() {
  try {
    const collection = await getInteriorBlogsCollection();
    const rawBlogs = await collection.find({}).toArray();
    return rawBlogs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      updatedAt: doc.updatedAt,
      createdAt: doc.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching interior design blogs for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.vaphers.com";

  // 3. Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/interior-design-marketing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/interior-design-marketing/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/common-questions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // SEO
    { url: `${baseUrl}/seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/ai-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/local-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/ecommerce-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/technical-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/seo-audit-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-for-interior-designers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // Website Development
    { url: `${baseUrl}/website-development-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/website-development-services/nextjs-website-development`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/website-development-services/ecommerce-development`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/website-development-services/wordpress-website-development`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/website-development-services/shopify-website-development`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // Paid Ads
    { url: `${baseUrl}/ppc-marketing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ppc-marketing/google-ads-management-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ppc-marketing/meta-ads-management-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ppc-marketing/search-engine-marketing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ppc-marketing/lead-generation-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  // 4. Fetch blogs dynamically from Firestore
  const blogs = await getBlogs();

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => {
    let lastModified = new Date();

    if (blog.updatedAt?.seconds) {
      lastModified = new Date(blog.updatedAt.seconds * 1000);
    } else if (blog.createdAt?.seconds) {
      lastModified = new Date(blog.createdAt.seconds * 1000);
    }

    return {
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  // 5. Fetch interior design marketing blogs from MongoDB
  const interiorBlogs = await getInteriorBlogs();
  const interiorBlogRoutes: MetadataRoute.Sitemap = interiorBlogs.map((blog: any) => {
    let lastModified = new Date();
    if (blog.updatedAt) {
      lastModified = new Date(blog.updatedAt);
    } else if (blog.createdAt) {
      lastModified = new Date(blog.createdAt);
    }
    return {
      url: `${baseUrl}/interior-design-marketing/${blog.slug}`,
      lastModified: isNaN(lastModified.getTime()) ? new Date() : lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  // 6. Fetch common questions dynamically from Firestore
  const questions = await getCommonQuestions();

  const questionRoutes: MetadataRoute.Sitemap = questions.map((q: any) => {
    let lastModified = new Date();

    if (q.updatedAt?.seconds) {
      lastModified = new Date(q.updatedAt.seconds * 1000);
    } else if (q.createdAt?.seconds) {
      lastModified = new Date(q.createdAt.seconds * 1000);
    }

    return {
      url: `${baseUrl}/common-questions/${q.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...blogRoutes, ...interiorBlogRoutes, ...questionRoutes];
}
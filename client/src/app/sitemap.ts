// import { MetadataRoute } from "next";

// export const dynamic = "force-dynamic"; 
// // IMPORTANT: must be dynamic if fetching data

// async function getBlogs() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogs`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return [];

//     const data = await res.json();
//     return data.blogs || [];
//   } catch (error) {
//     console.error("Error fetching blogs for sitemap:", error);
//     return [];
//   }
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = "https://www.vaphers.com";

//   // Static routes
//   const staticRoutes: MetadataRoute.Sitemap = [
//     {
//       url: `${baseUrl}`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1,
//     },
//     {
//       url: `${baseUrl}/pricing`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: `${baseUrl}/about-us`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: `${baseUrl}/contact`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },


//     // SEO 

//     {
//       url: `${baseUrl}/seo-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//        {
//       url: `${baseUrl}/seo-services/ai-seo-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/seo-services/local-seo-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/seo-services/ecommerce-seo-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/seo-services/technical-seo-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/seo-services/seo-audit-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },



//     // Website Development


//     {
//       url: `${baseUrl}/website-development-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/website-development-services/nextjs-website-development`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/website-development-services/ecommerce-development`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/website-development-services/wordpress-website-development`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/website-development-services/shopify-website-development`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },



//     // Paid Ads 


//     {
//       url: `${baseUrl}/ppc-marketing`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//      {
//       url: `${baseUrl}/ppc-marketing/google-ads-management-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/ppc-marketing/meta-ads-management-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/ppc-marketing/search-engine-marketing`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/ppc-marketing/lead-generation-services`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//   ];

//   // Fetch blogs dynamically
//   const blogs = await getBlogs();

//   const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => {
//     let lastModified = new Date();

//     if (blog.createdAt?.seconds) {
//       lastModified = new Date(blog.createdAt.seconds * 1000);
//     }

//     return {
//       url: `${baseUrl}/blogs/${blog.slug}`,
//       lastModified,
//       changeFrequency: "monthly",
//       priority: 0.6,
//     };
//   });

//   return [...staticRoutes, ...blogRoutes];
// }








import { MetadataRoute } from "next";
import admin from "firebase-admin";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.vaphers.com";

  // 3. Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/common-questions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // SEO
    { url: `${baseUrl}/seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/ai-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/local-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/ecommerce-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/technical-seo-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seo-services/seo-audit-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

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

  // 5. Fetch common questions dynamically from Firestore
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

  return [...staticRoutes, ...blogRoutes, ...questionRoutes];
}
import admin from 'firebase-admin';

export const dynamic = 'force-static';

const serviceAccount = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT || '{}'
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

function extractImageUrls(html: string): string[] {
  if (!html) return [];

  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const urls = new Set<string>();

  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.includes('res.cloudinary.com')) {
      urls.add(src);
    }
  }

  return Array.from(urls);
}

export async function GET() {
  const baseUrl = 'https://www.vaphers.com';

  const snapshot = await db
    .collection('blogs')
    .orderBy('createdAt', 'desc')
    .get();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${snapshot.docs
  .map((doc) => {
    const data = doc.data();
    const blogUrl = `${baseUrl}/blog/${data.slug}`;

    const images = [
      data.featuredImage,
      ...extractImageUrls(data.contentHtml),
    ].filter(Boolean);

    if (!images.length) return '';

    return `
  <url>
    <loc>${blogUrl}</loc>
    ${images
      .map(
        (img: string) => `
    <image:image>
      <image:loc>${img}</image:loc>
      <image:title>${data.title}</image:title>
    </image:image>
    `
      )
      .join('')}
  </url>`;
  })
  .join('')}

</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

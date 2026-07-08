import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blogs } = body;

    if (!Array.isArray(blogs)) {
      return NextResponse.json({ error: 'Expected an array of blogs' }, { status: 400 });
    }

    if (blogs.length === 0) {
      return NextResponse.json({ error: 'No blogs provided' }, { status: 400 });
    }

    // Fetch all existing slugs to prevent duplicates
    const existingSlugsSnapshot = await db.collection('blogs').select('slug').get();
    const existingSlugs = new Set();
    existingSlugsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.slug) {
        existingSlugs.add(data.slug);
      }
    });

    const results = [];
    const validBlogsToWrite = [];
    
    // Validate each blog
    for (const blog of blogs) {
      const {
        title,
        contentHtml,
        slug,
        metaTitle,
        metaDescription,
        featuredImage,
        authorId,
        categories
      } = blog;

      if (!title || !slug || !contentHtml) {
        results.push({ slug: slug || 'unknown', status: 'error', reason: 'Missing required fields (title, slug, contentHtml)' });
        continue;
      }

      // Basic sanitization on server side
      const sanitizedSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      if (existingSlugs.has(sanitizedSlug)) {
        results.push({ slug: sanitizedSlug, status: 'skipped', reason: 'Slug already exists' });
        continue;
      }

      // Add to write queue and mark as in-memory existing so intra-batch duplicates are also skipped
      existingSlugs.add(sanitizedSlug);

      validBlogsToWrite.push({
        title,
        contentHtml,
        slug: sanitizedSlug,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || '',
        featuredImage: featuredImage || null,
        authorId: authorId || 'admin',
        categories: Array.isArray(categories) ? categories : [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      results.push({ slug: sanitizedSlug, status: 'success' });
    }

    // Write in chunks of 500 (Firestore limit)
    const CHUNK_SIZE = 500;
    for (let i = 0; i < validBlogsToWrite.length; i += CHUNK_SIZE) {
      const chunk = validBlogsToWrite.slice(i, i + CHUNK_SIZE);
      const batch = db.batch();

      chunk.forEach(blogData => {
        const docRef = db.collection('blogs').doc();
        batch.set(docRef, blogData);
      });

      await batch.commit();
    }
    
    const successfulSlugs = validBlogsToWrite.map(b => b.slug);

    // Ping IndexNow if any blogs were uploaded
    if (successfulSlugs.length > 0) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vaphers.com';
      const newUrls = successfulSlugs.map(s => `${baseUrl}/blogs/${s}`);
      
      try {
        // Fire and forget IndexNow ping
        fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host: 'www.vaphers.com',
            key: '896d6515d7514368895612da711f2ba2',
            keyLocation: 'https://www.vaphers.com/896d6515d7514368895612da711f2ba2.txt',
            urlList: newUrls,
          }),
        }).catch(err => console.error("IndexNow ping failed in bulk upload", err));
      } catch (err) {
        console.error("Failed to initiate IndexNow ping", err);
      }
    }

    return NextResponse.json({ results });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

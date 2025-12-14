import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import serviceAccount from '../../../../secrets/vaphers-website-firebase-adminsdk-fbsvc-81d68e1434.json';
// const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      slug,
      metaTitle,
      metaDescription,
      featuredImage,
      author,
      categories,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'title, slug and content are required' },
        { status: 400 }
      );
    }

    // Slug uniqueness check
    const existing = await db.collection('blogs').where("slug", "==", slug).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json(
        { error: 'Slug already exists, choose a different one.' },
        { status: 409 }
      );
    }

    const docRef = await db.collection('blogs').add({
      title,
      slug,
      contentHtml: content,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      featuredImage: featuredImage || null,
      authorId: author,
      categories: categories || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id, slug }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error creating blog', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const blogsQuery = db
      .collection("blogs")
      .orderBy("createdAt", "desc");

    const snapshot = await blogsQuery.get();
    const blogs = snapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug,
      title: doc.data().title,
      featuredImage: doc.data().featuredImage,
      categories: doc.data().categories || [],
      metaDescription: doc.data().metaDescription || '',
      createdAt: doc.data().createdAt,
      authorId: doc.data().authorId,
    }));

    console.log(`API returned ${blogs.length} blogs`); // DEBUG

    return NextResponse.json({ blogs });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', blogs: [] }, 
      { status: 500 }
    );
  }
}


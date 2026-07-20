import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// POST api/common-questions
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

    // Slug uniqueness check in common_questions collection
    const existing = await db
      .collection('common_questions')
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { error: 'Slug already exists, choose a different one.' },
        { status: 409 }
      );
    }

    const docRef = await db.collection('common_questions').add({
      title,
      slug,
      contentHtml: content,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      featuredImage: featuredImage || null,
      authorId: author || 'admin',
      categories: categories || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id, slug }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error creating common question', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET api/common-questions
export async function GET(req: NextRequest) {
  try {
    const snapshot = await db
      .collection("common_questions")
      .orderBy("createdAt", "desc")
      .get();

    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug,
      title: doc.data().title,
      featuredImage: doc.data().featuredImage,
      categories: doc.data().categories || [],
      metaDescription: doc.data().metaDescription || '',
      contentHtml: doc.data().contentHtml || '',
      createdAt: doc.data().createdAt,
      authorId: doc.data().authorId,
    }));

    return NextResponse.json({ questions, blogs: questions });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch common questions', questions: [], blogs: [] }, 
      { status: 500 }
    );
  }
}

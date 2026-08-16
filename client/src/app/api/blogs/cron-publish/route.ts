import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export async function GET(req: NextRequest) {
  try {
    const now = admin.firestore.Timestamp.now();
    const scheduledBlogsSnapshot = await db
      .collection('blogs')
      .where('status', '==', 'scheduled')
      .where('scheduledAt', '<=', now)
      .get();

    if (scheduledBlogsSnapshot.empty) {
      return NextResponse.json({ message: 'No pending scheduled blogs to publish.', publishedCount: 0 });
    }

    const batch = db.batch();
    const publishedTitles: string[] = [];

    scheduledBlogsSnapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'published',
        publishedAt: now,
        updatedAt: now,
      });
      publishedTitles.push(doc.data().title);
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      publishedCount: publishedTitles.length,
      published: publishedTitles,
    });
  } catch (err: any) {
    console.error('Error in cron-publish route:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

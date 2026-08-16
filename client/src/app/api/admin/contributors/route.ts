import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const writersSnap = await db.collection('guestWriters').orderBy('createdAt', 'desc').get();
    const subsSnap = await db.collection('guestSubmissions').get();

    // Group submissions by authorId
    const subsByAuthor = new Map<string, { total: number; approved: number; pending: number }>();
    subsSnap.forEach((doc) => {
      const data = doc.data();
      const authorId = data.authorId;
      if (authorId) {
        const stats = subsByAuthor.get(authorId) || { total: 0, approved: 0, pending: 0 };
        stats.total += 1;
        if (data.status === 'approved') stats.approved += 1;
        if (data.status === 'pending') stats.pending += 1;
        subsByAuthor.set(authorId, stats);
      }
    });

    const contributors = writersSnap.docs.map((doc) => {
      const data = doc.data();
      const stats = subsByAuthor.get(doc.id) || { total: 0, approved: 0, pending: 0 };
      return {
        id: doc.id,
        uid: doc.id,
        ...data,
        monthlyQuota: data.monthlyQuota || data.weeklyQuota || 2,
        submissionsThisMonth: data.submissionsThisMonth !== undefined ? data.submissionsThisMonth : (data.submissionsThisWeek || 0),
        totalSubmissions: stats.total,
        approvedPosts: stats.approved,
        pendingPosts: stats.pending,
      };
    });

    return NextResponse.json({ contributors });
  } catch (error: any) {
    console.error('Error fetching contributors:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch contributors' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, monthlyQuota, status } = body;

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const docRef = db.collection('guestWriters').doc(uid);
    const existing = await docRef.get();

    if (!existing.exists) {
      return NextResponse.json({ error: 'Contributor not found' }, { status: 404 });
    }

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
    };

    if (monthlyQuota !== undefined) {
      updatePayload.monthlyQuota = Number(monthlyQuota);
      updatePayload.weeklyQuota = Number(monthlyQuota);
    }

    if (status !== undefined) {
      updatePayload.accountStatus = status;
    }

    await docRef.update(updatePayload);

    return NextResponse.json({ message: 'Contributor updated successfully', updated: updatePayload });
  } catch (error: any) {
    console.error('Error updating contributor:', error);
    return NextResponse.json({ error: error.message || 'Failed to update contributor' }, { status: 500 });
  }
}

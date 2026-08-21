import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const writersSnap = await db.collection('guestWriters').get();
    const subsSnap = await db.collection('guestSubmissions').get();

    // Map of authorId -> submissions
    const subsByAuthor = new Map<string, any[]>();
    const authorsFoundInSubs = new Map<string, any>();

    subsSnap.forEach((doc: any) => {
      const data = doc.data() || {};
      const subItem = {
        id: doc.id,
        title: data.title || 'Untitled Post',
        slug: data.slug || '',
        publishedSlug: data.publishedSlug || '',
        status: data.status || 'draft',
        paid: !!data.paid,
        paidAmount: data.paidAmount || (data.status === 'approved' ? 25 : 0),
        categories: data.categories || ['Marketing'],
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || data.createdAt || '',
      };

      const authorId = data.authorId;
      if (authorId) {
        const list = subsByAuthor.get(authorId) || [];
        list.push(subItem);
        subsByAuthor.set(authorId, list);

        if (!authorsFoundInSubs.has(authorId)) {
          authorsFoundInSubs.set(authorId, {
            id: authorId,
            uid: authorId,
            name: data.authorName || 'Contributor',
            email: data.authorEmail || '',
            website: data.authorWebsite || '',
            bio: data.authorBio || '',
            createdAt: data.createdAt || '',
            updatedAt: data.updatedAt || '',
          });
        }
      }
    });

    const knownWriterIds = new Set<string>();

    const contributors = writersSnap.docs.map((doc: any) => {
      knownWriterIds.add(doc.id);
      const data = doc.data() || {};
      const userSubs = subsByAuthor.get(doc.id) || [];

      const drafts = userSubs.filter((s) => s.status === 'draft' || s.status === 'needs_revision');
      const paidArticles = userSubs.filter((s) => s.status === 'approved' || s.paid);

      // Sort drafts by most recently updated
      drafts.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
      paidArticles.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());

      const latestDraftTime = drafts.length > 0 ? drafts[0].updatedAt : null;
      const latestSubTime = userSubs.length > 0
        ? userSubs.reduce((max, s) => (new Date(s.updatedAt || 0) > new Date(max) ? s.updatedAt : max), userSubs[0].updatedAt)
        : null;

      return {
        id: doc.id,
        uid: doc.id,
        name: data.name || 'Contributor',
        email: data.email || '',
        bio: data.bio || '',
        website: data.website || '',
        registrationIp: data.registrationIp || '',
        accountStatus: data.accountStatus || 'active',
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
        latestDraftAt: latestDraftTime,
        latestActivityAt: latestSubTime || data.updatedAt || data.createdAt || '',
        draftCount: drafts.length,
        paidCount: paidArticles.length,
        totalSubmissions: userSubs.length,
        drafts,
        paidArticles,
      };
    });

    // Also include any authors from submissions that weren't in guestWriters
    authorsFoundInSubs.forEach((authorData, authorId) => {
      if (!knownWriterIds.has(authorId)) {
        const userSubs = subsByAuthor.get(authorId) || [];
        const drafts = userSubs.filter((s) => s.status === 'draft' || s.status === 'needs_revision');
        const paidArticles = userSubs.filter((s) => s.status === 'approved' || s.paid);

        drafts.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
        paidArticles.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());

        const latestDraftTime = drafts.length > 0 ? drafts[0].updatedAt : null;
        const latestSubTime = userSubs.length > 0 ? userSubs[0].updatedAt : null;

        contributors.push({
          id: authorId,
          uid: authorId,
          name: authorData.name,
          email: authorData.email,
          bio: authorData.bio,
          website: authorData.website,
          registrationIp: '',
          accountStatus: 'active',
          createdAt: authorData.createdAt,
          updatedAt: authorData.updatedAt,
          latestDraftAt: latestDraftTime,
          latestActivityAt: latestSubTime || authorData.updatedAt || authorData.createdAt || '',
          draftCount: drafts.length,
          paidCount: paidArticles.length,
          totalSubmissions: userSubs.length,
          drafts,
          paidArticles,
        });
      }
    });

    // Sort contributors by most recent activity / registration
    contributors.sort((a: any, b: any) => {
      const timeA = new Date(a.latestActivityAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.latestActivityAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({ contributors });
  } catch (error: any) {
    console.error('Error fetching contributors CRM data:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch contributors' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, status } = body;

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const docRef = db.collection('guestWriters').doc(uid);
    const existing = await docRef.get();

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
    };

    if (status !== undefined) {
      updatePayload.accountStatus = status;
    }

    if (existing.exists) {
      await docRef.update(updatePayload);
    } else {
      await docRef.set(updatePayload, { merge: true });
    }

    return NextResponse.json({ message: 'Contributor updated successfully', updated: updatePayload });
  } catch (error: any) {
    console.error('Error updating contributor:', error);
    return NextResponse.json({ error: error.message || 'Failed to update contributor' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import {
  getClientIp,
  extractExternalTargetDomains,
  checkTargetDomainWeeklyQuota,
} from '@/lib/antiAbuse';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await db.collection('guestSubmissions').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ submission: { id: doc.id, ...doc.data() } });
  } catch (error: any) {
    console.error('Error fetching submission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      slug,
      contentHtml,
      metaTitle,
      metaDescription,
      featuredImage,
      categories,
      status, // 'draft' or 'pending'
      authorId,
      authorWebsite,
    } = body;

    const docRef = db.collection('guestSubmissions').doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const existingData = existing.data() || {};
    if (authorId && existingData.authorId !== authorId) {
      return NextResponse.json({ error: 'Unauthorized to edit this submission' }, { status: 403 });
    }

    const clientIp = getClientIp(req);
    const now = new Date().toISOString();

    const targetDomains = extractExternalTargetDomains(
      contentHtml !== undefined ? contentHtml : existingData.contentHtml || '',
      authorWebsite !== undefined ? authorWebsite : existingData.authorWebsite
    );

    // If re-submitting for review, run target domain deduplication check
    if (status === 'pending' && existingData.status !== 'pending') {
      const domainCheck = await checkTargetDomainWeeklyQuota(targetDomains, id);
      if (!domainCheck.allowed) {
        return NextResponse.json(
          {
            error: `Target domain quota reached: The website "${domainCheck.duplicateDomain}" has already been submitted or published on Vaphers within the last 7 days across the network.`,
          },
          { status: 429 }
        );
      }
    }

    const updatePayload: any = {
      title: title || existingData.title,
      slug: slug || existingData.slug,
      contentHtml: contentHtml !== undefined ? contentHtml : existingData.contentHtml,
      metaTitle: metaTitle !== undefined ? metaTitle : existingData.metaTitle,
      metaDescription: metaDescription !== undefined ? metaDescription : existingData.metaDescription,
      featuredImage: featuredImage !== undefined ? featuredImage : existingData.featuredImage,
      categories: categories || existingData.categories,
      targetDomains,
      lastModifiedIp: clientIp,
      updatedAt: now,
    };

    if (status) {
      updatePayload.status = status;
      if (status === 'pending') {
        updatePayload.submittedAt = now;
      }
    }

    await docRef.update(updatePayload);

    return NextResponse.json({ submission: { id, ...existingData, ...updatePayload } });
  } catch (error: any) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import {
  getClientIp,
  extractExternalTargetDomains,
  checkTargetDomainWeeklyQuota,
  checkIpSubmissionLimit,
} from '@/lib/antiAbuse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const authorId = searchParams.get('authorId');

    if (!authorId) {
      return NextResponse.json({ error: 'Missing authorId' }, { status: 400 });
    }

    const snapshot = await db
      .collection('guestSubmissions')
      .where('authorId', '==', authorId)
      .get();

    const submissions = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => {
        const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });

    return NextResponse.json({ submissions });
  } catch (error: any) {
    console.error('Error fetching writer submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      authorId,
      authorName,
      authorEmail,
      authorBio,
      authorWebsite,
      title,
      slug,
      contentHtml,
      metaTitle,
      metaDescription,
      featuredImage,
      categories,
      status, // 'draft' or 'pending'
    } = body;

    if (!authorId || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const clientIp = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const now = new Date().toISOString();

    // Extract all external backlink domains from article body + author website
    const targetDomains = extractExternalTargetDomains(contentHtml || '', authorWebsite);

    // Anti-Abuse Checks when submitting for review
    if (status === 'pending') {
      // 1. IP Submission Rate Limit (Max 3 submissions per IP across all accounts in 7 days)
      const ipLimit = await checkIpSubmissionLimit(clientIp, 3);
      if (!ipLimit.allowed) {
        return NextResponse.json(
          {
            error:
              'Network submission limit reached. Maximum 2 guest articles can be submitted from the same network per week across all accounts.',
          },
          { status: 429 }
        );
      }

      // 2. Target Domain Deduplication (Cross-Account Defense)
      const domainCheck = await checkTargetDomainWeeklyQuota(targetDomains);
      if (!domainCheck.allowed) {
        return NextResponse.json(
          {
            error: `Target domain quota reached: The website "${domainCheck.duplicateDomain}" has already been submitted or published on Vaphers within the last 7 days. Each target domain is strictly limited to 1 publication slot per week across all contributor accounts.`,
          },
          { status: 429 }
        );
      }

      // 3. User Account Monthly Quota Check (2 free blogs/month)
      const writerRef = db.collection('guestWriters').doc(authorId);
      const writerDoc = await writerRef.get();

      if (writerDoc.exists) {
        const data = writerDoc.data() || {};
        const monthlyQuota = data.monthlyQuota || data.weeklyQuota || 2;
        const submissionsThisMonth =
          data.submissionsThisMonth !== undefined ? data.submissionsThisMonth : data.submissionsThisWeek || 0;

        if (submissionsThisMonth >= monthlyQuota) {
          return NextResponse.json(
            {
              error:
                'Monthly publishing quota reached (2 free articles per month). If you need additional publishing slots ($35/extra article), open a support ticket from your dashboard to request an upgrade.',
            },
            { status: 429 }
          );
        }

        await writerRef.update({
          submissionsThisMonth: submissionsThisMonth + 1,
          submissionsThisWeek: submissionsThisMonth + 1,
          lastActiveIp: clientIp,
          updatedAt: now,
        });
      }
    }

    const docRef = db.collection('guestSubmissions').doc();
    const submissionData = {
      id: docRef.id,
      authorId,
      authorName: authorName || 'Guest Writer',
      authorEmail: authorEmail || '',
      authorBio: authorBio || '',
      authorWebsite: authorWebsite || '',
      title,
      slug:
        slug ||
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-'),
      contentHtml: contentHtml || '',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      featuredImage: featuredImage || null,
      categories: categories || ['Marketing'],
      targetDomains,
      clientIp,
      userAgent,
      status: status || 'draft',
      feedbackNote: null,
      createdAt: now,
      updatedAt: now,
    };

    await docRef.set(submissionData);

    return NextResponse.json({ submission: submissionData });
  } catch (error: any) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

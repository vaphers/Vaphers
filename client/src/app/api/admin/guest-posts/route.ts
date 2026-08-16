import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query: any = db.collection('guestSubmissions');

    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.get();
    const rawSubmissions = snapshot.docs
      .map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => {
        const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });

    // Fetch all writers for multi-account IP correlation
    const writersSnapshot = await db.collection('guestWriters').get();
    const writersByIp = new Map<string, Array<{ uid: string; name: string; email: string }>>();
    const writersById = new Map<string, any>();

    writersSnapshot.forEach((doc: any) => {
      const data = doc.data();
      writersById.set(doc.id, data);
      const ip = data.registrationIp || data.lastActiveIp;
      if (ip && ip !== '127.0.0.1') {
        const existing = writersByIp.get(ip) || [];
        existing.push({ uid: doc.id, name: data.name || 'Writer', email: data.email || '' });
        writersByIp.set(ip, existing);
      }
    });

    // Correlation for target domains across all submissions
    const domainToAuthors = new Map<string, Set<string>>();
    rawSubmissions.forEach((sub: any) => {
      const domains: string[] = sub.targetDomains || [];
      const author = sub.authorEmail || sub.authorName || sub.authorId;
      domains.forEach((d) => {
        const set = domainToAuthors.get(d) || new Set<string>();
        if (author) set.add(author);
        domainToAuthors.set(d, set);
      });
    });

    // Enrich submissions with real-time Anti-Abuse Fraud Analysis
    const submissions = rawSubmissions.map((sub: any) => {
      const fraudReasons: string[] = [];
      let fraudRisk: 'high' | 'medium' | 'low' = 'low';

      // 1. Check Shared IP / Multi-Account Signups
      const ip = sub.clientIp || sub.registrationIp;
      const sharedWritersOnIp = (ip && ip !== '127.0.0.1') ? (writersByIp.get(ip) || []) : [];
      const distinctSharedAccounts = sharedWritersOnIp.filter((w) => w.uid !== sub.authorId);

      if (distinctSharedAccounts.length > 0) {
        fraudRisk = distinctSharedAccounts.length >= 2 ? 'high' : 'medium';
        const accountNames = distinctSharedAccounts.map((a) => a.email || a.name).slice(0, 3).join(', ');
        fraudReasons.push(`Shared IP (${ip}) with ${distinctSharedAccounts.length} other contributor account(s): ${accountNames}`);
      }

      // 2. Check Shared Target Domains across different accounts
      const domains: string[] = sub.targetDomains || [];
      domains.forEach((d) => {
        const authorsTargeting = domainToAuthors.get(d) || new Set();
        if (authorsTargeting.size > 1) {
          fraudRisk = 'high';
          fraudReasons.push(`Target domain "${d}" is also being promoted by ${authorsTargeting.size - 1} other contributor account(s)`);
        }
      });

      return {
        ...sub,
        fraudRisk,
        fraudReasons,
        sharedAccountsCount: distinctSharedAccounts.length,
      };
    });

    return NextResponse.json({ submissions });
  } catch (error: any) {
    console.error('Error fetching guest submissions with fraud scan:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch guest submissions' }, { status: 500 });
  }
}

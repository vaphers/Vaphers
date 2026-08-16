import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { isDisposableEmail, getClientIp, checkIpAccountLimit } from '@/lib/antiAbuse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const docRef = db.collection('guestWriters').doc(uid);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ writer: null, profile: null });
    }

    const data = docSnap.data() || {};

    // Monthly quota check: 2 posts per 30 days
    const now = new Date();
    const lastReset = data.lastResetDate ? new Date(data.lastResetDate) : new Date(0);
    const diffDays = (now.getTime() - lastReset.getTime()) / (1000 * 3600 * 24);

    let submissionsThisMonth = data.submissionsThisMonth !== undefined ? data.submissionsThisMonth : (data.submissionsThisWeek || 0);
    if (diffDays >= 30) {
      submissionsThisMonth = 0;
      await docRef.update({
        submissionsThisMonth: 0,
        submissionsThisWeek: 0,
        lastResetDate: now.toISOString(),
      });
    }

    const monthlyQuota = data.monthlyQuota || data.weeklyQuota || 2;
    const remainingQuota = Math.max(0, monthlyQuota - submissionsThisMonth);

    const profileData = {
      ...data,
      monthlyQuota,
      submissionsThisMonth,
      remainingQuota,
      // Backwards compatibility
      weeklyQuota: monthlyQuota,
      submissionsThisWeek: submissionsThisMonth,
    };

    return NextResponse.json({
      profile: profileData,
      writer: profileData,
    });
  } catch (error: any) {
    console.error('Error fetching writer profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, name, email, bio, website } = body;

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const clientIp = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 1. Anti-Abuse: Disposable Email Verification
    if (email && isDisposableEmail(email)) {
      return NextResponse.json(
        {
          error:
            'Disposable or temporary email addresses are not allowed on the Vaphers Contributor Network. Please register with a permanent email or your official business email.',
        },
        { status: 400 }
      );
    }

    const docRef = db.collection('guestWriters').doc(uid);
    const existing = await docRef.get();

    const now = new Date().toISOString();

    if (!existing.exists) {
      // 2. Anti-Abuse: IP Rate Limiting for Account Registration (Max 3 accounts per IP per 7 days)
      const ipCheck = await checkIpAccountLimit(clientIp, 3);
      if (!ipCheck.allowed) {
        return NextResponse.json(
          {
            error:
              'Registration limit exceeded for this network. To prevent automated multi-account spam, maximum 3 contributor accounts can be registered from the same network per week.',
          },
          { status: 429 }
        );
      }

      const profileData = {
        uid,
        name: name || 'Guest Writer',
        email: email || '',
        bio: bio || '',
        website: website || '',
        monthlyQuota: 2, // 2 free blogs per month!
        submissionsThisMonth: 0,
        weeklyQuota: 2,
        submissionsThisWeek: 0,
        lastResetDate: now,
        registrationIp: clientIp,
        userAgent,
        createdAt: now,
        updatedAt: now,
      };
      await docRef.set(profileData);
      return NextResponse.json({ profile: profileData, writer: profileData });
    } else {
      await docRef.update({
        name: name || existing.data()?.name,
        bio: bio !== undefined ? bio : existing.data()?.bio,
        website: website !== undefined ? website : existing.data()?.website,
        lastActiveIp: clientIp,
        updatedAt: now,
      });
      const updated = { ...existing.data(), name, bio, website, lastActiveIp: clientIp };
      return NextResponse.json({ profile: updated, writer: updated });
    }
  } catch (error: any) {
    console.error('Error saving writer profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

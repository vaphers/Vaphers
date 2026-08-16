import { NextRequest } from 'next/server';
import { db } from './firebaseAdmin';

// Common disposable / temporary email provider domains
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'temp-mail.io',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'sharklasers.com',
  'grr.la',
  'pokemail.net',
  'spam4.me',
  'mailinator.com',
  'mailinator2.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'trashmail.com',
  'trashmail.net',
  'dispostable.com',
  'getnada.com',
  'abakusmail.com',
  'inboxbear.com',
  'mohmal.com',
  'burnermail.io',
  'mytemp.email',
  'generator.email',
  'emailfake.com',
  'crazymailing.com',
  'dropmail.me',
  'fakemailgenerator.com',
  'throwawaymail.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'einrot.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'chacuo.net',
  'maildrop.cc',
  'tempail.com',
  'disposablemail.com',
  'mintemail.com',
  'nada.ltd',
  'nada.email',
]);

/**
 * Checks if an email address belongs to a known disposable / burner email service.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;

  // Pattern check for disposable email subdomains or suspicious prefixes
  if (
    domain.includes('tempmail') ||
    domain.includes('disposable') ||
    domain.includes('fakeinbox') ||
    domain.includes('trashmail') ||
    domain.includes('throwaway') ||
    domain.includes('10minute')
  ) {
    return true;
  }

  return false;
}

/**
 * Extracts client IP from Next.js request headers.
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

/**
 * Normalizes a URL to its root domain (e.g. "https://sub.agency.com/blog/post" -> "agency.com").
 */
export function normalizeDomain(rawUrl: string): string | null {
  try {
    let urlStr = rawUrl.trim();
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      urlStr = `https://${urlStr}`;
    }
    const parsed = new URL(urlStr);
    let hostname = parsed.hostname.toLowerCase();
    // Strip leading www.
    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }
    return hostname;
  } catch {
    return null;
  }
}

// Major authority / internal domains to ignore from backlink deduplication
const IGNORED_DOMAINS = new Set([
  'vaphers.com',
  'localhost',
  'google.com',
  'youtube.com',
  'youtu.be',
  'wikipedia.org',
  'github.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'facebook.com',
  'instagram.com',
  'medium.com',
  'pinterest.com',
  'reddit.com',
  'cloudinary.com',
  'unsplash.com',
  'pexels.com',
  'schema.org',
  'w3.org',
]);

/**
 * Extracts all unique external target backlink domains from HTML content and author website.
 */
export function extractExternalTargetDomains(html: string, authorWebsite?: string): string[] {
  const domains = new Set<string>();

  if (authorWebsite) {
    const d = normalizeDomain(authorWebsite);
    if (d && !IGNORED_DOMAINS.has(d)) {
      domains.add(d);
    }
  }

  if (html) {
    // Regex to match all href attributes in <a> tags
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(html)) !== null) {
      const url = match[1];
      if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
        const d = normalizeDomain(url);
        if (d && !IGNORED_DOMAINS.has(d)) {
          domains.add(d);
        }
      }
    }
  }

  return Array.from(domains);
}

/**
 * Validates that none of the target domains have already been submitted or published
 * in the past 7 days across ANY user account.
 */
export async function checkTargetDomainWeeklyQuota(
  targetDomains: string[],
  currentSubmissionId?: string
): Promise<{ allowed: boolean; duplicateDomain?: string; lastUsedDate?: string }> {
  if (!targetDomains.length) return { allowed: true };

  const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const domain of targetDomains) {
    // 1. Check guestSubmissions collection
    const subSnapshot = await db
      .collection('guestSubmissions')
      .where('targetDomains', 'array-contains', domain)
      .get();

    for (const doc of subSnapshot.docs) {
      if (currentSubmissionId && doc.id === currentSubmissionId) continue;
      const data = doc.data() || {};
      const createdAtMs = new Date(data.createdAt || 0).getTime();

      if (createdAtMs >= sevenDaysAgoMs && data.status !== 'rejected') {
        return {
          allowed: false,
          duplicateDomain: domain,
          lastUsedDate: data.createdAt,
        };
      }
    }

    // 2. Check published blogs collection
    const blogSnapshot = await db
      .collection('blogs')
      .where('targetDomains', 'array-contains', domain)
      .get();

    for (const doc of blogSnapshot.docs) {
      const data = doc.data() || {};
      const createdAtMs = new Date(data.createdAt || 0).getTime();
      if (createdAtMs >= sevenDaysAgoMs) {
        return {
          allowed: false,
          duplicateDomain: domain,
          lastUsedDate: data.createdAt,
        };
      }
    }
  }

  return { allowed: true };
}

/**
 * Checks if the client IP address has exceeded the maximum account registration limit in a 7-day window.
 */
export async function checkIpAccountLimit(
  ip: string,
  maxAccountsPerWeek = 3
): Promise<{ allowed: boolean; count: number }> {
  if (!ip || ip === '127.0.0.1') return { allowed: true, count: 0 };

  const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const snapshot = await db
    .collection('guestWriters')
    .where('registrationIp', '==', ip)
    .get();

  let count = 0;
  snapshot.forEach((doc) => {
    const data = doc.data() || {};
    const createdAtMs = new Date(data.createdAt || 0).getTime();
    if (createdAtMs >= sevenDaysAgoMs) {
      count++;
    }
  });

  return {
    allowed: count < maxAccountsPerWeek,
    count,
  };
}

/**
 * Checks if the client IP address has exceeded the maximum article submission limit in a 7-day window across accounts.
 */
export async function checkIpSubmissionLimit(
  ip: string,
  maxSubmissionsPerWeek = 2
): Promise<{ allowed: boolean; count: number }> {
  if (!ip || ip === '127.0.0.1') return { allowed: true, count: 0 };

  const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const snapshot = await db
    .collection('guestSubmissions')
    .where('clientIp', '==', ip)
    .get();

  let count = 0;
  snapshot.forEach((doc) => {
    const data = doc.data() || {};
    const createdAtMs = new Date(data.createdAt || 0).getTime();
    if (createdAtMs >= sevenDaysAgoMs) {
      count++;
    }
  });

  return {
    allowed: count < maxSubmissionsPerWeek,
    count,
  };
}

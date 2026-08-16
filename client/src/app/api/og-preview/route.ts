import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    let validUrl: URL;
    try {
      validUrl = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (VaphersBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({
        url: validUrl.toString(),
        title: validUrl.hostname,
        description: '',
        image: null,
        siteName: validUrl.hostname,
        favicon: `https://www.google.com/s2/favicons?domain=${validUrl.hostname}&sz=64`,
      });
    }

    const html = await response.text();

    // Helper extractors
    const extractMeta = (propName: string): string => {
      const match =
        html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${propName}["'][^>]+content=["']([^"']*)["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${propName}["']`, 'i'));
      return match ? match[1].trim() : '';
    };

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';

    const ogTitle = extractMeta('og:title') || extractMeta('twitter:title') || pageTitle || validUrl.hostname;
    const ogDesc = extractMeta('og:description') || extractMeta('twitter:description') || extractMeta('description') || '';
    let ogImage = extractMeta('og:image') || extractMeta('twitter:image') || null;

    if (ogImage && !ogImage.startsWith('http')) {
      try {
        ogImage = new URL(ogImage, validUrl.origin).toString();
      } catch {
        ogImage = null;
      }
    }

    const siteName = extractMeta('og:site_name') || validUrl.hostname.replace('www.', '');
    const favicon = `https://www.google.com/s2/favicons?domain=${validUrl.hostname}&sz=64`;

    return NextResponse.json({
      url: validUrl.toString(),
      title: ogTitle,
      description: ogDesc,
      image: ogImage,
      siteName,
      favicon,
    });
  } catch (err: any) {
    console.error('OG preview error:', err);
    return NextResponse.json({
      url: req.url,
      title: 'Link Preview',
      description: '',
      image: null,
      siteName: '',
      favicon: null,
    });
  }
}

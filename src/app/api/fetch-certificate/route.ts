import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract OpenGraph tags or fallbacks
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Unknown Certificate';
    const issuer = $('meta[property="og:site_name"]').attr('content') || $('meta[name="author"]').attr('content') || 'Unknown Issuer';

    return NextResponse.json({
      name: title.trim(),
      issuer: issuer.trim(),
      date: new Date().getFullYear().toString(),
      url
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json({ error: 'Failed to parse certificate metadata.' }, { status: 500 });
  }
}

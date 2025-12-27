import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

// Public API to get content (no auth required)
export async function GET(request: NextRequest) {
  try {
    const db = getDbConnection();
    const [rows] = await db.execute('SELECT * FROM page_content ORDER BY section_key');

    // Parse JSON content_data
    const content = (rows as any[]).map(row => ({
      ...row,
      contentData: row.content_data ? JSON.parse(row.content_data) : null
    }));

    const response = NextResponse.json({ content });
    // Prevent caching to ensure fresh content
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error: any) {
    console.error('Error fetching content:', error);
    const errorResponse = NextResponse.json({ content: [] });
    errorResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return errorResponse;
  }
}


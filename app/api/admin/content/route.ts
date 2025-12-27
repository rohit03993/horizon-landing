import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import jwt from 'jsonwebtoken';

function verifyToken(token: string | null) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
  } catch {
    return null;
  }
}

// GET all content
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDbConnection();
    const [rows] = await db.execute('SELECT * FROM page_content ORDER BY section_key');

    return NextResponse.json({ content: rows });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST/PUT - Update content
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sectionKey, contentType, contentData } = body;

    if (!sectionKey || !contentType) {
      return NextResponse.json(
        { error: 'sectionKey and contentType are required' },
        { status: 400 }
      );
    }

    const db = getDbConnection();
    
    // Check if content exists
    const [existing] = await db.execute(
      'SELECT * FROM page_content WHERE section_key = ?',
      [sectionKey]
    );

    if ((existing as any[]).length > 0) {
      // Update existing
      await db.execute(
        'UPDATE page_content SET content_type = ?, content_data = ? WHERE section_key = ?',
        [contentType, JSON.stringify(contentData), sectionKey]
      );
    } else {
      // Insert new
      await db.execute(
        'INSERT INTO page_content (section_key, content_type, content_data) VALUES (?, ?, ?)',
        [sectionKey, contentType, JSON.stringify(contentData)]
      );
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}


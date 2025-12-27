import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import jwt from 'jsonwebtoken';

// Verify JWT token
function verifyToken(token: string | null) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = getDbConnection();
    const [rows] = await db.execute(
      'SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 100'
    );

    return NextResponse.json(
      { success: true, submissions: rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to database
    const db = getDbConnection();
    const [result] = await db.execute(
      'INSERT INTO form_submissions (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, message || null, 'website']
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        id: (result as any).insertId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}


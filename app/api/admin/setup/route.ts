import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection, initDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

// This route initializes the database and creates the first admin user
async function setupDatabase() {
  try {
    // Initialize database tables (this will create page_content table too)
    await initDatabase();

    // Create default admin user
    const db = getDbConnection();
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const [existing] = await db.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [defaultUsername]
    );

    if ((existing as any[]).length > 0) {
      return {
        success: true,
        message: 'Database already initialized. Admin user exists.',
        username: defaultUsername
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    // Create admin user
    await db.execute(
      'INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)',
      [defaultUsername, passwordHash, '']
    );

    return {
      success: true,
      message: 'Database initialized successfully',
      username: defaultUsername,
      password: defaultPassword,
      warning: 'Please change the default password after first login!'
    };
  } catch (error: any) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const result = await setupDatabase();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to setup database: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await setupDatabase();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to setup database: ' + error.message },
      { status: 500 }
    );
  }
}


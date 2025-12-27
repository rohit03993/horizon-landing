import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const db = getDbConnection();
    
    // Test connection by running a simple query
    const [result] = await db.execute('SELECT 1 as test');
    
    // Try to get database name
    const [dbInfo] = await db.execute('SELECT DATABASE() as db_name');
    const dbName = (dbInfo as any[])[0]?.db_name || 'unknown';
    
    // Check if tables exist
    const [tables] = await db.execute(
      "SHOW TABLES LIKE 'form_submissions'"
    );
    const hasTables = (tables as any[]).length > 0;
    
    return NextResponse.json({
      success: true,
      connected: true,
      database: dbName,
      message: 'Database connection successful!',
      tablesExist: hasTables,
      env: {
        DB_HOST: process.env.DB_HOST || 'not set',
        DB_PORT: process.env.DB_PORT || 'not set',
        DB_NAME: process.env.DB_NAME || 'not set',
        DB_USER: process.env.DB_USER || 'not set',
        DB_PASSWORD: process.env.DB_PASSWORD === '' ? 'empty' : 'set',
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      connected: false,
      error: error.message,
      env: {
        DB_HOST: process.env.DB_HOST || 'not set',
        DB_PORT: process.env.DB_PORT || 'not set',
        DB_NAME: process.env.DB_NAME || 'not set',
        DB_USER: process.env.DB_USER || 'not set',
        DB_PASSWORD: process.env.DB_PASSWORD === '' ? 'empty' : 'set',
      }
    }, { status: 500 });
  }
}


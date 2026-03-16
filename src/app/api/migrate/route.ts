import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS agent_framework_updates (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER NOT NULL REFERENCES newsletters(id),
        title TEXT NOT NULL,
        link TEXT,
        sort_order INTEGER DEFAULT 0
      )
    `;
    return NextResponse.json({ success: true, message: 'Table agent_framework_updates created.' });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ error: 'Migration failed', details: String(error) }, { status: 500 });
  }
}

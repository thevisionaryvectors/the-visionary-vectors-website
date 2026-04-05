import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS article_reactions (
        id SERIAL PRIMARY KEY,
        article_slug TEXT NOT NULL UNIQUE,
        like_count INTEGER NOT NULL DEFAULT 0,
        comment_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    return NextResponse.json({ success: true, message: 'Table article_reactions created.' });
  } catch (error) {
    return NextResponse.json({ error: 'Migration failed', details: String(error) }, { status: 500 });
  }
}

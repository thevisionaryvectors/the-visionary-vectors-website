import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET /api/article-reactions/[slug] — fetch counts
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const rows = await sql`
      SELECT like_count, comment_count
      FROM article_reactions
      WHERE article_slug = ${slug}
    `;
    if (rows.length === 0) {
      return NextResponse.json({ like_count: 0, comment_count: 0 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST /api/article-reactions/[slug] — increment like or comment
// body: { action: 'like' | 'unlike' | 'comment' }
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { action } = await req.json();

  if (!['like', 'unlike', 'comment'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  try {
    // Upsert row for this slug
    await sql`
      INSERT INTO article_reactions (article_slug, like_count, comment_count)
      VALUES (${slug}, 0, 0)
      ON CONFLICT (article_slug) DO NOTHING
    `;

    if (action === 'like') {
      await sql`
        UPDATE article_reactions
        SET like_count = like_count + 1, updated_at = NOW()
        WHERE article_slug = ${slug}
      `;
    } else if (action === 'unlike') {
      await sql`
        UPDATE article_reactions
        SET like_count = GREATEST(like_count - 1, 0), updated_at = NOW()
        WHERE article_slug = ${slug}
      `;
    } else if (action === 'comment') {
      await sql`
        UPDATE article_reactions
        SET comment_count = comment_count + 1, updated_at = NOW()
        WHERE article_slug = ${slug}
      `;
    }

    const rows = await sql`
      SELECT like_count, comment_count FROM article_reactions WHERE article_slug = ${slug}
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const revalidate = 3600;

export async function GET() {
  try {
    const newsletters = await sql`
      SELECT * FROM newsletters ORDER BY issue_date DESC LIMIT 1
    `;

    if (newsletters.length === 0) {
      return NextResponse.json({ error: 'No newsletter found' }, { status: 404 });
    }

    const newsletter = newsletters[0];
    const newsletterId = newsletter.id;

    const [bigStories, researchPapers, aiTools, aiSystemsList, interestingLinksList] = await Promise.all([
      sql`SELECT * FROM big_story WHERE newsletter_id = ${newsletterId} LIMIT 1`,
      sql`SELECT * FROM research_papers WHERE newsletter_id = ${newsletterId} LIMIT 1`,
      sql`SELECT * FROM tools WHERE newsletter_id = ${newsletterId} LIMIT 1`,
      sql`SELECT * FROM model_releases WHERE newsletter_id = ${newsletterId} ORDER BY sort_order ASC LIMIT 1`,
      sql`SELECT * FROM interesting_links WHERE newsletter_id = ${newsletterId} ORDER BY sort_order ASC`,
    ]);

    return NextResponse.json({
      newsletter,
      bigStory: bigStories[0] ?? null,
      researchPaper: researchPapers[0] ?? null,
      aiTool: aiTools[0] ?? null,
      aiSystem: aiSystemsList[0] ?? null,
      interestingLinks: interestingLinksList,
    });
  } catch (error) {
    console.error('Failed to fetch newsletter:', error);
    return NextResponse.json({ error: 'Failed to fetch newsletter' }, { status: 500 });
  }
}

import React from 'react';
import { sql } from '@/lib/db';
import NewsletterContent from '@/components/NewsletterContent';

/* ─── ISR: revalidate every hour (newsletter is weekly) ──────── */
export const revalidate = 3600;

/* ─── Types ─────────────────────────────────────────────────── */
interface Newsletter {
  id: number;
  title: string;
  subtitle: string;
  issue_date: string;
}

interface BigStory {
  id: number;
  title: string;
  description: string;
  body: string | null;
  link: string | null;
  badge: string | null;
  badge_class: string;
  image_url: string | null;
}

interface ResearchPaper {
  id: number;
  name: string;
  description: string;
  link: string;
  source: string | null;
}

interface AiTool {
  id: number;
  name: string;
  description: string;
  badge: string;
  try_link: string | null;
  read_link: string | null;
}

interface AiSystem {
  id: number;
  title: string;
  description: string;
  badge: string | null;
  badge_class: string;
  link: string | null;
}

interface InterestingLink {
  id: number;
  title: string;
  description: string;
  why: string | null;
  link: string | null;
  badge: string | null;
  badge_class: string;
}

/* ─── Newsletter Page ────────────────────────────────────────── */
export default async function NewsletterPage() {
  const newsletters = await sql`
    SELECT * FROM newsletters ORDER BY issue_date DESC LIMIT 1
  ` as Newsletter[];

  if (newsletters.length === 0) {
    return <div className="nl-root"><p style={{ color: '#94a3b8' }}>No newsletter found.</p></div>;
  }

  const newsletter = newsletters[0];
  const newsletterId = newsletter.id;

  const [bigStories, researchPapers, aiTools, aiSystemsList, interestingLinksList] = await Promise.all([
    (await sql`SELECT * FROM big_story WHERE newsletter_id = ${newsletterId} LIMIT 1`) as BigStory[],
    (await sql`SELECT * FROM research_papers WHERE newsletter_id = ${newsletterId} LIMIT 1`) as ResearchPaper[],
    (await sql`SELECT * FROM tools WHERE newsletter_id = ${newsletterId} LIMIT 1`) as AiTool[],
    (await sql`SELECT * FROM model_releases WHERE newsletter_id = ${newsletterId} ORDER BY sort_order ASC LIMIT 1`) as AiSystem[],
    (await sql`SELECT * FROM interesting_links WHERE newsletter_id = ${newsletterId} ORDER BY sort_order ASC`) as InterestingLink[],
  ]);

  return (
    <NewsletterContent
      newsletter={newsletter}
      bigStory={bigStories[0] ?? null}
      researchPaper={researchPapers[0] ?? null}
      aiTool={aiTools[0] ?? null}
      aiSystem={aiSystemsList[0] ?? null}
      interestingLinks={interestingLinksList}
    />
  );
}

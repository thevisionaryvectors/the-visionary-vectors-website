import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { weeklyNewsletterEmailHtml } from '@/lib/emailTemplates';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://the-visionary-vectors-website.vercel.app';
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newsletters = await sql`SELECT * FROM newsletters ORDER BY issue_date DESC LIMIT 1`;
  if (newsletters.length === 0) {
    return NextResponse.json({ error: 'No newsletter found' }, { status: 404 });
  }
  const newsletter = newsletters[0] as { id: number; title: string; subtitle: string; issue_date: string };

  const issueDate = new Date(newsletter.issue_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const subscribers = await sql`SELECT email FROM subscribers`;
  if (subscribers.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No subscribers' });
  }

  const emails = (subscribers as { email: string }[]).map((s) => s.email);
  let sent = 0;

  for (const to of emails) {
    await sendEmail({
      to,
      subject: 'Prompt Notes — Issue 4 is live',
      html: weeklyNewsletterEmailHtml({
        issueDate,
        featuredIssueUrl: `${BASE_URL}/article/how-claude-code-was-leaked-and-how-to-prevent-it`,
        handsInStackUrl: `${BASE_URL}/article/google-adk-skills-explained`,
      }),
    });
    sent++;
  }

  return NextResponse.json({ sent, message: `Weekly email sent to ${sent} subscriber(s)` });
}

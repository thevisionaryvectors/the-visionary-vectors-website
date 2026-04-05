import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { welcomeEmailHtml } from '@/lib/emailTemplates';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://the-visionary-vectors-website.vercel.app';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const existing = await sql`SELECT id FROM subscribers WHERE email = ${email}`;
  if (existing.length > 0) {
    return NextResponse.json({ alreadySubscribed: true });
  }

  await sql`INSERT INTO subscribers (email) VALUES (${email})`;

  // Fetch the latest newsletter
  const latestNewsletter = await sql`SELECT * FROM newsletters ORDER BY issue_date DESC LIMIT 1`;
  const newsletter = latestNewsletter[0] as { id: number; title: string; subtitle: string; issue_date: string } | undefined;
  const latestIssueUrl = newsletter ? `${BASE_URL}/newsletter/${newsletter.id}` : `${BASE_URL}/newsletter`;

  const issueDate = newsletter
    ? new Date(newsletter.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  // Send welcome email
  try {
    await sendEmail({
      to: email,
      subject: 'Welcome to Prompt Notes 🤍',
      html: welcomeEmailHtml(latestIssueUrl),
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
    return NextResponse.json({ success: true, emailError: String(err) });
  }

  return NextResponse.json({ success: true });
}

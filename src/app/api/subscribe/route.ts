import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { welcomeEmailHtml } from '@/lib/emailTemplates';

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

  // Send welcome email
  try {
    await sendEmail({
      to: email,
      subject: 'Welcome to Prompt Notes 🤍',
      html: welcomeEmailHtml('https://www.thevisionaryvectorsblog.com/newsletter'),
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
    return NextResponse.json({ success: true, emailError: String(err) });
  }

  return NextResponse.json({ success: true });
}

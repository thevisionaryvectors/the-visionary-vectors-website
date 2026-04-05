import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { welcomeEmailHtml, weeklyNewsletterEmailHtml } from '@/lib/emailTemplates';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Pass ?email=your@email.com' }, { status: 400 });
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  await sendEmail({
    to: email,
    subject: 'Welcome to Prompt Notes 🤍',
    html: welcomeEmailHtml(`${BASE_URL}/newsletter`),
  });

  await sendEmail({
    to: email,
    subject: 'Prompt Notes — Issue 4 is live',
    html: weeklyNewsletterEmailHtml({
      issueDate: 'April 5, 2026',
      featuredIssueUrl: `${BASE_URL}/article/how-claude-code-was-leaked-and-how-to-prevent-it`,
      handsInStackUrl: `${BASE_URL}/article/google-adk-skills-explained`,
    }),
  });

  return NextResponse.json({ success: true, message: `Test emails sent to ${email}` });
}

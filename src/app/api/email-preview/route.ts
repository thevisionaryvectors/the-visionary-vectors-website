import { NextRequest } from 'next/server';
import { welcomeEmailHtml, weeklyNewsletterEmailHtml } from '@/lib/emailTemplates';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? 'welcome';

  const html =
    type === 'weekly'
      ? weeklyNewsletterEmailHtml({
          issueDate: 'April 5, 2026',
          featuredIssueUrl: 'https://the-visionary-vectors-website.vercel.app/article/how-claude-code-was-leaked-and-how-to-prevent-it',
          handsInStackUrl: 'https://the-visionary-vectors-website.vercel.app/article/google-adk-skills-explained',
        })
      : welcomeEmailHtml('https://the-visionary-vectors-website.vercel.app/newsletter');

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

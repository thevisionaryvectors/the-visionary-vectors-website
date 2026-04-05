'use client';

import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

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


interface InterestingLink {
  id: number;
  title: string;
  description: string;
  why: string | null;
  link: string | null;
  badge: string | null;
  badge_class: string;
}

interface AgentFrameworkUpdate {
  id: number;
  title: string;
  description: string | null;
  link: string | null;
  sort_order: number;
}

interface Props {
  newsletter: Newsletter;
  allNewsletters: Newsletter[];
  bigStories: BigStory[];
  interestingLinks: InterestingLink[];
  agentFrameworkUpdates: AgentFrameworkUpdate[];
}

function parseBullets(text: string): string[] {
  return text.split('•').map(s => s.trim()).filter(Boolean);
}

export default function NewsletterContent({
  newsletter,
  allNewsletters,
  bigStories,
  interestingLinks,
  agentFrameworkUpdates,
}: Props) {
  const featuredStory = bigStories[0] ?? null;
  const featuredBullets = featuredStory?.body ? parseBullets(featuredStory.body).slice(0, 3) : [];

  // Mini insights: prefer agent framework update titles, fall back to interesting link titles
  const miniInsights = (agentFrameworkUpdates.length > 0
    ? agentFrameworkUpdates.slice(0, 3).map(u => u.title)
    : interestingLinks.slice(0, 3).map(l => l.title));

  return (
    <div className="nl-root">
      <div className="nl-newsletter">

        {/* Back */}
        <div className="mb-2">
          <Link href="/ayushi" className="text-indigo-400 text-[1.35rem] no-underline leading-none">
            ←
          </Link>
        </div>

        {/* ── HERO ── */}
        <section className="flex flex-col items-center text-center gap-3 pb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--nl-heading)' }}>
            PROMPT NOTES
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--nl-text-muted)' }}>
            Issue 4
          </p>
          
          <p style={{ color: 'var(--nl-text-muted)' }} className="text-sm">
            Weekly insights from an AI engineer building real systems.
          </p>
  
          <div className="mt-3">
            <SubscribeForm label="SUBSCRIBE FOR FREE" />
          </div>
        </section>

        {/* ── FEATURED ISSUE ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Featured Issue</h2>
          <div className="nl-bento-card flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold leading-snug m-0" style={{ color: 'var(--nl-heading)' }}>
                How Claude Code Was Leaked — And How Can You Prevent It?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--nl-text-muted)' }}>
                A small packaging mistake exposed Claude&apos;s source — a reminder that most incidents aren&apos;t sophisticated, just preventable.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--nl-text-muted)' }}>
                In this issue: what went wrong, why it matters, how it reflects our growing reliance on AI, and a checklist you should probably be using.
              </p>
            </div>
            <Link
              href="/article/how-claude-code-was-leaked-and-how-to-prevent-it"
              className="inline-flex items-center gap-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors w-fit no-underline font-medium"
            >
              Read the article →
            </Link>
          </div>
        </section>

        {/* ── WHAT YOU'LL GET ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Hands in the Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left card */}
            <div className="nl-bento-card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base m-0" style={{ color: 'var(--nl-heading)' }}>ADK Skills — Build Agents That Actually Know What They&apos;re Doing</h3>
              </div>
              <p className="text-sm m-0" style={{ color: 'var(--nl-text-muted)' }}>
                Skills in Google ADK aren&apos;t just a pattern — they&apos;re how you stop agents from hallucinating and start building something you can actually ship.
              </p>
              <Link
                href="/article/google-adk-skills-explained"
                className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium no-underline mt-auto pt-1"
              >
                Read the article →
              </Link>
            </div>

            {/* Right card */}
            <div className="nl-bento-card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base m-0" style={{ color: 'var(--nl-heading)' }}>Mini Insights</h3>
              </div>
              <p className="text-sm m-0" style={{ color: 'var(--nl-text-muted)' }}>
                Mini insights — quick, unfiltered thoughts I don&apos;t publish anywhere else.
              </p>
              <p className="text-sm m-0 font-medium" style={{ color: 'var(--nl-text-muted)' }}>
                Subscribers only.
              </p>
              <div className="mt-auto pt-1">
                <SubscribeForm
                  label="🤩 Get these every week → Subscribe"
                  buttonClassName="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[0.8rem] font-medium transition-colors cursor-pointer w-full justify-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ARCHIVE ── */}
        {allNewsletters.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Archive</h2>
            <div className="nl-bento-card p-0 overflow-hidden">
              {allNewsletters.filter(nl => nl.id !== 2).map((nl, i) => (
                <div
                  key={nl.id}
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--nl-divider)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--nl-text)' }}>
                    {nl.title}{nl.subtitle ? ` → ${nl.subtitle}` : ''}
                  </span>
                  <Link
                    href={`/newsletter/${nl.id}`}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium no-underline whitespace-nowrap ml-4 transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── ABOUT ── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-purple-400 text-xs font-semibold uppercase tracking-widest">About</h2>
          <div className="nl-bento-card flex flex-col gap-3">
            <p className="font-semibold text-base m-0" style={{ color: 'var(--nl-heading)' }}>Hi, I&apos;m Ayushi.</p>
            <p className="text-sm m-0" style={{ color: 'var(--nl-text)' }}>
              I&apos;m an AI engineer working on LLM-powered and agentic systems, and still learning something new about this space every day.
            </p>
            <p className="text-sm m-0" style={{ color: 'var(--nl-text)' }}>
              Over the past few years, I&apos;ve spent a lot of time building, experimenting, and trying to understand what actually works beyond demos and POCs.
            </p>
            <p className="text-sm m-0" style={{ color: 'var(--nl-text)' }}>
              This newsletter is where I share what I&apos;m learning — the useful bits, the mistakes, and the things that feel worth paying attention to.
            </p>
            <p className="text-sm m-0" style={{ color: 'var(--nl-text-muted)' }}>
              If you&apos;d like to follow along, you can subscribe and get this in your inbox.
            </p>
          </div>
        </section>


      </div>
    </div>
  );
}

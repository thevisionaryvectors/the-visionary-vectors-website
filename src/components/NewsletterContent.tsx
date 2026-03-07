'use client';

import React from 'react';
import Link from 'next/link';

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

interface EngineeringBreakdown {
  id: number;
  name: string;
  description: string;
  link: string;
  source: string | null;
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

interface Props {
  newsletter: Newsletter;
  bigStory: BigStory | null;
  engineeringBreakdown: EngineeringBreakdown | null;
  researchPaper: ResearchPaper | null;
  aiTool: AiTool | null;
  aiSystem: AiSystem | null;
  interestingLink: InterestingLink | null;
}

export default function NewsletterContent({
  newsletter,
  bigStory,
  engineeringBreakdown,
  researchPaper,
  aiTool,
  aiSystem,
  interestingLink,
}: Props) {
  const formattedDate = new Date(newsletter.issue_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="nl-root">
      <div className="nl-newsletter">
        {/* Back arrow */}
        <div>
          <Link href="/ayushi" className="text-indigo-500 text-[1.35rem] no-underline leading-none">
            ←
          </Link>
        </div>
        {/* Header */}
        <header>
          <div className="nl-header">
            <div className="nl-header-info">
              <h1>{newsletter.title}</h1>
              <div className="nl-header-date">{formattedDate}</div>
            </div>
          </div>
          <p className="nl-header-subtitle">{newsletter.subtitle}</p>
          <hr className="nl-divider" />
        </header>

        {/* Bento Grid - mobile-first single column, grid on md+ */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4 md:mt-1">
          {/* 0️⃣ Editor's Note — full width */}
          <div className="nl-bento-card border-dashed md:col-span-3">
            <span className="nl-bento-label text-indigo-400">From my notebook</span>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              This week highlighted an interesting shift in AI development: reasoning transparency and infrastructure efficiency.
            </p>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              OpenAI&apos;s Thinking System Card suggests a future where developers can inspect how reasoning models structure multi-step logic rather than treating them as black boxes. At the same time, infrastructure releases like Gemini Flash-Lite show that the next competitive advantage may be latency and cost efficiency rather than just larger models.
            </p>
            <p className="mt-auto self-end text-[0.82rem] text-indigo-400 italic">— Ayushi</p>
          </div>

          {/* 1️⃣ Big Story — full width hero */}
          {bigStory && (
            <div className="nl-bento-card flex flex-col md:flex-row gap-4 md:gap-8 items-stretch md:col-span-3">
              {/* Text content */}
              <div className="flex flex-col flex-1">
                <span className="nl-bento-label text-yellow-400">Big Story</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="nl-bento-title m-0">
                    {bigStory.link ? (
                      <a href={bigStory.link} target="_blank" rel="noopener noreferrer">{bigStory.title}</a>
                    ) : bigStory.title}
                  </h3>
                  {bigStory.badge && <span className="nl-source-tag">{bigStory.badge}</span>}
                </div>
                <p className="nl-bento-desc">{bigStory.description}</p>
                {bigStory.body && <p className="nl-bento-body">{bigStory.body}</p>}
                {bigStory.link && (
                  <a href={bigStory.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                    Read More ↗
                  </a>
                )}
              </div>
              {/* Image */}
              {bigStory.image_url && (
                <div className="flex-shrink-0 w-full md:w-[260px] rounded-xl overflow-hidden self-stretch mt-4 md:mt-0">
                  <img
                    src={bigStory.image_url}
                    alt={bigStory.title}
                    className="w-full h-full object-cover block"
                  />
                </div>
              )}
            </div>
          )}

          {/* 2️⃣ AI Systems & Infrastructure — 1 col */}
          {aiSystem && (
            <div className="nl-bento-card">
              <span className="nl-bento-label text-cyan-400">AI Systems &amp; Infrastructure</span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="nl-bento-title m-0">
                  {aiSystem.link ? (
                    <a href={aiSystem.link} target="_blank" rel="noopener noreferrer">{aiSystem.title}</a>
                  ) : aiSystem.title}
                </h3>
                {aiSystem.badge && <span className="nl-source-tag">{aiSystem.badge}</span>}
              </div>
              <p className="nl-bento-desc">{aiSystem.description}</p>
              {aiSystem.link && (
                <a href={aiSystem.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                  Read More ↗
                </a>
              )}
            </div>
          )}

          {/* 3️⃣ Engineering Breakdown */}
          {engineeringBreakdown && (
            <div className="nl-bento-card">
              <span className="nl-bento-label">Engineering Breakdown</span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="nl-bento-title m-0">{engineeringBreakdown.name}</h3>
                {engineeringBreakdown.source && <span className="nl-source-tag">{engineeringBreakdown.source}</span>}
              </div>
              <p className="nl-bento-desc">{engineeringBreakdown.description}</p>
              <a href={engineeringBreakdown.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                Read More ↗
              </a>
            </div>
          )}

          {/* 4️⃣ Tools for AI Engineers */}
          {aiTool && (
            <div className="nl-bento-card">
              <span className="nl-bento-label">Tools for AI Engineers</span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="nl-bento-title m-0">{aiTool.name}</h3>
                {aiTool.badge && <span className="nl-source-tag">{aiTool.badge}</span>}
              </div>
              <p className="nl-bento-desc">
                {aiTool.description}
              </p>
            </div>
          )}

          {/* 5️⃣ Row 3 — Research Paper + Interesting Links, equal halves */}
          <div className="flex flex-col md:flex-row gap-4 md:col-span-3">
            {researchPaper && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label" style={{ color: '#FF5C00' }}>Research Paper of the Week</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="nl-bento-title m-0">{researchPaper.name}</h3>
                  {researchPaper.source && <span className="nl-source-tag">{researchPaper.source}</span>}
                </div>
                <p className="nl-bento-desc">{researchPaper.description}</p>
                <a href={researchPaper.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                  Read More ↗
                </a>
              </div>
            )}
            {interestingLink && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label">Interesting Links</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="nl-bento-title m-0">
                    {interestingLink.link ? (
                      <a href={interestingLink.link} target="_blank" rel="noopener noreferrer">{interestingLink.title}</a>
                    ) : interestingLink.title}
                  </h3>
                  {interestingLink.badge && <span className="nl-source-tag">{interestingLink.badge}</span>}
                </div>
                <p className="nl-bento-desc">{interestingLink.description}</p>
                {interestingLink.link && (
                  <a href={interestingLink.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                    Read More ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

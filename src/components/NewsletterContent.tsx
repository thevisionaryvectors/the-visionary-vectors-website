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

interface Props {
  newsletter: Newsletter;
  bigStory: BigStory | null;
  researchPaper: ResearchPaper | null;
  aiTool: AiTool | null;
  aiSystem: AiSystem | null;
  interestingLinks: InterestingLink[];
}

export default function NewsletterContent({
  newsletter,
  bigStory,
  researchPaper,
  aiTool,
  aiSystem,
  interestingLinks,
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
          {newsletter.subtitle && <p className="nl-header-subtitle">{newsletter.subtitle}</p>}

        </header>

        {/* Bento Grid - mobile-first single column, grid on md+ */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4 md:mt-1">
          {/* 0️⃣ Editor's Note — full width */}
          <div className="nl-bento-card notebook-dotted-border md:col-span-3">
            <span className="nl-bento-label text-indigo-400">From my notebook</span>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              This week in AI felt like a coordinated sprint toward practicality. Across the board, companies are trying to make their models genuinely useful for the daily grind. We saw OpenAI pushing for more transparent reasoning with GPT-5.4, Google hyper-optimizing under the hood with Gemini 3.1 Flash-Lite, and Anthropic teaching its agents modular skills.
            </p>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              Meanwhile, the science side is still debating a hilarious, existential question: are these models actually controlling their logic, or are they just faking it really, really well? Add in new coding benchmarks and Amazon rolling out AI dashboards for sellers, and the industry&apos;s new direction is obvious. The era of the flashy tech demo is over; the era of surviving a real-life Monday morning workflow is here.
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
                {bigStory.body &&
                  (bigStory.body.includes('•') ? (
                    <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                      {bigStory.body.split('•').filter(Boolean).map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="nl-bento-body">{bigStory.body}</p>
                  ))}
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
            <div className="nl-bento-card md:col-span-2">
              <span className="nl-bento-label text-cyan-400">Model Releases</span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="nl-bento-title m-0">
                  {aiSystem.link ? (
                    <a href={aiSystem.link} target="_blank" rel="noopener noreferrer">{aiSystem.title}</a>
                  ) : aiSystem.title}
                </h3>
                {aiSystem.badge && <span className="nl-source-tag">{aiSystem.badge}</span>}
              </div>
              {aiSystem.description.includes('•') ? (
                <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                  {aiSystem.description.split('•').filter(Boolean).map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className="nl-bento-desc">{aiSystem.description}</p>
              )}
              {aiSystem.link && (
                <a href={aiSystem.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-end text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                  Read More ↗
                </a>
              )}
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
              {(aiTool.try_link || aiTool.read_link) && (
                <div className="mt-auto flex gap-4 self-end">
                  {aiTool.try_link && (
                    <a href={aiTool.try_link} target="_blank" rel="noopener noreferrer" className="text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                      Try Now ↗
                    </a>
                  )}
                  {aiTool.read_link && (
                    <a href={aiTool.read_link} target="_blank" rel="noopener noreferrer" className="text-[0.75rem] font-bold text-sky-400 tracking-wider no-underline transition-colors duration-200 hover:text-sky-300">
                      Read Now ↗
                    </a>
                  )}
                </div>
              )}
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
            {interestingLinks.length > 0 && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label">Interesting Links</span>
                <div className="flex flex-col gap-3">
                  {interestingLinks.map((item) => (
                    <p key={item.id} className="nl-bento-desc m-0 leading-[1.7]">
                      <span className="font-semibold text-white">{item.title}</span>
                      {' — '}
                      {item.description}
                      {item.link && (
                        <>
                          {' — '}
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold no-underline hover:text-sky-300 transition-colors duration-200">
                            Read Now ↗
                          </a>
                        </>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

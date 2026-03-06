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
          <Link href="/ayushi" style={{ color: '#6366f1', fontSize: '1.35rem', textDecoration: 'none', lineHeight: 1 }}>
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

        {/* Bento Grid */}
        <div className="nl-bento">

          {/* 0️⃣ Editor's Note — full width */}
          <div className="nl-bento-card nl-bento-hero" style={{ borderStyle: 'dashed' }}>
              <span className="nl-bento-label" style={{ color: '#818cf8' }}>From my notebook</span>
            <p className="nl-bento-desc" style={{ fontSize: '0.92rem', lineHeight: 1.75, maxWidth: 'none' }}>
              This week highlighted an interesting shift in AI development: reasoning transparency and infrastructure efficiency.
            </p>
            <p className="nl-bento-desc" style={{ fontSize: '0.92rem', lineHeight: 1.75, maxWidth: 'none' }}>
              OpenAI&apos;s Thinking System Card suggests a future where developers can inspect how reasoning models structure multi-step logic rather than treating them as black boxes. At the same time, infrastructure releases like Gemini Flash-Lite show that the next competitive advantage may be latency and cost efficiency rather than just larger models.
            </p>
            <p style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.82rem', color: '#818cf8', fontStyle: 'italic' }}>— Ayushi</p>
          </div>

          {/* 1️⃣ Big Story — full width hero */}
          {bigStory && (
            <div className="nl-bento-card nl-bento-hero" style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'stretch' }}>
              {/* Text content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="nl-bento-label" style={{ color: '#facc15' }}>Big Story</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 className="nl-bento-title" style={{ margin: 0 }}>
                    {bigStory.link ? (
                      <a href={bigStory.link} target="_blank" rel="noopener noreferrer">{bigStory.title}</a>
                    ) : bigStory.title}
                  </h3>
                  {bigStory.badge && <span className="nl-source-tag">{bigStory.badge}</span>}
                </div>
                <p className="nl-bento-desc">{bigStory.description}</p>
                {bigStory.body && <p className="nl-bento-body">{bigStory.body}</p>}
                {bigStory.link && (
                  <a href={bigStory.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.75rem', fontWeight: '700', color: '#60a5fa', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }} onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
                    Read More ↗
                  </a>
                )}
              </div>
              {/* Image */}
              {bigStory.image_url && (
                <div style={{ flexShrink: 0, width: '260px', borderRadius: '12px', overflow: 'hidden', alignSelf: 'stretch' }}>
                  <img
                    src={bigStory.image_url}
                    alt={bigStory.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* 2️⃣ AI Systems & Infrastructure — 1 col */}
          {aiSystem && (
            <div className="nl-bento-card">
              <span className="nl-bento-label" style={{ color: '#38bdf8' }}>AI Systems &amp; Infrastructure</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 className="nl-bento-title" style={{ margin: 0 }}>
                  {aiSystem.link ? (
                    <a href={aiSystem.link} target="_blank" rel="noopener noreferrer">{aiSystem.title}</a>
                  ) : aiSystem.title}
                </h3>
                {aiSystem.badge && <span className="nl-source-tag">{aiSystem.badge}</span>}
              </div>
              <p className="nl-bento-desc">{aiSystem.description}</p>
              {aiSystem.link && (
                <a href={aiSystem.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.75rem', fontWeight: '700', color: '#60a5fa', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }} onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
                  Read More ↗
                </a>
              )}
            </div>
          )}

          {/* 3️⃣ Engineering Breakdown */}
          {engineeringBreakdown && (
            <div className="nl-bento-card">
              <span className="nl-bento-label">Engineering Breakdown</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 className="nl-bento-title" style={{ margin: 0 }}>{engineeringBreakdown.name}</h3>
                {engineeringBreakdown.source && <span className="nl-source-tag">{engineeringBreakdown.source}</span>}
              </div>
              <p className="nl-bento-desc">{engineeringBreakdown.description}</p>
              <a href={engineeringBreakdown.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.75rem', fontWeight: '700', color: '#60a5fa', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }} onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
                Read More ↗
              </a>
            </div>
          )}

          {/* 4️⃣ Tools for AI Engineers */}
          {aiTool && (
            <div className="nl-bento-card">
              <span className="nl-bento-label">Tools for AI Engineers</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 className="nl-bento-title" style={{ margin: 0 }}>{aiTool.name}</h3>
                {aiTool.badge && <span className="nl-source-tag">{aiTool.badge}</span>}
              </div>
              <p className="nl-bento-desc">
                {aiTool.description}
              </p>
            </div>
          )}

          {/* 5️⃣ Row 3 — Research Paper + Interesting Links, equal halves */}
          <div style={{ gridColumn: 'span 3', display: 'flex', gap: '1rem' }}>
            {researchPaper && (
              <div className="nl-bento-card" style={{ flex: 1 }}>
                <span className="nl-bento-label" style={{ color: '#fb923c' }}>Research Paper of the Week</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 className="nl-bento-title" style={{ margin: 0 }}>{researchPaper.name}</h3>
                  {researchPaper.source && <span className="nl-source-tag">{researchPaper.source}</span>}
                </div>
                <p className="nl-bento-desc">{researchPaper.description}</p>
                <a href={researchPaper.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.75rem', fontWeight: '700', color: '#60a5fa', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }} onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
                  Read More ↗
                </a>
              </div>
            )}
            {interestingLink && (
              <div className="nl-bento-card" style={{ flex: 1 }}>
                <span className="nl-bento-label">Interesting Links</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 className="nl-bento-title" style={{ margin: 0 }}>
                    {interestingLink.link ? (
                      <a href={interestingLink.link} target="_blank" rel="noopener noreferrer">{interestingLink.title}</a>
                    ) : interestingLink.title}
                  </h3>
                  {interestingLink.badge && <span className="nl-source-tag">{interestingLink.badge}</span>}
                </div>
                <p className="nl-bento-desc">{interestingLink.description}</p>
                {interestingLink.link && (
                  <a href={interestingLink.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '0.75rem', fontWeight: '700', color: '#60a5fa', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; }} onMouseLeave={e => { e.currentTarget.style.color = '#60a5fa'; }}>
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

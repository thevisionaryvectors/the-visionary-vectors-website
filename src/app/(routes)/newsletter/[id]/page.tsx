import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sql } from '@/lib/db';

export const revalidate = 3600;

interface Newsletter { id: number; title: string; subtitle: string; issue_date: string; }
interface BigStory { id: number; title: string; description: string; body: string | null; link: string | null; image_url: string | null; }
interface ResearchPaper { id: number; name: string; description: string; link: string; source: string | null; }
interface AiTool { id: number; name: string; description: string; badge: string; try_link: string | null; read_link: string | null; }
interface AiSystem { id: number; title: string; description: string; badge: string | null; link: string | null; }
interface InterestingLink { id: number; title: string; description: string; why: string | null; link: string | null; badge: string | null; }
interface AgentFrameworkUpdate { id: number; title: string; description: string | null; link: string | null; sort_order: number; }

function parseBullets(text: string): string[] {
  return text.split('•').map(s => s.trim()).filter(Boolean);
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsletters = await sql`SELECT * FROM newsletters WHERE id = ${id}` as Newsletter[];
  if (newsletters.length === 0) notFound();
  const newsletter = newsletters[0];
  const nid = newsletter.id;

  const [bigStories, researchPapers, aiTools, aiSystems, interestingLinks, agentFrameworkUpdates] = await Promise.all([
    sql`SELECT * FROM big_story WHERE newsletter_id = ${nid} ORDER BY sort_order ASC` as unknown as Promise<BigStory[]>,
    sql`SELECT * FROM research_papers WHERE newsletter_id = ${nid} ORDER BY sort_order ASC` as unknown as Promise<ResearchPaper[]>,
    sql`SELECT * FROM tools WHERE newsletter_id = ${nid}` as unknown as Promise<AiTool[]>,
    sql`SELECT * FROM model_releases WHERE newsletter_id = ${nid} ORDER BY sort_order ASC` as unknown as Promise<AiSystem[]>,
    sql`SELECT * FROM interesting_links WHERE newsletter_id = ${nid} ORDER BY sort_order ASC` as unknown as Promise<InterestingLink[]>,
    sql`SELECT * FROM agent_framework_updates WHERE newsletter_id = ${nid} ORDER BY sort_order ASC` as unknown as Promise<AgentFrameworkUpdate[]>,
  ]);

  const formattedDate = new Date(newsletter.issue_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="nl-root">
      <div className="nl-newsletter">

        {/* Back */}
        <div className="mb-2">
          <Link href="/newsletter" className="text-indigo-400 text-[1.35rem] no-underline leading-none">
            ←
          </Link>
        </div>

        {/* Header */}
        <header className="flex flex-col gap-1 mb-6">
          <div className="nl-header">
            <div className="nl-header-info">
              <h1>{newsletter.title}</h1>
              <div className="nl-header-date">{formattedDate}</div>
            </div>
          </div>
          {newsletter.subtitle && <p className="nl-header-subtitle">{newsletter.subtitle}</p>}
          <p className="text-[0.78rem] italic" style={{ color: 'var(--nl-text-subtle)' }}>
            Click on a heading to read the article.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4">

          {/* Big Story */}
          {bigStories.length > 0 && (
            <div className="nl-bento-card flex flex-col gap-6 md:col-span-2">
              <span className="nl-bento-label" style={{ color: '#f87171' }}>Big Story</span>
              {bigStories.map((s) => (
                <div key={s.id} className="flex flex-col gap-1">
                  <h3 className="nl-bento-title m-0">
                    {s.link ? <a href={s.link} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}
                  </h3>
                  <p className="nl-bento-desc">{s.description}</p>
                  {s.body && (s.body.includes('•') ? (
                    <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                      {parseBullets(s.body).map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  ) : <p className="nl-bento-body">{s.body}</p>)}
                  {s.image_url && (
                    <div className="w-full rounded-xl overflow-hidden">
                      <img src={s.image_url} alt={s.title} className="w-full h-full object-cover block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Col 3 — Agent Framework + Interesting Reads */}
          <div className="flex flex-col gap-4 md:col-span-1 md:row-span-2">
            <div className="nl-bento-card">
              <span className="nl-bento-label" style={{ color: '#34d399' }}>Agent Framework Updates</span>
              {agentFrameworkUpdates.length > 0 ? (
                <div className="flex flex-col gap-3 mt-1">
                  {agentFrameworkUpdates.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1">
                      <h3 className="nl-bento-title m-0">
                        {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a> : item.title}
                      </h3>
                      {item.description && (item.description.includes('•') ? (
                        <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                          {parseBullets(item.description).map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      ) : <p className="nl-bento-desc">{item.description}</p>)}
                    </div>
                  ))}
                </div>
              ) : <p className="nl-bento-desc">No updates this week.</p>}
            </div>

            {interestingLinks.length > 0 && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label" style={{ color: '#e879f9' }}>Interesting Reads</span>
                <div className="flex flex-col gap-4">
                  {interestingLinks.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1">
                      <h3 className="nl-bento-title m-0">
                        {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a> : item.title}
                      </h3>
                      {item.description.includes('•') ? (
                        <>
                          {item.description.split('•')[0].trim() && <p className="nl-bento-desc">{item.description.split('•')[0].trim()}</p>}
                          <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                            {parseBullets(item.description).map((p, i) => <li key={i}>{p}</li>)}
                          </ul>
                        </>
                      ) : <p className="nl-bento-desc">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Research */}
          {researchPapers.length > 0 && (
            <div className="nl-bento-card md:col-span-1">
              <span className="nl-bento-label" style={{ color: '#60a5fa' }}>Research & Techniques</span>
              <div className="flex flex-col gap-4">
                {researchPapers.map((p) => (
                  <div key={p.id} className="flex flex-col gap-1">
                    <h3 className="nl-bento-title m-0">
                      <a href={p.link} target="_blank" rel="noopener noreferrer">{p.name}</a>
                    </h3>
                    {p.description.includes('•') ? (
                      <>
                        {p.description.split('•')[0].trim() && <span className="nl-bento-desc">{p.description.split('•')[0].trim()}</span>}
                        <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                          {parseBullets(p.description).map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                      </>
                    ) : <p className="nl-bento-desc">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Industry */}
          {aiSystems.length > 0 && (
            <div className="nl-bento-card md:col-span-1">
              <span className="nl-bento-label" style={{ color: '#fb923c' }}>Industry & Applications</span>
              <div className="flex flex-col gap-4">
                {aiSystems.map((s) => (
                  <div key={s.id} className="flex flex-col gap-1">
                    <h3 className="nl-bento-title m-0">
                      {s.link ? <a href={s.link} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}
                    </h3>
                    {s.description.includes('•') ? (
                      <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                        {parseBullets(s.description).map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    ) : <p className="nl-bento-desc">{s.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Developer Tools */}
          {aiTools.length > 0 && (
            <div className="nl-bento-card md:col-span-3">
              <span className="nl-bento-label" style={{ color: '#a3e635' }}>Developer Tools</span>
              <div className="flex flex-col gap-4">
                {aiTools.map((t) => (
                  <div key={t.id} className="flex flex-col gap-1">
                    <h3 className="nl-bento-title m-0">
                      {(t.try_link || t.read_link) ? (
                        <a href={t.try_link ?? t.read_link ?? ''} target="_blank" rel="noopener noreferrer">{t.name}</a>
                      ) : t.name}
                    </h3>
                    {t.description.includes('•') ? (
                      <>
                        {t.description.split('•')[0].trim() && <p className="nl-bento-desc">{t.description.split('•')[0].trim()}</p>}
                        <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                          {parseBullets(t.description).map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </>
                    ) : <p className="nl-bento-desc">{t.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

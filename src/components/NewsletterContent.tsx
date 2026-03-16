'use client';

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

interface AgentFrameworkUpdate {
  id: number;
  title: string;
  description: string | null;
  link: string | null;
  sort_order: number;
}

interface Props {
  newsletter: Newsletter;
  bigStories: BigStory[];
  researchPapers: ResearchPaper[];
  aiTools: AiTool[];
  aiSystems: AiSystem[];
  interestingLinks: InterestingLink[];
  agentFrameworkUpdates: AgentFrameworkUpdate[];
}

export default function NewsletterContent({
  newsletter,
  bigStories,
  researchPapers,
  aiTools,
  aiSystems,
  interestingLinks,
  agentFrameworkUpdates,
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
          <p className="text-[0.78rem] text-gray-500 italic mt-1">Click on a heading to read the article.</p>
        </header>

        {/* Bento Grid - mobile-first single column, grid on md+ */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4 md:mt-1">
          {/* 0️⃣ Editor's Note — full width */}
          <div className="nl-bento-card notebook-dotted-border md:col-span-3">
            <span className="nl-bento-label" style={{ color: '#c084fc' }}>From my notebook</span>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              The AI landscape is rapidly shifting from simple chatbots to autonomous, action-taking agents. On the consumer side, I can&apos;t wait to try Gemini in Google Maps when it finally hits India! But for us builders, the real excitement is under the hood. Karpathy&apos;s Autoresearch is already the next big thing—I had a blast running it this weekend to train a Hindi GPT and will share those wild results soon.
            </p>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              Huge kudos to the developers behind all the recent agent framework updates. Paired with NVIDIA&apos;s new open datasets and the cost-effective reasoning of Nemotron 3, playing around with agents is getting way cheaper and easier. Core infrastructure is evolving just as fast.
            </p>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              Native multimodal embeddings are going to completely change the game for RAG systems, seamlessly bridging text and vision. We&apos;re also seeing a wave of specialized assistants orchestrating complex workflows, from Microsoft Copilot Coworkers and Perplexity Computer to highly capable healthcare AI (giving us all one more excuse to avoid the doctor!).
            </p>
            <p className="nl-bento-desc text-[0.92rem] leading-[1.75] max-w-none">
              Finally, it&apos;s incredibly inspiring to see this tech applied to real-world crises, like Google&apos;s Groundsource leveraging AI for disaster detection and management.
            </p>
            <p className="mt-auto self-end text-[0.82rem] italic" style={{ color: '#c084fc' }}>— Ayushi</p>
          </div>

          {/* Row 1 — Big Story (col 1-2) */}
          {bigStories.length > 0 && (
            <div className="nl-bento-card flex flex-col gap-6 md:col-span-2">
              <span className="nl-bento-label" style={{ color: '#f87171' }}>Big Story</span>
              {bigStories.map((bigStory) => (
                <div key={bigStory.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="nl-bento-title m-0">
                      {bigStory.link ? (
                        <a href={bigStory.link} target="_blank" rel="noopener noreferrer">{bigStory.title}</a>
                      ) : bigStory.title}
                    </h3>
                  </div>
                  <p className="nl-bento-desc">{bigStory.description}</p>
                  {bigStory.body &&
                    (bigStory.body.includes('•') ? (
                      <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                        {bigStory.body.split('•').filter(Boolean).map((point: string, idx: number) => (
                          <li key={idx}>{point.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="nl-bento-body">{bigStory.body}</p>
                    ))}
                  {bigStory.image_url && (
                    <div className="w-full rounded-xl overflow-hidden">
                      <img src={bigStory.image_url} alt={bigStory.title} className="w-full h-full object-cover block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Rows 1+2 right — Agent Framework Updates (spans 2 rows) */}
          <div className="nl-bento-card md:col-span-1 md:row-span-2">
            <span className="nl-bento-label" style={{ color: '#34d399' }}>Agent Framework Updates</span>
            {agentFrameworkUpdates.length > 0 ? (
              <div className="flex flex-col gap-3 mt-1">
                {agentFrameworkUpdates.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1">
                    <h3 className="nl-bento-title m-0">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                      ) : item.title}
                    </h3>
                    {item.description && <p className="nl-bento-desc">{item.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="nl-bento-desc">No updates this week.</p>
            )}
          </div>

          {/* Row 2 — Research & Techniques (col 1) | Tools for AI Engineers (col 2) */}
          {researchPapers.length > 0 && (
            <div className="nl-bento-card md:col-span-1">
              <span className="nl-bento-label" style={{ color: '#60a5fa' }}>Research & Techniques</span>
              <div className="flex flex-col gap-4">
                {researchPapers.map((researchPaper) => (
                  <div key={researchPaper.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="nl-bento-title m-0">
                        <a href={researchPaper.link} target="_blank" rel="noopener noreferrer">{researchPaper.name}</a>
                      </h3>
                    </div>
                    <p className="nl-bento-desc">{researchPaper.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {aiSystems.length > 0 && (
            <div className="nl-bento-card md:col-span-1">
              <span className="nl-bento-label" style={{ color: '#fb923c' }}>Industry & Applications</span>
              <div className="flex flex-col gap-4">
                {aiSystems.map((aiSystem) => (
                  <div key={aiSystem.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="nl-bento-title m-0">
                        {aiSystem.link ? (
                          <a href={aiSystem.link} target="_blank" rel="noopener noreferrer">{aiSystem.title}</a>
                        ) : aiSystem.title}
                      </h3>
                    </div>
                    {aiSystem.description.includes('•') ? (
                      <ul className="nl-bento-body list-disc pl-5 !border-l-0">
                        {aiSystem.description.split('•').filter(Boolean).map((point: string, idx: number) => (
                          <li key={idx}>{point.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="nl-bento-desc">{aiSystem.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Row 3 — Tools | Interesting Reads */}
          <div className="flex flex-col md:flex-row gap-4 md:col-span-3">
            {aiTools.length > 0 && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label" style={{ color: '#a3e635' }}>Productivity Tools</span>
                <div className="flex flex-col gap-4">
                  {aiTools.map((aiTool) => (
                    <div key={aiTool.id} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="nl-bento-title m-0">
                          {(aiTool.try_link || aiTool.read_link) ? (
                            <a href={aiTool.try_link ?? aiTool.read_link ?? ''} target="_blank" rel="noopener noreferrer">{aiTool.name}</a>
                          ) : aiTool.name}
                        </h3>
                      </div>
                      <p className="nl-bento-desc">{aiTool.description}</p>
                      </div>
                  ))}
                </div>
              </div>
            )}
            {interestingLinks.length > 0 && (
              <div className="nl-bento-card flex-1">
                <span className="nl-bento-label" style={{ color: '#e879f9' }}>Interesting Reads</span>
                <div className="flex flex-col gap-4">
                  {interestingLinks.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="nl-bento-title m-0">
                          {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                          ) : item.title}
                        </h3>
                      </div>
                      <p className="nl-bento-desc">{item.description}</p>
                    </div>
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

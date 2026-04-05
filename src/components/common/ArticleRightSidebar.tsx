'use client';

import Link from 'next/link';

interface RelatedPost {
  title: string;
  date: string;
  readTime: string;
  url: string;
  isInternal?: boolean;
}

interface ArticleRightSidebarProps {
  nutshell?: string[];
  relatedPosts: RelatedPost[];
  nextPostSlug?: string;
  nextPostTitle?: string;
  nextPostDescription?: string;
}

export default function ArticleRightSidebar({
  nutshell,
  relatedPosts,
  nextPostSlug,
  nextPostTitle,
  nextPostDescription,
}: ArticleRightSidebarProps) {
  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24 flex flex-col gap-5">

        {/* In a Nutshell */}
        {nutshell && nutshell.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">In a Nutshell</h3>
            </div>
            <ul className="space-y-2">
              {nutshell.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 leading-snug">
                  <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Keep Reading */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Keep Reading</h3>
              </div>
              <span className="text-gray-400 dark:text-gray-600 text-xs">-</span>
            </div>
            <div className="space-y-3">
              {relatedPosts.map((post, i) => (
                <div key={i}>
                  {post.isInternal ? (
                    <Link href={post.url} className="group flex items-start justify-between gap-2 cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 group-hover:text-indigo-500 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {post.date} · {post.readTime}
                        </p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-2 cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 group-hover:text-indigo-500 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {post.date} · {post.readTime}
                        </p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Next */}
        {nextPostSlug && (
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-4">
            <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-2">What&apos;s Next?</h3>
            {nextPostDescription && (
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {nextPostDescription}
              </p>
            )}
            <Link
              href={`/article/${nextPostSlug}`}
              className="flex items-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Read Next →
            </Link>
          </div>
        )}

      </div>
    </aside>
  );
}

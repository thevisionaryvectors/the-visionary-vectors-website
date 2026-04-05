'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { InternalBlog } from '@/lib/internalBlogs';

interface ArticleTocProps {
  blog: InternalBlog;
}

export default function ArticleToc({ blog }: ArticleTocProps) {
  const [activeSection, setActiveSection] = useState<string>(blog.sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = blog.sections[0]?.id || '';
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          currentSection = section.getAttribute('id') || blog.sections[0]?.id || '';
        }
      });
      setActiveSection(currentSection);
    };

    if (blog.sections.length > 0) {
      setActiveSection(blog.sections[0].id);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24 flex flex-col gap-6">
        {/* Table of Contents */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
            On This Page
          </h3>
          <nav className="space-y-0.5">
            {blog.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Subscribe card */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Enjoying the post?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
            Get weekly AI insights, builds and deep dives.
          </p>
          <Link
            href="/newsletter"
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </aside>
  );
}

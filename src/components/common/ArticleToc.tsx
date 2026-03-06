'use client';

import { useEffect, useState } from 'react';
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
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
          On This Page
        </h3>
        <nav className="space-y-2">
          {blog.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

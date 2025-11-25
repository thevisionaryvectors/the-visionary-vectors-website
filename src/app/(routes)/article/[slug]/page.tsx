'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, use } from 'react';
import { getBlogBySlug } from '@/lib/internalBlogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownContent from '@/components/common/MarkdownContent';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeSection, setActiveSection] = useState<string>('');
  const { slug } = use(params);
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

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

    // Set initial active section
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
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Ayushi's Page */}
        <Link 
          href="/ayushi"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Ayushi&apos;s Space
        </Link>

        <div className="flex gap-12">
          {/* Left Sidebar - Table of Contents */}
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

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-4">
                <span className={blog.categoryColor}>{blog.category}</span>
                <span>•</span>
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {blog.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </p>
            </motion.div>

            {/* Featured Image */}
            {blog.featuredImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 rounded-xl overflow-hidden"
              >
                <Image src={blog.featuredImage} alt={blog.title} width={1200} height={630} className="w-full h-auto" />
                {blog.featuredImageCaption && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                    {blog.featuredImageCaption}
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Featured Image Placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {blog.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {section.title}
                  </h2>

                  {/* Media content if exists */}
                  {section.mediaUrl && (
                    <div className="my-8 rounded-lg overflow-hidden">
                      {section.mediaType === 'image' || section.mediaType === 'gif' ? (
                        <div>
                          <Image src={section.mediaUrl} alt={section.mediaCaption || section.title} width={1200} height={630} className="w-full h-auto" />
                          {section.mediaCaption && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                              {section.mediaCaption}
                            </p>
                          )}
                        </div>
                      ) : section.mediaType === 'video' ? (
                        <div>
                          <video controls className="w-full h-auto">
                            <source src={section.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          {section.mediaCaption && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                              {section.mediaCaption}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            Media content placeholder
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Text content */}
                  <MarkdownContent content={section.content} />
                </section>
              ))}

              {/* Author Section */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{blog.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Engineer </p>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { InternalBlog } from '@/lib/internalBlogs';
import { externalBlogPosts, BlogPost } from '@/lib/blogPosts';

interface HomePageProps {
  internalBlogs: InternalBlog[];
}

const HomePage = ({ internalBlogs }: HomePageProps) => {
  const internalBlogPosts: BlogPost[] = internalBlogs.map(blog => ({
    id: blog.id,
    category: blog.category,
    title: blog.title,
    description: blog.description,
    readTime: blog.readTime,
    date: blog.date,
    publishDate: blog.publishDate,
    categoryColor: blog.categoryColor,
    url: `/article/${blog.slug}`,
    isInternal: true,
  }));

  const blogPosts = [...internalBlogPosts, ...externalBlogPosts];

  const sortedBlogPosts = useMemo(() => {
    const now = new Date();
    const published = blogPosts.filter(b => new Date(b.publishDate) <= now);
    return published.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredBlog = sortedBlogPosts[0];
  const popularBlogs = sortedBlogPosts.slice(1);
  const displayedPopular = popularBlogs.slice(0, 7);

  const BlogLink = ({ blog, children, className }: { blog: BlogPost; children: React.ReactNode; className?: string }) => {
    if (blog.isInternal) {
      return <Link href={blog.url} className={className}>{children}</Link>;
    }
    return <a href={blog.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-20 bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-5 order-2 lg:order-1">

            {/* Newsletter Tile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Weekly Newsletter</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-2">Subscribe to get weekly AI/ML insights, project updates, and learning highlights.</p>
              <span className="text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase font-medium">
                Releasing Soon
              </span>
            </motion.div>

            {/* GitHub Tile */}
            <motion.a
              href="https://github.com/ayushisahu222"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">GitHub Projects</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-2">Explore open source AI/ML projects, code repositories, and experiment notebooks.</p>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                {"View Projects \u2192"}
              </span>
            </motion.a>

            {/* Contact Tile */}
            <motion.a
              href="mailto:ayushisahu222@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Get in Touch</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-2">Reach out for collaborations, questions, or just to say hi!</p>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                {"Contact \u2192"}
              </span>
            </motion.a>

          </div>

          {/* CENTER COLUMN - Featured Blog */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            {featuredBlog && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <BlogLink blog={featuredBlog} className="group block">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                    <div className="h-64 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-700 flex items-center justify-center p-8 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                      </div>
                      <div className="relative z-10 text-center">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                          Latest Article
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 leading-tight drop-shadow-lg">
                          {featuredBlog.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                        {featuredBlog.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {featuredBlog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {featuredBlog.readTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${featuredBlog.categoryColor} bg-opacity-10 border border-current border-opacity-20`}>
                            {featuredBlog.category}
                          </span>
                          <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all flex items-center gap-1">
                            {"Read \u2192"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlogLink>

                {sortedBlogPosts[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6"
                  >
                    <BlogLink blog={sortedBlogPosts[1]} className="group block">
                      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${sortedBlogPosts[1].categoryColor} bg-opacity-10 border border-current border-opacity-20`}>
                            {sortedBlogPosts[1].category}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{sortedBlogPosts[1].date}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                          {sortedBlogPosts[1].title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {sortedBlogPosts[1].description}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-400">{sortedBlogPosts[1].readTime}</span>
                          <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                            {"Read \u2192"}
                          </span>
                        </div>
                      </div>
                    </BlogLink>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN - Blogs */}
          <div className="lg:col-span-3 order-3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Blogs
              </h2>
              <Link
                href="/blogs"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 uppercase tracking-wider transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="space-y-1">
              {displayedPopular.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <BlogLink blog={blog} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                        <span>{blog.date}</span>
                        <span>{"\u00B7"}</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${blog.categoryColor.replace('text-', 'bg-')}`}></div>
                  </BlogLink>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <section className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white py-5 px-6">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold"
          >
            Have suggestions? Reach out to us at{" "}
            <a
              href="mailto:thevisionaryvectorspodcast@gmail.com"
              className="font-bold underline hover:opacity-80 transition-opacity"
            >
              thevisionaryvectorspodcast@gmail.com
            </a>
          </motion.h2>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { InternalBlog } from '@/lib/internalBlogs';
import { externalBlogPosts, BlogPost } from '@/lib/blogPosts';

interface Props {
  internalBlogs: InternalBlog[];
}

export default function BlogsPageClient({ internalBlogs }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

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

  const allBlogs = useMemo(() => {
    const combined = [...internalBlogPosts, ...externalBlogPosts];
    const now = new Date();
    return combined
      .filter(b => new Date(b.publishDate) <= now)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [internalBlogPosts]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allBlogs.map(b => b.category)));
    return ['All', ...cats];
  }, [allBlogs]);

  const filtered = useMemo(
    () => activeCategory === 'All' ? allBlogs : allBlogs.filter(b => b.category === activeCategory),
    [allBlogs, activeCategory]
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black bg-grid pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-4"
          >
            ← Back
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            All Articles
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {allBlogs.length} articles published
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog List */}
        <div className="flex flex-col gap-5">
          {filtered.map((blog, index) => {
            const inner = (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${blog.categoryColor} bg-opacity-10 border border-current border-opacity-20`}>
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{blog.date}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">· {blog.readTime}</span>
                    </div>
                    <h2 className="font-bold text-base text-gray-900 dark:text-white leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 mb-1">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {blog.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all mt-1">
                    Read →
                  </span>
                </div>
              </motion.div>
            );

            return blog.isInternal ? (
              <Link key={blog.id} href={blog.url}>{inner}</Link>
            ) : (
              <a key={blog.id} href={blog.url} target="_blank" rel="noopener noreferrer">{inner}</a>
            );
          })}
        </div>
      </div>
    </main>
  );
}

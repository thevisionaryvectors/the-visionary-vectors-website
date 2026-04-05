import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogBySlugFromDb, getAllInternalBlogsFromDb } from '@/lib/blogDb';
import { externalBlogPosts } from '@/lib/blogPosts';
import MarkdownContent from '@/components/common/MarkdownContent';
import ArticleToc from '@/components/common/ArticleToc';
import ArticleRightSidebar from '@/components/common/ArticleRightSidebar';
import ArticleFooterBar from '@/components/common/ArticleFooterBar';
import { articleExtras } from '@/lib/articleExtras';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, allInternalBlogs] = await Promise.all([
    getBlogBySlugFromDb(slug),
    getAllInternalBlogsFromDb(),
  ]);

  if (!blog) {
    notFound();
  }

  const extras = articleExtras[slug] ?? {};

  // Build related posts: other internal blogs + external, excluding current
  const internalRelated = allInternalBlogs
    .filter((b) => b.slug !== slug)
    .map((b) => ({
      title: b.title,
      date: b.date,
      readTime: b.readTime,
      url: `/article/${b.slug}`,
      isInternal: true,
    }));

  const externalRelated = externalBlogPosts.map((b) => ({
    title: b.title,
    date: b.date,
    readTime: b.readTime,
    url: b.url,
    isInternal: false,
  }));

  const relatedPosts = [...internalRelated, ...externalRelated].slice(0, 4);

  const pageUrl = `https://the-visionary-vectors-website.vercel.app/article/${slug}`;

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-black bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
          <Link href="/ayushi" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Home
          </Link>
          {blog.category.startsWith('Newsletter') && (
            <>
              <span>|</span>
              <Link href="/newsletter" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                Newsletter
              </Link>
              <span>|</span>
              <span className="text-gray-900 dark:text-white font-medium">{blog.category}</span>
            </>
          )}
        </nav>

        {/* Three-column layout */}
        <div className="flex gap-8 items-start">

          {/* Left – Table of Contents */}
          <ArticleToc blog={blog} />

          {/* Center – Main Article */}
          <main className="flex-1 min-w-0">

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 text-sm mb-4 flex-wrap">
                <span className={`font-semibold uppercase tracking-wide text-xs ${blog.categoryColor}`}>
                  {blog.category}
                </span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span className="text-gray-500 dark:text-gray-400">{blog.date}</span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span className="text-gray-500 dark:text-gray-400">{blog.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </p>
            </div>

            {/* TL;DR box */}
            {extras.tldr && extras.tldr.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💡</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm tracking-wide">TL;DR</span>
                </div>
                <ul className="space-y-2">
                  {extras.tldr.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="mb-10 rounded-xl overflow-hidden">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                />
                {blog.featuredImageCaption && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 italic">
                    {blog.featuredImageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Sections */}
            <article>
              {blog.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="flex items-start gap-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                    <span className="text-indigo-500 dark:text-indigo-400 font-mono select-none flex-shrink-0">#</span>
                    {section.title}
                  </h2>

                  {/* Media */}
                  {section.mediaUrl && (
                    <div className="my-6 rounded-xl overflow-hidden">
                      {section.mediaType === 'image' || section.mediaType === 'gif' ? (
                        <>
                          <Image
                            src={section.mediaUrl}
                            alt={section.mediaCaption || section.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto"
                          />
                          {section.mediaCaption && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 italic">
                              {section.mediaCaption}
                            </p>
                          )}
                        </>
                      ) : section.mediaType === 'video' ? (
                        <>
                          <video controls className="w-full h-auto rounded-xl">
                            <source src={section.mediaUrl} type="video/mp4" />
                          </video>
                          {section.mediaCaption && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 italic">
                              {section.mediaCaption}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  )}

                  <MarkdownContent content={section.content} />
                </section>
              ))}

              {/* Author */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{blog.author}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Engineer</p>
                </div>
              </div>

              {/* Was this helpful */}
              <ArticleFooterBar
                articleSlug={slug}
                title={blog.title}
                url={pageUrl}
              />
            </article>
          </main>

          {/* Right Sidebar */}
          <ArticleRightSidebar
            nutshell={extras.nutshell}
            relatedPosts={relatedPosts}
            nextPostSlug={extras.nextPostSlug}
            nextPostTitle={extras.nextPostTitle}
            nextPostDescription={extras.nextPostDescription}
          />

        </div>
      </div>
    </div>
  );
}

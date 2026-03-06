import { sql } from './db';
import type { InternalBlog, BlogSection } from './internalBlogs';

interface DbBlogRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_color: string;
  description: string;
  read_time: string;
  date: string;
  publish_date: string | Date;
  author: string;
  featured_image: string | null;
  featured_image_caption: string | null;
  sections: BlogSection[];
}

function rowToBlog(row: DbBlogRow): InternalBlog {
  const publishDate =
    row.publish_date instanceof Date
      ? row.publish_date.toISOString().split('T')[0]
      : String(row.publish_date).split('T')[0];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    categoryColor: row.category_color,
    description: row.description,
    readTime: row.read_time,
    date: row.date,
    publishDate: publishDate,
    author: row.author,
    featuredImage: row.featured_image ?? undefined,
    featuredImageCaption: row.featured_image_caption ?? undefined,
    sections: row.sections,
  };
}

export async function getAllInternalBlogsFromDb(): Promise<InternalBlog[]> {
  const rows = await sql`
    SELECT * FROM public.internal_blogs
    WHERE publish_date <= CURRENT_DATE
    ORDER BY publish_date DESC
  `;
  return (rows as DbBlogRow[]).map(rowToBlog);
}

export async function getBlogBySlugFromDb(slug: string): Promise<InternalBlog | null> {
  const rows = await sql`
    SELECT * FROM public.internal_blogs
    WHERE slug = ${slug}
    LIMIT 1
  `;
  if (rows.length === 0) return null;
  return rowToBlog(rows[0] as DbBlogRow);
}

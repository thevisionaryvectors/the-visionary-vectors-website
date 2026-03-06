import { getAllInternalBlogsFromDb } from '@/lib/blogDb';
import { InternalBlog } from '@/lib/internalBlogs';
import BlogsPageClient from './BlogsPageClient';

export default async function BlogsPage() {
  let internalBlogs: InternalBlog[] = [];
  try {
    internalBlogs = await getAllInternalBlogsFromDb();
  } catch {
    internalBlogs = [];
  }
  return <BlogsPageClient internalBlogs={internalBlogs} />;
}
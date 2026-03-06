import HomePage from '@/components/HomePage';
import { getAllInternalBlogsFromDb } from '@/lib/blogDb';
import type { InternalBlog } from '@/lib/internalBlogs';

export default async function Home() {
  let internalBlogs: InternalBlog[] = [];
  try {
    internalBlogs = await getAllInternalBlogsFromDb();
  } catch (e) {
    console.error('DB fetch failed, falling back to empty:', e);
  }
  return <HomePage internalBlogs={internalBlogs} />;
}

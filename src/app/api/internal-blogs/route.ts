import { NextResponse } from 'next/server';
import { getAllInternalBlogsFromDb } from '@/lib/blogDb';

export async function GET() {
  try {
    const blogs = await getAllInternalBlogsFromDb();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

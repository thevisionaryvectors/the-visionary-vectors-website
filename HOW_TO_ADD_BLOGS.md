# How to Add New Internal Blog Articles

This guide explains how to add new blog articles that are hosted on the website (not on Medium). **Internal blogs will appear alongside external Medium blogs in the main "My Blog Posts" section.**

## Quick Start

1. Open the file: `src/lib/internalBlogs.ts`
2. Add your new blog to the `internalBlogs` array
3. Your blog will automatically appear in the blogs section with a green "On Site" badge
4. It will be accessible via `/article/your-slug`

## Blog Structure

Each blog article needs the following information:

```typescript
{
  id: 'unique-identifier',           // Unique ID for the blog
  slug: 'url-friendly-name',         // URL slug (e.g., /article/url-friendly-name)
  title: 'Your Blog Title',          // Main title
  category: 'Technology',            // Category name
  categoryColor: 'text-blue-600',   // Tailwind color class for the category
  description: 'Brief summary...',   // Short description (appears on tiles)
  readTime: '8 min read',           // Estimated reading time
  date: 'Nov 2025',                 // Display date
  publishDate: '2025-11-10',        // Actual publish date (YYYY-MM-DD)
  author: 'Ayushi Sahu',            // Author name
  featuredImage: '/path/to/image.jpg', // Optional featured image
  sections: [...]                    // Array of content sections
}
```

## Adding Sections

Each blog is divided into sections. Each section should have:

```typescript
{
  id: 'section-id',                  // Unique ID for the section (used in table of contents)
  title: 'Section Title',            // Section heading
  content: 'Your content here...',   // Main text content (can be multi-line)
  mediaType: 'image',               // Optional: 'image', 'video', 'gif', or 'chart'
  mediaUrl: '/path/to/media.jpg',   // Optional: URL to the media file
  mediaCaption: 'Image caption'     // Optional: Caption for the media
}
```

## Example: Adding a New Blog

Open `src/lib/internalBlogs.ts` and add to the array:

```typescript
export const internalBlogs: InternalBlog[] = [
  // Existing blogs...
  {
    id: 'my-new-blog',
    slug: 'my-new-blog-article',
    title: 'My Amazing New Blog Post',
    category: 'Machine Learning',
    categoryColor: 'text-purple-600',
    description: 'This blog explains an amazing ML concept with practical examples.',
    readTime: '5 min read',
    date: 'Nov 2025',
    publishDate: '2025-11-15',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `This is the introduction to my blog post. 
        
You can use multiple paragraphs by using newlines in the string.

This will be formatted nicely on the page.`,
      },
      {
        id: 'main-content',
        title: 'Main Content',
        content: 'Here is the main content of my article...',
        mediaType: 'image',
        mediaUrl: '/images/my-diagram.png',
        mediaCaption: 'A helpful diagram showing the concept'
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        content: 'Here are my final thoughts...'
      }
    ]
  }
];
```

## Category Colors

Available category colors (Tailwind classes):
- `text-blue-600` - Technology, Data Science
- `text-purple-600` - Machine Learning, AI
- `text-green-600` - Tutorials, Guides
- `text-pink-600` - Research, Theory
- `text-orange-600` - Projects, Experiments

## Tips

1. **Slug Format**: Use lowercase, hyphen-separated words (e.g., `my-blog-post`)
2. **Section IDs**: Keep them simple and lowercase (e.g., `introduction`, `methodology`)
3. **Content**: Use `\n\n` for paragraph breaks in your content strings
4. **Media**: Place images in the `public/` folder and reference them as `/images/filename.jpg`
5. **Read Time**: Estimate 200-250 words per minute

## Where It Appears

Once you add a blog:
- ✅ It will appear in the "My Blog Posts" section alongside Medium articles
- ✅ It will have a green "On Site" badge to distinguish it from external blogs
- ✅ Clicking it opens the article on the website (not in a new tab)
- ✅ It will be accessible at `/article/your-slug`
- ✅ It will have a table of contents based on your sections
- ✅ It will support dark mode automatically
- ✅ It will be sorted by publish date with all other blogs

## Testing

After adding a new blog:
1. Visit `http://localhost:3000/ayushi` to see it in the list
2. Click on the blog tile to view the full article
3. Check that all sections appear in the table of contents
4. Verify that the content displays correctly

## Need Help?

If you encounter any issues or need to add more complex features (like code blocks, embedded videos, etc.), you can extend the blog structure in `src/lib/internalBlogs.ts` and update the article page template in `src/app/(routes)/article/[slug]/page.tsx`.

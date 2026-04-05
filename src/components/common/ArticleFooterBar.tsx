'use client';

import { useState, useEffect } from 'react';

interface ArticleFooterBarProps {
  articleSlug: string;
  title: string;
  url: string;
}

export default function ArticleFooterBar({ articleSlug, title, url }: ArticleFooterBarProps) {
  const storageKey = `article-liked-${articleSlug}`;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch counts from DB on mount
  useEffect(() => {
    const prevLiked = localStorage.getItem(storageKey) === 'true';
    setLiked(prevLiked);

    fetch(`/api/article-reactions/${articleSlug}`)
      .then((r) => r.json())
      .then((data) => {
        setLikeCount(data.like_count ?? 0);
        setCommentCount(data.comment_count ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [articleSlug, storageKey]);

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => (next ? c + 1 : Math.max(c - 1, 0)));
    localStorage.setItem(storageKey, String(next));

    await fetch(`/api/article-reactions/${articleSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: next ? 'like' : 'unlike' }),
    });
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
    if (navigator.share) {
      await navigator.share({ title, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-12 pt-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Was this helpful?</span>
      <div className="flex items-center gap-4">

        {/* Like */}
        <button
          onClick={toggleLike}
          disabled={loading}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
            liked
              ? 'text-rose-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {loading ? '—' : likeCount}
        </button>


        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          {copied ? 'Copied!' : 'Share'}
          {!copied && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </button>

      </div>
    </div>
  );
}

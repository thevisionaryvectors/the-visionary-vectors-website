import React from 'react';
import Link from 'next/link';

export default function NewsletterPage() {
  return (
    <div className="nl-root">
      <div className="nl-newsletter">
        <div className="mb-2">
          <Link href="/ayushi" className="text-indigo-400 text-[1.35rem] no-underline leading-none">
            ←
          </Link>
        </div>
        <section className="flex flex-col items-center text-center gap-3 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--nl-heading)' }}>
            PROMPT NOTES
          </h1>
          <p className="text-sm" style={{ color: 'var(--nl-text-muted)' }}>
            Weekly insights from an engineer building real systems.
          </p>
          <p className="text-xl font-bold mt-4" style={{ color: 'var(--nl-heading)' }}>
            Will be back very soon.
          </p>
        </section>
      </div>
    </div>
  );
}

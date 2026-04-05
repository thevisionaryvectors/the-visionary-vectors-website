'use client';

import { useState } from 'react';

interface Props {
  label?: string;
  buttonClassName?: string;
}

export default function SubscribeForm({ label = '📩 Get this in your inbox every week', buttonClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.alreadySubscribed) {
      setStatus('already');
    } else if (res.ok) {
      setStatus('success');
    }
  }

  function handleClose() {
    setOpen(false);
    setEmail('');
    setStatus('idle');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={buttonClassName ?? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-[0.85rem] font-medium transition-colors cursor-pointer'}
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative bg-[#0f0c1a] border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-xl leading-none cursor-pointer bg-transparent border-none"
            >
              ✕
            </button>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-3">🎉</div>
                <h2 className="text-white text-lg font-semibold mb-1">You&apos;re in!</h2>
                <p className="text-gray-400 text-sm">Thanks for subscribing to Visionary Vectors.</p>
              </div>
            ) : status === 'already' ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-3">✅</div>
                <h2 className="text-white text-lg font-semibold mb-1">Already subscribed</h2>
                <p className="text-gray-400 text-sm">This email is already on the list.</p>
              </div>
            ) : (
              <>
                <h2 className="text-white text-lg font-semibold mb-1">Stay in the loop</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Get Prompt Notes delivered to your inbox every week — AI news, tools, and research worth reading.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

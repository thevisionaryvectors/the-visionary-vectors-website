"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export interface TileItem {
  id: string;
  label: string;
  sublabel?: string;
  frontIcon?: string;
  backTitle?: string;
  backText?: string;
  link?: string;
}

export default function FloatingTiles({ items }: { items: TileItem[] }) {
  return (
    <div className="container mx-auto">
      <style>{`
        .flip-card { perspective: 1200px; }
        .flip-inner { transition: transform 0.7s; transform-style: preserve-3d; }
        .flip-card:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            className="flip-card"
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
          >
            <div className="flip-inner relative bg-transparent">
              {/* Front */}
              <div className="flip-front relative rounded-2xl p-8 min-h-[12rem] flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-lg">
                <div className="text-3xl mb-4">{item.frontIcon ?? '📌'}</div>
                <div className="text-sm uppercase tracking-widest opacity-90 font-semibold">{item.label}</div>
                {item.sublabel && <div className="mt-3 text-center text-sm opacity-90">{item.sublabel}</div>}
              </div>

              {/* Back */}
              <div className="flip-back absolute inset-0 rounded-2xl p-6 min-h-[12rem] bg-gradient-to-br from-black/80 to-purple-900/70 text-white shadow-inner flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.backTitle ?? item.label}</h3>
                  <p className="text-sm opacity-90 line-clamp-6">{item.backText ?? 'More details coming soon.'}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {item.link ? (
                    <Link href={item.link} className="px-3 py-2 bg-white/10 rounded-full text-xs font-medium hover:bg-white/20">
                      Read
                    </Link>
                  ) : (
                    <span className="px-3 py-2 bg-white/10 rounded-full text-xs font-medium">Notes</span>
                  )}

                  <span className="text-xs opacity-80">{idx === 0 ? 'Latest' : ''}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

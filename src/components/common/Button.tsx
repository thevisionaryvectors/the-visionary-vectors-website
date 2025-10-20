'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonLink } from '@/lib/types';

interface ButtonProps {
  link: ButtonLink;
}

export const Button = ({ link }: ButtonProps) => {
  const isExternal = link.url.startsWith('http') || link.url.startsWith('mailto:');
  
  if (isExternal) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <a
          href={link.url}
          target={link.target || '_self'}
          rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300 shadow-lg"
        >
          {link.icon && (
            <span className="mr-2">{link.icon}</span>
          )}
          {link.label}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Link
        href={link.url}
        className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300 shadow-lg"
      >
        {link.icon && (
          <span className="mr-2">{link.icon}</span>
        )}
        {link.label}
      </Link>
    </motion.div>
  );
};
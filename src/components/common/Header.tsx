'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
            The Visionary Vectors Blog
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link href="/ayushi" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
              Ayushi&apos;s Space
            </Link>
            {/* <Link href="/shreya" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
              Shreya&apos;s Space
            </Link> */}
          </nav>

          {/* Mobile Menu Button - You can implement a mobile menu later if needed */}
          <button className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors hidden">
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
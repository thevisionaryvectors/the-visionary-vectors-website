'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  const [selectedDigest, setSelectedDigest] = useState<number | null>(null);

  const monthlyDigests = [
    {
      id: 1,
      month: "November 2025",
      category: "Learning Journey",
      explored: "Forward propagation and multi-layer perceptrons",
      learned: "How neural networks transform linear boundaries into complex decision curves",
      surprised: "The elegant simplicity of chaining perceptrons to solve nonlinear problems",
      whatsNext: "Diving into backpropagation and understanding how networks actually learn"
    }
  ];

  const selectedDigestData = selectedDigest ? monthlyDigests.find(d => d.id === selectedDigest) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-black text-gray-900 dark:text-white pt-20 pb-0 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center min-h-[80vh] px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
            <h1 className="text-6xl md:text-8xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Tracing the Vectors
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                of our Learning.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Join Ayushi and Shreya as they navigate their AI/ML learning journeys. Documenting and
              sharing projects, reflections, experiments, and insights along the way. 
            </p>
          </div>

            {/* <motion.button
              onClick={() => {
                const creatorsSection = document.getElementById('creators-section');
                creatorsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold text-white hover:shadow-2xl transition-all duration-300"
            >
              Explore Our Work ▶
            </motion.button> */}
            
          </motion.div>

          {/* Right Content - VR Person */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* AI-Human Interaction Image */}
              <div className="w-full h-[500px] rounded-3xl shadow-lg overflow-hidden relative">
                <Image 
                  src="/The Rise of Human Error in the Age of AI.jpeg"
                  alt="AI and Human collaboration - The Rise of Human Error in the Age of AI"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Scroll hint (same as research one) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mt-3 mb-4 flex items-center justify-center"
      >
        <button
          onClick={() => {
            window.location.hash = 'creators-section';
            document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-center text-xs md:text-sm text-blue-400 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-600 transition-all duration-300"
          style={{
            textShadow: 'rgb(59 130 246 / 0.1) 0px 0px 8px, rgb(59 130 246 / 0.05) 0px 0px 16px'
          }}
          aria-label="Scroll down to Meet the Authors"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="dark:[text-shadow:_0_0_10px_rgb(59_130_246_/_0.6),_0_0_20px_rgb(59_130_246_/_0.4)]"
          >
            <span className="block tracking-widest uppercase font-semibold">Scroll down to</span>
            <span className="block font-bold text-base md:text-lg">Meet the Authors</span>
            <span aria-hidden className="block text-xl md:text-2xl leading-none">↓</span>
          </motion.div>
        </button>
      </motion.div>


      {/* Creators Section */}
      <section id="creators-section" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent">
              Meet the Authors
            </h2>
            {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Two passionate AI/ML enthusiasts documenting their learning journey, sharing their projects, 
              experiments, and discoveries in the world of artificial intelligence.
            </p> */}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Ayushi's Card */}
            <Link href="/ayushi">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 shadow-md h-[480px] flex flex-col">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center text-6xl">
                    👩‍💻
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-600 transition-colors">
                    Ayushi Sahu
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Gen AI Engineer</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                   Documenting my journey as I explore AI sharing hands-on projects, experiment results, and key learning insights along the way.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 px-6 py-2 rounded-full text-sm font-semibold text-white mt-auto"
                  >
                    View Ayushi&apos;s Work ➤
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Shreya's Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 transition-all duration-300 shadow-md h-[480px] flex flex-col">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center text-6xl blur-sm ">
                    👩‍💻                 </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white transition-colors">
                    Shreya Singhee
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 blur-sm select-none">AI/ML Researcher & Blogger</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow blur-sm select-none">
                    Documents her journey exploring transformers, computer vision, and AI ethics. 
                    Shares project logs, experiment results, and learning insights from her AI research work.
                  </p>
                  <motion.div
                    className="inline-flex items-center justify-center bg-gray-400 px-6 py-2 rounded-full text-sm font-semibold text-white mt-auto cursor-not-allowed"
                  >
                    Coming Soon
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Scroll hint between creators & monthly digest --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 -mt-6 mb-2 flex items-center justify-center"
      >
        <button
          onClick={() => {
            window.location.hash = 'monthly-digest';
            document.getElementById('monthly-digest')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-center text-xs md:text-sm text-purple-500 dark:text-purple-500 hover:text-purple-600 dark:hover:text-purple-600 transition-all duration-300"
          style={{
            textShadow: 'rgb(168 85 247 / 0.1) 0px 0px 8px, rgb(168 85 247 / 0.05) 0px 0px 16px'
          }}
          aria-label="Scroll down to Monthly Digest"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="dark:[text-shadow:_0_0_10px_rgb(168_85_247_/_0.6),_0_0_20px_rgb(168_85_247_/_0.4)]"
          >
            <span className="block tracking-widest uppercase font-semibold">Scroll down to</span>
            <span className="block font-bold text-base md:text-lg">Monthly Digest</span>
            <span aria-hidden className="block text-xl md:text-2xl leading-none">↓</span>
          </motion.div>
        </button>
      </motion.div>


      {/* Monthly Digest Section - Coming Soon */}
      <section id="monthly-digest" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-16 shadow-xl">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-6xl shadow-lg">
                📰
              </div>
              
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Monthly Digest
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                Coming Soon
              </p>
              
              <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                Short, crisp, and snackable insights from our learning journey. Stay tuned for monthly updates on what we explored, learned, and what surprised us!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Materials Section - Coming Soon */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-16 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-6xl shadow-md">
                🚀
              </div>
              
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent">Learning</span>
                <br />
                <span className="bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
                  Materials
                </span>
              </h2>
              
              <div className="mb-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  We&apos;re carefully curating comprehensive learning resources, tutorials, and educational materials 
                  to help you master AI and machine learning concepts. Stay tuned for our collection of 
                  expertly selected content!
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center bg-gray-300 dark:bg-gray-700 px-8 py-4 rounded-full text-lg font-semibold text-gray-600 dark:text-gray-300 cursor-not-allowed"
              >
                Coming Soon...
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white py-5 px-6">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-xl font-bold mt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Have suggestions? Reach out to us at <a href="mailto:thevisionaryvectorspodcast@gmail.com" className="text-purple-200 underline">thevisionaryvectorspodcast@gmail.com</a>
          </motion.h2>
        </div>
      </section>

      {/* Monthly Digest Modal */}
      <AnimatePresence>
        {selectedDigest && selectedDigestData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDigest(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700"
            >
              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 pointer-events-none" />

              <div className="relative z-10 p-8">
                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedDigest(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/30 transition-all duration-300 shadow-lg border border-gray-300 dark:border-gray-600"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Modal Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="pr-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.span 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg"
                      animate={{ boxShadow: ["0 0 20px rgba(99, 102, 241, 0.3)", "0 0 30px rgba(168, 85, 247, 0.4)", "0 0 20px rgba(99, 102, 241, 0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {selectedDigestData.category}
                    </motion.span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {selectedDigestData.month}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      Monthly Learning Digest
                    </span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    A snapshot of our AI/ML learning adventures this month 🚀
                  </p>
                </motion.div>

                {/* Modal Content with enhanced styling */}
                <div className="space-y-6 mt-8">
                  <motion.div 
                    className="relative group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                    <div className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-r-2xl group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🔍</span>
                        <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">What did we explore?</h3>
                      </div>
                      <p className="text-lg text-gray-900 dark:text-white leading-relaxed">{selectedDigestData.explored}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
                    <div className="border-l-4 border-purple-500 pl-6 py-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-r-2xl group-hover:bg-purple-100/50 dark:group-hover:bg-purple-900/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">📚</span>
                        <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">What did we learn?</h3>
                      </div>
                      <p className="text-lg text-gray-900 dark:text-white leading-relaxed">{selectedDigestData.learned}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full" />
                    <div className="border-l-4 border-pink-500 pl-6 py-3 bg-pink-50/50 dark:bg-pink-900/10 rounded-r-2xl group-hover:bg-pink-100/50 dark:group-hover:bg-pink-900/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">💡</span>
                        <h3 className="text-sm font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">What surprised us?</h3>
                      </div>
                      <p className="text-lg text-gray-900 dark:text-white leading-relaxed">{selectedDigestData.surprised}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full" />
                    <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-r-2xl group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🎯</span>
                        <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">What&apos;s next?</h3>
                      </div>
                      <p className="text-lg text-gray-900 dark:text-white leading-relaxed">{selectedDigestData.whatsNext}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced CTA Button */}
                <motion.div 
                  className="mt-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={() => setSelectedDigest(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10">Got it! 👍</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
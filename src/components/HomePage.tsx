'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HomePage = () => {
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);

  const latestPapers = [
    {
      id: 1,
      title: "Emergent Coordination in Multi-Agent Language Models",
      authors: "Christoph Riedl",
      category: "Large Language Models",
      publishDate: "Oct. 5, 2025",
      venue: "arXiv",
      description: "This paper studies how groups of AI models (like ChatGPT) can work together and sometimes show emergent coordination—behaving like a team rather than just separate agents.",
      summary: "This paper studies how groups of AI models (like ChatGPT) can work together and sometimes show emergent coordination—behaving like a team rather than just separate agents. Using a group guessing game, the author found that when models are given roles (personas) and told to think about others’ actions (theory of mind), they cooperate better and act more like a collective. The best performance happens when agents are both aligned on goals and do different tasks. Smaller models show less teamwork. The study shows that prompt design and model ability strongly affect how well AI agents coordinate as a group.",
      link: "https://arxiv.org/pdf/2510.05174"
    },
    {
      id: 2,
      title: "A Definition of AGI",
      authors: "Dan Hendrycks, Dawn Song and More",
      category: "Artificial Intelligence",
      publishDate: "Oct 15, 2025",
      venue: "Center for AI Safety",
      description: "The paper gives a clear way to define AGI (Artificial General Intelligence) — an AI that can think and learn as well as a smart, educated adult. It breaks intelligence into 10 main skills, like memory, logic, perception, and creativity.",
      summary: "The paper gives a clear way to define AGI (Artificial General Intelligence) — an AI that can think and learn as well as a smart, educated adult. It breaks intelligence into 10 main skills, like memory, logic, perception, and creativity. Each skill is rated equally to measure how advanced an AI is overall. The authors estimate that models like GPT-4 are only about one-fourth of the way to real AGI, showing progress but still far to go. The goal is to make it easier to measure AI progress in a fair, human-like way, not to claim AGI already exists",
      link: "https://www.agidefinition.ai/"
    },
    {
      id: 3,
      title: "Recursive Language Models",
      authors: "Alex Zhang, Omar Khattab",
      category: "Large Language Models",
      publishDate: "Oct. 15, 2025",
      venue: "Alex L. Zhang",
      description: "The blog talks about a new kind of AI model called a Recursive Language Model (RLM). It is a way for an AI (like ChatGPT) to call itself again and again to think through big or complex tasks.",
      summary: "The blog talks about a new kind of AI model called a Recursive Language Model (RLM). It is a way for an AI (like ChatGPT) to call itself again and again to think through big or complex tasks. Normally, language models get worse when the text or context becomes too long — but RLMs fix that. They split huge amounts of text into smaller parts, understand each one, and then combine the answers. The model itself decides how to break things down. This helps it handle millions of words without losing track or quality, working like a smart, self-organizing notebook.",
      link: "https://alexzhang13.github.io/blog/2025/rlm/"
    },
  ];

  const selectedPaperData = selectedPaper ? latestPapers.find(p => p.id === selectedPaper) : null;

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
                <img 
                  src="/The Rise of Human Error in the Age of AI.jpeg"
                  alt="AI and Human collaboration - The Rise of Human Error in the Age of AI"
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
          onClick={() =>
            document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' })
          }
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

      {/* --- Scroll hint between creators & research papers --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 -mt-6 mb-2 flex items-center justify-center"
      >
        <button
          onClick={() => document.getElementById('blogs-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-center text-xs md:text-sm text-purple-500 dark:text-purple-500 hover:text-purple-600 dark:hover:text-purple-600 transition-all duration-300"
          style={{
            textShadow: 'rgb(168 85 247 / 0.1) 0px 0px 8px, rgb(168 85 247 / 0.05) 0px 0px 16px'
          }}
          aria-label="Scroll down to Latest Research Papers"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="dark:[text-shadow:_0_0_10px_rgb(168_85_247_/_0.6),_0_0_20px_rgb(168_85_247_/_0.4)]"
          >
            <span className="block tracking-widest uppercase font-semibold">Scroll down to</span>
            <span className="block font-bold text-base md:text-lg">Latest Research Papers</span>
            <span aria-hidden className="block text-xl md:text-2xl leading-none">↓</span>
          </motion.div>
        </button>
      </motion.div>


      {/* Upcoming Research Section */}
      <section id="blogs-section" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🔄 Updated Weekly
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent">
              Latest Research Papers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the newest research papers in AI. Our curated selection of cutting-edge papers is updated weekly to keep you informed about the latest breakthroughs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {latestPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedPaper(paper.id)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {paper.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{paper.publishDate}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 leading-tight">
                  {paper.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 font-medium">
                  {paper.authors}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {paper.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm font-medium">{paper.venue}</span>
                  <div className="flex items-center text-gray-400 dark:text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M7.414 15.414a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 001.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">Read Paper</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

      {/* Research Paper Modal */}
      <AnimatePresence>
        {selectedPaper && selectedPaperData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPaper(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPaper(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {selectedPaperData.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{selectedPaperData.publishDate}</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedPaperData.title}
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  {selectedPaperData.authors}
                </p>

                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-6">
                  {selectedPaperData.venue}
                </p>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedPaperData.summary}
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={selectedPaperData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all duration-300"
                  >
                    Read Full Paper →
                  </motion.a>
                  <motion.button
                    onClick={() => setSelectedPaper(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
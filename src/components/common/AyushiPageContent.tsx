'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}



interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  publishDate: string;
  categoryColor: string;
  url: string;
  hideAfterWeek?: boolean;
}

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'blog' | 'github' | 'milestone';
  status: 'completed' | 'upcoming';
  url?: string;
}

const services: ServiceCard[] = [
  {
    icon: "�",
    title: "GitHub Projects",
    description: "Explore projects and contributions.",
    features: ["Open Source", "AI/ML Projects", "Code Repositories"],
    price: "View Projects"
  },
  {
    icon: "📝",
    title: "Blogs",
    description: "Read my articles and insights.",
    features: ["Tech Articles", "AI Insights", "Learning Journey"],
    price: "Read More"
  },
  {
    icon: "",
    title: "Contact",
    description: "Get in touch for collaborations.",
    features: ["Email", "LinkedIn", "Professional Inquiries"],
    price: "Connect"
  }
];


// Additional project milestones (non-blog items)
const projectMilestones: Array<{
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'github' | 'milestone' | 'blog';
}> = [
   {
    id: 'github-sentiment',
    title: 'Sentiment Classifier with PyTorch (Feedforward NN)',
    description: 'Basic NN using PyTorch for sentiment analysis',
    date: new Date('2025-10-24'),
    type: 'github'
  },
  {
    id: 'potential-blog-1',
    title: 'From RNNs to Transformers: Why Attention Wins',
    description: '',
    date: new Date('2025-10-27'),
    type: 'blog'
  },
  {
    id: 'github-rnn',
    title: 'RNN vs LSTM Sentiment Classifier', 
    description: '',
    date: new Date('2025-10-31'),
    type: 'github'
  },
  {
    id: 'potential-blog-2',
    title: 'How a Transformer Encoder Works (Explained Simply)', 
    description: '',
    date: new Date('2025-11-03'),
    type: 'blog'
  },
];

// Fully dynamic timeline that combines blog posts and project milestones
const getTimelineData = (blogPosts: BlogPost[]): TimelineItem[] => {
  const today = new Date();
  
  // Create timeline items from blog posts
  const blogTimelineItems: TimelineItem[] = blogPosts
    .filter(blog => {
      // Only recent/upcoming blogs
      if (new Date(blog.publishDate) < new Date('2025-10-01')) return false;
      
      // Hide blogs marked to be hidden after their week ends
      if (blog.hideAfterWeek) {
        const blogDate = new Date(blog.publishDate);
        const endOfWeek = new Date(blogDate);
        endOfWeek.setDate(blogDate.getDate() + (7 - blogDate.getDay())); // End of the week (Sunday)
        endOfWeek.setHours(23, 59, 59, 999); // End of day
        
        if (today > endOfWeek) {
          return false;
        }
      }
      
      return true;
    })
    .map(blog => ({
      id: `blog-${blog.id}`,
      title: blog.title,
      description: blog.description.substring(0, 100) + '...',
      date: new Date(blog.publishDate),
      type: 'blog' as const,
      status: new Date(blog.publishDate) <= today ? 'completed' : 'upcoming',
      url: blog.url
    }));
  
  // Create timeline items from project milestones
  const projectTimelineItems: TimelineItem[] = projectMilestones.map(project => ({
    ...project,
    status: project.date <= today ? 'completed' : 'upcoming'
  }));
  
  // Combine and sort all timeline items by date
  const allTimelineItems = [...blogTimelineItems, ...projectTimelineItems]
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return allTimelineItems;
};

const getNextUpcoming = (blogPosts: BlogPost[]) => {
  const today = new Date();
  const timelineData = getTimelineData(blogPosts);
  const upcoming = timelineData
    .filter(item => item.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return upcoming.length > 0 ? upcoming[0] : null;
};

export default function StudworkPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      category: "Machine Learning",
      title: "The Math I Need for Transformers",
      description: "Before diving deep into LLMs, I wanted to get comfortable with the math behind them so the theory actually makes sense. So, I started exploring the building blocks - dot products, softmax functions, cross-entropy loss, and backpropagation through attention...",
      readTime: "3 min read",
      date: "Oct 2025",
      publishDate: "2025-10-15",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/the-math-i-need-for-transformers-a023f394d42f",
      hideAfterWeek: true
    },
    {
      id: 2,
      category: "Machine Learning",
      title: '"I Sus?" Understanding Isolation Forest and Local Outlier Factor',
      description: "These days, we rely heavily on Large Language Models (LLMs) for almost everything — from making predictions, finding anomalies, to even helping out with EDA. Let's be honest, we've all done it...",
      readTime: "3 min read",
      date: "Apr 2025",
      publishDate: "2025-04-28",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/lets-talk-anomaly-5c8bbccdcd50"
    },
    {
      id: 3,
      category: "Machine Learning", 
      title: "Divide and Cluster: The Art of K-Means",
      description: "So far, we’ve explored some powerful algorithms like Regression, SVM (Support Vector Machines), and Naive Bayes — all designed to work with labeled datasets, where each data point comes with a tag, a class, or a target value...",
      readTime: "4 min read",
      date: "Feb 2025",
      publishDate: "2025-02-24",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/divide-and-cluster-the-art-of-k-means-9a5e39bb0c28"
    },
    {
      id: 4,
      category: "Machine Learning",
      title: "From Structured Predictions to Smarter Decision-Making with Decision Tree", 
      description: "Decision trees give us a systematic, logical approach to prediction and classification in the machine learning universe. They mimic human decision-making by breaking down problems into smaller steps...",
      readTime: "2 min read",
      date: "Feb 2025",
      publishDate: "2025-02-19",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/from-structured-predictions-to-smarter-decision-making-with-decision-tree-93c7815fb3e0"
    },
    {
      id: 5,
      category: "Statistics",
      title: "The Terror of Bayes' Theorem",
      description: "Class 6th (as far as I can recollect) is when we are introduced to probability. Not gonna lie it used to be my favorite topic to study until Mr. Reverend Thomas Bayes was introduced and his theorem. I could never wrap my head around it...",
      readTime: "2 min read",
      date: "Jan 2025",
      publishDate: "2025-01-28",
      categoryColor: "text-blue-600",
      url: "https://medium.com/@thevisionaryvectorsblog/the-terror-of-bayes-theorem-6af8af985324"
    },
    {
      id: 6,
      category: "Machine Learning",
      title: "SVM in 2025: Old School or Still Cool?",
      description: "Support Vector Machines (SVM) were once the go-to algorithm for classification tasks, offering high accuracy and robustness in structured data...",
      readTime: "2 min read", 
      date: "Jan 2025",
      publishDate: "2025-01-25",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/svm-in-2025-old-school-or-still-cool-baf7a3db95ef"
    },
    {
      id: 7,
      category: "Machine Learning",
      title: "Is Your Model Cramming Too Hard?",
      description: "Finishing off our regression series, we bring to you the last article on it, covering Ridge and Lasso Regression.",
      readTime: "3 min read",
      date: "Jan 2025", 
      publishDate: "2025-01-22",
      categoryColor: "text-purple-600",
      url: "https://medium.com/@thevisionaryvectorsblog/is-your-model-cramming-too-hard-0a07cc5af63b"
    },
    {
      id: 8,
      category: "Data Science",
      title: "Honey, I Shrunk the Dataset!",
      description: "So, I was working on this dataset with 1.2 million rows — sounds massive, right? Well, guess what? That’s just the tip of the data iceberg. Fun fact: this is only considered medium-sized data...",
      readTime: "3 min read",
      date: "Jan 2025",
      publishDate: "2025-01-20",
      categoryColor: "text-green-600",
      url: "https://medium.com/@thevisionaryvectorsblog/honey-i-shrunk-the-dataset-131992bc7965"
    },
    {
      id: 9,
      category: "Statistics",
      title: "All the Statistics You Need to Know for Linear Regression",
      description: "Imagine you’re trying to figure out how much candy you can collect depending on how many houses you visit on Halloween. You want to draw a line that shows how your candy collection grows as you visit more houses...",
      readTime: "3 min read",
      date: "Jan 2025",
      publishDate: "2025-01-18",
      categoryColor: "text-blue-600",
      url: "https://medium.com/@thevisionaryvectorsblog/all-the-statistics-you-need-to-know-for-linear-regression-dd9ebd2fc595"
    },
    {
      id: 10,
      category: "Data Science",
      title: "The Good Girl's Guide to EDA",
      description: "If you’re like me and greet a new dataset the way my dog reacts to a vacuum cleaner — paralysed by confusion, betrayal, and a touch of existential dread— this guide is for you...",
      readTime: "3 min read",
      date: "Jan 2025", 
      publishDate: "2025-01-13",
      categoryColor: "text-green-600",
      url: "https://medium.com/@thevisionaryvectorsblog/the-good-girls-guide-to-eda-98aaaaed6ec0"
    },
  ];

  // Function to get the latest published blog based on current date
  const getLatestPublishedBlog = () => {
    const now = new Date();
    const publishedBlogs = blogPosts.filter(blog => new Date(blog.publishDate) <= now);
    return publishedBlogs.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  };

  // Sort blog posts by date (newest first)
  // Memoize expensive calculations to prevent recalculation on every render
  const sortedBlogPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }, [blogPosts]);

  const displayedBlogs = useMemo(() => {
    return showAllBlogs ? sortedBlogPosts : sortedBlogPosts.slice(0, 3);
  }, [showAllBlogs, sortedBlogPosts]);

  const timelineData = useMemo(() => {
    return getTimelineData(blogPosts);
  }, [blogPosts]);

  const nextItem = useMemo(() => {
    return getNextUpcoming(blogPosts);
  }, [blogPosts]);

  // Update current date every 5 minutes instead of every minute to reduce re-renders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 300000); // Update every 5 minutes instead of 1 minute
    
    return () => clearInterval(interval);
  }, []);  // Week-based timeline highlighting logic
  const getCurrentWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    // Make Monday the start of the week (0=Sunday, 1=Monday, etc.)
    const dayOfWeek = date.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday (0), go back 6 days to Monday
    startOfWeek.setDate(date.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.getTime();
  };

  const currentWeek = getCurrentWeek(currentDate);
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

  const getTimelineItemOpacity = (itemDate: Date) => {
    const itemWeek = getCurrentWeek(itemDate);
    const weekDiff = Math.abs(itemWeek - currentWeek) / oneWeek;
    
    if (weekDiff === 0) {
      return 'opacity-100'; // Current week - full opacity
    } else if (weekDiff === 1) {
      return 'opacity-70'; // Previous/next week - lighter
    } else {
      return 'opacity-40'; // Other weeks - much lighter
    }
  };



  return (
    <div className="min-h-screen bg-white dark:bg-black">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-500 text-white py-20 px-6 relative overflow-hidden 
      dark:from-blue-600 dark:to-purple-600 dark:text-gray-100">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ayushi Sahu
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi there, and thanks for stopping by!
            If you’ve made it this far, I really appreciate it. This space is where I share my journey as an AI developer — the experiments, challenges, and breakthroughs I encounter along the way. Here, you’ll find my weekly development timeline, blog posts, and GitHub projects — all documenting how I’m growing and building in the world of artificial intelligence.
          </motion.p>
          
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              className="text-lg font-semibold mb-3 mt-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                🚀
              </motion.span>
              {" What's Live Now"}
            </motion.div>
            <div className="space-y-2">
              {/* Latest Blog */}
              <motion.div 
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 1.0,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className="text-sm"
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-4 h-4 inline-block" fill="white" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                  </svg>
                </motion.span>
                <a 
                  href={getLatestPublishedBlog()[0]?.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base opacity-90 hover:opacity-100 hover:underline transition-all duration-200"
                >
                  Latest Blog: &ldquo;{getLatestPublishedBlog()[0]?.title}&rdquo;
                </a>
              </motion.div>
              
              {/* Latest GitHub Project */}
              {/* <motion.div 
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className="text-sm"
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.span>
                <a 
                  href="https://github.com/ayushisahu222/Sentiment-Classifier-with-PyTorch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base opacity-90 hover:opacity-100 hover:underline transition-all duration-200"
                >
                  Latest Project: &ldquo;Sentiment Classifier with PyTorch&rdquo;
                </a>
              </motion.div> */}

            </div>
          </motion.div>
        </div>
      
      </section>

      {/* Services Section - Moved to top */}
      <section className="py-20 px-6 bg-white dark:bg-black">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Explore My Work</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my latest projects, dive into my insights, and follow my journey as I grow in the world of AI. Let’s connect and collaborate—together, we can turn ideas into innovation!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const handleClick = () => {
                switch(index) {
                  case 0: // GitHub Projects
                    window.open('https://github.com/ayushisahu222', '_blank');
                    break;
                  case 1: // Blogs
                    document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                  case 2: // Contact
                    window.open('mailto:ayushisahu222@gmail.com', '_blank');
                    break;
                }
              };

              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={handleClick}
                >
                  <div className="text-4xl mb-4">
                    {index === 0 ? (
                      <svg className="w-12 h-12 fill-black dark:fill-white" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : index === 1 ? (
                      <svg className="w-12 h-12 fill-black dark:fill-white" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                      </svg>
                    ) : index === 2 ? (
                      <svg className="w-12 h-12 fill-black dark:fill-white" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ) : (
                      service.icon
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        • {feature === "LinkedIn" ? (
                          <a 
                            href="https://www.linkedin.com/in/ayushi-sahu-32b77b16a/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {feature}
                          </a>
                        ) : feature === "Email" ? (
                          <a 
                            href="mailto:ayushisahu222@gmail.com" 
                            className="hover:text-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {feature}
                          </a>
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="text-purple-600 font-bold text-lg">{service.price}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-8 bg-white dark:bg-black">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Development Timeline</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Follow my journey through continuous learning and development milestones - each week brings new challenges and achievements!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
              <div className="relative mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-200 rounded-full transform rotate-12 opacity-20 dark:opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full p-12 text-center text-white">
                  <div className="text-6xl mb-4">
                    {nextItem?.type === 'blog' ? (
                      <svg className="w-16 h-16 mx-auto" fill="white" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                      </svg>
                    ) : nextItem?.type === 'github' ? (
                      <svg className="w-16 h-16 mx-auto" fill="white" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : '🚀'}
                  </div>
                  <div className="text-sm font-medium mb-2 opacity-90">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  {nextItem ? (
                    <>
                      <div className="text-lg font-bold mb-2">
                        {nextItem.type === 'blog' ? <span>Next Blog</span> : 
                         nextItem.type === 'github' ? 'Next Project' : 
                         'Next Milestone'}
                      </div>
                      <div className="text-base font-medium">&ldquo;{nextItem.title}&rdquo;</div>
                      <div className="text-sm opacity-80 mt-2">
                        Coming {nextItem.date.toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-bold mb-2">All Caught Up!</div>
                      <div className="text-base font-medium">Timeline Complete</div>
                      <div className="text-sm opacity-80 mt-2">Check back for new updates</div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
              {/* Upcoming Timeline - Shows What's Coming Next */}
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800"></div>
                
                <div className="space-y-4">
                  {timelineData
                    .filter(item => {
                      const oneWeek = 7 * 24 * 60 * 60 * 1000;
                      const lastWeek = currentWeek - oneWeek;
                      const itemWeek = getCurrentWeek(item.date);
                      
                      // Show items from last week and all future items
                      return itemWeek >= lastWeek;
                    })
                    .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort by date ascending
                    .slice(0, 5) // Show up to 5 items to include more upcoming ones
                    .map((item, index) => {
                      const opacity = getTimelineItemOpacity(item.date);
                      const isCurrentWeek = getCurrentWeek(item.date) === currentWeek;
                      const isPastWeek = getCurrentWeek(item.date) < currentWeek;
                      const isFutureWeek = getCurrentWeek(item.date) > currentWeek;
                      
                      return (
                      <motion.div
                        key={item.id}
                        className={`relative flex items-start transition-all duration-300 ${opacity} transform ${isCurrentWeek ? 'scale-105' : 'scale-100'}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: isCurrentWeek ? 1.08 : 1.02 }}
                      >
                        {/* Compact Timeline Node */}
                        <div className="relative z-10 flex-shrink-0">
                          <motion.div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              item.status === 'completed'
                                ? 'border-green-400 bg-green-100 dark:bg-green-700 dark:border-green-500 shadow-md shadow-green-200 dark:shadow-green-900'
                                : isCurrentWeek
                                ? 'border-purple-500 bg-purple-100 dark:bg-purple-500 dark:border-purple-100 shadow-md'
                                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                            } ${isCurrentWeek ? 'ring-2 ring-purple-300 dark:ring-purple-300 ring-opacity-50' : ''}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className="text-sm">
                              {item.type === 'milestone' ? '🚀' : 
                               item.type === 'blog' ? (
                                 <svg className="w-3 h-3 fill-black dark:fill-white" viewBox="0 0 24 24">
                                   <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                                 </svg>
                               ) : 
                               item.type === 'github' ? (
                                 <svg className="w-3 h-3 fill-black dark:fill-white" viewBox="0 0 24 24">
                                   <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                 </svg>
                               ) : '📚'}
                            </span>
                          </motion.div>
                        </div>

                        {/* Compact Content */}
                        <div className="ml-3 flex-1">
                          <div className={`${
                            isCurrentWeek ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 border' :
                            isFutureWeek ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-700 border' :
                            'bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-700 border'
                          } rounded-md p-2 transition-all duration-200`}>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-semibold text-sm ${
                                isCurrentWeek ? 'text-purple-600 dark:text-purple-500' :
                                isFutureWeek ? 'text-blue-600 dark:text-blue-500' :
                                item.status === 'completed' ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'
                              }`}>
                                {item.title}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {item.date.toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            
                            <p className={`text-xs mb-2 ${
                              isCurrentWeek ? 'text-purple-600 dark:text-purple-300' :
                              isFutureWeek ? 'text-blue-600 dark:text-blue-300' :
                              item.status === 'completed' ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {item.description}
                            </p>
                            
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'completed' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                                : isCurrentWeek
                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                : isFutureWeek
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                item.status === 'completed' ? 'bg-green-500 dark:bg-green-600' :
                                isCurrentWeek ? 'bg-purple-600 dark:bg-purple-700 animate-pulse' :
                                isFutureWeek ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-400'
                              }`}></span>
                              {(() => {
                                if (item.status === 'completed') return 'Done';
                                if (isPastWeek) return 'Past Week';
                                if (isCurrentWeek) return 'Coming Soon';
                                
                                // Calculate how many weeks in the future
                                const oneWeek = 7 * 24 * 60 * 60 * 1000;
                                const itemWeek = getCurrentWeek(item.date);
                                const weeksDiff = Math.round((itemWeek - currentWeek) / oneWeek);
                                
                                if (weeksDiff === 1) return 'Next Week';
                                if (weeksDiff === 2) return 'In 2 Weeks';
                                if (weeksDiff === 3) return 'In 3 Weeks';
                                return `In ${weeksDiff} Weeks`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">My Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Exploring the frontiers of AI, machine learning, and software development through detailed articles and insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog, index) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 cursor-pointer block group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 transform group-hover:scale-150"></div>
                
                <div className="relative z-10">
                  {/* Category badge with icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${blog.categoryColor} bg-opacity-10 backdrop-blur-sm border border-current border-opacity-20`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                      {blog.category}
                    </div>
                  </div>
                  
                  {/* Title with enhanced hover effect */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:to-blue-400 transition-all duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                  
                  {/* Divider line */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4"></div>
                  
                  {/* Meta information with icons */}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  
                  {/* Call to action with animation */}
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className="flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Read Article</span>
                      <motion.svg 
                        className="w-4 h-4 ml-2" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    </motion.div>
                    
                    {/* Medium logo */}
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.button 
              className="relative bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white px-10 py-4 rounded-full transition-all font-semibold shadow-lg hover:shadow-2xl overflow-hidden group"
              onClick={() => setShowAllBlogs(!showAllBlogs)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {showAllBlogs ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    View All Articles
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
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
    </div>
  );
}
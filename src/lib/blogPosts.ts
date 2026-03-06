export interface BlogPost {
  id: number | string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  publishDate: string;
  categoryColor: string;
  url: string;
  hideAfterWeek?: boolean;
  isInternal?: boolean;
}

export const externalBlogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Machine Learning",
    title: "The Math I Need for Transformers",
    description: "Before diving deep into LLMs, I wanted to get comfortable with the math behind them so the theory actually makes sense. So, I started exploring the building blocks - dot products, softmax functions, cross-entropy loss, and backpropagation through attention...",
    readTime: "3 min read",
    date: "15th Oct 2025",
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
    date: "28th Apr 2025",
    publishDate: "2025-04-28",
    categoryColor: "text-purple-600",
    url: "https://medium.com/@thevisionaryvectorsblog/lets-talk-anomaly-5c8bbccdcd50"
  },
  {
    id: 3,
    category: "Machine Learning",
    title: "Divide and Cluster: The Art of K-Means",
    description: "So far, we've explored some powerful algorithms like Regression, SVM (Support Vector Machines), and Naive Bayes — all designed to work with labeled datasets, where each data point comes with a tag, a class, or a target value...",
    readTime: "4 min read",
    date: "24th Feb 2025",
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
    date: "19th Feb 2025",
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
    date: "28th Jan 2025",
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
    date: "25th Jan 2025",
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
    date: "22nd Jan 2025",
    publishDate: "2025-01-22",
    categoryColor: "text-purple-600",
    url: "https://medium.com/@thevisionaryvectorsblog/is-your-model-cramming-too-hard-0a07cc5af63b"
  },
  {
    id: 8,
    category: "Data Science",
    title: "Honey, I Shrunk the Dataset!",
    description: "So, I was working on this dataset with 1.2 million rows — sounds massive, right? Well, guess what? That's just the tip of the data iceberg. Fun fact: this is only considered medium-sized data...",
    readTime: "3 min read",
    date: "20th Jan 2025",
    publishDate: "2025-01-20",
    categoryColor: "text-green-600",
    url: "https://medium.com/@thevisionaryvectorsblog/honey-i-shrunk-the-dataset-131992bc7965"
  },
  {
    id: 9,
    category: "Statistics",
    title: "All the Statistics You Need to Know for Linear Regression",
    description: "Imagine you're trying to figure out how much candy you can collect depending on how many houses you visit on Halloween. You want to draw a line that shows how your candy collection grows as you visit more houses...",
    readTime: "3 min read",
    date: "18th Jan 2025",
    publishDate: "2025-01-18",
    categoryColor: "text-blue-600",
    url: "https://medium.com/@thevisionaryvectorsblog/all-the-statistics-you-need-to-know-for-linear-regression-dd9ebd2fc595"
  },
  {
    id: 10,
    category: "Data Science",
    title: "The Good Girl's Guide to EDA",
    description: "If you're like me and greet a new dataset the way my dog reacts to a vacuum cleaner — paralysed by confusion, betrayal, and a touch of existential dread— this guide is for you...",
    readTime: "3 min read",
    date: "13th Jan 2025",
    publishDate: "2025-01-13",
    categoryColor: "text-green-600",
    url: "https://medium.com/@thevisionaryvectorsblog/the-good-girls-guide-to-eda-98aaaaed6ec0",
    isInternal: false
  },
];

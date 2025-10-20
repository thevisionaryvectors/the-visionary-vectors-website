export interface BlogPost {
  id: string;
  title: string;
  url: string;
  publishDate: string;
  readTime: string;
  summary: string;
  tags: string[];
  category: string;
}

// Combined featured posts from both Ayushi and Shreya
export const featuredPosts: BlogPost[] = [
  // Ayushi's posts
  {
    id: '9',
    title: '"I Sus?" Understanding Isolation Forest and Local Forest Outliers',
    url: 'https://medium.com/@thevisionaryvectorsblog/i-sus-understanding-isolation-forest-and-local-forest-outliers-[article-id]',
    publishDate: '2025-04-28',
    readTime: '3 min read',
    summary: 'Uncover the mysteries of outlier detection with Isolation Forest and Local Outlier Factor algorithms. Learn how these powerful techniques identify anomalies in your data, when to use each method, and how they can help you spot suspicious patterns and data points.',
    tags: ['Machine Learning', 'Outlier Detection', 'Anomaly Detection', 'Isolation Forest'],
    category: 'Machine Learning'
  },
  {
    id: '8',
    title: 'Divide and Cluster: The Art of K-Means',
    url: 'https://medium.com/@thevisionaryvectorsblog/divide-and-cluster-the-art-of-k-means-[article-id]',
    publishDate: '2025-04-01',
    readTime: '4 min read',
    summary: 'Master the fundamentals of K-Means clustering algorithm. Explore how this unsupervised learning technique divides data into meaningful groups, learn about centroid initialization, convergence criteria, and discover practical applications in customer segmentation and data analysis.',
    tags: ['Machine Learning', 'Clustering', 'Unsupervised Learning', 'K-Means'],
    category: 'Machine Learning'
  },
  {
    id: '7',
    title: 'From Structured Predictions to Smarter Decision-Making with Decision Tree',
    url: 'https://medium.com/@thevisionaryvectorsblog/from-structured-predictions-to-smarter-decision-making-with-decision-tree-[article-id]',
    publishDate: '2025-03-24',
    readTime: '2 min read',
    summary: 'Discover how Decision Trees transform complex decision-making processes into clear, interpretable models. Learn about tree construction, splitting criteria, pruning techniques, and how this fundamental algorithm provides structured predictions while maintaining transparency in machine learning workflows.',
    tags: ['Machine Learning', 'Decision Trees', 'Classification', 'Interpretable AI'],
    category: 'Machine Learning'
  },
  {
    id: '6',
    title: 'SVM in 2025: Old School or Still Cool?',
    url: 'https://medium.com/@thevisionaryvectorsblog/svm-in-2025-old-school-or-still-cool-[article-id]',
    publishDate: '2025-02-24',
    readTime: '2 min read',
    summary: "Explore the relevance of Support Vector Machines in today's machine learning landscape. Discover whether SVMs still hold their ground against modern algorithms, their unique advantages, and when they might be the perfect choice for your classification and regression problems in 2025.",
    tags: ['Machine Learning', 'SVM', 'Classification', 'Algorithm Comparison'],
    category: 'Machine Learning'
  },
  {
    id: '5',
    title: 'Is Your Model Cramming Too Hard?',
    url: 'https://medium.com/@thevisionaryvectorsblog/is-your-model-cramming-too-hard-[article-id]',
    publishDate: '2025-02-19',
    readTime: '3 min read',
    summary: "Finishing off our regression series with the final article covering Ridge and Lasso Regression. Learn how these regularization techniques prevent overfitting, understand the difference between L1 and L2 regularization, and discover when to use each method to improve your model's performance.",
    tags: ['Machine Learning', 'Ridge Regression', 'Lasso Regression', 'Regularization'],
    category: 'Machine Learning'
  },
  {
    id: '4',
    title: "The Terror of Bayes' Theorem",
    url: 'https://medium.com/@thevisionaryvectorsblog/the-terror-of-bayes-theorem-[article-id]',
    publishDate: '2025-03-10',
    readTime: '2 min read',
    summary: "Demystify Bayes' theorem and overcome the fear of conditional probability. Learn how to apply this fundamental theorem in real-world scenarios, understand its mathematical foundation, and discover why it's such a powerful tool in statistics, machine learning, and data science.",
    tags: ['Statistics', 'Probability', 'Bayes Theorem'],
    category: 'Statistics'
  },
  {
    id: '3',
    title: 'Honey, I Shrunk the Dataset!',
    url: 'https://medium.com/@thevisionaryvectorsblog/honey-i-shrunk-the-dataset-131992bc7965',
    publishDate: '2025-01-27',
    readTime: '4 min read',
    summary: 'Explore various data reduction and sampling techniques to make large datasets more manageable. Learn about random sampling, stratified sampling, systematic sampling, and other methods to shrink your dataset while preserving its statistical properties and insights.',
    tags: ['Data Science', 'Sampling', 'Data Reduction'],
    category: 'Data Science'
  },
  {
    id: '2',
    title: 'All the Statistics You Need to Know for Linear Regression',
    url: 'https://medium.com/@thevisionaryvectorsblog/all-the-statistics-you-need-to-know-for-linear-regression-dd9ebd2fc595',
    publishDate: '2025-01-20',
    readTime: '3 min read',
    summary: 'Master the essential statistical concepts behind linear regression. From correlation coefficients to p-values, R-squared to residual analysis - understand the key metrics that make linear regression a powerful tool for data analysis and predictive modeling.',
    tags: ['Statistics', 'Linear Regression'],
    category: 'Statistics'
  },
  {
    id: '1',
    title: "The Good Girl's Guide to EDA",
    url: 'https://medium.com/@thevisionaryvectorsblog/the-good-girls-guide-to-eda-98aaaaed6ec0',
    publishDate: '2025-01-13',
    readTime: '3 min read',
    summary: 'A comprehensive guide to Exploratory Data Analysis (EDA) techniques and best practices. Learn how to uncover insights from your data through systematic exploration, visualization, and statistical analysis methods that every data scientist should know.',
    tags: ['Data Science', 'EDA'],
    category: 'Data Science'
  },

  // Shreya's posts
  {
    id: 's-1',
    title: "Feature Engineering: The Detective's Guide to Data Makeovers",
    url: 'https://medium.com/@thevisionaryvectorsblog/feature-engineering-the-detectives-guide-to-data-makeovers-d0bd705636e5',
    publishDate: '2025-01-15',
    readTime: '6 min read',
    summary: 'Discover the art and science of feature engineering - transforming raw data into meaningful insights. Learn detective-like skills to uncover hidden patterns, create powerful features, and dramatically improve your machine learning models through strategic data transformations.',
    tags: ['Feature Engineering', 'Data Science', 'Machine Learning', 'Data Transformation'],
    category: 'Data Science'
  }
];

export default featuredPosts;

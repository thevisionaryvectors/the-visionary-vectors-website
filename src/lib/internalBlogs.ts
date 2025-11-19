export interface InternalBlog {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  readTime: string;
  date: string;
  publishDate: string;
  author: string;
  featuredImage?: string;
  featuredImageCaption?: string;
  sections: BlogSection[];
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  mediaType?: 'image' | 'video' | 'gif' | 'chart';
  mediaUrl?: string;
  mediaCaption?: string;
}

// Internal blogs data - Add new blogs here
export const internalBlogs: InternalBlog[] = [
  {
    id: 'perceptron-learning',
    slug: 'inside-the-mind-of-a-perceptron-watch-it-learn',
    title: 'Inside the Mind of a Perceptron: Watch It Learn!',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'If you are like me who just wanted to learn about LLMs without learning about the simplest unit of neural networks, the perceptron, then this article is for you!',
    readTime: '3 min read',
    date: '12th Nov 2025',
    publishDate: '2025-11-12',
    author: 'Ayushi Sahu',
    featuredImage: '/perceptron_image.png',
    featuredImageCaption: 'Image from https://towardsdatascience.com/perceptrons-the-first-neural-network-model-8b3ee4513757/',
    sections: [
      {
        id: 'what-is-perceptron',
        title: 'What is a Perceptron?',
        content: `Perceptron is the most basic unit of a neural network, its takes in multiple binary inputs and produces a single binary output. `,
      },
      {
        id: 'interpretation-of-weights',
        title: 'Interpretation of a Perceptron diagram',
        content: `Now when we look at a perceptron diagram, we interpret the weights as indicators of how strongly each input xₙ influences the final decision.
        For example, suppose we’re predicting the likelihood of Ayushi going to the office today. The inputs (or features) could include Bangalore’s weather, Ayushi’s mood, Workload, and whether there’s a Client Demo. If there’s a client demo scheduled, the probability of Ayushi going to the office increases — meaning that particular input has a higher weight compared to the others. The perceptron uses these weighted inputs to decide the final outcome.
        So its basically just a binary classifier that takes multiple inputs, applies weights to them, sums them up, adds a bias, and then passes the result through an activation function to produce an output of 0 or 1.
        `,
      },
      {
        id: 'learning-process',
        title: 'How to train a Perceptron?',
        content: `At its core, training a perceptron means finding the best possible line that separates two classes.
        In mathematical terms, this line can be represented as: 
        Ax+By+C=0
        
        You can think of this as the decision boundary — the divider between the two categories.
        If we express it in perceptron terms, it becomes: 
        w₁x + w₂y + b = 0.

        Here, w₁ and w₂ are the weights for inputs x and y, and b is the bias.

        Let's see the step-by-step process of training a perceptron:
        1. Initialize the weights
        Start with small random values (or zeros). Initially, the perceptron has no idea which inputs matter.

        2. Feed an input sample
        Provide one training example (a set of input features and the expected output).

        3. Calculate the output
        Multiply each input by its weight, add them all up, include the bias, and apply the activation function (typically a step function that outputs 0 or 1). A step function simply checks whether the sum is above a certain threshold — if yes, it outputs 1; otherwise, 0.

        4. Compare with the actual answer
        If the prediction matches the actual label, great — nothing changes. If the prediction is wrong, the perceptron updates its weights.

        5. Update the weights (Learning Rule)
        The perceptron adjusts the weights in the direction that reduces the error.
        The update rule is:
        weight_new = weight_old + learning_rate × (actual_output - predicted_output) × input
        Similarly, update the bias:
        bias_new = bias_old + learning_rate × (actual_output - predicted_output)

        Here, learning_rate is a small constant (like 0.1) that controls how big the weight updates are.
        
        6. Repeat for all training examples
        Go through the dataset multiple times (called epochs) until:
        • the predictions stop changing, or
        • a maximum number of iterations is reached.`,

      },
      {
        id: 'limitations',
        title: 'Limitations',
        content: `While the perceptron is a foundational concept in neural networks, it has some limitations:
            • It can only solve linearly separable problems. Complex patterns require more advanced architectures like Multi-Layer Perceptrons (MLPs).
            • It uses a step activation function, which is not differentiable. This limits the use of gradient-based optimization methods.
            • It is sensitive to the choice of learning rate and initial weights.`

      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        content: `Even the massive language models we use today are built upon layers of perceptron-like units — each learning simple patterns that, together, form complex intelligence. Understanding the perceptron gives us insight into the fundamental building blocks of modern neural network models.`,
      }
    ]
  },
  {
    id: 'anns-real-problems',
    slug: 'anns-real-problems',
    title: 'How ANNs Solve Real Problems: Classification & Regression Case Studies',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore how Artificial Neural Networks tackle real-world classification and regression problems through practical case studies.',
    readTime: '9 min read',
    date: '23rd Nov 2025',
    publishDate: '2025-11-23',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on November 14, 2025. Stay tuned for a visual guide to gradient descent!'
      }
    ]
  },
  {
    id: 'backpropagation-loss',
    slug: 'backpropagation-loss',
    title: 'Backpropagation & Loss Functions: The Math Behind Learning',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Understand the mathematical foundations of how neural networks learn through backpropagation and loss functions.',
    readTime: '10 min read',
    date: '27th Nov 2025',
    publishDate: '2025-11-27',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on November 22, 2025. Stay tuned for a deep dive into backpropagation and loss functions!'
      }
    ]
  },
  {
    id: 'training-stability',
    slug: 'training-stability',
    title: 'Training Stability: Gradient Descent, Memoization & Vanishing Gradients',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Master the techniques for stable neural network training, including gradient descent optimization, memoization, and solving vanishing gradient problems.',
    readTime: '11 min read',
    date: '30th Nov 2025',
    publishDate: '2025-11-30',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on November 25, 2025. Stay tuned for insights on training stability!'
      }
    ]
  },
  {
    id: 'improving-nn-performance',
    slug: 'improving-nn-performance',
    title: 'Improving Neural Network Performance: Scaling, Regularization & Dropout',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Learn essential techniques to improve neural network performance including feature scaling, regularization methods, and dropout.',
    readTime: '10 min read',
    date: '6th Dec 2025',
    publishDate: '2025-12-06',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 1, 2025.'
      }
    ]
  },
  {
    id: 'activation-functions',
    slug: 'activation-functions',
    title: 'Activation Functions: From Sigmoid to ReLU and Modern Variants',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore the evolution of activation functions from classical sigmoid to modern variants like ReLU, Leaky ReLU, and GELU.',
    readTime: '8 min read',
    date: '8th Dec 2025',
    publishDate: '2025-12-08',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 3, 2025.'
      }
    ]
  },
  {
    id: 'weight-initialization',
    slug: 'weight-initialization',
    title: 'Weight Initialization: Why It Matters & How Xavier/He Work',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Understand the importance of weight initialization and how Xavier and He initialization methods work.',
    readTime: '7 min read',
    date: '10th Dec 2025',
    publishDate: '2025-12-10',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 5, 2025.'
      }
    ]
  },
  {
    id: 'batch-normalization',
    slug: 'batch-normalization',
    title: 'Batch Normalization: How It Stabilizes Neural Networks',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Learn how batch normalization stabilizes neural network training and accelerates convergence.',
    readTime: '9 min read',
    date: '11th Dec 2025',
    publishDate: '2025-12-11',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 6, 2025.'
      }
    ]
  },
  {
    id: 'optimizers-explained',
    slug: 'optimizers-explained',
    title: 'Optimizers Explained: Momentum, RMSProp, Adam & More',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Deep dive into optimization algorithms including Momentum, RMSProp, Adam, and their variants.',
    readTime: '12 min read',
    date: '18th Dec 2025',
    publishDate: '2025-12-18',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 13, 2025.'
      }
    ]
  },
  {
    id: 'hyperparameter-tuning',
    slug: 'hyperparameter-tuning',
    title: 'Hyperparameter Tuning with Keras Tuner',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Master hyperparameter tuning using Keras Tuner for optimal neural network performance.',
    readTime: '10 min read',
    date: '19th Dec 2025',
    publishDate: '2025-12-19',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 14, 2025.'
      }
    ]
  },
  {
    id: 'cnn-fundamentals',
    slug: 'cnn-fundamentals',
    title: 'CNN Fundamentals: Convolution, Pooling & Classic Architectures',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Learn the fundamentals of Convolutional Neural Networks including convolution, pooling, and classic architectures.',
    readTime: '11 min read',
    date: '26th Dec 2025',
    publishDate: '2025-12-26',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 21, 2025.'
      }
    ]
  },
  {
    id: 'inside-cnn',
    slug: 'inside-cnn',
    title: 'Inside a CNN: Backpropagation, Transfer Learning & Feature Maps',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore the inner workings of CNNs including backpropagation, transfer learning, and feature visualization.',
    readTime: '10 min read',
    date: '13th Jan 2026',
    publishDate: '2026-01-13',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 8, 2026.'
      }
    ]
  },
  {
    id: 'transfer-learning-functional-api',
    slug: 'transfer-learning-functional-api',
    title: 'Transfer Learning & Functional API: Building Advanced CNNs',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Build advanced CNNs using transfer learning and Keras Functional API for complex architectures.',
    readTime: '12 min read',
    date: '15th Jan 2026',
    publishDate: '2026-01-15',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 10, 2026.'
      }
    ]
  },
  {
    id: 'rnns-architecture',
    slug: 'rnns-architecture',
    title: 'RNNs: Architecture, Training, BPTT & Common Issues',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Understand Recurrent Neural Networks, their architecture, training with BPTT, and common challenges.',
    readTime: '11 min read',
    date: '21st Jan 2026',
    publishDate: '2026-01-21',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 16, 2026.'
      }
    ]
  },
  {
    id: 'lstm-gru',
    slug: 'lstm-gru',
    title: 'LSTM & GRU: Sequence Modeling Powerhouses',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore LSTM and GRU architectures and how they solve the vanishing gradient problem in sequence modeling.',
    readTime: '10 min read',
    date: '26th Jan 2026',
    publishDate: '2026-01-26',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 21, 2026.'
      }
    ]
  },
  {
    id: 'lstm-to-gpt',
    slug: 'lstm-to-gpt',
    title: 'From LSTM to GPT: The Evolution of Large Language Models',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Trace the evolution from LSTM networks to modern GPT models and understand the key innovations.',
    readTime: '13 min read',
    date: '27th Jan 2026',
    publishDate: '2026-01-27',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 22, 2026.'
      }
    ]
  },
  {
    id: 'seq2seq-attention',
    slug: 'seq2seq-attention',
    title: 'Seq2Seq & Attention: How Models Learn Context',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Learn how sequence-to-sequence models and attention mechanisms enable context understanding.',
    readTime: '11 min read',
    date: '31st Jan 2026',
    publishDate: '2026-01-31',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 26, 2026.'
      }
    ]
  },
  {
    id: 'transformers-explained',
    slug: 'transformers-explained',
    title: 'Transformers Explained: Self-Attention, Multi-Head Attention & Positional Encoding',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Understand the transformer architecture with detailed explanations of self-attention, multi-head attention, and positional encoding.',
    readTime: '14 min read',
    date: '9th Feb 2026',
    publishDate: '2026-02-09',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on February 4, 2026.'
      }
    ]
  },
  {
    id: 'inside-transformer',
    slug: 'inside-transformer',
    title: 'Inside the Transformer: Encoder, Decoder, Masking & Inference',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Deep dive into transformer internals including encoder-decoder architecture, masking strategies, and inference.',
    readTime: '12 min read',
    date: '14th Feb 2026',
    publishDate: '2026-02-14',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on February 9, 2026.'
      }
    ]
  },
  // Add more internal blogs here as needed
];

// Helper function to get blog by slug
export function getBlogBySlug(slug: string): InternalBlog | undefined {
  return internalBlogs.find(blog => blog.slug === slug);
}

// Helper function to get all internal blogs
export function getAllInternalBlogs(): InternalBlog[] {
  return internalBlogs.sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Helper function to get recent internal blogs
export function getRecentInternalBlogs(limit: number = 3): InternalBlog[] {
  return getAllInternalBlogs().slice(0, limit);
}

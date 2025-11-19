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
    id: 'mlps-explained',
    slug: 'mlps-explained',
    title: 'MLPs Explained: Architecture, Notation & Forward Propagation',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Dive deep into Multi-Layer Perceptrons architecture, mathematical notation, and forward propagation process.',
    readTime: '8 min read',
    date: '20th Nov 2025',
    publishDate: '2025-11-20',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `You've heard about Multi-Layer Perceptrons (MLPs) and neural networks, but have you ever wondered what actually happens inside these networks when they process data? It's not magic—it's mathematics, and it's beautifully elegant.

In this article, we're going on a visual journey through an MLP. We'll follow a single piece of data as it enters the network, gets transformed by hidden layers, passes through activation functions, and finally emerges as a prediction. By the end, you'll have an intuitive understanding of how these networks process information.`
      },
      {
        id: 'architecture-overview',
        title: 'The MLP Architecture',
        content: `An MLP is called "multi-layer" because it has more than just an input and output layer—it has hidden layers in between. These hidden layers are what give neural networks their power to learn complex patterns.

A typical MLP consists of:
• **Input Layer**: Receives the raw features of your data
• **Hidden Layer(s)**: Process and transform the data through weights, biases, and activation functions
• **Output Layer**: Produces the final prediction or classification

Think of it like a factory assembly line: raw materials (input) go through multiple processing stations (hidden layers) before becoming the final product (output).`
      },
      {
        id: 'forward-propagation',
        title: 'Forward Propagation: The Journey Begins',
        content: `When data enters an MLP, it goes through a process called forward propagation. Here's what happens step by step:

**Step 1: Input Layer**
Your data enters as a vector of numbers. For example, if you're classifying images, each pixel value becomes an input neuron.

**Step 2: First Hidden Layer**
Each neuron in the first hidden layer:
1. Receives ALL inputs from the previous layer
2. Multiplies each input by its corresponding weight
3. Sums all these weighted inputs
4. Adds a bias term
5. Passes the result through an activation function

The formula: activation(Σ(weight × input) + bias)

**Step 3: Subsequent Hidden Layers**
The output from one layer becomes the input to the next. This transformation continues through each hidden layer, with the network learning increasingly abstract representations of the data.

**Step 4: Output Layer**
The final layer produces your prediction. For classification, this might use softmax to give probabilities for each class. For regression, it might be a single linear output.`
      },
      {
        id: 'activation-functions',
        title: 'Activation Functions: Adding Non-Linearity',
        content: `Activation functions are crucial—they're what allows neural networks to learn complex, non-linear patterns. Without them, stacking multiple layers would be pointless because the network would still only learn linear relationships.

**Common Activation Functions:**

**ReLU (Rectified Linear Unit)**
• Formula: f(x) = max(0, x)
• Most popular for hidden layers
• Fast to compute and helps avoid vanishing gradients
• Simply sets negative values to 0, keeps positive values unchanged

**Sigmoid**
• Formula: f(x) = 1 / (1 + e^(-x))
• Squashes values between 0 and 1
• Often used in output layer for binary classification
• Can suffer from vanishing gradients in deep networks

**Tanh (Hyperbolic Tangent)**
• Formula: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))
• Squashes values between -1 and 1
• Zero-centered, which can help with learning
• Also can suffer from vanishing gradients

**Softmax (for output)**
• Converts logits to probabilities that sum to 1
• Perfect for multi-class classification
• Formula: f(x_i) = e^(x_i) / Σ(e^(x_j))

Each activation function adds a non-linear transformation, allowing the network to learn patterns that aren't just straight lines!`
      },
      {
        id: 'weights-and-biases',
        title: 'Weights and Biases: The Learnable Parameters',
        content: `Every connection between neurons has a weight, and every neuron has a bias. These are the parameters that the network learns during training.

**Weights**
• Determine the strength of connections between neurons
• Positive weights amplify signals, negative weights suppress them
• The network adjusts these during training to minimize error
• Think of them as the "importance" of each connection

**Biases**
• Allow neurons to activate even when all inputs are zero
• Give the network flexibility to shift activation functions
• Help the network fit data that doesn't pass through the origin
• One bias per neuron

**Why Both?**
Weights let the network learn slopes (relationships between features), while biases let it shift those relationships up or down. Together, they give the network incredible flexibility to approximate complex functions.

For a layer with n inputs and m neurons:
• Number of weights: n × m
• Number of biases: m
• Total parameters: (n × m) + m

This is why deep networks can have millions or billions of parameters!`
      },
      {
        id: 'information-flow',
        title: 'Watching Information Flow',
        content: `Let's trace a single data point through a simple MLP:

**Example: Classifying if a student will pass based on study hours and sleep hours**

**Input Layer [4 hours of study, 7 hours of sleep]**
↓
**Hidden Layer 1 (3 neurons)**
• Neuron 1: (4×0.5 + 7×0.3 + 0.1) = 4.2 → ReLU → 4.2
• Neuron 2: (4×-0.2 + 7×0.8 - 0.5) = 4.9 → ReLU → 4.9
• Neuron 3: (4×0.7 + 7×-0.1 + 0.2) = 2.7 → ReLU → 2.7
↓
**Hidden Layer 2 (2 neurons)**
• Neuron 1: (4.2×0.6 + 4.9×0.3 + 2.7×0.1 + 0.2) = 4.25 → ReLU → 4.25
• Neuron 2: (4.2×-0.3 + 4.9×0.5 + 2.7×0.4 - 0.1) = 2.42 → ReLU → 2.42
↓
**Output Layer (2 neurons for Pass/Fail)**
• Pass: (4.25×0.8 + 2.42×0.5) = 4.61
• Fail: (4.25×-0.6 + 2.42×0.3) = -1.82
↓ (Apply Softmax)
**Final Probabilities: [Pass: 99.8%, Fail: 0.2%]**

Notice how the information gets transformed at each layer, with the network "extracting features" and making increasingly refined representations until it reaches a final decision!`
      },
      {
        id: 'why-depth-matters',
        title: 'Why Multiple Layers Matter',
        content: `You might wonder: why use multiple hidden layers instead of just one large layer?

**Hierarchical Feature Learning**
Deep networks learn features hierarchically:
• Early layers learn simple features (edges, colors, simple patterns)
• Middle layers combine these into more complex features (shapes, textures)
• Later layers learn high-level concepts (objects, faces, abstract patterns)

**Efficiency**
A deep network with multiple small layers can learn the same function as a shallow network with one huge layer, but with far fewer parameters. This is more efficient and generalizes better.

**Biological Inspiration**
The visual cortex in your brain works similarly—processing visual information through multiple layers, with each layer extracting increasingly complex features.

**The Trade-off**
More layers = more representational power, but also:
• Harder to train (vanishing/exploding gradients)
• More prone to overfitting
• Slower to compute

This is why network architecture design is both an art and a science!`
      },
      {
        id: 'conclusion',
        title: 'Bringing It All Together',
        content: `Now you've seen what happens inside an MLP:

1. **Data enters** as a vector of numbers
2. **Each layer transforms** the data through weights, biases, and activations
3. **Information flows forward** through the network
4. **Each layer learns** different levels of abstraction
5. **Final output** emerges as a prediction

The beauty of MLPs lies in their simplicity and power. They're essentially just a series of matrix multiplications and non-linear transformations, yet they can learn to recognize faces, understand language, play games, and solve complex problems.

Understanding this forward pass is crucial because it's the foundation for backpropagation (how the network learns) and for debugging when things go wrong.

Next up: We'll explore gradient descent and see how these weights and biases actually get updated during training. Stay tuned! 🚀`
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

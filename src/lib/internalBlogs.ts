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

For example, suppose we're predicting the likelihood of Ayushi going to the office today. The inputs (or features) could include Bangalore's weather, Ayushi's mood, Workload, and whether there's a Client Demo. If there's a client demo scheduled, the probability of Ayushi going to the office increases — meaning that particular input has a higher weight compared to the others. The perceptron uses these weighted inputs to decide the final outcome.

So its basically just a binary classifier that takes multiple inputs, applies weights to them, sums them up, adds a bias, and then passes the result through an activation function to produce an output of 0 or 1.`,
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
    slug: 'forward-propagation-explained-the-first-step-to-training-neural-networks',
    title: 'Forward Propagation Explained: The First Step to Training Neural Networks',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'In order to understand how to train an LLM, we first need to understand backpropagation. And before we get there, we need to understand the stage where everything begins: forward propagation.',
    readTime: '4 min read',
    date: '23rd Nov 2025',
    publishDate: '2025-11-23',
    author: 'Ayushi Sahu',
    featuredImage: '/MLP_Intuition.jpg',
    featuredImageCaption: 'From linear decision boundaries to nonlinear curves using multi-layer perceptrons',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `In order to understand how to train an LLM, we first need to understand backpropagation. And before we get there, we need to understand the stage where everything begins: forward propagation.

Let's break down the basics. If you haven't already studied what a perceptron is, read this first: [Inside the Mind of a Perceptron: Watch It Learn!](https://the-visionary-vectors-website.vercel.app/article/inside-the-mind-of-a-perceptron-watch-it-learn)

A perceptron can only solve linear problems. It draws a straight line between classes. But real data rarely behaves that nicely. So what happens when we want to fit a nonlinear curve through the data?

We bring in backup.`
      },
      {
        id: 'nonlinear-solutions',
        title: 'From Linear to Nonlinear',
        content: `We use multiple perceptrons, each contributing its own linear boundary. Then we apply a nonlinear activation function that bends and blends these straight lines into a smooth curve that can fit the underlying shape of the data.

Each perceptron gives you one line or called decision boundary. Combine enough of them and apply nonlinear activations, and you get a curved decision boundary.

In simpler words:
* Chaining multiple perceptrons together is called a Multi-Layer Perceptron (MLP).
* The way data flows from the input layer through the hidden layers to the output layer is called forward propagation.

This is the first half of learning.`
      },
      {
        id: 'neural-network-architecture',
        title: 'Understanding Neural Network Architecture',
        content: `

**Layer 1: First Hidden Layer**

Layer 1 has three neurons. Each neuron has:
1. incoming weights
2. a bias term
3. an activation output ($O_{11}$, $O_{12}$, $O_{13}$)

Each neuron takes all the inputs from Layer 0 and computes a weighted sum.

For the first neuron in Layer 1, the formula looks like this:

$$O_{11} = x_1 \\cdot w_{11}^1 + x_2 \\cdot w_{21}^1 + x_3 \\cdot w_{31}^1 + x_4 \\cdot w_{41}^1 + b_{11}$$


**Layer 2: Second Hidden Layer**

Layer 2 has two neurons.

For the first neuron in Layer 2, the formula looks like this:

$$O_{21} = \\sigma(o_{11} \\cdot w_{11}^2 + o_{12} \\cdot w_{21}^2 + o_{13} \\cdot w_{31}^2 + b_{21})$$

**Layer 3: Output Layer**

The output neuron takes the activated outputs of the previous layer ($O_{21}$ and $O_{22}$), multiplies them by the output weights, adds a bias, and applies an output activation to produce the final prediction:

$$z_{31} = w_{11}^3 \\sigma\\left(w_{11}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i1}^1 + b_{11}\\right) + w_{21}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i2}^1 + b_{12}\\right) + w_{31}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i3}^1 + b_{13}\\right) + b_{21}\\right) + w_{21}^3 \\sigma\\left(w_{12}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i1}^1 + b_{11}\\right) + w_{22}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i2}^1 + b_{12}\\right) + w_{32}^2 \\sigma\\left(\\sum_{i=1}^{4} x_i w_{i3}^1 + b_{13}\\right) + b_{22}\\right) + b_{31}$$

The final predicted value is:

$$\\hat{y} = \\phi(z_{31})$$

The choice of $\\phi$ depends on the task: identity for regression, sigmoid for binary classification, or softmax across multiple outputs for multiclass problems.`,
        mediaType: 'image',
        mediaUrl: '/MLP_Notation.jpg',
        mediaCaption: 'Neural Network Architecture with Notation'
      },
      {
        id: 'improving-accuracy',
        title: 'How to Improve Model Accuracy',
        content: `Once you understand how information flows forward through the network, the next natural question is: how do we help the model learn better?

A big part of improving accuracy comes down to adjusting the network's architecture. Here are a few levers we can tune:

1. Increase the number of input nodes:  More features = more context. This gives the network richer information to learn from.

2. Increase the number of layers:  More layers allow the model to learn deeper, more abstract patterns.

3. Increase the number of nodes in each layer:  More neurons increase the capacity of the network, helping it capture complex relationships.

4. Increase the number of output nodes:  Especially useful for multi-class or multi-output tasks. For example, image classification with 10 classes needs 10 output nodes.
These design choices affect how much the model can learn during forward propagation and how much error backpropagation will try to correct.`
      },
      {
        id: 'try-it-yourself',
        title: 'Try It Yourself',
        content: `To see all of this in action, check out [this notebook](https://github.com/ayushisahu222/visionary-vectors-notebooks/blob/main/Credit-Card-Customer-Churn-Prediction.ipynb) where a simple neural network is trained on Credit Card Churn data. The "Try It Yourself" section lets you experiment with different parameters and watch how changes in layers, nodes, or activations impact the model's accuracy.`
      }
    ]
  },
  {
    id: 'backpropagation-loss-functions',
    slug: 'backpropagation-loss-functions-the-math-behind-learning',
    title: 'Backpropagation & Loss Functions: The Math Behind Learning',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'A mathematical walk-through of backpropagation and loss functions used to train neural networks.',
    readTime: '10 min read',
    date: '5th Dec 2025',
    publishDate: '2025-12-05',
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
    id: 'gradient-descent',
    slug: 'gradient-descent',
    title: 'Gradient Descent',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'An intuitive guide to gradient descent and its variants for optimizing neural networks.',
    readTime: '8 min read',
    date: '8th Dec 2025',
    publishDate: '2025-12-08',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 8, 2025.'
      }
    ]
  },
  {
    id: 'activation-functions',
    slug: 'activation-functions-weight-initialization-batch-norm-the-core-of-stable-deep-learning',
    title: 'Activation Functions, Weight Initialization & Batch Norm — The Core of Stable Deep Learning',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore the evolution of activation functions from classical sigmoid to modern variants like ReLU, Leaky ReLU, and GELU.',
    readTime: '8 min read',
    date: '19th Dec 2025',
    publishDate: '2025-12-19',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on December 19, 2025.'
      }
    ]
  },
  {
    id: 'improve-neural-network-performance',
    slug: 'how-to-improve-neural-network-performance-scaling-regularization-dropout-early-stopping',
    title: 'How to Improve Neural Network Performance: Scaling, Regularization, Dropout & Early Stopping',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Practical strategies for scaling models and preventing overfitting using regularization, dropout, and early stopping.',
    readTime: '10 min read',
    date: '14th Dec 2025',
    publishDate: '2025-12-14',
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
    id: 'optimizers-explained',
    slug: 'the-complete-guide-to-optimization-algorithms-in-deep-learning',
    title: 'The Complete Guide to Optimization Algorithms in Deep Learning',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Deep dive into optimization algorithms including Momentum, RMSProp, Adam, and their variants.',
    readTime: '12 min read',
    date: '7th Jan 2026',
    publishDate: '2026-01-07',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 7, 2026.'
      }
    ]
  },
  {
    id: 'cnn-fundamentals',
    slug: 'cnn-fundamentals',
    title: 'CNN Fundamentals',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Learn the fundamentals of Convolutional Neural Networks including convolution, pooling, and classic architectures.',
    readTime: '11 min read',
    date: '14th Jan 2026',
    publishDate: '2026-01-14',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 14, 2026.'
      }
    ]
  },
  {
    id: 'inside-cnn',
    slug: 'inside-a-cnn',
    title: 'Inside a CNN',
    category: 'Deep Learning',
    categoryColor: 'text-orange-600',
    description: 'Explore the inner workings of CNNs including backpropagation, transfer learning, and feature visualization.',
    readTime: '10 min read',
    date: '11th Jan 2026',
    publishDate: '2026-01-11',
    author: 'Ayushi Sahu',
    sections: [
      {
        id: 'introduction',
        title: 'Coming Soon',
        content: 'This article will be published on January 11, 2026.'
      }
    ]
  },
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

export interface ArticleExtras {
  tldr?: string[];
  nutshell?: string[];
  nextPostSlug?: string;
  nextPostTitle?: string;
  nextPostDescription?: string;
}

export const articleExtras: Record<string, ArticleExtras> = {
  'inside-the-mind-of-a-perceptron-watch-it-learn': {
    tldr: [
      'A Perceptron computes a weighted sum and applies a threshold.',
      'It learns a linear decision boundary using a simple update rule.',
      "It can't solve non-linear problems like XOR — and that's okay!",
    ],
    nutshell: [
      'Perceptron = weighted sum + threshold',
      'Learns using the Perceptron Learning Rule',
      'Can only model linear boundaries',
      'Forms the foundation of all neural networks',
    ],
    nextPostSlug: 'forward-propagation-explained-the-first-step-to-training-neural-networks',
    nextPostTitle: 'Forward Propagation Explained',
    nextPostDescription:
      "In the next post, we'll see how perceptrons are stacked into layers and how forward propagation works — the first step to training neural networks.",
  },
  'forward-propagation-explained-the-first-step-to-training-neural-networks': {
    tldr: [
      'Multiple perceptrons stacked together form a Multi-Layer Perceptron (MLP).',
      'Forward propagation passes data through the network layer by layer.',
      'Each layer applies weights, biases, and a nonlinear activation function.',
    ],
    nutshell: [
      'MLP = stacked perceptrons with nonlinear activations',
      'Each layer learns increasingly abstract features',
      'Output activation depends on task type',
      'Forward pass is the first half of training',
    ],
  },
  'google-adk-skills-explained': {
    tldr: [
      'Skills are self-contained units of functionality — instructions, tools, and context bundled together.',
      'SKILL.md defines what the skill does, when to use it, and the step-by-step execution flow.',
      'The references/ folder lets you show the model examples instead of just telling it what "good" looks like.',
      'Skills reduce token usage, improve consistency, and make agents easier to scale.',
    ],
    nutshell: [
      'One skill = one focused capability',
      'Loaded on demand, not always-on',
      'Fewer hallucinations, lower cost',
      'Add skills to scale — don\'t rewrite prompts',
    ],
    nextPostSlug: 'how-claude-code-was-leaked-and-how-to-prevent-it',
    nextPostTitle: 'How Claude Code Was Leaked',
    nextPostDescription:
      'A minor packaging mistake led to a major exposure. Here\'s how it happened and how to make sure it never happens to you.',
  },
  'how-claude-code-was-leaked-and-how-to-prevent-it': {
    tldr: [
      'A .map file was accidentally shipped in the npm package.',
      'The .map files embed your full original source code for debugging, making them dangerous in production.',
      'A single missing line in package.json (a files whitelist) made it possible.',
      'Following best practices for packaging and being careful with source maps in production can avoid such incidents.',
    ],
    nutshell: [
      'A minor packaging mistake led to a major exposure',
      'Source maps can silently ship your entire codebase',
      'Incidents like these are rarely sophisticated — just preventable',
      'Guardrails matter more than ever in AI-assisted workflows',
    ],
    nextPostSlug: 'google-adk-skills-explained',
    nextPostTitle: 'ADK Skills',
    nextPostDescription:
      'Now that you know what not to ship — here\'s how to build agents that actually know what they\'re doing.',
  },
};

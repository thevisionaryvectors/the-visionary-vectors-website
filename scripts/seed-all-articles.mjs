import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

// Load env
for (const file of ['.env.local', '.env']) {
  try {
    const env = readFileSync(file, 'utf-8');
    for (const line of env.split('\n')) {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
    break;
  } catch {}
}

const sql = neon(process.env.DATABASE_URL);

const articles = [
  // ── Newsletter: Issue 4 ────────────────────────────────────────────────────

  {
    id: 'claude-code-leak',
    slug: 'how-claude-code-was-leaked-and-how-to-prevent-it',
    title: "How Claude Code Was Leaked — And How Can You Prevent It?",
    category: 'Software Engineering',
    category_color: 'text-blue-600',
    description: "The Claude Code source map leak wasn't a hack — it was an avoidable mistake. Here's how it happened, why it matters, and a practical checklist to make sure you never ship what you shouldn't.",
    read_time: '7 min read',
    date: '5th Apr 2026',
    publish_date: '2026-04-05',
    author: 'Ayushi Sahu',
    featured_image: null,
    featured_image_caption: null,
    sections: [
      {
        id: 'introduction',
        title: 'Are We Getting Too Comfortable?',
        content: `**Are we engineers getting too comfortable with AI?**

Okay, so the Claude Code leak is no big news. But I still can't digest the fact that Anthropic engineers could let this slide.

Don't get me wrong — I have the utmost respect for the engineers who have made Claude what it is today. But was this leak because of our growing dependency on AI models to do the job?

Are we getting a little too comfortable… a little too confident that AI's got it?

This made me introspect on how I use Claude (or any other tool) in my day-to-day life. This whole website is a product of a collaboration with Claude. And as I say — Claude is cODE gOD.

But let this leak serve as a lesson. So, in lieu of what just happened, here's a breakdown of how to prevent something like this.`,
      },
      {
        id: 'why-the-leak-happened',
        title: 'Why Did the Leak Happen?',
        content: `Let's start from the basics.

When Claude ships its code, it creates an npm package. This package, when installed, lets you use your command-line interface to interact with Claude directly from your terminal for software engineering tasks.

When you install Claude Code, a package gets added to your system's PATH. It stores an executable file. So when you type \`claude\` in your terminal, your system searches through PATH, finds the executable, and runs it — and boom, Claude is live in your terminal.

**So how was the .map file exposed?**

When any package is published to npm, anyone in the world can inspect its contents. It's basically a public library — you can browse every file inside it.

And when Chaofan Shou inspected version 2.1.88 of \`@anthropic-ai/claude-code\`, he found the .map file… and the rest is history.`,
      },
      {
        id: 'what-is-a-map-file',
        title: 'What Exactly Is a .map File?',
        content: `A .map file is a debugging bridge between your compiled code and your original source code.

**The problem it solves**

When you build your code, it goes from human-readable TypeScript like this:

\`\`\`typescript
function greetUser(name: string): string {
  const message = \`Hello, \${name}!\`
  console.log(message)
  return message
}
\`\`\`

To minified production code like this:

\`\`\`
function g(n){const m=\`Hello, \${n}!\`;console.log(m);return m;}
\`\`\`

Now if this crashes in production, the error looks like:

\`\`\`
Error at main.js line 1 character 47
\`\`\`

…which is completely useless.

**What the .map file does**

It acts like a translation dictionary — mapping minified code positions back to your original source locations. So your error becomes:

\`\`\`
Error at greet.ts line 3 → console.log(message)
\`\`\`

Actually useful.

**What's inside it**

It's just a JSON file:

\`\`\`json
{
  "version": 3,
  "file": "main.js",
  "sources": ["../src/greet.ts"],
  "sourcesContent": [
    "function greetUser(name: string) ..."
  ],
  "mappings": "AAAA,SAASA..."
}
\`\`\`

The dangerous part is \`sourcesContent\` — it embeds your **entire original source code** inside the .map file.

So no — this wasn't some sophisticated breach. It was a very avoidable mistake.`,
      },
      {
        id: 'prevention-playbook',
        title: 'The Prevention Playbook',
        content: `Here's the playbook — a.k.a. things we all know but still skip:

* **Whitelist your files in package.json** → Don't say "exclude bad files" — say "ONLY include what's safe"
* **Keep a .npmignore as a fallback** → Because one line failing shouldn't take prod down with it
* **Disable source maps in production builds** → Debugging aid in dev, full source code leak in prod — pick your side
* **Separate dev and production configs** → What helps debugging shouldn't ship to users
* **Always do a dry run before publishing** → \`npm pack --dry-run\` takes seconds, incidents take days
* **Scan for secrets before every commit** → Because you will mess up at some point
* **Set up pre-commit hooks with Husky** → Automate discipline, don't rely on memory
* **Lock dependency versions** → Prevents surprise breakages and supply chain attacks
* **Always commit your lockfile** → Deterministic builds > "it worked on my machine"
* **Audit dependencies before installing** → Your code is only as safe as your weakest package

Anthropic's entire mistake came down to one missing line in \`package.json\`. A proper \`files\` whitelist would have made it physically impossible for the .map file to ever be published. Every fix above adds another layer — so even if one check fails, the others catch it.`,
      },
      {
        id: 'release-checklist',
        title: 'A Simple Checklist Before Your Release',
        content: `Before you hit \`npm publish\`, run through this:

\`\`\`
□ 1. npm run build          (use prod config, no sourcemaps)
□ 2. npm pack --dry-run     (inspect the file list)
□ 3. grep for *.map files   (should return nothing)
□ 4. npm audit              (no high/critical vulnerabilities)
□ 5. gitleaks detect        (no secrets in code)
□ 6. Check package.json     (files whitelist correct?)
□ 7. npm publish            (only after ALL above pass)
\`\`\`

Each step is a safety net. The goal isn't paranoia — it's layered defense. Miss one, another catches it.`,
      },
      {
        id: 'the-real-question',
        title: 'The Real Question',
        content: `We're building faster than ever with AI. Shipping faster. Debugging faster. Trusting faster.

But are we still checking as carefully as we used to?

Because AI didn't leak the code. We just… stopped looking. Comes down to human error.

The lesson here isn't to trust AI less — it's to never outsource judgment. Use the tools. Ship faster. But check. Always check.

And before you ask — no, I'm not going to write about what was in the code. There are plenty of people already doing that. They'll give you the lines, the files, the features… everything.

Maybe that's not the interesting part anyway.`,
      },
    ],
  },

  {
    id: 'adk-skills',
    slug: 'google-adk-skills-explained',
    title: "ADK Skills — Build Agents That Actually Know What They're Doing",
    category: 'Newsletter Issue 4',
    category_color: 'text-indigo-600',
    description: '',
    read_time: '6 min read',
    date: '5th Apr 2026',
    publish_date: '2026-04-05',
    author: 'Ayushi Sahu',
    featured_image: null,
    featured_image_caption: null,
    sections: [
      {
        id: 'what-are-skills',
        title: 'What Are ADK Skills?',
        content: `The Google ADK documentation describes skills as self-contained units of functionality used by an agent to perform specific tasks. The necessary instructions, resources, and tools are encapsulated within the skill, and its structure allows it to be loaded incrementally to minimize impact on the agent's context window.

Okay, that's exactly what the documentation says — I just rewrote it in passive voice while trying to understand it.

It sounds clear… until you actually try to use it. So instead of overthinking definitions, let's build.`,
      },
      {
        id: 'project-structure',
        title: 'Project Structure',
        content: `For this demo, I created a blog editor agent using Google ADK.

First — project structure. Stick to this, it'll save you pain later.

\`\`\`
editor_agent/
├── agent.py              # Root agent definition
└── skills/
    └── editor-skills/
        ├── SKILL.md      # Skill instructions and editing steps
        └── references/
            └── example.md   # Before/after examples for hooks, clarity, explanations, insights, formatting, and anti-patterns
\`\`\``,
      },
      {
        id: 'what-does-skill-md-do',
        title: 'What Does SKILL.md Actually Do?',
        content: `Your SKILL.md defines a skill as a clear, structured capability your agent can reliably execute.

At a high level, it includes:
* basic metadata (name, description, author, version)
* when the skill should (and shouldn't) be used
* the context the agent needs to carry
* what the skill is responsible for (and its boundaries)
* a step-by-step execution flow
* a defined output format for consistency

Optionally, you can add:
* modes
* references
* guardrails

The goal? Make each skill self-contained, predictable, and easy to invoke correctly.`,
      },
      {
        id: 'references-folder',
        title: 'What About the References Folder?',
        content: `You might've noticed \`example.md\` inside \`references/\`.

This is optional — but powerful.

Use it for:
* few-shot examples
* before/after edits
* what good looks like
* what to avoid

Instead of telling the model what "good writing" is… you show it.`,
      },
      {
        id: 'why-skills-help',
        title: 'Okay But… How Does This Actually Help?',
        content: `If you're not using skills, then you're basically:
* Dumping everything into one giant prompt — which leads to confusion and hallucinations
* Passing that entire prompt on every single invocation — increasing token usage (and you know what that means… more money spent each time)
* Hoping the model behaves — and well… don't cry on the internet when your agent fails in production.

Skills fix this.

Your agent loads only the instructions it needs, when it needs them.

So instead of one massive, always-on prompt — you get small, focused capabilities that are invoked on demand.`,
      },
      {
        id: 'benefits',
        title: "Still Contemplating? Here's Why You Should Use Skills",
        content: `1. **Lower cost** — You're not sending unnecessary instructions every time. No big cha-chings with every invocation.

2. **Better consistency** — The model isn't juggling unrelated instructions → fewer hallucinations.

3. **Cleaner system design** — Each behavior is isolated, testable, and reusable.

4. **Real scalability** — You don't rewrite prompts — you add or improve skills.`,
      },
      {
        id: 'skill-template',
        title: 'A Template to Get You Started',
        content: `If you made it this far — thank you 🤍

Here's a template to get you started with your first skill:

\`\`\`
---
name: skill-name
description: One sentence — what this skill does and when the agent should pick it.
license: Apache-2.0
metadata:
  author: Ayushi Sahu
  version: "1.0"
---

# Skill Title

## When to use this skill

Use this skill when:
- [trigger condition]
- [trigger condition]

Do NOT use this skill when:
- [exclusion]
- [exclusion]

---

## Context

[Any persistent context the agent needs to carry through execution — persona, constraints, domain knowledge, user preferences.]

---

## What this skill does

This skill [core purpose in one line].

It focuses on:
- [focus area]
- [focus area]

It does NOT:
- [boundary]
- [boundary]

---

## How to execute this skill

Follow this sequence:

### Step 1 — [Step name]
- [action]
- [action]

---

### Step 2 — [Step name]
- [action]
- [action]

---

### Step N — Final check
Before returning output, verify:
- [quality check]
- [quality check]

---

## Output format

Return:

1. [Primary output]

2. [Summary or explanation]

3. Optional: [only if relevant]

---

## Modes *(optional)*

### mode_name
- [what changes in this mode]

---

## When to check references/ *(optional)*

| When | Why |
|---|---|
| [situation] | [what the reference helps with] |

---

## Guardrails

- Do not [hard constraint]
- Do not [hard constraint]
- Prefer [positive rule]
\`\`\`

If this made sense, don't just read it — try it.

I've open-sourced the exact agent here: [adk-blog-editor](https://github.com/ayushisahu222/adk-blog-editor)`,
      },
    ],
  },

  // ── Deep Learning articles ─────────────────────────────────────────────────

  {
    id: 'perceptron-learning',
    slug: 'inside-the-mind-of-a-perceptron-watch-it-learn',
    title: 'Inside the Mind of a Perceptron: Watch It Learn!',
    category: 'Deep Learning',
    category_color: 'text-orange-600',
    description: 'If you are like me who just wanted to learn about LLMs without learning about the simplest unit of neural networks, the perceptron, then this article is for you!',
    read_time: '3 min read',
    date: '12th Nov 2025',
    publish_date: '2025-11-12',
    author: 'Ayushi Sahu',
    featured_image: '/perceptron_image.png',
    featured_image_caption: 'Image from https://towardsdatascience.com/perceptrons-the-first-neural-network-model-8b3ee4513757/',
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

• It is sensitive to the choice of learning rate and initial weights.`,
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        content: `Even the massive language models we use today are built upon layers of perceptron-like units — each learning simple patterns that, together, form complex intelligence. Understanding the perceptron gives us insight into the fundamental building blocks of modern neural network models.`,
      },
    ],
  },

  {
    id: 'anns-real-problems',
    slug: 'forward-propagation-explained-the-first-step-to-training-neural-networks',
    title: 'Forward Propagation Explained: The First Step to Training Neural Networks',
    category: 'Deep Learning',
    category_color: 'text-orange-600',
    description: 'In order to understand how to train an LLM, we first need to understand backpropagation. And before we get there, we need to understand the stage where everything begins: forward propagation.',
    read_time: '4 min read',
    date: '23rd Nov 2025',
    publish_date: '2025-11-23',
    author: 'Ayushi Sahu',
    featured_image: '/MLP_Intuition.jpg',
    featured_image_caption: 'From linear decision boundaries to nonlinear curves using multi-layer perceptrons',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `In order to understand how to train an LLM, we first need to understand backpropagation. And before we get there, we need to understand the stage where everything begins: forward propagation.

Let's break down the basics. If you haven't already studied what a perceptron is, read this first: [Inside the Mind of a Perceptron: Watch It Learn!](https://the-visionary-vectors-website.vercel.app/article/inside-the-mind-of-a-perceptron-watch-it-learn)

A perceptron can only solve linear problems. It draws a straight line between classes. But real data rarely behaves that nicely. So what happens when we want to fit a nonlinear curve through the data?

We bring in backup.`,
      },
      {
        id: 'nonlinear-solutions',
        title: 'From Linear to Nonlinear',
        content: `We use multiple perceptrons, each contributing its own linear boundary. Then we apply a nonlinear activation function that bends and blends these straight lines into a smooth curve that can fit the underlying shape of the data.

Each perceptron gives you one line or called decision boundary. Combine enough of them and apply nonlinear activations, and you get a curved decision boundary.

In simpler words:
* Chaining multiple perceptrons together is called a Multi-Layer Perceptron (MLP).
* The way data flows from the input layer through the hidden layers to the output layer is called forward propagation.

This is the first half of learning.`,
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
        mediaCaption: 'Neural Network Architecture with Notation',
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
These design choices affect how much the model can learn during forward propagation and how much error backpropagation will try to correct.`,
      },
      {
        id: 'try-it-yourself',
        title: 'Try It Yourself',
        content: `To see all of this in action, check out [this notebook](https://github.com/ayushisahu222/visionary-vectors-notebooks/blob/main/Credit-Card-Customer-Churn-Prediction.ipynb) where a simple neural network is trained on Credit Card Churn data. The "Try It Yourself" section lets you experiment with different parameters and watch how changes in layers, nodes, or activations impact the model's accuracy.`,
      },
    ],
  },
];

let inserted = 0;
let skipped = 0;

for (const article of articles) {
  const sectionsJson = JSON.stringify(article.sections);
  const result = await sql`
    INSERT INTO public.internal_blogs (
      id, slug, title, category, category_color, description,
      read_time, date, publish_date, author,
      featured_image, featured_image_caption, sections
    ) VALUES (
      ${article.id},
      ${article.slug},
      ${article.title},
      ${article.category},
      ${article.category_color},
      ${article.description},
      ${article.read_time},
      ${article.date},
      ${article.publish_date},
      ${article.author},
      ${article.featured_image},
      ${article.featured_image_caption},
      ${sectionsJson}::jsonb
    )
    ON CONFLICT (id) DO NOTHING
  `;

  const count = result.count ?? result.length ?? 0;
  if (count > 0) {
    console.log(`✓ Inserted: ${article.title}`);
    inserted++;
  } else {
    console.log(`— Already exists: ${article.title}`);
    skipped++;
  }
}

console.log(`\nDone. ${inserted} inserted, ${skipped} already in database.`);

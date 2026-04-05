import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

// Load .env.local manually
const env = readFileSync('.env.local', 'utf-8');
for (const line of env.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
}

const sql = neon(process.env.DATABASE_URL);

const sections = [
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
    title: 'Still Contemplating? Here\'s Why You Should Use Skills',
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
];

const sectionsJson = JSON.stringify(sections);

const result = await sql`
  INSERT INTO public.internal_blogs (
    id,
    slug,
    title,
    category,
    category_color,
    description,
    read_time,
    date,
    publish_date,
    author,
    featured_image,
    featured_image_caption,
    sections
  ) VALUES (
    'adk-skills',
    'google-adk-skills-explained',
    'ADK Skills — Build Agents That Actually Know What They''re Doing',
    'Newsletter Issue 4',
    'text-indigo-600',
    '',
    '6 min read',
    '5th Apr 2026',
    '2026-04-05',
    'Ayushi Sahu',
    NULL,
    NULL,
    ${sectionsJson}::jsonb
  )
`;

console.log('Article inserted successfully:', result);

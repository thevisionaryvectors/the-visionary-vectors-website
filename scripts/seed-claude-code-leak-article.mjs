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
    'claude-code-leak',
    'how-claude-code-was-leaked-and-how-to-prevent-it',
    'How Claude Code Was Leaked — And How Can You Prevent It?',
    'Software Engineering',
    'text-blue-600',
    'The Claude Code source map leak wasn''t a hack — it was an avoidable mistake. Here''s how it happened, why it matters, and a practical checklist to make sure you never ship what you shouldn''t.',
    '7 min read',
    '5th Apr 2026',
    '2026-04-05',
    'Ayushi Sahu',
    NULL,
    NULL,
    ${sectionsJson}::jsonb
  )
`;

console.log('Article inserted successfully:', result);

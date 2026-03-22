-- Productivity Tools for Issue #3
-- Run this against your Neon database.

INSERT INTO tools (newsletter_id, name, description, badge, try_link, read_link)
SELECT id,
  'LangChain''s New Framework for Production Coding Agents',
  'Open SWE formalizes the "Coding Agent" patterns used by companies like Stripe and Coinbase into an open-source framework built on LangGraph and Deep Agents.• Plug-and-Play Sandboxing: It supports isolated cloud execution environments (Modal, Daytona, Runloop) out of the box, allowing agents to run shell commands and tests safely without manual intervention.• Deterministic Orchestration: By combining LLM-driven subagents with deterministic middleware, you can ensure critical steps—like opening a PR or injecting mid-run Slack messages—happen reliably every time.• Context Engineering via AGENTS.md: You can now encode team-specific conventions and architectural rules into an AGENTS.md file at the repo root, which the agent automatically injects into its system prompt.• Native Integration: Meets developers where they are by supporting Slack-first invocation, Linear issue comments, and GitHub PR reviews as primary interfaces.',
  'LangChain',
  NULL,
  'https://blog.langchain.com/open-swe-an-open-source-framework-for-internal-coding-agents/'
FROM newsletters WHERE title = 'Prompt Notes - Issue #3';

-- Interesting Reads for Issue #3
-- Run this against your Neon database.

INSERT INTO interesting_links (newsletter_id, title, description, why, link, badge, badge_class, sort_order)
SELECT id,
  'OpenAI is planning a desktop ''superapp''',
  '• The Browser as an Agent: Project Atlas isn''t just a Chrome competitor; it''s a browser built specifically for autonomous agents to navigate, click, and interact with the web directly, bypassing the need for separate "browser-use" libraries.• Deep OS Integration: By moving into the browser space, OpenAI is gaining direct access to the "runtime" of the internet. This allows for low-latency tool use where the agent doesn''t just read a page, but maintains a persistent state across multiple tabs and apps.• The "Superapp" Ecosystem: This suggests a future where AI engineers won''t just build "GPTs," but will develop web-native skills that run inside the Atlas environment, similar to how developers build for the Chrome Web Store today.• Identity & Auth: Atlas aims to solve the "login" problem for agents, providing a secure way for AI to handle authentication on behalf of the user, a major hurdle in current RAG and agent workflows.',
  NULL,
  'https://www.theverge.com/ai-artificial-intelligence/897778/openai-chatgpt-codex-atlas-browser-superapp',
  'The Verge',
  'green',
  1
FROM newsletters WHERE title = 'Prompt Notes - Issue #3';

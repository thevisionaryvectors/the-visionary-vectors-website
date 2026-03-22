-- Agent Framework Updates for Issue #3
-- Run this against your Neon database.
-- This inserts into the existing Issue #3 newsletter row.

INSERT INTO agent_framework_updates (newsletter_id, title, description, link, sort_order)
SELECT id, 'LangGraph v1.1.3',
  '• Runtime Transparency: A new feature adds detailed execution info to the runtime, giving you deeper visibility into how nodes are processing in real-time.• Stable Persistence: Includes a major update to checkpoint-postgres (v3.0.5), strengthening state management for long-running, multi-turn agent sessions.',
  'https://github.com/langchain-ai/langgraph/releases',
  1
FROM newsletters WHERE title = 'Prompt Notes - Issue #3'

UNION ALL

SELECT id, 'OpenAI Agents v0.12.5',
  '• Asynchronous Tooling: Native support for non-blocking tool calls enables agents to handle multiple I/O tasks simultaneously without stalling.• Reliable Serialization: Optimized message handling ensures complex conversation histories are passed to the API with lower overhead and fewer errors.• Infrastructure Parity: Updated internal dependencies align the framework with the latest OpenAI API features for better production stability.',
  'https://github.com/openai/openai-agents-python/releases/tag/v0.12.5',
  2
FROM newsletters WHERE title = 'Prompt Notes - Issue #3';

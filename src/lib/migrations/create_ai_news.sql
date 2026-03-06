-- Create ai_news table
CREATE TABLE IF NOT EXISTS ai_news (
  id          SERIAL PRIMARY KEY,
  newsletter_id INTEGER NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  badge       TEXT,
  badge_class TEXT        NOT NULL DEFAULT 'blue',
  link        TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0
);

-- Seed: replace 1 with your actual latest newsletter id
INSERT INTO ai_news (newsletter_id, title, description, badge, badge_class, link, sort_order) VALUES
  (1, 'Anthropic releases Claude 3.7 Sonnet with extended thinking',
   'Claude 3.7 Sonnet is Anthropic''s most intelligent model yet, featuring hybrid reasoning that lets it decide how long to think before responding.',
   'Anthropic', 'purple', 'https://www.anthropic.com/news/claude-3-7-sonnet', 1),

  (1, 'OpenAI launches GPT-4.5 with improved emotional intelligence',
   'GPT-4.5 is OpenAI''s largest and most capable model yet. It features improved world knowledge, better instruction following, and higher EQ.',
   'OpenAI', 'green', 'https://openai.com/blog/gpt-4-5', 2),

  (1, 'Google DeepMind''s Gemini 2.0 goes generally available',
   'Gemini 2.0 Flash and Pro are now available in the Gemini API. The models feature native multimodal output including image and audio generation.',
   'Google', 'blue', 'https://deepmind.google/technologies/gemini/', 3),

  (1, 'Meta releases Llama 3.3 with 70B parameters',
   'Meta''s Llama 3.3 70B achieves performance comparable to Llama 3.1 405B on key benchmarks while being far more cost-efficient to run.',
   'Meta', 'orange', 'https://ai.meta.com/blog/llama-3/', 4),

  (1, 'Mistral AI launches Le Chat with image generation',
   'Mistral''s Le Chat assistant now supports image generation powered by Black Forest Labs'' FLUX model, taking on ChatGPT and Claude directly.',
   'Mistral', 'cyan', 'https://mistral.ai/news/', 5),

  (1, 'xAI''s Grok 3 tops coding and math benchmarks',
   'Elon Musk''s xAI releases Grok 3, claiming state-of-the-art results on AIME math and competitive programming benchmarks.',
   'xAI', 'red', 'https://x.ai/blog', 6);

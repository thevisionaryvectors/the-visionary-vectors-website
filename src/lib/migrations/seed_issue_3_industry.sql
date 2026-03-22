-- Industry & Applications for Issue #3
-- Run this against your Neon database.

INSERT INTO model_releases (newsletter_id, title, description, badge, badge_class, link, sort_order)
SELECT id,
  'High-Power AI Made Easy: NVIDIA Nemotron 3 Super Arrives on Amazon Bedrock',
  '• Serverless Power: You can now use Nemotron 3 Super as a fully managed service on AWS. This means you get top-tier AI performance without the headache of setting up infrastructure.• Top Performance for Agents: This model is specially built for AI agents. It is up to 5x faster than older versions and excels at complex tasks like coding, planning, and multi-step reasoning.• Huge Memory for Context: With a 256K token window, the model can "remember" and process massive amounts of data—equivalent to several thick books—in a single conversation.',
  'AWS',
  'orange',
  'https://aws.amazon.com/blogs/machine-learning/run-nvidia-nemotron-3-super-on-amazon-bedrock/',
  1
FROM newsletters WHERE title = 'Prompt Notes - Issue #3';

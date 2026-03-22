-- Research & Techniques for Issue #3
-- Run this against your Neon database.

INSERT INTO research_papers (newsletter_id, name, description, link, sort_order)
SELECT id,
  'New Tools for Surgery Robots: NVIDIA and Hugging Face Release Open-H',
  '• The First Shared Dataset: Open-H-Embodiment offers 778 hours of data from real robots. It tracks how they move, what they see, and the force they use.• A "Brain" for Surgery: The GR00T-H model is the first AI that turns pictures and words into actual surgical actions. It is designed to work across many different types of robot arms.• Better Training in Simulation: The new Cosmos-H Simulator creates realistic videos of surgery (like blood and tissue) just from robot commands.• Massive Speed Gains: You can now test 600 robot runs in 40 minutes using the simulator. This used to take two full days of physical testing.',
  'https://huggingface.co/blog/nvidia/physical-ai-for-healthcare-robotics',
  1
FROM newsletters WHERE title = 'Prompt Notes - Issue #3';

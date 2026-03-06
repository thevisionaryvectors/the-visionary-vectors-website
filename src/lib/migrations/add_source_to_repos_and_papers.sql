-- Add source attribution column to github_repos and projects tables
ALTER TABLE github_repos ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE projects     ADD COLUMN IF NOT EXISTS source TEXT;

-- Update existing rows with known sources (adjust as needed)
UPDATE github_repos SET source = 'Hugging Face' WHERE source IS NULL;
UPDATE projects     SET source = 'Microsoft'    WHERE source IS NULL;

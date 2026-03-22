-- Add sort_order to big_story for controlling display order
ALTER TABLE big_story ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

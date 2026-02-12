-- Migration: Add is_active column to rituals table for soft delete
-- Run with: sqlite3 ~/.chaotic/data/chaotic.db < scripts/add_ritual_is_active.sql

-- Add is_active column (default to True for existing rituals)
ALTER TABLE rituals ADD COLUMN is_active BOOLEAN DEFAULT 1;

-- Explicitly set existing rituals to active (in case DEFAULT didn't apply)
UPDATE rituals SET is_active = 1 WHERE is_active IS NULL;

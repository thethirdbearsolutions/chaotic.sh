-- Migration: Add sprint budget fields and project unestimated_handling
-- CHT-63: Sprint budget data model
-- Run with: sqlite3 backend/chaotic.db < backend/scripts/add_sprint_budget_fields.sql

-- Add budget fields to sprints table
ALTER TABLE sprints ADD COLUMN budget INTEGER;
ALTER TABLE sprints ADD COLUMN points_spent INTEGER DEFAULT 0;
ALTER TABLE sprints ADD COLUMN limbo BOOLEAN DEFAULT 0;

-- Add unestimated_handling to projects table
-- Values: 'DEFAULT_ONE_POINT' or 'BLOCK_UNTIL_ESTIMATED' (SQLAlchemy uses enum names)
ALTER TABLE projects ADD COLUMN unestimated_handling VARCHAR(30) DEFAULT 'DEFAULT_ONE_POINT';

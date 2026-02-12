-- Migration: Add rituals and ritual_attestations tables
-- CHT-73: Sprint Limbo and Rituals
-- Run with: sqlite3 backend/chaotic.db < backend/scripts/add_rituals.sql

-- Rituals table - defines rituals per project
CREATE TABLE IF NOT EXISTS rituals (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    prompt TEXT NOT NULL,
    trigger VARCHAR(20) DEFAULT 'every_sprint',
    approval_mode VARCHAR(20) DEFAULT 'auto',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Ritual attestations table - tracks attestations per sprint
CREATE TABLE IF NOT EXISTS ritual_attestations (
    id VARCHAR(36) PRIMARY KEY,
    ritual_id VARCHAR(36) NOT NULL REFERENCES rituals(id) ON DELETE CASCADE,
    sprint_id VARCHAR(36) NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
    attested_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    attested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    approved_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    approved_at DATETIME,
    UNIQUE(ritual_id, sprint_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rituals_project ON rituals(project_id);
CREATE INDEX IF NOT EXISTS idx_attestations_sprint ON ritual_attestations(sprint_id);
CREATE INDEX IF NOT EXISTS idx_attestations_ritual ON ritual_attestations(ritual_id);

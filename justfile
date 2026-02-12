# Chaotic - Issue Tracking for Agents

# Default recipe: show available commands
default:
    @just --list

# Sync all dependencies (including dev)
sync:
    cd backend && uv sync --extra dev
    cd cli && uv sync

# Sync backend dependencies
sync-backend:
    cd backend && uv sync --extra dev

# Sync CLI dependencies
sync-cli:
    cd cli && uv sync

# Run the backend server (with hot reload)
serve:
    cd backend && uv run uvicorn app.main:app --reload --port 24267

# Run the backend server (production mode, supports PORT and DATABASE_URL env vars)
serve-prod:
    cd backend && uv run uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-24267}

# Run backend tests
test:
    cd backend && uv sync --extra dev
    cd backend && uv run pytest

# Run backend tests with coverage
test-cov:
    cd backend && uv run pytest --cov=app --cov-report=html

# Install/reinstall CLI globally (editable)
install-cli:
    uv tool install --editable cli --reinstall

# Run database migrations (supports DATABASE_PATH env var for external db)
migrate:
    cd backend && sqlite3 ${DATABASE_PATH:-chaotic.db} < scripts/add_rituals.sql

# Open the web UI in browser
open:
    open http://localhost:24267

# Show CLI status
status:
    chaotic status

# Initialize CLI in current directory
init:
    chaotic init

# Clean up Python cache files
clean:
    find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
    find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete 2>/dev/null || true

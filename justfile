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
    cd backend && uv run uvicorn app.main:app --host ${HOST:-127.0.0.1} --port ${PORT:-24267}

# Run all test suites (backend, frontend, CLI)
test-all: test-backend test-frontend test-cli

# Run backend tests
test-backend:
    cd backend && uv run pytest

# Run backend tests (alias)
test: test-backend

# Run all test suites with coverage
cov-all: cov-backend cov-frontend cov-cli

# Run backend tests with coverage
cov-backend:
    cd backend && uv run pytest --cov=app --cov-report=term-missing

# Run frontend tests with coverage
cov-frontend:
    cd frontend && npm run test:coverage

# Run CLI tests with coverage
cov-cli:
    cd cli && uv run pytest --cov=cli --cov-report=term-missing

# Run backend tests with coverage (alias)
test-cov: cov-backend

# Install/reinstall CLI globally (editable)
install-cli:
    uv tool install --editable cli --reinstall

# Run database migrations (supports DATABASE_PATH env var for external db)
migrate:
    cd backend && sqlite3 ${DATABASE_PATH:-chaotic.db} < scripts/add_rituals.sql

# Install frontend dependencies
fe-install:
    cd frontend && npm install

# Build frontend bundle
fe-build:
    cd frontend && npm run build

# Run frontend tests
test-frontend:
    cd frontend && npm test

# Run frontend tests (alias)
fe-test: test-frontend

# Run frontend dev server (with hot reload)
fe-dev:
    cd frontend && npm run dev

# Open the web UI in browser
open:
    open http://localhost:24267

# Show CLI status
status:
    chaotic status

# Initialize CLI in current directory
init:
    chaotic init

# Build CLI package
cli-build:
    rm -rf cli/dist/
    cd cli && uv build

# Publish CLI to PyPI (requires PYPI_TOKEN env var)
cli-publish: cli-build
    cd cli && uv publish --token ${PYPI_TOKEN}

# Run CLI tests
test-cli:
    cd cli && uv run pytest

# Run CLI tests (alias)
cli-test: test-cli

# Clean up Python cache files
clean:
    find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
    find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete 2>/dev/null || true
    rm -rf cli/dist/

# Claude Code Guidelines for Chaotic

## Cardinal Rules

### 1. Git Discipline
- **Commit and push early and often** - after each ticket or logical unit of work
- **Use feature branches** for non-trivial work (branch from main, PR back)
- Don't accumulate large uncommitted changes - this is ALARMING
- Reference ticket IDs in commit messages (e.g., "Add search command (CHT-11)")

### 2. Dogfood the CLI
- **Use `chaotic` CLI heavily** - it's our own tool, use it constantly
- Create tickets with `chaotic issue create`
- Update tickets with `chaotic issue update` and `chaotic issue comment`
- Check status with `chaotic status`, `chaotic issue list`, etc.
- If a CLI command doesn't exist or doesn't work as expected, that's a ticket

### 3. Rigorous Ticket Hygiene
**Always create a ticket before doing any work, no matter how trivial.**
- Bug fixes need tickets (even one-line fixes)
- Refactoring needs tickets
- Documentation changes need tickets
- If you discover something that needs fixing while working on another ticket, create a new ticket for it first

**File tickets proactively:**
- When you think of something that should be done → file a ticket
- When you notice a missing feature → file a ticket
- When you hallucinate a nonexistent CLI command/flag → file a ticket for it
- When a CLI command errors unexpectedly → file a ticket

**Completing tickets:**
- NEVER mark a ticket as done without an accompanying comment
- Comments MUST include: explanation of what was done + commit hash
- Example: `chaotic issue comment CHT-XX "Implemented feature. Commit: abc123"`
- Then: `chaotic issue update CHT-XX --status done`

### 4. Keep Tickets Current
- Update ticket status as you work (backlog → in_progress → done)
- Add comments for significant progress or blockers
- Don't let tickets get stale - if something changed, update the ticket

### 5. Code Review on Every PR
- **EVERY PR must have a subagent code review before merge**
- Spawn an oppositional review agent to look for issues
- The review should check: security, edge cases, error handling, test coverage
- **Post the full review as a PR comment FIRST**, before responding with fixes
- Address or ticket every issue found - fix, ticket, or pushback with explanation
- Don't merge until review is complete and all issues addressed

## Priorities

Use these priority levels:
- `urgent` - Drop everything, fix now
- `high` - Important, do soon
- `medium` - Normal priority
- `low` - Backburner, do when time permits

## Project Structure

- `backend/` - FastAPI backend (Python)
- `frontend/` - Static HTML/CSS/JS frontend served by FastAPI
- `cli/` - Click-based CLI client (Python)

## Running the App

Backend server:
```bash
cd backend && source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 24267
```

CLI:
```bash
cd cli && source .venv/bin/activate
chaotic --help
```

## Frontend Development

The frontend uses Vite for bundling. Source files are in `frontend/src/` and the build outputs to `frontend/static/js/app.bundle.js`.

### Development Workflow

1. **Edit source files** in `frontend/src/`
2. **Build the bundle**:
   ```bash
   cd frontend && npm run build
   ```
3. **Test** by running the backend and opening http://localhost:24267

### Running Tests

```bash
cd frontend && npm test
```

### File Structure

- `frontend/src/*.js` - Source modules (single source of truth)
- `frontend/src/*.test.js` - Vitest tests
- `frontend/static/js/app.bundle.js` - Built IIFE bundle (served by backend)
- `frontend/templates/index.html` - HTML template (served by backend)
- `frontend/index.html` - Vite dev entry (for `npm run dev`)

### Important Notes

- **Always edit `src/` files** - the bundle is generated from these
- **Run `npm run build`** after changes before testing with the backend
- **Never manually edit** `static/js/app.bundle.js` - it's auto-generated

## Database

Using SQLite with Oxyde ORM and Oxyde migrations.

### Schema Changes Workflow

1. **Modify the Oxyde model** in `backend/app/oxyde_models/`
2. **Generate migration**:
   ```bash
   cd backend && source .venv/bin/activate
   oxyde makemigrations --name "description_of_change"
   ```
3. **Review the generated migration** in `backend/migrations/`
4. **Apply migration**:
   ```bash
   oxyde migrate
   ```

### For New Installations

New databases are automatically created on first startup via `apply_migrations()` in the app lifespan.

### Important Notes

- **Always backup before migrations**: `cp chaotic.db chaotic.backup.db`
- Review generated migrations with `oxyde sqlmigrate <name>` before applying
- Check migration status with `oxyde showmigrations`

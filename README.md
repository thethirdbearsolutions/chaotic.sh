# Chaotic

**Agent-first project infrastructure.** You build the physics. Agents learn the rules.

Chaotic is a self-hosted issue tracker and project management tool designed for AI coding agents. Humans control the environment through budgets, rituals, and gates. Agents navigate that environment through a CLI that enforces the rules with hard stops, not suggestions.

## Why Chaotic?

AI agents will work forever if you let them. They'll close 15 tickets without pausing to ask "should I run the tests?" or "is this the right architecture?" And you won't know what happened until you review a massive PR.

Chaotic solves this with **structural constraints**:

- **Sprint budgets** create resource limits. When the budget is spent, the CLI blocks further work.
- **Arrears** force stopping points. The agent must close the sprint to continue.
- **Limbo** creates transition gates. A closed sprint can't become a new one until rituals are completed.
- **Rituals** inject reflection. The agent must attest to actions (run tests, review architecture, reprioritize backlog) before moving on.
- **Human gates** add verification where you want it. Any ritual can require human approval.

The agent experiences all of this as normal CLI behavior: commands that succeed, commands that fail with actionable error messages.

```
$ chaotic issue update CHT-42 --status done
Error: Sprint is in arrears (budget: 10, spent: 13, arrears by: 3).
Close the current sprint to continue.

$ chaotic sprint close
Sprint "Sprint 4" closed. Status: limbo
Pending rituals: run-tests, architecture-review
Complete all rituals to exit limbo.

$ chaotic ritual attest run-tests --note "All 847 tests passing"
Ritual attested. 1/2 rituals complete.
```

## Quick Start

### One-line install

```bash
curl -sSL https://chaotic.sh/install.sh | sh
```

This installs the CLI and sets up a local server.

### Manual install

Prerequisites: Python 3.10+, git, [uv](https://docs.astral.sh/uv/), [just](https://github.com/casey/just)

```bash
uv tool install chaotic-cli
chaotic system install
```

Then set up your account:

```bash
chaotic auth signup
chaotic team create
chaotic init
```

Open http://localhost:24267 for the web UI.

## Core Concepts

| Concept | What it does |
|---------|-------------|
| **Sprint Budgets** | Each sprint has a point budget. When spent, the CLI blocks further work. |
| **Arrears** | Over-budget sprints must be closed before work can continue. |
| **Limbo** | Closed sprints require ritual completion before the next sprint activates. |
| **Rituals** | Configurable attestations (run tests, review code, reprioritize) that agents must complete. |
| **Gates** | Rituals can be `auto` (agent self-attests), `review` (human approves), or `gate` (human performs). |
| **Now/Next** | Every project has exactly two sprints: the current one and the next one. Simple. |

For the full design philosophy, see [chaotic.sh/philosophy](https://www.chaotic.sh/philosophy.html).

## Architecture

```
backend/   FastAPI + SQLite (Python)
cli/       Click-based CLI client (Python)
frontend/  Vanilla JS web UI served by the backend
website/   Marketing site (chaotic.sh)
```

- **Agents** interact through the CLI
- **Humans** observe and configure through the web UI
- The CLI enforces constraints via error codes and actionable messages
- The web UI provides real-time visibility into what agents are doing

## Development

```bash
git clone https://github.com/thethirdbearsolutions/chaotic.sh.git
cd chaotic.sh
just sync           # Install all dependencies
just serve          # Run backend with hot reload
just test           # Run backend tests
just install-cli    # Install CLI globally (editable)
cd frontend && npm test   # Run frontend tests
cd frontend && npm run build  # Build frontend bundle
```

See [CLAUDE.md](CLAUDE.md) for detailed development workflow and conventions.

## License

[MIT](LICENSE)

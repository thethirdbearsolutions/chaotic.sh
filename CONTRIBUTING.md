# Contributing to Chaotic

Thanks for helping. Bug reports, small fixes and docs corrections are all
welcome. For anything larger, open an issue first so we can agree on the
shape before you write the code.

## Setup

You need Python 3.11 (what CI runs), [uv](https://docs.astral.sh/uv/),
Node 20 for the frontend, and optionally [just](https://github.com/casey/just).

```bash
just sync            # or, per project:
cd backend && uv sync --locked --extra dev
cd cli && uv sync --locked --extra dev
cd e2e && uv sync --locked
cd frontend && npm ci
```

The `uv.lock` files are committed and CI installs with `--locked`. Don't
re-lock unless you change a `pyproject.toml`; if you do, run `just lock`
and commit the updated locks with your change.

To run the app: `just fe-build`, then `just serve` (the backend serves the
web UI at http://localhost:24267). The CLI is `cd cli && uv run chaotic --help`.

## Tests

Run the suites your change touches before you push. CI runs all of them.

| Suite | Command | Notes |
|---|---|---|
| Backend | `cd backend && uv run pytest -q` | About 30s, parallel. `-n 0` runs serially for debugging. 90% coverage gate. |
| CLI | `cd cli && uv run pytest -q` | About 15s. |
| End-to-end | `cd e2e && uv run pytest -q` | The real CLI against a real server. Run it if you change an API route or a CLI command. |
| Frontend | `cd frontend && npm test` | Also `npm run lint`. |
| Lint | `just lint` | Ruff's pyflakes rules in backend, cli and e2e. |

Optional fast local hooks: `pip install pre-commit && pre-commit install`.

Please don't skip, disable or loosen an existing test to get a change
through. If you think a test is wrong, say why in the PR.

## Things worth knowing

- **Frontend:** edit `frontend/src/`. `npm run build` produces
  `frontend/static/js/app.bundle.js`, which is generated and not committed.
- **Database:** schema changes go through an Oxyde migration in
  `backend/migrations/`. Read the "Database" section of
  [CLAUDE.md](CLAUDE.md) first; it lists the rules the migration tests
  enforce.
- **House rules** for enums and API responses (compare enum members, return
  response schemas) are in [CLAUDE.md](CLAUDE.md) too, along with the sprint
  and budget model, which is deliberate rather than a bug.
- **Design records** live in [docs/adr/](docs/adr/) and [docs/design/](docs/design/).

## Issues and pull requests

- File bugs and feature requests as
  [GitHub issues](https://github.com/thethirdbearsolutions/chaotic.sh/issues).
  The maintainers track work in Chaotic itself (project key `CHT`) and will
  link an issue to its `CHT-NNN` ticket when there is one.
- Branch from `main` and open the PR against `main`. Keep a PR to one change.
- Put the ticket or issue in the title when there is one, e.g.
  `Fix relations crash on an empty project (CHT-1431)` or `... (#184)`.
- Describe the PR as **Before** (what was wrong or missing), **After** (what
  is true now) and **How** (the approach, and how you tested it). The PR
  template has the outline.
- Every PR is reviewed before merge, and CI must be green.

By contributing you agree that your contributions are licensed under the
[MIT License](LICENSE).

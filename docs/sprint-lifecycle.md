# Sprint lifecycle

This doc answers "how do sprints actually work" from the code, not from
what a plausible-sounding API might look like. It exists because
CHT-109 deleted a test written against `start_sprint`/`complete_sprint`
methods that `SprintService` has never had — the deleted test assumed a
manual start/complete API the implementation never implemented. See
CHT-121.

For the invariants (one active sprint, accrual rules, arrears,
limbo) see the "Sprint & Budget Model" section of the repo-root
[CLAUDE.md](../CLAUDE.md#sprint--budget-model-read-this-before-calling-any-of-it-a-bug).
This doc is the narrative walkthrough of the same system, with the
actual code paths cited.

## States: `planned` / `active` / `completed`

The enum is `SprintStatus` (`backend/app/enums.py`):

```python
class SprintStatus(str, Enum):
    PLANNED = "planned"
    ACTIVE = "active"
    COMPLETED = "completed"
```

There is no `in_progress`, `closed`, or `canceled` sprint status —
just those three. A sprint also carries a separate `limbo: bool` flag
(`OxydeSprint.limbo`) that's orthogonal to `status`: a sprint in limbo
is still `ACTIVE`, just blocked (see below).

## Sprints are auto-created, not manually started

There is no `create_sprint` step a human or agent has to run, and no
`start_sprint` method anywhere in `SprintService`. Sprints come into
existence via `SprintService.ensure_sprints_exist(project_id)`
(`backend/app/services/sprint_service.py`), which:

1. Looks for a sprint with `status == ACTIVE`. If none exists, creates
   one directly as `ACTIVE` (not `PLANNED` then promoted — it's created
   active).
2. Looks for a sprint with `status == PLANNED`. If none exists, creates
   one as `PLANNED`.
3. Returns `(current, next_sprint)`.

`ensure_sprints_exist` is called from the `GET /projects/{id}/sprints/current`
route (`backend/app/api/sprints.py`) and from the no-op `POST .../sprints`
create route, so simply asking "what's the current sprint?" (which
`chaotic sprint create`, `chaotic sprint current`, and `chaotic sprint
status` all do under the hood) is enough to lazily provision both
sprints for a brand-new project. There's no separate provisioning step
and no button/command that means "start the sprint" — a project always
has exactly one `ACTIVE` and one `PLANNED` sprint once anything has
touched it.

This is why `chaotic sprint create`'s docstring says "Sprints are
managed automatically" and just returns the current sprint instead of
creating a new, distinct one.

## Advancing: `close`, not `complete`

The only way a sprint moves forward is `SprintService.close_sprint(sprint)`,
exposed as `POST /sprints/{id}/close` and `chaotic sprint close`. There
is no `complete_sprint` method — "close" is the one and only verb for
retiring the active sprint. Calling it on a non-`ACTIVE` sprint raises
`ValueError("Can only close an active sprint")`; calling it again while
already in limbo raises `ValueError("Sprint is already in limbo...")`.

`close_sprint` always does two things regardless of outcome:

1. Gets (or creates) the `PLANNED` sprint to receive spillover.
2. Moves every incomplete issue (`backlog`/`todo`/`in_progress`/`in_review`)
   from the closing sprint to that `PLANNED` sprint.

Then it branches on whether the project has pending `EVERY_SPRINT`
rituals for this sprint (`RitualService.get_pending_rituals`):

- **No pending rituals** → full rotation: the closing sprint's status
  becomes `COMPLETED`, `limbo` stays `False`, and
  `_activate_next_sprint()` flips the `PLANNED` sprint to `ACTIVE` and
  creates a fresh `PLANNED` sprint behind it (inheriting the previous
  `PLANNED` sprint's budget, or the project default if none was set).
- **Pending rituals exist** → the closing sprint **stays `ACTIVE`** but
  `limbo` flips to `True`. Work is blocked (see CLAUDE.md's arrears
  section) until rituals clear. The issue-spillover to `PLANNED`
  already happened either way.

Limbo resolves via `SprintService.complete_limbo(sprint)`, called after
all pending rituals are attested. It's the actual transition to
`COMPLETED` + next-sprint activation for the limbo path — an atomic
`UPDATE ... WHERE limbo = 1` guards against two racing callers both
trying to activate the next sprint (CHT-1278).

So: **`close_sprint` is the only advance mechanism**, and it either
completes-and-rotates immediately, or parks the sprint in limbo until
`complete_limbo` (triggered by ritual completion) finishes the job.
"Complete" is what happens to a sprint's `status`, but it's a side
effect of closing, not something you call directly.

## Answering the ticket's questions directly

- **How do sprints actually work?** They're a two-slot rolling window
  per project — one `ACTIVE`, one `PLANNED` — maintained by
  `ensure_sprints_exist` and rotated by `close_sprint`. There's no
  richer sprint-planning workflow (backlog of many future sprints,
  sprint goals, etc.) in the data model today.
- **Auto-started or manually started?** Auto-started. The first
  `ACTIVE` sprint for a project is created lazily, as `ACTIVE`, the
  first time anything asks for the current sprint. There's no manual
  "start" action to take.
- **Intended lifecycle: planned → active → completed?** Yes, per
  sprint instance: created `PLANNED` → promoted to `ACTIVE` by
  `_activate_next_sprint()` when the previous `ACTIVE` sprint closes →
  becomes `COMPLETED` when it in turn closes (immediately, or after
  limbo clears). The one exception is the very first sprint a project
  ever gets, which is created directly as `ACTIVE` (there's nothing to
  promote it from).
- **How does `close_sprint` relate to `complete_sprint`?** There is no
  `complete_sprint` method. `close_sprint` is the whole operation:
  spill incomplete issues forward, then either complete-and-rotate
  immediately or hold in limbo until `complete_limbo` finishes the
  rotation once rituals clear.
- **Should the missing methods be implemented, or is current behavior
  documented?** **Document current behavior.** `close`/rotation is a
  deliberate design (see CLAUDE.md's Sprint & Budget Model section) —
  there's no product need for a separate manual start/complete API, and
  adding one would create two ways to do the same thing. The deleted
  test in CHT-109 was testing an API shape that was never part of the
  design; removing it was correct, and this doc is the replacement
  documentation the ticket asked for.

## Budget/accrual coupling (brief)

Full invariants live in
[CLAUDE.md](../CLAUDE.md#sprint--budget-model-read-this-before-calling-any-of-it-a-bug);
restated here for context:

- Only completing an issue (→ `done`) accrues budget, and it always
  charges the project's **currently-active** sprint, regardless of
  which sprint the issue was actually in.
- Going into arrears (points spent > budget) hard-blocks moving any
  ticket into `in_progress`/`done`/`canceled` project-wide until you
  `chaotic sprint close`.
- If the project has `EVERY_SPRINT` rituals, `close` enters limbo
  instead of rotating immediately, until those rituals are attested
  (`chaotic ritual pending`, `chaotic ritual attest`) or force-cleared
  by an admin (`chaotic ritual force-clear`).

## CLI verbs

| Intent | Command |
|---|---|
| See the current (active) sprint | `chaotic sprint current` / `chaotic sprint status` |
| List all sprints (optionally filter by status) | `chaotic sprint list [--status planned\|active\|completed]` |
| Show a sprint's details + issues | `chaotic sprint show [SPRINT_ID] [--current]` |
| Check budget/arrears status | `chaotic sprint budget` (root shortcut: `chaotic budget`) |
| Advance to the next sprint | `chaotic sprint close [SPRINT_ID]` |
| Rename / rebudget a sprint | `chaotic sprint update [SPRINT_ID] --name ... --budget ...` |
| Add/remove issues from the current sprint | `chaotic sprint add IDENTIFIERS...` / `chaotic sprint remove IDENTIFIERS...` |
| List issues in the current sprint | `chaotic sprint issues` |
| Audit trail of budget charges | `chaotic sprint transactions [SPRINT_ID]` |
| See rituals blocking a limbo'd sprint | `chaotic ritual pending` |
| Attest a pending ritual to clear limbo | `chaotic ritual attest RITUAL_NAME` |
| Admin override to force-clear a stuck limbo | `chaotic ritual force-clear` |

There is no `chaotic sprint start` or `chaotic sprint complete` — both
would be no-ops/nonexistent given the above. `chaotic sprint create`
exists only as a friendly alias that returns the current sprint (see
"Sprints are auto-created" above); it never creates a second concurrent
active sprint.

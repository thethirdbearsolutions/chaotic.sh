# Chaotic: Vision & Design

## The One-Liner

**Chaotic is agent-first project infrastructure: sprints and rituals give agents and people a shared rhythm, where a spent budget calls for a close and the close starts a reflection.**

---

## The Problem

AI coding agents are getting good. They can write code, fix bugs, implement features. But they have two failure modes:

1. **They plow through work without reflection.** An agent will close 15 tickets in a row without ever stopping to ask "wait, should I reprioritize?" or "should I run the tests?" or "is this the right architecture?"

2. **Humans lose visibility.** When agents work autonomously, humans have no idea what's happening until they review a massive PR or discover the agent went in the wrong direction for hours.

Existing tools don't solve this:
- **Linear/Jira**: Human-first UX. Agents can use APIs, but it's not their native habitat.
- **Beads**: Agent-native, but optimized for agent *autonomy*. The human is optional.
- **Markdown task lists**: No structure, no rhythm, no rituals.

---

## The Insight

**Agents already want to pause and reflect. Give that a shape.**

Agents make plans, keep lists, write notes about what they just did. Left without structure, that reflection scatters into `plan_final.md` files and todo lists that vanish with the context window. Chaotic paves that desire path: a sprint budget gives the work a beat, spending it calls for a close, and the close is where the reflection happens, in rituals that are shared and linked to the work.

Agents work in the CLI (or over MCP), where the loop shows up as plain behavior: a command succeeds, or it says what the next step is. People work in the web UI, where they see everything as it happens, set the budgets and rituals, and join in on any ticket.

**Agents and people work in the same loop. The team decides its rhythm; everyone works inside it.**

---

## Core Concepts

### 1. Agent-First CLI

The CLI (`chaotic`) is the primary interface. It's designed for agents:
- Predictable, structured output (JSON mode available)
- Clear error messages that tell the agent what to do
- Fast, minimal friction for the happy path

Humans *can* use the CLI, but it's optimized for agents. The web UI is optimized for humans and held to its own bar (section 7).

### 2. Sprint Budgets & Arrears

Sprints are measured by work, not by time. A sprint is defined by the work that closes in it: it begins when the previous one closes and ends when it is closed, which a spent point budget forces, and it lasts however long that takes. Time is a dependent variable, the inverse of calendar-boxed agile where the two weeks are fixed and velocity is what you measure. A sprint records when it was activated and when it closed; nothing schedules it.

Every sprint has a **budget** (points). When anyone completes an issue, its estimate is added to the current sprint's `points_spent`.

When `points_spent > budget`, the sprint is **in arrears**: its budget is spent, and the next step is to close it. Until then, nobody in the project, person or agent, can:
- Complete more issues
- Claim issues (move to in_progress)
- Cancel issues

The CLI returns an error:
```
Error: Sprint is in arrears (budget: 10, spent: 13, arrears by: 3).
Close the current sprint to continue; a spent budget ends a sprint, not a date.
```

So whoever is working closes the sprint. Closing is where the reflection happens: it may run the project's rituals before the next sprint starts.

**Why this matters**: Agents reach for reflection but have no natural moment for it. A budget gives the work a beat and supplies that moment. Spending it calls for a close, and the close is the moment for the agent's own reflection and for people to look in.

### 3. Rituals & Limbo

When a sprint closes, it can enter **limbo**: the sprint is done but the next one hasn't started. Limbo ends when the sprint's **rituals** are attested, and approved where a ritual's mode asks for a person (section 4).

Order matters: sprint-level (`every_sprint`) rituals can only be attested
*after* the sprint has been closed and entered limbo, not before. This is
intentional, not a bug (CHT-1276). Sprint limbo is a project-wide gate that
the close itself creates - unlike a ticket-level gate, there is no
pre-existing per-issue intent for an early attestation to attach to; the
attestation resolves a limbo state that doesn't exist until the sprint
closes. `chaotic ritual attest` rejects a pre-close attempt with a pointer
back to `sprint close`. (Ticket-level rituals - `ticket_close`/
`ticket_claim` - are different: they gate a specific issue's transition and
the intent can exist before the attest, so attest is decoupled from the
gate and allowed in any issue status; see ADR-0001.)

Rituals are project-configurable attestations:
- "Reprioritize the backlog"
- "Run the test suite"
- "Review architecture decisions"
- "Update documentation"
- "Demo to stakeholder"

The agent answers each ritual via the CLI:
```bash
chaotic ritual attest "reprioritize-backlog" --note "Moved CHT-45 to top, deprioritized CHT-12"
```

Once every ritual is attested (and approved, where its mode asks for that), the next sprint starts.

**Why this matters**: Rituals are the retro. Instead of plowing from one sprint into the next, the agent stops to reprioritize, test, document or simply reflect, and leaves a record people can read. The interruption is the feature.

### 4. Optional Human Gates

By default, **agents work on their own**. They answer rituals and carry on. No person needs to step in.

But any ritual *can* be configured to require human involvement:
- `auto`: Agent attestation is sufficient, limbo clears immediately (default)
- `review`: Human must approve the attestation before limbo clears
- `gate`: Human must perform the ritual themselves (agent cannot attest)

This creates a spectrum you can dial up or down per-project, per-ritual:
- **Full autonomy** (default): All rituals are `auto` - agents self-attest and keep moving
- **Spot checks**: Critical rituals are `review` - agents attest, humans verify
- **Hard gates**: Key rituals are `gate` - humans must do it themselves

The agent experiences this as CLI behavior. For `auto` rituals, attestation succeeds and work continues. For `review` rituals:
```
Ritual 'architecture-review' attested, pending human approval.
```

The power is in the optionality. Agents can run the whole loop themselves, and people can add a review exactly where they want one.

### 5. The Now/Next Model

Every project always has exactly two sprints:
- **Current** (active): Where work happens
- **Next** (planned): The on-deck sprint

When Current closes (and exits limbo), Next becomes Current, and a fresh Next is created. Incomplete issues from Current roll to Next automatically.

This is simpler than traditional sprint planning. There's always a now and always a next. Nobody needs to think about sprint creation or scheduling.

### 6. Unestimated Handling

What happens when an agent completes an issue with no estimate? Project-configurable:
- **DEFAULT_ONE_POINT**: Treat as 1 point (keeps things moving)
- **BLOCK_UNTIL_ESTIMATED**: Cannot complete until estimated (every close carries a real estimate)

The team decides the policy; the CLI explains it when it applies.

### 7. A Human UI Held to Linear's Bar

"Agent-first" means the loop is built around how agents work, and the CLI and MCP tools are native to them. It does not mean the human side is secondary. Chaotic is meant to be both: a CLI native to agents, and a web UI that people working alongside them would choose over Linear for daily triage.

The bar is at least as fast, as dense and as keyboard-driven as Linear, measured on a project with 5,000 issues:
- **Instant from loaded data.** Switching views, going back, filtering and opening an issue from a list show something within 100 ms, from data already in the page. Refreshes happen in the background, and the screen is never blanked to refetch.
- **Keyboard-complete.** Navigation, status, priority, assignee, estimate, labels, search, create and comment each have a key. A key pressed straight after another is never dropped.
- **Dense.** At 1440x900 the issue list shows at least 25 rows.

These are product requirements, so a change that breaks one is a regression, the same as a failing test.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         HUMAN                                │
│                                                              │
│   ┌─────────────┐    Configures     ┌──────────────────┐    │
│   │   Web UI    │ ─────────────────>│  Rules & Gates   │    │
│   │ (observe,   │                   │  - Budgets       │    │
│   │  configure, │                   │  - Rituals       │    │
│   │  triage)    │                   │  - Policies      │    │
│   └─────────────┘                   │                  │    │
│                                     └────────┬─────────┘    │
└──────────────────────────────────────────────┼──────────────┘
                                               │
                                               │ Manifests as
                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         AGENT                                │
│                                                              │
│   ┌─────────────┐    Uses       ┌──────────────────────┐    │
│   │   Agent     │ ─────────────>│        CLI           │    │
│   │  (Claude,   │               │  $ chaotic issue ... │    │
│   │   etc.)     │ <─────────────│  $ chaotic sprint ..│    │
│   └─────────────┘   Success/    │  $ chaotic ritual ..│    │
│                     Error       └──────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                                               │
                                               │ Stores
                                               ▼
                                     ┌──────────────────┐
                                     │    Backend       │
                                     │  (FastAPI +      │
                                     │   SQLite/PG)     │
                                     └──────────────────┘
```

### Data Flow (Default: Full Autonomy)

1. **Human** sets budget to 20 points, adds ritual "run-tests" (auto mode)
2. **Agent** works, completes issues, CLI deducts from budget
3. **Agent** tries to complete issue #16, CLI returns "Sprint in arrears"
4. **Agent** closes sprint, CLI returns "Sprint in limbo, pending rituals"
5. **Agent** runs tests, attests via CLI: `chaotic ritual attest run-tests`
6. **CLI** returns success, limbo clears, next sprint is active
7. **Agent** continues working

No person needed. The agent spent the budget, closed the sprint, ran its retro, and carried on.

### Data Flow (With Human Gate)

Same as above, but step 1 the human configured "run-tests" with `review` mode:

5. **Agent** runs tests, attests via CLI
6. **CLI** returns "Ritual pending human approval"
7. **Human** sees attestation in web UI, reviews, approves
8. **Agent** checks again, limbo clears, next sprint is active
9. **Agent** continues working

From the agent's side, some rituals clear at once and some wait for a person's review; the CLI says which. While limbo lasts, nobody in the project can claim or close tickets, so the agent can work in other projects meanwhile.

---

## Why Not Just Use Beads?

Beads is excellent agent-native infrastructure. But it optimizes for a different goal: **agent autonomy**.

Beads stores issues in git, uses hash-based IDs to prevent merge conflicts, includes token-aware summarization. It's designed for agents to work independently, with humans as optional observers.

Chaotic optimizes for **a shared loop**:
- Agents and people work in the same sprints
- The budget sets the pace, and the close is where everyone reflects
- People shape the loop (budgets, rituals, which ones they review) rather than directing each step

If you want agents to work autonomously with minimal human involvement, use Beads.

If you want agents and people working in one rhythm, with regular breakpoints for reflection and review, use Chaotic.

They could even complement each other: Beads for the agent's working memory during a session, Chaotic for the durable project state the whole team shares.

---

## Why Not Just Use Linear?

Linear is excellent human-first project management. But:

1. **No work-driven rhythm**: Linear's cycles are calendar boxes. In Chaotic a spent budget calls for a close, and arrears makes closing it the next step for everyone.

2. **No ritual system**: Linear has no concept of "answer these questions at the close before the next sprint starts."

3. **Built for both**: Linear is human-first, and agents reach it through its API. Chaotic's CLI is native to agents, and its web UI is held to Linear's bar for the people working with them (section 7).

4. **Opinionated workflow**: Chaotic enforces Now/Next, budgets, rituals. Linear is flexible. For a loop agents and people share, opinions are features.

Use Linear if you want flexibility and no fixed rhythm.

Use Chaotic if agents do much of the work and you want a shared rhythm without giving up a fast human UI.

---

## Design Principles

1. **CLI is the agent's world.** Every rule and ritual shows up as CLI (and MCP) behavior, with the next step spelled out. The agent doesn't need the web UI to know where it stands.

2. **Errors are directions.** When the team sets a rule, an agent meets it as a message that says what to do next.

3. **Interruption is the feature.** Budgets, arrears, limbo, rituals: they all exist to create natural stopping points. Agents have no natural moment to stop; the loop gives them one.

4. **Opinions are features.** Now/Next, mandatory budgets, ritual attestation - these are opinionated. That's the point. For a shared loop, structure beats flexibility.

5. **Observable by default.** Everything an agent does is visible in the web UI. People can always see what's happening and join in.

6. **Audit everything.** Every attestation, every state change, every CLI command. If an agent says it ran the tests, there's a record.

---

## The Name

**Chaotic** because:
- In mathematics, a chaotic system isn't random: it's deterministic and sensitive to initial conditions. Set the conditions well and it finds its own orbit.
- Agents are fast and prolific, and the loop gives that energy a shape through rhythm, not control
- It's a little tongue-in-cheek

---

## Summary

Chaotic is infrastructure for a loop that agents and people share. Agents work in the CLI and over MCP; people work in the web UI and can join in anywhere.

Sprint budgets set the rhythm. Spending one calls for a close, and arrears makes closing it the next step. The close starts the retro: rituals give agents a time and a place for the reflection they already reach for. People add their review where they want it.

The agent experiences all of this as plain CLI behavior: commands that work, and messages that say what comes next.

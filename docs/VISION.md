# Chaotic: Vision & Design

## The One-Liner

**Chaotic is agent-first project infrastructure where humans control the environment, not the agent.**

---

## The Problem

AI coding agents are getting good. They can write code, fix bugs, implement features. But they have two failure modes:

1. **They plow through work without reflection.** An agent will close 15 tickets in a row without ever stopping to ask "wait, should I reprioritize?" or "should I run the tests?" or "is this the right architecture?"

2. **Humans lose visibility.** When agents work autonomously, humans have no idea what's happening until they review a massive PR or discover the agent went in the wrong direction for hours.

Existing tools don't solve this:
- **Linear/Jira**: Human-first UX. Agents can use APIs, but it's not their native habitat.
- **Beads**: Agent-native, but optimized for agent *autonomy*. The human is optional.
- **Markdown task lists**: No structure, no enforcement, no gates.

---

## The Insight

**The agent doesn't need to know it's being controlled.**

From the agent's perspective, it just uses a CLI. Sometimes commands succeed. Sometimes they fail with error messages. The agent adapts to whatever the CLI tells it.

From the human's perspective, they have a control plane (web UI) where they configure rules, gates, and constraints. These manifest to the agent as CLI behavior - commands that work, commands that don't, error messages that force certain actions.

**The human controls the environment. The agent navigates the environment.**

This is parenting via environment design, not direct instruction.

---

## Core Concepts

### 1. Agent-First CLI

The CLI (`chaotic`) is the primary interface. It's designed for agents:
- Predictable, structured output (JSON mode available)
- Clear error messages that tell the agent what to do
- Fast, minimal friction for the happy path

Humans *can* use the CLI, but it's optimized for agents. The web UI is optimized for humans.

### 2. Sprint Budgets & Arrears

Every sprint has a **budget** (points). When an agent completes any issue, the estimate is deducted from the current sprint's `points_spent`.

When `points_spent > budget`, the sprint is **in arrears**. The agent cannot:
- Complete more issues
- Claim issues (move to in_progress)
- Cancel issues

The CLI returns an error:
```
Error: Sprint is in arrears (budget: 10, spent: 13, arrears by: 3).
Close the current sprint to continue.
```

The agent must close the sprint. But closing isn't instant - it might require rituals.

**Why this matters**: Agents will work forever if you let them. Budgets force natural breakpoints. Arrears force the agent to stop and transition, which creates opportunities for human review and agent self-reflection.

### 3. Rituals & Limbo

When a sprint closes, it can enter **limbo** - a state where the sprint is done but the next sprint hasn't started. To exit limbo, the agent must complete **rituals**.

Rituals are project-configurable attestations:
- "Reprioritize the backlog"
- "Run the test suite"
- "Review architecture decisions"
- "Update documentation"
- "Demo to stakeholder"

The agent attests to each ritual via CLI:
```bash
chaotic ritual attest "reprioritize-backlog" --note "Moved CHT-45 to top, deprioritized CHT-12"
```

Until all rituals are attested, the agent cannot start work on the next sprint.

**Why this matters**: Rituals inject metacognition. The agent can't just plow from one sprint to the next - it must stop and perform (or at least attest to performing) certain actions. The interruption is the feature.

### 4. Optional Human Gates

By default, **agents fly unsupervised**. They attest to rituals and continue immediately. No human required.

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
Error: Ritual 'architecture-review' is pending human approval.
Check back later or notify your human.
```

The power is in the optionality. You can let agents run free, or tighten the leash exactly where you want it.

### 5. The Now/Next Model

Every project always has exactly two sprints:
- **Current** (active): Where work happens
- **Next** (planned): The on-deck sprint

When Current closes (and exits limbo), Next becomes Current, and a fresh Next is created. Incomplete issues from Current roll to Next automatically.

This is simpler than traditional sprint planning. There's always a now and always a next. The agent doesn't need to think about sprint creation or scheduling.

### 6. Unestimated Handling

What happens when an agent completes an issue with no estimate? Project-configurable:
- **DEFAULT_ONE_POINT**: Treat as 1 point (keeps things moving)
- **BLOCK_UNTIL_ESTIMATED**: Cannot complete until estimated (forces estimation discipline)

This is another environment control. The human decides the policy; the agent encounters it as CLI behavior.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         HUMAN                                │
│                                                              │
│   ┌─────────────┐    Configures     ┌──────────────────┐    │
│   │   Web UI    │ ─────────────────>│  Rules & Gates   │    │
│   │ (observe,   │                   │  - Budgets       │    │
│   │  configure) │                   │  - Rituals       │    │
│   └─────────────┘                   │  - Policies      │    │
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

No human involved. The agent hit a wall (arrears), was forced to transition (close sprint), was forced to reflect (ritual), and continued.

### Data Flow (With Human Gate)

Same as above, but step 1 the human configured "run-tests" with `review` mode:

5. **Agent** runs tests, attests via CLI
6. **CLI** returns "Ritual pending human approval"
7. **Human** sees attestation in web UI, reviews, approves
8. **Agent** checks again, limbo clears, next sprint is active
9. **Agent** continues working

The agent doesn't know the difference until it hits the gate. It just knows sometimes attestation clears immediately, sometimes it has to wait.

---

## Why Not Just Use Beads?

Beads is excellent agent-native infrastructure. But it optimizes for a different goal: **agent autonomy**.

Beads stores issues in git, uses hash-based IDs to prevent merge conflicts, includes token-aware summarization. It's designed for agents to work independently, with humans as optional observers.

Chaotic optimizes for **supervised autonomy**:
- Agents do the work
- Humans control the pace and validate transitions
- The control happens via environment, not direct instruction

If you want agents to work autonomously with minimal human involvement, use Beads.

If you want agents to work productively but within human-defined constraints, with natural breakpoints for reflection and review, use Chaotic.

They could even complement each other: Beads for the agent's working memory during a session, Chaotic for the durable project state with human oversight.

---

## Why Not Just Use Linear?

Linear is excellent human-first project management. But:

1. **No enforcement mechanisms**: Linear won't stop you from completing issues. Chaotic's arrears system is a hard stop.

2. **No ritual system**: Linear has no concept of "you must attest to these things before continuing."

3. **Human-optimized UX**: Linear's UI is beautiful for humans. Chaotic's CLI is optimized for agents.

4. **Opinionated workflow**: Chaotic enforces Now/Next, budgets, rituals. Linear is flexible. For agent supervision, opinions are features.

Use Linear if humans are the primary workers and you want flexibility.

Use Chaotic if agents are the primary workers and you want control.

---

## Design Principles

1. **CLI is the agent's world.** Every constraint, every gate, every rule manifests as CLI behavior. The agent doesn't need to understand the control plane.

2. **Errors are the human's voice.** When the human wants the agent to do something differently, they configure a rule. The agent encounters it as an error message.

3. **Interruption is the feature.** Budgets, arrears, limbo, rituals - they all exist to create natural stopping points. Agents will work forever if you let them.

4. **Opinions are features.** Now/Next, mandatory budgets, ritual attestation - these are opinionated. That's the point. For supervised autonomy, structure beats flexibility.

5. **Observable by default.** Everything the agent does is visible in the web UI. The human doesn't control the agent directly, but they can always see what's happening.

6. **Audit everything.** Every attestation, every state change, every CLI command. If an agent says it ran the tests, there's a record.

---

## The Name

**Chaotic** because:
- Agents are chaotic workers - fast, unpredictable, prolific
- The system brings order to chaos through structure, not control
- It's a little tongue-in-cheek

The chaos is the agent. The structure is the environment. The human designs the environment.

---

## Summary

Chaotic is infrastructure for supervised agent autonomy. Agents use the CLI, humans use the web UI. Humans don't control agents directly - they configure the environment, and agents navigate within it.

Sprint budgets create resource constraints. Arrears force stopping points. Rituals inject metacognition. Limbo creates transition gates. Human approval adds verification where needed.

The agent experiences all of this as normal CLI behavior: commands that work, commands that fail, error messages that guide action.

The human never talks to the agent. They just shape the world the agent lives in.

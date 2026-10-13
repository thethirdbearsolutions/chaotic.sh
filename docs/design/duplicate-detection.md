# Design proposal: local, cost-free duplicate detection on `issue create`

* **Status**: Proposed (CHT-1358)
* **Date**: 2026-09-05
* **Hard constraints**: runs inside the backend process, no network calls at
  request time, no paid APIs, no API keys, nothing that costs money to run.
  Optional tiers may need a one-time download at install time; the default
  tier needs nothing beyond what the backend already ships.

## 1. Problem

Agents file tickets faster than humans can triage them, and they file the same
ticket more than once. The failure modes we see in our own tracker:

* **Retry duplicates.** A `chaotic issue create` that timed out client-side
  but committed server-side is re-run verbatim. Same title, same description,
  seconds apart.
* **Rediscovery duplicates.** A fresh session hits a known bug and files it
  again in its own words, because it never searched. CHT-983 and CHT-1345
  are the same bug class filed six months apart; CHT-1333 and CHT-1344
  overlap heavily.
* **Fan-out duplicates.** Review-findings tickets (CHT-1351, CHT-1354) each
  re-file issues that already exist as standalone tickets.

Today the only defence is `create_cross_references`, which links issues an
author *explicitly* mentions. Nothing looks at the new issue's content. The
result is a backlog where 342 CHT tickets are open and a triager cannot trust
that two similar titles are two problems.

Chaotic's philosophy (docs/VISION.md) is to encode rules as **CLI physics**:
commands that fail with an actionable error the agent adapts to. Duplicate
detection is a natural instance. The agent asks to create; the environment
answers "that already exists, refer to CHT-123"; the agent goes and comments
there instead.

## 2. Use cases

| Who | Wants | Gets |
|---|---|---|
| Agent filing a ticket | to not be the third person to file this | a 409 naming the existing issue, and a flag to override |
| Agent that *knows* it is a near-duplicate (a sub-task, a regression) | to file anyway with a link | `--duplicate-of CHT-123` / `--allow-duplicate`, and a `duplicates`/`relates_to` relation written for free |
| Human triaging | fewer twins in the backlog | fewer twins; and `chaotic issue similar` to check before filing |
| Project owner | to dial this per project | `off` / `warn` / `block`, and a threshold |
| Operator | no new infrastructure | SQLite only, in-process, optional extras |

## 3. Constraints and facts that shape the design

* **Scale is small.** The largest project has ~1,050 issues; the whole team
  ~4,500. Brute-force scoring of every candidate is sub-millisecond for
  lexical methods and a few milliseconds for a dot product over a few
  thousand vectors. No approximate-nearest-neighbour index is warranted.
* **SQLite FTS5 is already there.** The interpreter's bundled SQLite (3.45.1
  in this environment) is compiled with `ENABLE_FTS5`, and the app talks to
  SQLite through `aiosqlite` on the same library. Verify on the production
  host as a precondition (`pragma compile_options`); uv-managed Pythons
  ship FTS5, macOS system Python does too.
* **No numpy in the backend today.** The default tier must not add it. The
  semantic tier may, as an optional extra.
* **Service layer is the enforcement boundary (ADR-0002).** The check lives
  in `IssueService.create`, not in the API route, so every caller (HTTP,
  MCP, templates, future schedulers) is subject to it.
* **API functions return response schemas (ADR-0005).** New endpoints and
  the error payload follow that rule.
* **Structured errors exist.** `HTTPException(detail={"error_code": ..., "message": ...})`
  is the established pattern (`sprint_in_arrears`, `claim_rituals_pending`),
  and the CLI's `_format_error` and the MCP `_boundary` wrapper already
  render it. We add one more `error_code`, not a new mechanism.
* **`IssueRelationType.DUPLICATES` already exists.** Overrides can record the
  relationship rather than discard it.
* **Labelled data exists.** Existing `duplicates` relations across the team's
  projects are positive pairs for an offline evaluation, with no annotation
  effort.

## 4. Candidate techniques

Evaluated against: zero-cost, local, dependency weight, latency on a laptop
CPU, and what kind of duplicate each actually catches.

| # | Technique | Deps added | Model/data on disk | Latency (per create, 5k issues) | Catches | Misses |
|---|---|---|---|---|---|---|
| A | Normalised exact title match | none | none | <1 ms | retry duplicates | everything else |
| B | SQLite FTS5 + BM25 (title, description) with `porter unicode61` tokenizer | none | one virtual table (~1.5× text size) | 1–5 ms | same words, different order; stemmed variants | paraphrase; synonyms ("crash" vs "500") |
| C | Fuzzy title ratio (`rapidfuzz` token-set ratio) | rapidfuzz (~3 MB, C++) | none | ~5 ms brute force | typos, reordering, prefixes like "[WEB]" | paraphrase |
| D | Static word embeddings, `model2vec` (e.g. `potion-base-8M`) | numpy, model2vec (~+30 MB wheels) | ~30 MB model | ~0.2 ms encode, ~1 ms cosine over 5k | paraphrase, synonyms, moderate semantics | subtle intent differences; negation |
| E | Transformer sentence embeddings via ONNX (`fastembed`, `bge-small-en-v1.5`) | onnxruntime (~60 MB), numpy | ~130 MB model | 20–60 ms encode on CPU | better paraphrase than D | still weak on "same symptom, different cause" |
| F | Local LLM judge (Ollama / llama.cpp, e.g. a 3–4B instruct model) over top-k candidates | none in-process (HTTP to localhost) | 2–4 GB model, user-installed | 1–5 s | intent-level judgement, explains itself | latency; hardware; nondeterminism |
| G | `sqlite-vec` extension for vector search | loadable extension (~1 MB) | index | ~1 ms | same as D/E, faster at >100k rows | pointless at our scale |

Notes:

* B is the workhorse. FTS5 gives us a ranked candidate set with a tokenizer
  that already stems, at zero dependency cost, kept in sync by SQL triggers.
* Raw BM25 scores are not comparable across queries, so B alone cannot drive
  a threshold. It is a **retriever**; the **decision** needs a normalised
  score. Hence C or D on top of B's top-k.
* D is the sweet spot for "semantic and cheap": static embeddings are a
  lookup plus a mean, no neural inference, MIT-licensed weights, and the
  quality gap to E on short technical titles is small. E is not worth 60 MB
  of onnxruntime for this corpus.
* F is genuinely useful only as a **veto** on the top candidate to reduce
  false positives. It must never be on the request path unless the operator
  explicitly points us at a localhost endpoint, and it must fail open.
* G is rejected outright: brute force over a few thousand vectors is faster
  than the extension load.

## 5. Recommended architecture

Tiered, opt-in per project, fail-open.

```
IssueService.create(issue_in, project, creator)
   │
   ├─ project.duplicate_detection == OFF  ──────────────────────► create
   │
   ├─ allow_duplicate / duplicate_of given ─────────────────────► create (+ relation)
   │
   └─ DuplicateDetector.find(project, title, description)
        │
        ├─ Tier 0 (always): exact-normalised title  ──► score 100
        ├─ Tier 0 (always): FTS5 BM25 top-20 candidates
        │        └─ normalised score: token-set Jaccard on stemmed title
        │           (+ description overlap as tie-break)
        ├─ Tier 1 (if installed): model2vec cosine on title+description
        │        └─ fuse with tier 0 via reciprocal rank fusion; final
        │           score = max(lexical, semantic) after calibration
        └─ Tier 2 (if configured): local LLM judge on top-1..3
                 └─ may only DOWNGRADE a match (veto), never create one
        │
        ▼
     best.score >= project.duplicate_threshold ?
        ├─ mode WARN  ─► create; response.possible_duplicates = [...]
        └─ mode BLOCK ─► raise DuplicateSuspectedError (HTTP 409)
```

### 5.1 Corpus and candidate set

* Same **project** by default (open question Q1). Identifiers are
  project-scoped, and cross-project "duplicates" are usually legitimate
  per-client forks (the sync projects).
* Statuses `backlog`, `todo`, `in_progress`, `in_review` always. `done` and
  `canceled` issues **closed within the last 90 days** are included but
  reported with a different message ("this was fixed in CHT-123 on …; if it
  regressed, say so"), because "already fixed" is the second most common
  duplicate story.
* Text = title, plus the first ~2,000 characters of description. Titles are
  weighted 3× in FTS5 via column weights and in the fused score.

### 5.2 Storage

* `issue_fts`: FTS5 **external-content** table over `issues(title, description)`
  with `tokenize = 'porter unicode61'`. Three SQL triggers (insert / update /
  delete) keep it in sync. Created by a hand-written Oxyde migration (raw
  SQL; `makemigrations` cannot express virtual tables). Rebuildable with
  `INSERT INTO issue_fts(issue_fts) VALUES('rebuild')`.
* `issue_embedding` (tier 1 only): `issue_id` PK/FK, `model_id` text,
  `dim` int, `vector` BLOB (float32), `updated_at`. Written in the create /
  update path after the row commits; a backfill runs at startup for rows
  missing a vector for the configured `model_id`, in small batches, off the
  request path. Brute-force cosine in numpy at query time.
* No new state for tier 2.

### 5.3 Project configuration

Two fields on `OxydeProject`, with a migration and `ProjectResponse` /
`ProjectUpdate` changes:

```python
duplicate_detection: DbEnum(DuplicateDetectionMode) = OFF   # off | warn | block
duplicate_threshold: int = 85                                # 0..100
```

Following the existing enum contract exactly (CLAUDE.md "Enum
Representation"): stored as `.name`, wire as `.value`, compared as members.

Process-level settings (env, `app/config.py`):

```
CHAOTIC_DUPLICATE_SEMANTIC_MODEL=""      # path or model id; empty = tier 1 off
CHAOTIC_DUPLICATE_LLM_JUDGE_URL=""       # must be http://127.0.0.1 or http://localhost; empty = tier 2 off
CHAOTIC_DUPLICATE_LLM_JUDGE_MODEL=""
CHAOTIC_DUPLICATE_LLM_TIMEOUT_MS=3000
```

The judge URL is validated to loopback at startup. Anything else is a
configuration error, which is how "local only" is enforced rather than
documented.

### 5.4 Error contract (block mode)

HTTP 409, same shape as the other structured errors:

```json
{
  "detail": {
    "error_code": "duplicate_suspected",
    "message": "This looks like a duplicate of CHT-1344 (score 91). Please refer to that issue instead: comment on it, or pass --allow-duplicate / --duplicate-of CHT-1344 to file anyway.",
    "candidates": [
      {"identifier": "CHT-1344", "title": "Toolset sync guard compares schemas but not response values", "status": "backlog", "score": 91, "signals": ["title", "semantic"]},
      {"identifier": "CHT-1350", "title": "MCP error payloads: dict on HTTP, string on stdio", "status": "backlog", "score": 72, "signals": ["semantic"]}
    ],
    "override": {"allow_duplicate": true, "duplicate_of": "CHT-1344"}
  }
}
```

Rendered by the CLI's `_format_error` (one new branch keyed on
`error_code`), and passed through as-is by the MCP `_boundary` wrapper so an
agent sees the same payload on both transports (CHT-1350 asks for exactly
this consistency; do not add a third shape).

### 5.5 Surfaces

| Surface | Change |
|---|---|
| `POST /projects/{id}/issues` | body gains `allow_duplicate: bool = False`, `duplicate_of: str \| None`; 409 as above; `IssueResponse` gains `possible_duplicates: list[DuplicateCandidate] = []` (populated in `warn` mode only) |
| `GET /projects/{id}/issues/similar?q=…&limit=5` | read-only preview, returns `list[DuplicateCandidate]`; what the UI and `chaotic issue similar` call |
| `PATCH /projects/{id}` | the two new fields |
| CLI | `chaotic issue create --allow-duplicate`, `--duplicate-of CHT-123`; new `chaotic issue similar "text"`; `chaotic project update --duplicate-detection block --duplicate-threshold 85` |
| MCP (both transports) | `issue_create(allow_duplicate, duplicate_of)`; new `issue_similar(text)` tool; `docs/mcp-toolset-schema.json` regenerated; sync tests updated |
| Frontend | creation modal calls `/similar` on title blur, shows candidates inline with "comment there instead" / "create anyway"; project settings gains the two controls |
| Templates | template instantiation passes `allow_duplicate=True` (the template *is* the intent) |

### 5.6 Scoring and threshold

* Normalise every signal to 0–100. Exact normalised title = 100. Lexical =
  token-set Jaccard on porter-stemmed title tokens (0–100), boosted by up to
  +10 for description overlap. Semantic = cosine rescaled with a calibration
  learned from the eval set (a fixed piecewise-linear map is enough).
* Final score = max over signals after RRF ordering picks the candidate.
* Default threshold 85 in `warn`, and we recommend 90 when switching a project
  to `block`. The asymmetry is deliberate: a false positive in `block` mode
  stops an agent cold, a false negative is today's behaviour.
* Retry duplicates (score 100, created < 10 min ago by the same principal)
  return the **existing** issue with 200 rather than a 409, because the
  caller's intent was fulfilled and the CLI can print "already created as
  CHT-123". This is the one place the detector short-circuits to idempotency.

### 5.7 Evaluation before anyone turns on `block`

`scripts/eval_duplicates.py` (offline, reads a DB copy):

* Positives: every `duplicates` relation in the DB, plus manually confirmed
  pairs listed in a small YAML the script maintains.
* Negatives: random pairs within a project, plus "hard negatives" from
  sibling sub-issues of the same epic (the most likely false-positive
  source).
* Report per tier: precision@1, recall@5, and the false-positive rate at
  thresholds 80/85/90/95. Print the confusion pairs so a human can read them.
* Acceptance to ship `warn` by default on CHT: recall@5 ≥ 0.7 on positives.
  Acceptance to recommend `block`: false-positive rate ≤ 2% at the chosen
  threshold on the hard-negative set.

The script needs no network and runs on the same laptop as the tracker.

### 5.8 Rollout

1. **Shadow.** Detector runs in `warn` mode internally for all projects but
   only writes an activity entry (`duplicate_suspected`, candidates, score)
   and a log line. Two weeks of real traffic; run the eval script on the
   outcome.
2. **Warn on CHT.** Dogfood: creation responses carry candidates; CLI prints
   a yellow "Possible duplicate of CHT-…" line.
3. **Block on CHT** at threshold 90 once the FP rate is acceptable.
4. Default for new projects stays `off`. `chaotic quickstart` asks.

## 6. Edge cases and how they are handled

* **Retry after client timeout.** Exact match within 10 minutes by the same
  principal returns the existing issue (5.6). Prevents the most common
  duplicate without any threshold judgement.
* **Sub-issues under one epic** ("Add tests for X", "Add tests for Y"): the
  same parent is a strong negative signal; candidates sharing `parent_id`
  with the new issue are down-weighted by 20 points, and the eval's
  hard-negative set is built from exactly these.
* **Templates and bulk creation** bypass detection (`allow_duplicate=True`),
  otherwise a template with ten similar checklist items blocks itself.
* **Short or generic titles** ("Fix bug", "Cleanup"): lexical Jaccard on two
  tokens is noisy. Titles with fewer than 3 informative tokens cannot reach
  `block` on lexical signal alone; they need the semantic tier or
  description overlap.
* **Description-heavy issues** with generic titles: FTS5 includes the
  description column so retrieval still works; the decision weights title
  more, so these mostly surface as `warn`-level candidates, which is right.
* **Non-English text.** `unicode61` tokenises; `porter` only stems English.
  Semantic tier's default model is English; document it, make the model id
  configurable.
* **Concurrent creates** of the same issue by two agents: both pass the
  check, both commit. Acceptable; the second one's `warn` response will not
  show the first because it was not committed yet. Not worth a lock.
* **Closed-issue matches** get the "already fixed" message variant and are
  never a `block` unless closed within 7 days (a regression report on a
  fix from last quarter is a new issue).
* **Detector failure** (FTS table missing, model failed to load, judge
  timed out): log, and **create the issue**. Duplicate detection is a
  convenience gate, not a security boundary; failing closed here would turn
  a crashed side-car into a tracker outage.
* **Performance.** All tiers together budgeted at <50 ms p95 on 5k issues
  without the LLM judge; the judge adds its own timeout and is off by
  default. Add a test asserting the detector stays under budget on a
  synthetic 10k-issue project.
* **Permissions.** `/similar` is read-only and project-scoped; it leaks no
  more than `GET /issues?search=` already does.

## 7. What this does to the codebase

* New module `app/services/duplicate_service.py` (detector, tiers, scoring)
  called from `IssueService.create`; new schema `DuplicateCandidate`; one
  new error code; one new enum; two project fields; one hand-written
  migration for the FTS table and triggers; optional `[semantic]` extra in
  `pyproject.toml`; eval script; CLI/MCP/frontend additions listed in 5.5.
* Entropy: **slightly up** (a new subsystem, a new optional dependency
  group) in exchange for **down** in the tracker's data. Converges the
  codebase in one respect: it reuses the structured-error, service-layer
  enforcement, and response-schema conventions rather than inventing any.
* Tension: releases it for triagers and for agents that currently have no
  idea whether something exists; adds a little for agents that hit a false
  positive, which is why the threshold defaults conservative and the
  override is one flag.

## 8. Open questions (answerable)

**Q1. Corpus scope.** A) same project only. B) whole team.
A is precise and matches identifier scoping; B catches the cross-project
"sync" duplicates but will false-positive on legitimate per-client forks.
Recommend **A**, with a `--all-projects` option on `issue similar` for
humans. Default if silent: A. Reply A or B.

**Q2. Default mode when a project enables detection.** A) `warn`. B) `block`.
A never stops work and gives us data; B is the point of the feature but
needs the eval first. Recommend **A** now, B for CHT after the shadow
period. Default if silent: A. Reply A or B.

**Q3. Semantic tier dependency policy.** A) optional extra
`chaotic-backend[semantic]` (numpy + model2vec, model downloaded once at
install, cached under `~/.chaotic/models`). B) vendor the 30 MB model into
the wheel so installs are fully offline. C) no semantic tier in v1.
A keeps the core install tiny and is still cost-free; B makes "local"
absolute at the price of wheel size and a licence file; C ships fastest but
lexical-only will miss paraphrases, which is most rediscovery duplicates.
Recommend **A**, with B as a follow-up if anyone runs an air-gapped
install. Default if silent: A. Reply A, B or C.

**Q4. Does `block` apply to humans in the web UI?** A) yes, same physics for
everyone. B) no: the UI shows candidates and lets the human click through;
`block` is enforced only for agent principals and non-interactive CLI
calls (the `X-Chaotic-Interactive` header already distinguishes these).
A is simpler and consistent; B matches the vision's "humans control the
environment, agents navigate it". Recommend **B**. Default if silent: B.
Reply A or B.

**Q5. Should an overridden create write a relation automatically?** A) yes,
`duplicate_of` writes `duplicates`, bare `allow_duplicate` writes
`relates_to` to the top candidate. B) only `duplicate_of` writes anything.
A makes every override leave a trace in the graph; B avoids a wrong
`relates_to` when the candidate was a false positive. Recommend **B**.
Default if silent: B. Reply A or B.

## 9. Out of scope for v1

Merging duplicates (moving comments/relations onto the survivor), detecting
duplicates on *update* (title edits), duplicate detection for documents, and
any hosted or paid model. Each is a separate ticket if v1 earns it.

## 10. Implementation tickets (to file after review)

1. Migration: `issue_fts` external-content table + triggers + rebuild on
   `chaotic system upgrade`. Precondition check for FTS5 at startup with a
   clear error.
2. `DuplicateService` tier 0 (exact + FTS5 + Jaccard), project fields, enum,
   error code, `IssueService.create` hook, fail-open, tests.
3. API/CLI/MCP surfaces: `allow_duplicate`, `duplicate_of`, `/similar`,
   `issue similar`, `issue_similar` tool, toolset snapshot, sync tests.
4. Frontend: creation-modal candidates and project settings.
5. Eval script + shadow-mode activity entries; two-week measurement on CHT.
6. Tier 1: `[semantic]` extra, `issue_embedding` table, backfill, calibration.
7. Tier 2: loopback-only LLM veto with timeout and fail-open.

# Issue queries

An issue query is a set of filter rows, Trac-style: each row is a field,
an operator and values. Rows combine with AND, and OR groups can nest.
One structure serves every client (CHT-1718):

- `chaotic issue list --where '...'` (the text form below);
- MCP `issue_list(where="...")`;
- `GET /api/projects/{project_id}/issues/query` and
  `GET /api/teams/{team_id}/issues/query`, the endpoint the others call
  and the one the web query builder (CHT-1746) will use.

The server owns the only parser. The CLI, MCP and a web URL all mean the
same thing by the same text.

## The text form

```
status=todo,in_progress priority!=low          both must hold
assignee=me or assignee=                       either may hold
(label=bug or type=bug) estimate=3..8          parentheses group
title~="login page"  text!~=wip  title^=Fix    text matching
created=-7d..   due=..2026-11-01               date ranges
```

- **Clauses** are `field op values`, separated by spaces. All of them must
  hold: AND. `and` may be written, but it is not needed.
- **`or`** between clauses means either. AND binds tighter than OR, so
  `a b or c` means `(a and b) or c`. Parentheses group.
- **Values** are comma-separated. A value with spaces, commas, quotes or
  parentheses goes in double or single quotes (`title~="a, b"`); a
  backslash escapes a quote inside them.
- In a shell, quote the whole query: `-w 'status!=done or assignee='`.
  Single quotes also stop bash from treating `!` as history.

### Operators

| Text | Structure | Meaning |
|---|---|---|
| `f=a,b` | `is` | is any of the values |
| `f!=a,b` | `is_not` | is none of them. For a field that can be empty, empty counts as "none of them". |
| `f=` | `empty` | has no value (no assignee, no sprint, no labels...) |
| `f!=` | `not_empty` | has a value |
| `f~=a` | `contains` | contains the text, case-insensitively |
| `f!~=a` | `not_contains` | does not contain it. An empty description contains nothing. |
| `f^=a` | `begins_with` | begins with the text, case-insensitively |
| `f=a..b` | `between` | in the range, both ends included (estimate and dates) |
| `f=a..` | `gte` / `after` | at least `a`, or on or after `a` |
| `f=..b` | `lte` / `before` | at most `b`, or on or before `b` |
| `label=a label=b` | `all` | has every one of the labels |

`title=x` and `text=x` read as `~=`: free text has no exact match.

### Fields

| Field | Operators | Values |
|---|---|---|
| `status` | `=` `!=` | backlog, todo, in_progress, in_review, done, canceled |
| `priority` | `=` `!=` | no_priority, low, medium, high, urgent |
| `type` | `=` `!=` | task, bug, feature, chore, docs, tech_debt, refactor, epic |
| `assignee`, `creator` | `=` `!=` empty | `me`, a name, an email or an id, of someone on the team |
| `project` | `=` `!=` | a project key, name or id in the team |
| `sprint` | `=` `!=` empty | a sprint name, an id, or `current` (each project's active sprint) |
| `label` | `=` (any) `!=` (none) all, empty | label names, case-insensitive |
| `estimate` | `=` `!=` ranges, empty | whole numbers, 0 to 1000000 |
| `parent` | `=` `!=` empty | an identifier (CHT-12) or id |
| `identifier` | `=` `!=` | identifiers |
| `created`, `updated` | ranges | dates |
| `completed`, `due` | ranges, empty | dates |
| `title` | `~=` `!~=` `^=` | text |
| `text` | `~=` `!~=` | text, matched in the title, the description and the identifier |

Aliases: `labels`, `issue_type`, `epic` (parent), `search` (text), `id`
(identifier), `due_date`.

**Dates** are in UTC. A day (`2026-10-01`, `today`, `yesterday`) covers the
whole day, so `due=2026-11-01` matches anything due that day and
`due=..2026-11-01` includes it. A datetime (`2026-10-01T09:00`) or an
offset back from now (`-12h`, `-7d`, `-2w`) is an instant. A day is
written `YYYY-MM-DD` and nothing else (not `20261001`, not `2026-W40-1`);
a datetime is `YYYY-MM-DDTHH:MM`, with optional `:SS`, fraction, and `Z`
or `+HH:MM`. A space in place of the `T` is also accepted; in the text, quote
the whole value, range and all (`created="2026-10-01 09:00.."`). It is
read as the `T` form, so the canonical text and the echoed structure
spell it with `T`. `..9999-12-31` means "with no upper end"; a datetime whose
offset puts it outside the years 1 to 9999 in UTC is a 400.

A name that matches nothing is an error, not an empty result. This
applies to a person, label, sprint, project or parent, and the message
names it. Names resolve only within the team being queried. Note the
difference from the plain filters: `chaotic issue list --label nosuch`
(no `--where`) lists nothing, while `--where label=nosuch` is a 400
saying there is no label `nosuch`. Two labels whose names differ only in
case (`Bug` and `bug`) are both matched by either name.

## The structure

The text parses to this JSON. The endpoint also accepts it directly, as
the `filter` parameter:

```json
{"match": "all", "rows": [
  {"field": "status", "op": "is", "values": ["todo", "in_progress"]},
  {"match": "any", "rows": [
    {"field": "assignee", "op": "is", "values": ["me"]},
    {"field": "assignee", "op": "empty", "values": []}
  ]}
]}
```

A row has `field`, `op` and `values`; a group has `match` (`all` or
`any`) and `rows`. Every field and operator is checked against an
allow-list. Limits: groups nest at most 4 deep (counted on the
structure, so redundant parentheses in the text cost nothing; the text
may nest at most 32 parentheses), a query has at most 50
rows, a row at most 100 values, a value at most 200 characters, the text
form at most 4000 characters, and `filter` at most 16000.

## The endpoint

```
GET /api/projects/{project_id}/issues/query
GET /api/teams/{team_id}/issues/query
    ?where=<text>&filter=<json>&order=<fields>&skip=0&limit=100
```

- `where` and `filter` are both optional. Given together, they are ANDed.
- `order` is up to 3 comma-separated fields, `-` for descending:
  `priority,-updated`. Fields: created, updated, priority, status, title,
  estimate, identifier, due, completed. Priority ascending puts urgent
  first, and status ascending runs in_progress, in_review, todo,
  backlog, done, canceled. Both match `issue list --sort ... --order asc`.
  Empty values sort last either way. The default is `-updated`.
- `limit` is 1 to 1000.
- Access is the issue list's: the same project and team checks, and the
  same scoping.

The response:

```json
{
  "query": {"filter": {...}, "order_by": [{"field": "priority", "direction": "asc"}]},
  "where": "status=todo,in_progress (assignee=me or assignee=)",
  "order": "priority",
  "total": 42, "skip": 0, "limit": 100,
  "issues": [ ...IssueResponse... ]
}
```

`query` is the normalized structure that ran, and `where`/`order` are its
canonical text. Parsing that text again selects the same issues in the
same order, but need not give back the identical structure: the text
form has no way to write some shapes, so it flattens a group nested in a
group of the same kind, drops a group of one row into its parent, and
writes `label` `all` with one value as `label=a`. A web page can
therefore keep `where` and `order` in its own URL, short and editable by
hand. A saved view should store `query`, which is exact. `total` counts
every match, so `total > skip + len(issues)` means there is another page.

A query that does not parse, fails validation, or names something that
is not there gets a 400. Its `detail` says what is wrong.

## In the CLI

```
chaotic issue list -w 'status!=done,canceled assignee=me or assignee='
chaotic issue list --all-projects -w 'sprint=current label=bug'
chaotic issue list -w 'updated=-2d..' --status todo --sort priority --order asc
```

`--where` may be repeated, and all of them must hold. Every other filter
flag still applies and is ANDed with the query, with the meaning it has
without `--where`. `--sort random` cannot be combined with `--where`.
Without `--sort`, results come most recently updated first. `--json`
prints the issue list.

## In MCP

`issue_list(where="...")` takes the same text. The tool's other filters
are ANDed with it. With `where`, the result also carries `total` and
`where` (the query as the server read it).

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
  estimate, identifier, due, completed, type, assignee, sprint, project.
  Priority ascending puts urgent first, and status ascending runs
  in_progress, in_review, todo, backlog, done, canceled. Both match
  `issue list --sort ... --order asc`. The rest of the fields order as
  follows (ascending; `-` reverses):
  - `type`: in the order the types are listed (task, bug, feature,
    chore, docs, tech_debt, refactor, epic), the order the vocabulary
    gives them in.
  - `assignee`: by the assignee's name, ignoring case.
  - `sprint`: sprints that have run (active or completed) in the order
    they were activated, then planned sprints, oldest created first. A
    sprint that ran before its activation time was recorded (migration
    0016) counts from its creation time. Across projects (team scope)
    sprints of different projects interleave by time; order by
    `project,sprint` to keep each project's sprints together.
  - `project`: by project key, ignoring case.

  Two different assignees, sprints or projects never interleave, even
  when they share a name, so grouping by any of these fields after
  ordering by it keeps each group together across pages.
  Empty values (no assignee, no sprint) sort last either way, as does
  an assignee whose user no longer exists. Ties fall back to newest
  created first. The default is `-updated`.
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

## The vocabulary

```
GET /api/issues/query/fields
```

This endpoint returns what a query may say: the tables above and the
limits, as JSON. It is built from the allow-list the query endpoints
validate against, so a query builder can use it for its row editors
instead of keeping its own copy (CHT-1783). It returns the same answer
to every signed-in caller, agents included. It contains no issues,
names or other data, only the vocabulary.

```json
{
  "fields": [
    {"name": "status", "kind": "enum", "ops": ["is", "is_not"],
     "enum_values": ["backlog", "todo", ...], "keywords": [], "aliases": []},
    {"name": "assignee", "kind": "user", "ops": ["is", "is_not", "empty", "not_empty"],
     "enum_values": null, "keywords": ["me"], "aliases": []},
    ...
  ],
  "ops": [
    {"name": "is", "min_values": 1, "max_values": 100, "text": "{field}=a,b"},
    {"name": "between", "min_values": 2, "max_values": 2, "text": "{field}=a..b"},
    {"name": "empty", "min_values": 0, "max_values": 0, "text": "{field}="},
    ...
  ],
  "match_values": ["all", "any"],
  "date_values": {
    "formats": ["YYYY-MM-DD", "YYYY-MM-DD[T ]HH:MM[:SS[.ffffff]][Z|+HH:MM|-HH:MM]"],
    "offset_units": {"h": "hours", "d": "days", "w": "weeks"},
    "max_offset": 9999
  },
  "order_fields": ["created", "updated", "priority", ...],
  "order_directions": ["asc", "desc"],
  "default_order": "-updated",
  "default_order_by": [{"field": "updated", "direction": "desc"}],
  "limits": {"max_depth": 4, "max_rows": 50, "max_values": 100,
             "max_value_length": 200, "max_order_terms": 3,
             "max_order_length": 200, "max_where_length": 4000,
             "max_parens": 32, "max_filter_json_length": 16000,
             "min_number": 0, "max_number": 1000000}
}
```

- **`kind`** says how a field's values are read, and so which value
  editor fits it. The kinds are `enum`, `user`, `project`, `sprint`,
  `label`, `number`, `issue` (an identifier or id), `identifier`, `date`
  and `text`.
- **`ops`** lists the operators the field accepts. Any other operator is
  a 400.
- **`enum_values`** lists every value an `enum` field accepts. It is
  null for the other kinds.
- **`keywords`** are words accepted in place of a value: `me` for a user
  field, `current` for sprint, and `today` and `yesterday` for a date.
  They match in any case (`ME`, `Today`). In a shared query `me` means
  whoever runs it.
- **`date_values`** describes the rest of a date's values: the absolute
  `formats`, and offsets back from now written `-N` and a unit from
  `offset_units` (`-7d`, `-2w`, `-12h`), with N from 0 to `max_offset`
  in ASCII digits.
- **`aliases`** are other names the text form accepts for the field.
- **`min_values`/`max_values`** give how many values a row with that
  operator takes. `empty` and `not_empty` take none, and `between` takes
  two.
- **`text`** is how the text form writes the operator: `{field}` stands
  for the field, and `a` and `b` stand for values. `all` is written as
  one `=` clause per value. `gte` and `after` share a form, and so do
  `lte` and `before`: the field's kind decides which one is meant.
  Three more things to know when filling it in:
  - a value with a space, comma, quote, parenthesis, `..`, or that is
    the word `or` or `and`, goes in double quotes (`sprint="Sprint 1"`),
    and a range is quoted whole (`created="2026-10-01 09:00.."`);
  - on a `text` or `title` field, `{field}=a` and `{field}!=a` mean
    `contains` and `not_contains`: free text has no exact match;
  - on a date field, `{field}=a` with one value means `between a a`,
    the whole of that day.
- **`match_values`**, **`order_directions`** and **`default_order_by`**
  are the group combinations, the order directions and the default
  order as structure, for a client that edits `filter` and `order_by`
  rather than text.

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

## In the web app

The Query page (`/query`, CHT-1810) runs the same endpoint and keeps the
query in its URL:

| Param | Meaning |
|---|---|
| `project` | the project to query (its id) |
| `scope=team` | query every project of the team instead ("All projects") |
| `where` | the where text. Absent means open issues (`status!=done,canceled`); present but empty means every issue. |
| `order` | the order text; absent means most recently updated first |
| `cols` | the table's columns, in order (identifier and title are always shown; unknown ids are ignored) |
| `group`, `view` | kept in the URL for grouping and saved views (CHT-1746) |
| `page` | the page of 100 results, from 1 |

After each run the page rewrites `where` and `order` with the server's
canonical text, so a copied link carries the text the CLI and MCP take.
Running a new where text, paging, or changing scope adds a history entry;
loading a URL and changing columns replace the current one. A query the
server rejects shows its 400 message under the where box and does not
change the URL. "Copy as CLI" gives the matching `chaotic issue list
--all-projects --where '...' --limit 100` command. `issue list` has no
`--project` option, so a project's query is copied as
`project=KEY (<where>)`, which selects the same issues whatever the CLI's
current project is. The CLI sorts by one field, so an order of several
terms is copied as its first term only (CHT-1817).

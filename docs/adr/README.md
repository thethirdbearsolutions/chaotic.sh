# Architecture Decision Records

ADRs capture the **why** behind non-obvious architectural choices. Each
ADR is a single Markdown file. Numbered sequentially. Once accepted,
they're append-only — superseded ADRs stay as history with a pointer
forward.

## Format

```markdown
# ADR-NNNN: Short title

* **Status**: Proposed | Accepted | Superseded by ADR-NNNN
* **Date**: YYYY-MM-DD

## Context
What's the problem? Why are we deciding something? What constraints
are in play?

## Decision
The thing we picked, stated as a sentence or two.

## Consequences
What changes downstream — code shape, future options preserved or
closed off, follow-ups created.

## Alternatives considered
What we rejected and why. The most useful section for future readers.
```

## Index

* [ADR-0001](0001-ritual-gates-intent-blockers.md): Ritual gates — intent + blockers state machine
* [ADR-0002](0002-service-layer-enforcement.md): Service-layer enforcement as the security boundary
* [ADR-0003](0003-chaotic-await-cli.md): `chaotic await` — agent-harness blocking primitive
* [ADR-0004](0004-stale-intent-ttl-takeover.md): Stale-intent TTL + takeover, and inline attestation (CHT-1326)
* [ADR-0005](0005-api-layer-returns-response-schemas.md): The API layer returns response schemas by construction (CHT-1348)
* [ADR-0006](0006-mcp-error-envelope.md): One MCP error envelope on both transports (CHT-1350)

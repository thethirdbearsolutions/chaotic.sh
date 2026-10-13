# ADR-0008: An API key names its principal and its holder (CHT-1537)

* **Status**: Accepted
* **Date**: 2026-10-13

## Context

An API key answers two questions: which user does it sign in as, and
which human answers for it. Agents are users with no team membership of
their own, so an agent's key is only as good as the membership of the
human behind it (CHT-1508/CHT-1510): leaving a team ends every agent key
you hold for it, and sign-in refuses one whose holder has left.

Until migration 0021 both answers were derived from `api_keys.user_id`
and `api_keys.agent_user_id`, whose meanings depended on each other.
`agent_user_id` set meant "signs in as the agent; `user_id` holds it".
`agent_user_id` NULL meant "signs in as `user_id`", which was either a
human's own key or an agent's legacy self-minted key, and for the latter
the holder lived nowhere in the row: it was the agent's
`users.parent_user_id`, and `user_id == agent` was the sentinel for it.
Sign-in, minting, revoking, listing, deactivating, deleting and member
removal each re-derived the rule, and the registration (CHT-1497) and
MCP OAuth (CHT-1515) work was about to add more identity columns beside
it.

## Decision

`api_keys` stores both answers explicitly:

* `principal_user_id` (NOT NULL): the user the key signs in as.
* `holder_user_id` (NULL): the human who answers for the key. For a
  human's own key, the human. For an agent's key, whoever minted it, or
  for a key the agent minted for itself, the holder of the key it called
  with. NULL only for a legacy key of an agent with no creator on
  record; an agent key with no holder never signs in.

Every reader uses the columns directly: sign-in loads the principal and,
for an agent, checks the holder's membership of the agent's team; "keys
of an agent" is `principal_user_id = agent`; "keys a person holds" is
`holder_user_id = person`. `APIKeyService.create(principal, ...,
holder_user_id=...)` is the one write path; it defaults the holder to
the principal (a human's own key) and raises for an agent's key minted
without one, since an agent holding its own key could never sign in.
Migration 0021 rebuilt the table once, resolving every legacy row by
the old rule (a legacy self-minted key gets the agent's creator as
holder).

A key whose principal or holder names a user that no longer exists
(possible where foreign keys were off) is deleted by 0021 rather than
refusing the upgrade: it provably cannot sign in, and a refusal would
leave the service down after `chaotic system upgrade`. Each deletion is
printed (prefix, id, missing user) in the upgrade's output, and the
upgrade's backup keeps the row. An unrecognised table shape is still
refused before anything is written.

## Consequences

* No reader needs to know a sentinel. A new consumer (registration's
  `registered_by_id`, OAuth tokens, per-key scopes) adds its own column
  next to two whose meaning does not depend on anything else.
* A legacy self-minted key's holder is now fixed at migration time
  rather than following `parent_user_id`. The only path that moves
  `parent_user_id` (a member's removal) revokes those keys in the same
  transaction, so no outcome changes. Such a key now appears in its
  creator's `GET /api-keys`, and its creator may revoke it.
* `AgentKeyResponse.legacy_self_minted` is always false and stays only
  so older clients keep parsing the response.
* Pre-#326 keys an admin minted for someone else's agent still record
  the creator as holder; nothing in the old rows could tell them apart.
  CHT-1529 tracks rotating them.

## Alternatives considered

* **Add the new columns and keep the old ones for a release.** Rejected:
  `user_id` is NOT NULL, so every insert would have to keep writing the
  ambiguous pair in step with the explicit one, which is the protocol
  this removes. Nothing outside this process reads the table, the server
  refuses a database whose migrations are behind or ahead of it, and
  `chaotic system backup` before `oxyde migrate` is the rollback, so a
  transition release would buy nothing.
* **Rename the columns in place.** Rejected: neither old column maps
  onto either new one (`user_id` is the holder of an agent key but the
  principal of a human's), so a rename would carry the old meaning under
  a new name.
* **Keep the columns and centralise the rule in one helper.** Rejected:
  every query that filters on keys (deactivate, delete, member removal)
  would still need two predicates per question, and the sentinel would
  still be one forgotten call away.

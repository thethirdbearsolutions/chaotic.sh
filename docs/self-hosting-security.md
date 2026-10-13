# Self-hosting security

Chaotic is designed to be self-hosted. This doc covers the network/auth
posture of that self-hosted server: what it binds to by default, what's
authenticated vs. not, and how to harden a real deployment. Written for
CHT-181.

## Current default: bind to loopback only

The server's bind address is the `host` setting in
[`backend/app/config.py`](../backend/app/config.py):

```python
host: str = "127.0.0.1"
```

Pydantic-settings maps this to the `HOST` env var (no prefix configured),
read from the process environment or a `.env` file next to `backend/`.
`port` works the same way (`PORT`, default `24267`).

**As of `0720a03` ("Bind to localhost by default instead of all
interfaces"), the default is `127.0.0.1`, not `0.0.0.0`.** That commit
changed both `config.py`'s default and `justfile`'s `serve-prod` recipe.
Every path that starts the server agrees on this:

- `just serve` (dev): `uvicorn app.main:app --reload --port 24267` — no
  `--host` flag, so uvicorn's own CLI default (`127.0.0.1`) applies.
- `just serve-prod`: `uv run uvicorn ... --host ${HOST:-127.0.0.1}
  --port ${PORT:-24267}`.
- `python -m app.main` (the `if __name__ == "__main__"` block in
  `backend/app/main.py`): `uvicorn.run("app.main:app", host=settings.host,
  port=settings.port, reload=settings.debug)` — reads the same
  `Settings.host` field.
- `chaotic system install` (the one-line installer's server setup): CLI
  flag `--host`, default `"127.0.0.1"` (`cli/src/cli/system.py`,
  `system_install`). It's written into the generated systemd unit /
  launchd plist as `Environment=HOST={host}`, so the service inherits
  whatever host you installed with.
- `website/install.sh`: honors `CHAOTIC_HOST` (default `127.0.0.1`) and,
  after install, prints an explicit opt-in path for wider exposure —
  `chaotic system reconfigure --host 0.0.0.0` — labeled `(Not recommended
  yet — this is alpha software!)`.

**Why `0.0.0.0` matters if you do opt into it:** binding to `0.0.0.0`
tells the OS to accept connections on *every* network interface, not
just loopback — your LAN IP, a VPN interface, a cloud instance's public
IP if it has one. `127.0.0.1` restricts the socket to processes on the
same machine (or a container's own network namespace). This is a raw
sockets fact, independent of any auth the app does — an unauthenticated
health check and an authenticated issue-mutation endpoint are equally
reachable from wherever the socket accepts connections.

One thing to flag if you're running dev vs. this doc's guidance: the
repo's own `CLAUDE.md` "Running the App" section documents starting the
backend with `--host 0.0.0.0` explicitly. That's a deliberate override of
the safe default (useful for testing from another device on your LAN)
written into a *contributor* doc, not the shipped default — don't copy
it into a production run without the hardening below.

## Auth posture: what's actually unauthenticated

Not every route requires a token. Grepping `backend/app/main.py` and
`backend/app/api/deps.py`, the following are reachable with no
credentials at all:

- `GET /` and the SPA fallback (`GET /{full_path:path}`) — serve the
  static frontend shell. No data. The fallback does not answer `/.well-known/*`:
  anything there that is not a document this server serves is a JSON
  404 (CHT-1550).
- `GET /static/*` — static assets (`StaticFiles` mount).
- `GET /api/version` — deploy metadata (git sha, commit time, build
  hashes). Explicitly commented as "unauthenticated on purpose — it's
  deploy metadata, not secrets."
- `GET /health` — process/DB liveness. Does a real `OxydeUser.objects.count()`
  round-trip and returns `status`/`db`/`version`/`git_sha`; no per-record
  data.
- `GET /cli-auth` — renders the CLI-login HTML page. It validates that
  the `callback` query param's hostname is `localhost`/`127.0.0.1`
  (rejects everything else with a 400) to prevent it being used as an
  open redirect, but the page render itself needs no token. The actual
  API-key issuance this page drives goes through the normal
  authenticated flow in the frontend JS.
- `POST /api/auth/*` (login, signup) — has to be reachable pre-auth by
  definition.

Everything else under `/api/*` goes through `get_current_user` in
`backend/app/api/deps.py`, which requires a `Bearer` credential that's
either a JWT (`decode_token`) or an API key (`ck_...`, validated via
`APIKeyService`) — a 401 if missing, a 403 if the resolved user is
inactive. The credential itself is resolved by
`backend/app/auth/credentials.py`, which `/mcp` shares (CHT-1560). The `/ws` WebSocket endpoint requires a valid token query param
and checks team membership before accepting. The `/mcp` mount
(`backend/app/mcp_server/asgi.py`) requires either a `Bearer` header or a
capability-URL API key path segment — no anonymous MCP access.

So: no ticket/project/team data is exposed unauthenticated today. What's
exposed is deploy metadata and liveness — low sensitivity, but still
requests an attacker can send to any reachable network interface. That's
the primary risk `0.0.0.0` adds: not "read your tickets," but
reconnaissance (confirm a Chaotic instance is running, get its version)
and, on shared or NAT'd networks, more surface for `/api/auth/*`
credential-stuffing or DoS against the DB round-trip in `/health`.

### API keys: verification cost and the 401 path

`ck_...` API keys are 256 bits from `secrets.token_hex`. Since CHT-1369
they are stored as `sha256$<hex>` and verified with a constant-time
compare (about a microsecond); keys created earlier are stored as bcrypt
hashes, still verify (off the event loop), and are re-hashed to SHA-256
on their next successful use, so no rotation is needed. Before that
change every request paid bcrypt's ~260 ms of CPU, and the stateless
`/mcp` transport re-authenticates on every tool call, so an agent's
three-call sequence was three bcrypt rounds and three `last_used_at`
writes; `last_used_at` is now written at most once per minute per key.

What that does and does not do for the unauthenticated 401 path
(`/mcp` with a wrong key, `/api/auth/*`): against a current row a wrong
`ck_` key costs the server a prefix lookup and a hash compare, so there
is no CPU amplification to abuse, and guessing a 256-bit key is not a
practical attack at any request rate. The exception is a key created
before CHT-1369 that its owner has not used since: until that first use
re-hashes it, each wrong guess that carries its 11-character prefix
still costs one bcrypt round in a worker thread. Prefixes are shown only
to the key's owner, so this needs a leaked prefix, and it ends the moment
the real key is used once (or the key is rotated). Password login
(`/api/auth/login`) still uses bcrypt on purpose (passwords are
low-entropy) and remains the one endpoint where request-rate limiting
matters. **Decision (CHT-1369):
the backend does not rate-limit; put that at the reverse proxy** (e.g.
nginx `limit_req` on `/api/auth/` and `/mcp`, or Caddy's `rate_limit`),
which sees the real client IP, survives restarts, and covers `/health`
too. An in-process per-IP counter behind a proxy would see one IP for
everyone; a per-key-prefix counter would let an attacker lock a real key
out with wrong guesses.

## Hardening, in priority order

1. **Keep the default: bind to loopback, put a TLS-terminating reverse
   proxy in front.** This is the standard "app talks loopback-only, the
   proxy talks to the network" pattern — nginx, Caddy, or similar
   listening on 443, proxying to `127.0.0.1:24267`. The proxy is what
   should be internet-facing, not uvicorn directly. Nothing in this repo
   ships or configures a reverse proxy for you (no nginx/Caddy config or
   systemd unit checked in) — this is on you if you're exposing the
   server beyond your own machine.

2. **If you don't want a reverse proxy, firewall the app port instead.**
   Only do this if you're not also flipping `HOST` to `0.0.0.0` for a
   good reason — an OS firewall is a second line of defense, not a
   substitute for binding to loopback in the first place. See the `ufw`
   section below.

3. **Set a strong `SECRET_KEY`.** The default value
   (`"change-me-in-production-use-openssl-rand-hex-32"`, the literal
   `Settings.secret_key` default) signs JWTs. The app already refuses to
   boot on it outside debug mode — `backend/app/main.py`'s lifespan
   startup check:

   ```python
   if settings.secret_key == INSECURE_DEFAULT_KEY:
       if settings.debug:
           logger.warning(...)  # OK for local dev
       else:
           raise RuntimeError(
               "Refusing to start with default SECRET_KEY in production mode. "
               "JWT tokens would be signed with a publicly-known key. ..."
           )
   ```

   In other words: this is already fail-loud in production (`debug=False`,
   the non-dev default), not something you need to remember to check —
   but you do need to actually set `SECRET_KEY` (e.g. `python -c "import
   secrets; print(secrets.token_hex(32))"`) for the server to start at
   all outside dev mode. `debug=True` local dev accepts the default key
   with a logged warning, since there's nothing to protect on localhost.

4. **Use HTTPS end to end if the instance is reachable over any network
   you don't fully trust.** Chaotic's own server doesn't terminate TLS —
   that's the reverse proxy's job (point 1). Without it, JWTs and API
   keys travel in the clear over Bearer headers.

## CORS and browser-based MCP clients

`CORS_ORIGINS` (default `*`) sets the app-wide CORS policy. A list of
explicit origins is the hardened setting: only those origins can call the
API from a browser, with credentials allowed. It also turns on the mcp
SDK's DNS-rebinding guard on `/mcp`, keyed to the same list
(`_transport_security()` in `backend/app/mcp_server/asgi.py`): a request
to `/mcp` whose `Origin` header is not listed gets a 403 `Invalid Origin
header`, and its `Host` must match one of the listed origins. Requests
with no `Origin` (Claude Code, curl, any server-side client) pass the
`Origin` check.

With `OAUTH_ENABLED` on (CHT-1551, `backend/app/oauth/cors.py`):

- The OAuth discovery documents (`/.well-known/oauth-protected-resource`,
  `/.well-known/oauth-protected-resource/mcp`,
  `/.well-known/oauth-authorization-server`) and the token, register and
  revoke endpoints answer any origin with `Access-Control-Allow-Origin: *`
  and no credentials, whatever `CORS_ORIGINS` says. None of them reads a
  cookie, so this exposes nothing a server-side client could not already
  fetch. `/oauth/authorize` keeps the app-wide policy: clients navigate to
  it rather than fetching it.
- `/mcp` responses carry `Access-Control-Expose-Headers: WWW-Authenticate`,
  so browser code at an allowed origin can read the 401 challenge's
  `resource_metadata` link instead of probing well-known paths.

With it off, CORS is exactly the app-wide policy everywhere.

claude.ai and other hosted connectors do discovery and the token exchange
server-side, so none of this affects them. It matters for clients whose
OAuth flow runs in the browser, such as [MCP
Inspector](https://github.com/modelcontextprotocol/inspector):

- **Proxy mode** (Inspector's default) sends `/mcp` traffic from its local
  proxy process, with no `Origin` header, so it works with any
  `CORS_ORIGINS`. Prefer it.
- **Direct mode** calls `/mcp` from the Inspector page. With an explicit
  `CORS_ORIGINS`, add the page's origin to the list, e.g.
  `CORS_ORIGINS=https://tracker.example.com,http://localhost:6274`, and
  restart. Without it the browser's CORS preflight for `/mcp` fails, and
  an authenticated request that got past it would get the SDK guard's 403. Listing an
  origin also grants it credentialed CORS access to the whole `/api`, so
  list only origins you trust, and remove it when you are done. With the
  default `CORS_ORIGINS=*` direct mode needs no change.

## OAuth client registration

With `OAUTH_ENABLED` on, MCP clients register in one of two ways
(CHT-1518):

- **Client ID Metadata Documents** (claude.ai, Claude Code, ChatGPT): the
  client's `client_id` is an `https` URL, and the server fetches the JSON
  document behind it. Because an unauthenticated caller picks that URL,
  the fetch connects only to public addresses (never loopback, private,
  link-local or CGNAT ones, checked after DNS resolution) on port 443
  only, follows no redirects, and gives up after 3 seconds or 16 KB (on
  the wire: a compressed response is refused, and so is one that isn't
  `application/json`). It also ignores `HTTPS_PROXY`, since a proxy
  would resolve the name again, so the server needs direct outbound
  HTTPS to the client's host. Documents are cached for their
  `Cache-Control: max-age`, between 5 minutes and 24 hours. A document's
  redirect URIs must be `https`, loopback `http`, or a native app's
  reverse-domain scheme (`com.example.app:/cb`). Fetches of new client
  IDs are limited to `OAUTH_CIMD_FETCH_MAX_PER_IP_PER_HOUR` (default 30)
  per source address, and at most `OAUTH_CIMD_MAX_PENDING_CLIENTS`
  (default 500) never-authorized documents are kept. Both in-memory
  limits here, and `OAUTH_AUTHORIZE_MAX_PER_IP_PER_MINUTE` (default 30)
  on `/oauth/authorize`, are per server process, and each remembers
  at most 10,000 addresses, so an attacker with more addresses than that
  (IPv4 addresses or IPv6 /64s) can outrun them; the caps on stored
  clients still hold.
- **Dynamic client registration** (`POST /oauth/register`, RFC 7591), for
  older clients. It is unauthenticated by design, so it is limited:
  `OAUTH_DCR_MAX_PER_IP_PER_HOUR` (default 10) registrations per source
  address, and at most `OAUTH_DCR_MAX_PENDING_CLIENTS` (default 500)
  clients that have never been used to authorize. Those are refused 24
  hours after they register and deleted shortly after. A "source
  address" is an IPv4 address or an IPv6 /64. Behind a reverse proxy every request has the
  proxy's address, so the per-address limit becomes a server-wide one
  unless uvicorn is run with `--proxy-headers` and `--forwarded-allow-ips`.
  Set `OAUTH_DCR_ENABLED=false` to turn registration off; clients that
  use metadata documents don't need it.

## Firewall example (ufw)

If you're running the server on a VPS/box with a public IP and you've
opted into `HOST=0.0.0.0` (or just want defense in depth even on
`127.0.0.1`, in case something later rebinds it), lock the app port down
explicitly and only expose what a reverse proxy needs:

```bash
# Default deny incoming, allow outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Let yourself in
sudo ufw allow ssh          # or: sudo ufw allow 22/tcp

# If you're running a TLS reverse proxy in front, expose only that:
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp        # if you need it for ACME HTTP-01 challenges

# Explicitly deny the app port from the public internet -- it should
# only ever be reached via the proxy on loopback, never directly.
sudo ufw deny 24267/tcp

sudo ufw enable
sudo ufw status verbose
```

If you have no reverse proxy and are (against the recommendation above)
running with `HOST=0.0.0.0` directly on a public interface, replace the
`deny 24267/tcp` line with a scoped allow instead, e.g. `sudo ufw allow
from <your-ip-or-cidr> to any port 24267`.

## Open questions for maintainers

These are options CHT-181 asked us to consider. Both are real product
decisions, not yet made — this doc documents current behavior, it
doesn't decide these:

1. **Should `HOST` default to `127.0.0.1` be non-overridable, or made
   harder to accidentally widen?** It already defaults there today (see
   above) — the open question is really about the *opt-in* path:
   `chaotic system reconfigure --host 0.0.0.0` and `CHAOTIC_HOST` in the
   installer make it a single flag to widen exposure, with only a
   printed warning ("Not recommended yet — this is alpha software!") as
   friction. Options: leave as-is (trusts the operator, matches "alpha
   software" framing), add a confirmation prompt or `--i-understand-the-risk`
   flag on `reconfigure --host 0.0.0.0`, or require a reverse-proxy /
   TLS check before allowing it. Tradeoff: more friction here is exactly
   the kind of "safe by default, painful to misconfigure" property you'd
   want, but it also makes the legitimate LAN/VPN-testing case (the one
   `CLAUDE.md`'s own dev instructions use) more annoying.

2. **Should every route require auth, including `/health` and
   `/api/version`?** Today they're deliberately open (see "Auth posture"
   above) for operational reasons — external uptime monitors and deploy
   tooling need to hit `/health` without a credential, and `/api/version`
   is treated as non-secret deploy metadata. Requiring auth here would be
   a breaking change for any existing monitoring setup and for
   `cli/src/cli/system.py`'s own `health_check`/`get_health` helpers
   (which currently poll unauthenticated). Options: leave as-is (low
   sensitivity, matches common practice for health/version endpoints),
   gate behind an optional shared secret / IP allowlist specifically for
   monitoring, or require auth and give monitoring tooling a
   service-scoped API key. This is a breaking-change-risk-vs-safer-default
   tradeoff the same shape as (1); no default has been chosen.

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

- `just serve` (dev): `uvicorn app.main:app --reload --port 24267
  --no-proxy-headers` — no `--host` flag, so uvicorn's own CLI default
  (`127.0.0.1`) applies.
- `just serve-prod`: `uv run uvicorn ... --host ${HOST:-127.0.0.1}
  --port ${PORT:-24267}`.
- `python -m app.main` (the `if __name__ == "__main__"` block in
  `backend/app/main.py`): `uvicorn.run("app.main:app", host=settings.host,
  port=settings.port, reload=settings.debug, proxy_headers=False)` — reads the same
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
`backend/app/auth/credentials.py`, which `/mcp` shares (CHT-1560). The `/ws` WebSocket endpoint
goes through the same resolver (`backend/app/ws_auth.py`, CHT-1603) and
checks team membership before registering the socket for any broadcast.
A refused handshake is accepted and closed at once, with nothing sent,
so the client gets the close code (4001 sign in again, 4003 forbidden;
CHT-1615). What a client should do with each outcome is the client
contract in [ws-client-contract.md](ws-client-contract.md) (CHT-1646). A failed check (a database outage, say) is an HTTP 503 with
`Retry-After` on the handshake instead (CHT-1637): a browser sees it as
1006 and backs off, which is what an old web bundle needs. The access
log shows a closed refusal as accepted; each refusal is logged on
`app.ws_auth` (WARNING: code, reason, client address, team, how it was
sent, never the credential), which is the line to watch for token
guessing. That line is rate-limited: the first for each client, code,
reason and outcome is written, then at most one a minute, which says how
many were not and when they happened; and at most 100 such lines a
minute in all, past which refusals are counted into one summary line a
minute. Those counts are written with a later refusal, so the last ones
of a flood that stops wait for the next (CHT-1641). A failed check's
traceback is always logged the first time for each kind of failure (call
site, exception type and message), then at most once a minute per kind.
uvicorn's own access lines for each handshake (two INFO lines for a 429)
are not limited, so a flood still grows the access log (CHT-1640). A
client that never answers the close frame holds its connection for the
server's close timeout (10 s), where a 403 drops it at once, so each
server process (each uvicorn worker) caps the refusals in flight: past 8
in 10 s from one client, or 256 in all, a refusal is an HTTP 429 with
`Retry-After`, which drops the connection at once (CHT-1635). A client
is an IPv4 address or an IPv6 /64, so the IPv4 clients behind a NAT64
gateway share one cap, as do those behind one NAT. While the total cap
is full, every refused client gets the 429, so a tab whose credential
has expired keeps retrying instead of signing out until the flood ends;
a good credential is never refused, so never throttled. Behind a reverse
proxy the client address is taken from its forwarding headers only if
`FORWARDED_ALLOW_IPS` trusts the proxy (loopback is trusted by default);
an untrusted proxy makes every client share one cap. A trusted proxy
that forwards something other than an IP address makes each such string
a client of its own, still bounded by the total cap and the line budget.
/ws takes the credential from an
`Authorization: Bearer` header on the upgrade request, or from a
`chaotic.bearer.<token>` entry in `Sec-WebSocket-Protocol` (the web app's
way, offered beside `chaotic`), so it stays out of the URL. The old
`?token=` query parameter still works but is deprecated, and logs a
warning. Agents are refused there, whatever their credential. While the
socket is open the check is repeated every `WS_AUTH_RECHECK_SECONDS`
(default 30): a revoked or expired credential, a deactivated user, or a
member removed from the team is closed at the next check. The `/mcp` mount
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

## Server settings on an installed server: `chaotic system config`

A server set up with `chaotic system install` keeps its settings in
`~/.chaotic/server.json` (under `$CHAOTIC_HOME` if you set it), and
every command that writes the service file (systemd unit or launchd
plist) writes them into it as environment variables: `install`,
`reconfigure`, `upgrade`, and `system config` itself (CHT-1592). So a
setting survives every rewrite of the file. An install with no settings
gets exactly the service file it got before, and `upgrade` changes
nothing about it. Settings never stop an upgrade: an entry in server.json
the server would refuse (a hand edit, say) is named and left out of the
regenerated file, or the file is kept as it is if leaving it out would
drop a line already there, and the server is started either way.

```bash
chaotic system config list                 # every setting: its value, or the server default
chaotic system config get APP_BASE_URL     # one value; exit 1 if not set
chaotic system config set NAME VALUE       # validate, save, rewrite the service file
chaotic system config unset NAME           # back to the server default
chaotic system config check                # exit 1 on a setting the server would not start with
chaotic system config adopt [NAME ...]     # move lines set by hand in the unit or a drop-in into server.json
chaotic system install --config NAME=VALUE ...   # the same, at install time
```

A change takes effect when the server restarts (`chaotic system stop`
then `chaotic system start`); `set` says so. The names it knows are
`OAUTH_ENABLED`, `APP_BASE_URL`, `FORWARDED_ALLOW_IPS`,
`MCP_CAPABILITY_URL_ENABLED`, `OAUTH_DCR_ENABLED`, `CORS_ORIGINS`,
`SMTP_HOST`/`PORT`/`USER`/`PASSWORD`/`FROM`, `PUSH_ALLOW_PRIVATE_ENDPOINTS`
and `VAPID_PRIVATE_KEY` (see "Push notifications" below). Each value is checked by the
rules the server applies (for `APP_BASE_URL`, only values its OAuth
issuer check accepts; a backend test pins that), so a typo fails at
`set`, not at the next start. Any other name needs `--force`; `SECRET_KEY`, `HOST`, `PORT`,
`DATABASE_URL`, `DATABASE_PATH` and `PATH` are never settings (use
`reconfigure` for host and port). A value may not contain whitespace,
quotes, a backslash or `%`, which a service file cannot carry as is, nor
invalid UTF-8. The values of `SMTP_PASSWORD` and `VAPID_PRIVATE_KEY`, and of any name
set with `--force`, are never printed.

**Secrets.** A command-line argument is visible to every user on the
machine in the process list (`ps`, `/proc/<pid>/cmdline`) while the
command runs, which for `install` is minutes, and it lands in your shell
history. So do not pass `SMTP_PASSWORD` (or any secret) as `--config` or
as a `set` argument on a shared host. Give `set` the value `-` to read it
from standard input instead (one trailing newline is dropped):

```bash
read -rs PW && printf '%s\n' "$PW" | chaotic system config set SMTP_PASSWORD -
chaotic system config set SMTP_PASSWORD - < ~/smtp-password   # or from a 0600 file
```

The value ends up in `server.json` and the service file, both readable
only by you (0600).

`list` and `check` also say where something else disagrees with
server.json: a variable added to the service file by hand, one set in a
systemd drop-in (which overrides server.json), and one in
`~/.chaotic/server/backend/.env` (which the service file's value
overrides). `check` judges the settings as the server gets them, the
service file with its drop-ins applied, so a capability URL turned off
in a drop-in is not reported as still served; where server.json would
give something else once it is written to the file, it reports that
too, prefixed "Once server.json is written to the service file". A
service file whose `HOST` or `PORT` is not what server.json says is an
error: until they agree, `set` and `upgrade` leave the file alone, and
`reconfigure` would write server.json's value into it (CHT-1676). So is
a drop-in that sets `HOST`, `PORT`, `SECRET_KEY`, the database or
`PATH`, which would override whatever `reconfigure` writes; and a value
in the unit or a drop-in the server would refuse. Only
`~/.config/systemd/user/chaotic.service.d/` is read, and a drop-in that
resets the environment (an empty `Environment=`, `UnsetEnvironment=`,
`EnvironmentFile=`) gets a warning that `check` cannot vouch for it.

**Turning OAuth on.** Behind a TLS-terminating reverse proxy at
`https://chaotic.example.com`:

```bash
chaotic system config set APP_BASE_URL https://chaotic.example.com
chaotic system config set OAUTH_ENABLED true
chaotic system config set MCP_CAPABILITY_URL_ENABLED false   # once no connector uses /mcp/<key>
chaotic system config check
chaotic system stop && chaotic system start
```

`APP_BASE_URL` comes first: `set OAUTH_ENABLED true` refuses while it is
missing, because the server would not start. It becomes the OAuth issuer
and the base of every URL the discovery documents advertise, and clients
compare it as an exact string, so it must be the public origin exactly
as clients reach it: `https` (plain `http` only on a loopback host, which
only a client on the same machine can use), the public host name in
lower case, no path and no trailing slash (`set` drops a trailing
slash), and no default port (`:443`). Set `FORWARDED_ALLOW_IPS` too if
the proxy runs on another machine (see "Behind a reverse proxy" below).
To check from outside: `curl
https://chaotic.example.com/.well-known/oauth-authorization-server`
returns JSON whose `issuer` is exactly `APP_BASE_URL`.

**Lines added to the unit by hand.** Before this, the only way to set
these was an `Environment=` line added to the unit, which made every
later `upgrade` report "Service file not updated" and leave the unit
alone. `chaotic system config list` names such lines, and those in a
drop-in. `chaotic system config adopt` copies every known setting the
unit or a drop-in sets, and server.json does not, into server.json with
the value the server runs with, then rewrites the unit so upgrades
update it again. Name a setting to adopt it over a different
server.json value, or, with `--force`, one the CLI does not know.
Drop-ins are never edited: delete the adopted lines from them afterwards
(`adopt` names them), leaving the drop-in for what is not a setting,
such as `TimeoutStopSec`. If the unit's host or port also disagrees
with server.json, `adopt` saves server.json and stops there; then run
`chaotic system reconfigure --host <the one you want>`, which now has
nothing hand-set to drop. `reconfigure` itself refuses to replace a unit
whose rewrite would drop or change a hand-set line (`--force` does it
anyway), and keeps the previous file in `~/.chaotic/service-backups`.

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

Both checks compare origins by exact string, so the server stores each
entry in the form a browser sends: `https://Tracker.example.com:443/`
becomes `https://tracker.example.com` (CHT-1707), and the guard compares
`Host` without regard to case. An entry that is not an origin at all (a
path, query, fragment or credentials, no scheme, a bad port) is logged
as an ERROR at startup and kept as written, where it matches nothing;
`chaotic system config check` reports it too. With `*` in the list the
other entries are not judged, and `null` is kept as is.

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
  address" is an IPv4 address or an IPv6 /64. Behind a reverse proxy it
  is the client the proxy names in `X-Forwarded-For`, provided the proxy
  is listed in `FORWARDED_ALLOW_IPS` (see "Behind a reverse proxy"
  below); otherwise every request has the proxy's address and the
  per-address limit becomes a server-wide one.
  Set `OAUTH_DCR_ENABLED=false` to turn registration off; clients that
  use metadata documents don't need it.

One client is neither: the **Chaotic Android app** is built into the
server (CHT-1602, `backend/app/oauth/builtin.py`). Its `client_id`,
`builtin:sh.chaotic.android`, is not a URL, so nothing is fetched for it
and no outbound access is needed; its redirect,
`sh.chaotic.android:/oauth2redirect`, comes from the code, not from
anything stored or published. The same metadata is published at
`https://chaotic.sh/oauth/android-client.json` for reference only; the
server never reads it.

Residual risk: that redirect is a private-use URI scheme, which any
Android app on the same phone can also register. A malicious app could
start the sign-in itself and, if the person approves the page, receive a
session acting as them. The consent page does not claim the request
comes from the official app, and tells the person to continue only if
they just started signing in from it. Moving to a verified https
redirect (Android App Links) closes this and is planned before release.

An admin can disable the app by setting `is_active` to false on its
`oauth_clients` row. That blocks new sign-ins and refreshes at once, but
access tokens already issued keep working until they expire (at most 10
minutes). To end a sign-in immediately, revoke its session: each person
can in Connected Apps (an admin-wide bulk revocation is CHT-1449).

## Behind a reverse proxy: `FORWARDED_ALLOW_IPS`

A request that reaches the app through a reverse proxy arrives from the
proxy's address. The app believes the proxy's `X-Forwarded-For` (the
client's address) and `X-Forwarded-Proto` only when the request comes
from an address in `FORWARDED_ALLOW_IPS` (CHT-1586): a comma-separated
list of IP addresses and CIDR networks, default `127.0.0.1,::1`.

- **Proxy on the same machine** (the recommended setup above): nothing
  to set. Each client is counted under its own address by the OAuth
  limits.
- **Proxy elsewhere** (another host, a container): set
  `FORWARDED_ALLOW_IPS` to the proxy's address, e.g.
  `FORWARDED_ALLOW_IPS=10.0.0.5`. Prefer the proxy's single address to
  a network: listing a container network such as `172.18.0.0/16` lets
  every container on that network claim to be any client.
- **No proxy, served directly**: set `FORWARDED_ALLOW_IPS=` (empty) if
  anything on the machine itself could otherwise claim an address.

The client address is the right-most entry in `X-Forwarded-For` that is
not itself a listed proxy, so a value a client sent ahead of the
proxy's own is ignored. The proxy must set or append the header (nginx:
`proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` Caddy
does it by default).

**You own this list.** Every address in it can claim to be any client.
Apart from `*` and `/0`, the app does not judge how wide a list is (a
width check would be cosmetic: two `/1` networks cover everything a `/0`
does). An entry that is not usable is dropped, and the server logs an
error naming it and keeps serving with the rest. That covers `*`,
`0.0.0.0/0` and `::/0` (each means every sender), a host name, and a
network with host bits set such as `10.0.0.1/8`. If nothing usable is
left, it trusts only `127.0.0.1,::1`. Dropping an entry only ever
narrows trust.

Every start path in this repo (`just serve-prod`, `just serve`,
`python -m app.main`) turns off uvicorn's own forwarded-header handling,
so this list, read from the environment or `backend/.env`, is the only
one applied. uvicorn has a variable of the same name, which it reads
from the process environment only; if you run uvicorn by hand, pass
`--no-proxy-headers` too, or the two can disagree.

## The capability URL: `MCP_CAPABILITY_URL_ENABLED`

`/mcp/<api-key>` takes an API key in the URL, for MCP clients that can
send only a URL (see `docs/agents.md`). It is deprecated in favour of
OAuth (CHT-1522; design doc "MCP OAuth and token service: design" §5):

- `MCP_CAPABILITY_URL_ENABLED=true` (the default for now): served as
  before. Its responses carry `Deprecation: @1791849600` (RFC 9745;
  2026-10-13) and a `Link` to this section with `rel="deprecation"`;
  the one exception is a 500 from an unhandled error, which Starlette
  sends outside the app's middleware. The server logs a warning at
  startup.
- `MCP_CAPABILITY_URL_ENABLED=false`: `/mcp/<key>` answers 404 to every
  method, whether or not the key is valid, without the key being
  looked up. `/mcp` with an `Authorization` header is unaffected.

Either way the key is scrubbed from the logged request path, including
on `/mcp/<key>/` and `/mcp/<key>/anything`, which always answer 404
(CHT-1587). Any other path segment, in an HTTP or a WebSocket request,
that starts with a prefix this server mints (`ck_`, `cat_`, `crt_`, ...)
and is long enough to be a secret is scrubbed too. That catches
`//mcp/<key>` from a base URL with a trailing slash, `/mcp//<key>` and
`/MCP/<key>`; those still route as they did before (they never reach
the capability URL). So a key in the path does not reach this server's
access or error log. Query strings are not scrubbed, and logs upstream
of the server, such as a reverse proxy's, are another matter.

The default becomes `false` in the release that ships OAuth for MCP,
and the route is removed two releases after that. Moving a connector
off it: add it again by URL and authorize, then revoke the old key
(`chaotic auth keys revoke <key-id>`).

## OAuth tokens

An approved connection gets its tokens from `POST /oauth/token`
(CHT-1520): an access token (`cat_…`, 10 minutes) and, when the app asked
for `offline_access`, a refresh token (`crt_…`) that is replaced on every
use. Presenting a refresh token a second time, outside a 30-second grace
window for concurrent refreshes, revokes the whole connection, since it
means the token was copied. `POST /oauth/revoke` (RFC 7009) lets the app
end its own connection.

Every connection's tokens act as an agent and are accepted only at
`/mcp` (design decision D2), with one exception: the built-in Android
app's (above). Its tokens act as the person who signed in, account-wide
(the session has no team: every request is gated per team by that
person's membership at that moment, as for their web login), are issued
for the whole server (`resource` is `APP_BASE_URL`), and are accepted on
REST and `/ws` but never at `/mcp`. A member removed from a team, or a
team deleted, does not end an app sign-in; deactivating or deleting the
person does. Everything that would outlive the sign-in is refused to it
(403 `app_session_refused`): API keys, agent keys and agent
registration, team invitations and accepting them, creating a team,
changing a member's role, turning on an agent's `can_register`,
reactivating an agent, and changing or deleting the account. A client
that is not the built-in app cannot get such a token: the code is
refused when minted, when redeemed and when used.

The token and revoke endpoints read their parameters from a form-encoded
request body only, and refuse a request that has any query string. Codes,
tokens and client secrets therefore never appear in a URL, and so never
in uvicorn's access log or a reverse proxy's. Responses are sent with
`Cache-Control: no-store`.

For a client that puts a credential in a URL anyway, the server scrubs
the request lines uvicorn logs: HTTP requests on `uvicorn.access` and
WebSocket handshakes on `uvicorn.error` (CHT-1590, CHT-1597). The value
of a query parameter named `token`, `access_token`, `refresh_token`,
`key`, `api_key`, `client_secret`, `code`, `code_verifier`, `password`,
`secret`, `jwt` or `id_token` (any case) is logged as `[redacted]`. This includes the login token the web app
sends as `/ws?token=`. Any key, token or client secret this server
issues (`ck_`, `cat_`, `crt_`, `cac_`, `cct_`, `ccs_` followed by 64 hex
characters) is shortened to its prefix and last four characters, such as
`ck_...19a0`, wherever it appears in the path or query, percent-encoded
or not. Only the log line changes: the app still receives the real
request. A path or query longer than 8 KB is logged only as its size,
for example `?[60000-byte query omitted]`, so a crafted URL cannot make
the scrub expensive. The app installs this filter itself, so every way of
starting it is covered. Logs written outside this process, such as a reverse
proxy's or a CDN's, are not scrubbed.

## Connected apps and revocation

Each person sees the OAuth connections they approved under **Settings >
Connected Apps** in the web app, or with `chaotic auth connections list`,
and can disconnect any of them. Each app is labelled exactly as the
consent screen labelled it (recognized, identified by its website's host,
or unverified), so an unverified app calling itself "Claude" says so (`chaotic auth connections revoke <id>`;
REST: `GET` and `DELETE /api/oauth/connections`). Only their own: someone
else's connection is a 404. An agent cannot list or revoke any, and
neither can any OAuth access token, whoever it acts as. This
works with `OAUTH_ENABLED` off too, so turning OAuth off never stops
anyone ending a connection. A disconnected app's next request fails.
The Android app's sign-ins are listed one per device, with the name the
app gave the device; signing one out also deletes that device's push
registration (CHT-1625), and its open `/ws` sockets close.

Connections also end on their own when what they depended on goes
(CHT-1523), in the same transaction as the change:

- **An API key revoked**: the connections claimed with that key, and the
  unused claim tickets it minted.
- **An agent deactivated, retired with its registrar, or deleted**: every
  connection acting as it.
- **A member removed from a team, or leaving it**: every connection they
  approved in that team, the ones claimed with their keys there, and the
  keys themselves (as before).
- **A person's account deleted**: every connection they approved.
- **A team deleted**: every connection in it.

Each action is recorded as one row in the `revocation_events` table, with
counts.

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

## Push notifications

The Android app registers a Web Push endpoint, issued by a UnifiedPush
distributor such as ntfy, at `PUT /api/push/devices/{installation_id}`,
and the server POSTs encrypted notifications to it. Because a signed-in
person chooses that URL, it is checked when registered: it must be
`https`, at most 2048 characters, carry no credentials or fragment, and
its host must be, or resolve only to, public addresses. Loopback,
private, link-local, CGNAT, multicast and reserved addresses are refused,
including their IPv4-in-IPv6 forms. The check is made again before
every notification is sent, against the setting as it is then, and the
server connects to the address it checked (certificate and SNI still
for the name, no redirects, no proxy), so a name that later resolves to
an internal address, or a private endpoint registered while the setting
below was on, gets nothing.

What a notification carries: the inbox entry's id and kind, the issue
identifier, the title (up to 200 characters) and the ritual id; never a
token, a comment body or a description. When the entry is settled
elsewhere (a gate approved, an issue deleted), a second message tells
the app to withdraw it. A device whose push service answers 404 or 410
is deleted; other failures are retried (never sooner than its
`Retry-After`, and not at all when that asks for more than 30 seconds)
and counted on the device. Proxy variables are ignored for these
requests; `SSL_CERT_FILE` and `SSL_CERT_DIR` are honoured, so an ntfy
behind an internal CA can be trusted by pointing them at that CA. They
*replace* the default certificate bundle rather than adding to it, as
they do for OpenSSL: a file that holds only your internal CA makes every
public push service (ntfy.sh, Google's FCM, Mozilla's autopush) fail
verification. Point `SSL_CERT_FILE` at a bundle that holds the public
roots and your CA, for example the system bundle with your CA appended
(`cat "$(python -m certifi)" internal-ca.pem > push-ca-bundle.pem`).

If your ntfy runs on the same machine or your LAN, set
`PUSH_ALLOW_PRIVATE_ENDPOINTS=true`. That admits loopback, private
(RFC 1918), IPv6 unique-local and CGNAT addresses; link-local,
unspecified, multicast and reserved addresses, and the cloud metadata
addresses (169.254.169.254, fd00:ec2::254, 100.100.100.200 and the
like), stay refused. Any signed-in person can then make this server POST
to internal https services, so turn it on only where every account is
trusted.

Web Push requests are signed with a VAPID key (RFC 8292). By default it
is derived from `SECRET_KEY`, so push needs no setup, but rotating
`SECRET_KEY` also rotates it and every phone must register again. To
keep it fixed, set `VAPID_PRIVATE_KEY` to a P-256 private key: its 32
raw bytes in base64url, or a PEM in the environment. Notification
payloads are encrypted to each device's own keys (RFC 8291), so VAPID
does not protect their content. Each request names a contact for the
push service (VAPID's `sub`): `VAPID_SUBJECT` (a `mailto:` or `https:`
URL) if set, else `APP_BASE_URL` when it is https. Some push services
refuse requests without one.

A device goes away when you remove it in Settings, when the API key or
app session it was registered with is revoked, or when its account is
deleted. It also stops getting notifications (Settings shows it as
paused) once the credential it was last registered with expires, a web
or CLI login included, or once the VAPID key changes, until the app
registers it again. Each new device, and each new endpoint for an
existing one, puts a "New device" entry in the person's inbox, so a
device registered with a stolen login does not go unnoticed. That
notice is always pushed to the person's devices: its preference cannot
be turned off, so the stolen credential cannot mute it first. A
`chaotic system config check` and the server's startup both refuse a
`VAPID_PRIVATE_KEY` that is not a P-256 key.

On the phone (CHT-1612), the app registers with whichever UnifiedPush
distributor the person has installed (ntfy, NextPush, Sunup and others;
the Android build uses no Google Play Services, Firebase or other
proprietary code), each time it comes on screen. When the server's VAPID
key changes it registers again with the new key, keeping its own
subscription keys; whether the endpoint changes is up to the
distributor, and the server records the device again either way, which
is what brings a paused device back. The subscription's
private key is made and kept by the UnifiedPush connector library,
sealed with an Android Keystore key; the app never logs an endpoint, a
key or a message. Notifications are private on the lock screen: one
that hides sensitive content shows only that something is waiting. The
exception is a gate or review waiting on you, which has Approve, Reject
and Reject-with-note buttons (CHT-1665). Approve and Reject (which sends
the note "Rejected from phone") are meant to work from the lock screen
without unlocking; the app asks for no unlock of its own. Typing a note
for Reject with note may still ask you to unlock on a secure lock screen:
whether Android allows inline replies there is up to the phone, and this
has not yet been checked on a device (CHT-1684). Its hidden-content version shows the kind and the
issue (`Gate waiting on you · CHT-12`) so you can see what the buttons
decide, but never the entry's text. A button acts only when the account
it was posted for is still signed in, and only on an entry in that
account's cache. Anyone holding the phone can press these buttons. On a
phone with no distributor the app says so once, and syncs the inbox in
the background every 15 minutes instead, notifying about what that
brings in. The app's tests decrypt bodies made by the server's own
encryption (`android/testdata/web-push-vectors.json`, which
`backend/tests/test_push_vectors.py` keeps in step with the server).

What the distributor can do. Messages reach the app through the
distributor app, and Web Push has no replay protection, so the
distributor (or anyone holding the endpoint's push-service topic) is
trusted with more than it can read. It cannot forge a notification: the
app shows only a message that decrypts with the subscription's keys,
which the distributor never holds. It can make the app sync, by
delivering anything (bounded to one background sync at a time, plus
one in the open app). It can replay an old message: a stale entry notification can
reappear until the app next syncs its inbox, and a replayed "resolved"
can withdraw a notification that is still current (the entry stays in
the inbox). It can also hand the app an endpoint of its own choosing,
which only stops push for that phone. These are properties of Web Push,
not of Chaotic, and the reason a notification carries no more than a
kind, an issue identifier and a title. A sign-out that cannot reach the
server leaves the device registered there until the session lapses;
the server keeps posting messages the phone can no longer decrypt,
since sign-out deletes the subscription keys.

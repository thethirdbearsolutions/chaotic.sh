# `/ws` client contract: how a refused handshake ends

This is the contract a `/ws` client (the web app, the native app, anything
else that follows the live feed) can rely on when the server refuses it
or closes it. It is frozen: the server may add outcomes a client already
handles as "retry", but it will not change what the ones below mean
without a new version of this page (CHT-1646).

The server side is `backend/app/ws_auth.py` (`refuse`, `authenticate`,
`watch`) and the `/ws` endpoint in `backend/app/main.py`. The two clients
that implement this contract are `frontend/src/ws.js` (web) and
`android/core-auth/src/main/kotlin/sh/chaotic/auth/ws/WsReconnectPolicy.kt`
(native, CHT-1610). How the server logs and rate-limits refusals is in
[self-hosting-security.md](self-hosting-security.md).

## Connecting

`GET /ws?team_id=<team id>` as a WebSocket upgrade, with the credential
in one of these (in the order the server reads them):

1. `Authorization: Bearer <token>` on the upgrade request (native clients).
2. A `Sec-WebSocket-Protocol` entry `chaotic.bearer.<token>`, offered
   alongside `chaotic` (browsers, which cannot set other headers). The
   server selects `chaotic` and never echoes the bearer entry.
3. `?token=<token>`: deprecated (CHT-1603). It still works, but the URL
   reaches access and proxy logs. Do not use it in a new client.

A credential presented in more than one place must be the same in each,
or the handshake is refused (4001). Agents are refused whatever their
credential (4003): `/ws` is the feed of people's own clients.

## The five ways a refusal ends

| # | What the client sees | Meaning | What to do |
|---|---|---|---|
| 1 | The socket **opens**, then closes at once with **4001** | The credential was not accepted: missing, malformed, of a kind `/ws` does not take, unknown, expired, revoked, or its user no longer exists; or two different credentials were presented. | **Terminal for this credential.** Never reconnect with the same token. Get a new one (refresh, or sign in again) and connect with that; if none can be had, sign out. |
| 2 | The socket **opens**, then closes at once with **4003** | The credential is good but may not watch this feed: the user is deactivated or an agent, the credential's scope does not allow reading, it has no access to `team_id`, or `team_id` is missing. | **Terminal.** Stop reconnecting to this team. A new token will not help; a different team, or the user's own action (reload, switch team), may. |
| 3 | The upgrade gets **HTTP 503** with `Retry-After`, before any open | The server could not complete the credential check (a database outage, say). Nothing is known about the credential. | **Retry** after the larger of your backoff and `Retry-After`. |
| 4 | The upgrade gets **HTTP 429** with `Retry-After`, before any open | Too many refusals in flight from this client (an IPv4 address or IPv6 /64: more than 8 in 10 s), or from everyone (more than 256), in this server process. The credential was not examined. | **Retry** after the larger of your backoff and `Retry-After` (at least 5 s). Do not treat it as a credential failure. |
| 5 | A bare **HTTP 403** on the upgrade (native), or **close 1006** with no code (browser) | Either case 3 or 4 seen by a browser, which is never shown the HTTP status; or, on a server whose ASGI server lacks the WebSocket denial-response extension (`websocket.http.response`; uvicorn has it), a refusal over the caps of case 4. | **Retry with backoff.** A real 4003 always arrives as a close code, never as an HTTP 403, so a 403 on the handshake is transient. |

Without the denial-response extension a failed check (case 3) is not an
HTTP 503: the server accepts the socket and closes it with **4011**
instead. Treat 4011 exactly as 503: retry with backoff.

Other HTTP 4xx answers to the upgrade (404 on a server with no `/ws`, a
400 for a malformed upgrade) say there is no feed to connect to: stop.
Anything with no close frame and no HTTP answer (the network dropped, a
timeout) is transient: retry with backoff.

### Why a refusal opens first

A close sent before the server accepts never reaches the client as a
code: the server turns it into an HTTP 403 whatever the code, and a
browser sees any failed handshake as close 1006. Then the web app could
not tell "sign in again" from "forbidden". So cases 1 and 2 accept the
handshake (selecting `chaotic` if it was offered, as on a good one),
send nothing, and close with the code at once (CHT-1615). The code
reaches a browser as `CloseEvent.code` and OkHttp as
`onClosing(code, ...)`, the same way a close on a long-open socket does.
Cases 3 and 4 stay HTTP statuses because they can come in floods and a
status drops the connection at once (CHT-1637, CHT-1635).

## `onopen` does not mean the credential was accepted

Because cases 1 and 2 open before they close, a client must not treat
`onopen` (`onOpen` in OkHttp) as success. A client that clears its
backoff, or resyncs over REST, on `onopen` reconnects and refetches in a
tight loop against a refusal.

Count a connection as **established**, and only then reset backoff and
run any "reconnected" work, once **either**:

- a server message has arrived, or
- the socket has stayed open for **1000 ms** (`WS_OPEN_SETTLE_MS` in
  `frontend/src/ws.js`, `OPEN_SETTLE_MILLIS` in `WsReconnectPolicy`).

A refusal closes well inside that window. A socket that closes before
it is established is still part of the same outage: keep growing the
backoff.

## Closes on an open socket

The server re-checks the credential while the socket is open, every
`WS_AUTH_RECHECK_SECONDS` (30 by default), and closes it at once when a
revocation commits in the same process (CHT-1616). It uses the same
codes, with the same meaning:

- **4001**: the key or session was revoked, the token expired, or the
  user was deleted. An OAuth access token lives ten minutes, so this is
  how a native client's socket normally ends: refresh and reconnect at
  once (no delay for the first 4001 after an established connection).
- **4003**: the user was deactivated, removed from the team, or the team
  was deleted.
- **4011**: the re-check itself failed. Retry with backoff.

Any other close (1001 when the server shuts down, 1006 when the network
drops) is transient: retry with backoff.

## What the reference clients do

- **Web (`frontend/src/ws.js`)**: on 4001 it signs out if storage still
  holds the token the socket was opened with, else (another tab signed
  in since) it just stops; on 4003 it stops and the badge says live
  updates have stopped; anything else, including 1006 for cases 3 to 5,
  backs off (1 s doubling to 30 s, with jitter) and retries. It cannot
  read `Retry-After`. A browser cannot refresh its login JWT, which is
  why 4001 signs it out.
- **Native (`WsReconnectPolicy`)**: 4001 asks the session for a new
  token and reconnects only if it got a different one, backing off on
  repeated 4001s and stopping after 3 in a row with no established
  connection between them; 4003 stops; 503 and 429 retry after the
  larger of the backoff and `Retry-After` (capped at 15 minutes); a
  handshake 403 and 4011 retry with backoff; other HTTP 4xx stop.

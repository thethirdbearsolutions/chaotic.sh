"""Automatic per-session identity for Claude Code (CHT-1499).

When a profile sets ``"session_identity": "auto"`` (or the environment
sets ``CHAOTIC_SESSION_IDENTITY=auto``) and ``CLAUDE_CODE_SESSION_ID`` is
set, the configured credential is treated as a *registrar*: it is used
only to register the session identity ``claude-code:session:<id>``
(``POST /agents/register``, CHT-1498) and every other request is sent
with that identity's own key. The CLI and ``chaotic mcp`` share this,
because both go through ``cli.client.Client``.

The rules:

1. The session key is cached at ``~/.chaotic/sessions/<hash>.json``
   (0600, in a 0700 directory), one slot per (session ref, server,
   registrar key), and per team too when a person is the registrar. A cache file that is a symlink or not a
   regular file, not ours, readable by anyone else, in a directory that
   is not ours alone, or about to expire is not used. The registrar key
   and server come from the profile or the environment, never from a
   repository's ``.chaotic``.
2. Registering is serialised per session ref by an exclusive ``flock``
   on a sibling ``.lock`` file (and a thread lock inside one process,
   for the MCP server's worker threads). The server revokes an
   identity's other keys on every registration, so two processes of the
   same session registering at once would otherwise revoke each other's
   key in turn. Whoever takes the lock second re-reads the cache and
   uses what the first one saved.
3. A 401 for the session key re-registers once (``refresh``); a second
   401 is an error.
4. A failed registration is an error. The registrar credential is never
   used for anything but ``GET /auth/me`` and ``POST /agents/register``:
   nothing falls back to it (the server refuses a registrar's writes
   anyway, spec I8).

5. With ``CHAOTIC_REGISTRAR_KEY_VIA=header`` (or the profile's
   ``"registrar_key_via": "header"``, CHT-1906) no registrar key is held
   here at all: a cloud environment's proxy injects it as
   ``X-Chaotic-Registrar-Key`` on every request to the server, and the
   server reads that header on ``POST /agents/register`` only. Register
   is then sent with no ``Authorization``, and every other request with
   the session key in ``X-Chaotic-Key`` and no ``Authorization``: the
   proxy drops a client's ``Authorization`` on a host it injects a
   secret for (CHT-1913).
   No ``/auth/me`` as the registrar (the header authenticates nothing
   else), so the server names the identity after its registrar.

Off by default: without the setting, or without ``CLAUDE_CODE_SESSION_ID``,
nothing here runs and the configured credential is used as before.
"""
from __future__ import annotations

import fcntl
import hashlib
import json
import os
import secrets
import stat
import subprocess
import threading
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path

import httpx

from cli import config as _config

SESSION_ENV = "CLAUDE_CODE_SESSION_ID"
MODE_ENV = "CHAOTIC_SESSION_IDENTITY"
SETTING = "session_identity"
REF_PREFIX = "claude-code:session:"
MODES = ("auto", "off")
# A key this close to expiring is renewed before use rather than after a 401.
EXPIRY_MARGIN = timedelta(seconds=60)
# Server limits on AgentRegister (app.schemas.agent).
REF_MAX = 200
NAME_MAX = 255

NO_FALLBACK = "Not falling back to the registrar key."

VIA_ENV = "CHAOTIC_REGISTRAR_KEY_VIA"
VIA_SETTING = "registrar_key_via"
VIAS = ("local", "header")
REGISTRAR_KEY_HEADER = "X-Chaotic-Registrar-Key"
# Where header mode sends the session key (CHT-1913): the proxy that
# injects the registrar header drops the client's own Authorization.
KEY_HEADER = "X-Chaotic-Key"
# The cache slot's registrar fingerprint in header mode: the key itself
# is never seen here, so every proxied registrar shares one slot per
# (session, server).
HEADER_FP = "via-header"


class SessionIdentityError(Exception):
    """Session identity could not be set up. Carries the HTTP status and
    server detail when a server refusal caused it."""

    def __init__(self, message: str, status_code: int | None = None, detail=None):
        super().__init__(message)
        self.status_code = status_code
        self.detail = detail


# One thread lock per process: the stdio MCP server runs tool calls on
# worker threads that share this module. flock does not exclude threads
# of one process from each other when they open the lock file separately.
_thread_lock = threading.Lock()


def mode() -> str:
    """'auto' or 'off'. The environment overrides the profile, so a cloud
    environment can turn it on without writing a profile, and a person
    can turn it off for one command (`CHAOTIC_SESSION_IDENTITY=off
    chaotic auth whoami` shows the registrar). Only the global profile
    file is read, not a repository's `.chaotic`: which credential signs
    requests is a property of the machine's profile."""
    raw = os.environ.get(MODE_ENV)
    source = MODE_ENV
    if raw is None:
        raw = _config.load_global_config().get(SETTING)
        source = f"the profile's {SETTING!r}"
    if raw is None or raw == "":
        return "off"
    value = str(raw).strip().lower()
    if value not in MODES:
        raise SessionIdentityError(f"{source} must be 'auto' or 'off', not {raw!r}.")
    return value


def registrar_key_via() -> str:
    """'local' (the configured key is the registrar's) or 'header' (a
    proxy injects it as X-Chaotic-Registrar-Key, CHT-1906). The
    environment overrides the profile, like `mode()`; a repository's
    `.chaotic` is never read."""
    raw = os.environ.get(VIA_ENV)
    source = VIA_ENV
    if raw is None:
        raw = _config.load_global_config().get(VIA_SETTING)
        source = f"the profile's {VIA_SETTING!r}"
    if raw is None or raw == "":
        return "local"
    value = str(raw).strip().lower()
    if value not in VIAS:
        raise SessionIdentityError(f"{source} must be 'local' or 'header', not {raw!r}.")
    return value


def set_registrar_key_via(value: str) -> None:
    """Write the profile's setting ('local' or 'header')."""
    if value not in VIAS:
        raise SessionIdentityError(f"{VIA_SETTING} must be 'local' or 'header', not {value!r}.")
    cfg = _config.load_global_config()
    if value == "local":
        cfg.pop(VIA_SETTING, None)
    else:
        cfg[VIA_SETTING] = value
    _config.save_global_config(cfg)


def has_proxied_identity() -> bool:
    """Will requests carry a credential even with no key configured here:
    a session identity whose registrar key the proxy supplies? Errors in
    the settings count as yes, so the request itself reports them."""
    try:
        return registrar_key_via() == "header" and active_ref() is not None
    except SessionIdentityError:
        return True


def proxied_ref() -> str | None:
    """This session's ref when its registrar key comes from the proxy
    (header mode), else None. Then the session identity is the only
    credential there is: lookups the stdio MCP server would make with the
    configured key (its default team, its project scope) go as the
    session, and are keyed on HEADER_FP. Settings errors read as None
    here; the request itself reports them."""
    try:
        if registrar_key_via() != "header":
            return None
        return active_ref()
    except SessionIdentityError:
        return None


_suspension = threading.local()


@contextmanager
def suspended():
    """Send the configured credential itself for the duration: for a
    command whose caller *is* the registrar (`agent register`)."""
    previous = getattr(_suspension, "on", False)
    _suspension.on = True
    try:
        yield
    finally:
        _suspension.on = previous


def set_mode(value: str) -> None:
    """Write the profile's setting ('auto' or 'off')."""
    if value not in MODES:
        raise SessionIdentityError(f"{SETTING} must be 'auto' or 'off', not {value!r}.")
    cfg = _config.load_global_config()
    if value == "off":
        cfg.pop(SETTING, None)
    else:
        cfg[SETTING] = value
    _config.save_global_config(cfg)


def active_ref() -> str | None:
    """The external_ref to act as, or None when session identity is off
    or this is not a Claude Code session."""
    if getattr(_suspension, "on", False):
        return None
    session_id = os.environ.get(SESSION_ENV)
    if not session_id:
        return None
    if mode() != "auto":
        return None
    ref = REF_PREFIX + session_id.strip()
    if len(ref) > REF_MAX or not all("!" <= c <= "~" for c in ref) or ref == REF_PREFIX:
        raise SessionIdentityError(
            f"{SESSION_ENV} is not a usable session id (printable ASCII, no spaces, "
            f"at most {REF_MAX - len(REF_PREFIX)} characters). {NO_FALLBACK}"
        )
    return ref


def missing_session_notice() -> str | None:
    """A warning for `chaotic mcp` to print (on stderr) when
    session_identity is auto but this process has no session id, so it
    will act with the configured key itself (a registrar's key can only
    read). None when there is nothing to say."""
    if os.environ.get(SESSION_ENV):
        return None
    try:
        if mode() != "auto":
            return None
    except SessionIdentityError as exc:
        return f"chaotic: {exc}"
    return (
        f"chaotic: session_identity is auto but {SESSION_ENV} is not set in this process, so "
        "requests use the configured key itself. A registrar's key can only read."
    )


def sessions_dir() -> Path:
    # Read at call time so a patched GLOBAL_CONFIG_DIR (tests) applies.
    return Path(_config.GLOBAL_CONFIG_DIR) / "sessions"


def cache_path(ref: str, api_url: str, registrar_fp: str, team_id: str | None) -> Path:
    """This session's slot for one (server, registrar, team). Keyed on
    all four so two profiles, registrars or servers used in one session
    each keep their own key instead of re-registering over each other
    (each registration revokes the identity's previous key, and counts
    against the registrar's hourly cap). The team matters for a person
    acting as registrar, who registers in the current team."""
    slot = "\n".join((ref, api_url, registrar_fp, team_id or ""))
    return sessions_dir() / f"{hashlib.sha256(slot.encode()).hexdigest()[:16]}.json"


def team_hint_path(ref: str, api_url: str, registrar_fp: str) -> Path:
    """Where this session remembers the team a person registrar with no
    current team registered in (CHT-1691), so a later process finds the
    session key without asking /auth/me and /teams again."""
    slot = cache_path(ref, api_url, registrar_fp, None)
    return slot.with_name(f"{slot.stem}.team.json")


def _hinted_team(ref: str, api_url: str, registrar_fp: str) -> str | None:
    record = read_cache(team_hint_path(ref, api_url, registrar_fp))
    if not record or (record.get("external_ref"), record.get("api_url"), record.get("registrar")) != (
            ref, api_url, registrar_fp):
        return None
    team_id = record.get("team_id")
    return team_id if isinstance(team_id, str) and team_id else None


def registrar_settings() -> tuple[str | None, str]:
    """The registrar credential and server URL: from the environment or
    the profile, never from a repository's `.chaotic`. A `.chaotic` that
    sets a different key or URL is an error rather than silently
    ignored: the person meant something by it."""
    glob = _config.load_global_config()
    local = _config.load_local_config()
    default_url = f"http://localhost:{_config.DEFAULT_PORT}/api"
    via_header = registrar_key_via() == "header"

    def effective(name, value):
        # Compare what each value means: an unset URL is the default one,
        # and a trailing slash names the same server.
        if name == "api_url":
            return (value or default_url).rstrip("/")
        return value

    for name, env in (("api_key", "CHAOTIC_API_KEY"), ("token", "CHAOTIC_TOKEN"), ("api_url", "CHAOTIC_API_URL")):
        if os.environ.get(env) or (via_header and name != "api_url"):
            continue
        if local.get(name) and effective(name, local.get(name)) != effective(name, glob.get(name)):
            raise SessionIdentityError(
                f"This directory's .chaotic sets its own {name}, which session_identity auto does not use: "
                f"the registrar's key and server come only from the profile or the environment. Remove "
                f"{name} from .chaotic, or set CHAOTIC_SESSION_IDENTITY=off here. {NO_FALLBACK}"
            )
    # In header mode the registrar key is the proxy's, and a key
    # configured here is not used for the session (only outside one).
    credential = None if via_header else (
        os.environ.get("CHAOTIC_API_KEY") or glob.get("api_key")
        or os.environ.get("CHAOTIC_TOKEN") or glob.get("token")
    )
    api_url = (os.environ.get("CHAOTIC_API_URL") or glob.get("api_url") or default_url).rstrip("/")
    return credential, api_url


def fingerprint(credential: str) -> str:
    """Which registrar credential a cached key came from, without storing
    the credential itself."""
    return hashlib.sha256(credential.encode()).hexdigest()[:16]


# -- the cache file ---------------------------------------------------------

def _ensure_dir() -> bool:
    """Create or check the sessions directory. False when it had to be
    tightened, so nothing already in it may be trusted."""
    d = sessions_dir()
    d.parent.mkdir(parents=True, exist_ok=True)
    try:
        d.mkdir(mode=0o700)
    except FileExistsError:
        pass
    st = os.lstat(d)
    if stat.S_ISLNK(st.st_mode) or not stat.S_ISDIR(st.st_mode):
        raise SessionIdentityError(f"{d} must be a directory, not a link or a file. {NO_FALLBACK}")
    if st.st_uid != os.getuid():
        raise SessionIdentityError(f"{d} is owned by another user. {NO_FALLBACK}")
    if st.st_mode & 0o077:
        # Others could write here until now: tighten it, and trust none
        # of what is already in it.
        os.chmod(d, 0o700)
        return False
    return True


def _dir_trusted() -> bool:
    """Is the sessions directory one we may read keys from: a real
    directory (not a link), ours, and closed to everyone else? Checked
    before every read, not only when creating it."""
    try:
        st = os.lstat(sessions_dir())
    except OSError:
        return False
    return (
        stat.S_ISDIR(st.st_mode) and not stat.S_ISLNK(st.st_mode)
        and st.st_uid == os.getuid() and not st.st_mode & 0o077
    )


def read_cache(path: Path) -> dict | None:
    """The cached record, or None when there is none or it must not be
    trusted: an untrusted directory, a symlink, anything but a regular
    file (a FIFO would block the open), another owner, readable by
    others, not JSON."""
    if not _dir_trusted():
        return None
    try:
        fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    except OSError:
        return None
    try:
        st = os.fstat(fd)
        if not stat.S_ISREG(st.st_mode) or st.st_uid != os.getuid() or st.st_mode & 0o077:
            return None
        with os.fdopen(fd, "r") as f:
            fd = None
            data = json.load(f)
    except (OSError, ValueError):
        return None
    finally:
        if fd is not None:
            os.close(fd)
    return data if isinstance(data, dict) else None


def write_cache(path: Path, record: dict) -> None:
    """Atomically replace `path` with `record`, created 0600 (never a
    window with wider permissions, never following a planted link)."""
    tmp = path.with_name(f".{path.name}.{os.getpid()}.{secrets.token_hex(4)}.tmp")
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(record, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def _parse_time(value) -> datetime | None:
    if not isinstance(value, str):
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def same_slot(record: dict | None, ref: str, api_url: str, registrar_fp: str, team_id: str | None) -> bool:
    """Was `record` written for this very slot (belt and braces: the
    file name already hashes these)?"""
    return bool(record) and (
        record.get("external_ref"), record.get("api_url"), record.get("registrar"), record.get("team_id"),
    ) == (ref, api_url, registrar_fp, team_id)


def usable(record: dict | None, ref: str, api_url: str, registrar_fp: str, team_id: str | None) -> bool:
    if not record or not isinstance(record.get("api_key"), str) or not record["api_key"]:
        return False
    if not same_slot(record, ref, api_url, registrar_fp, team_id):
        return False
    expires = _parse_time(record.get("expires_at"))
    if record.get("expires_at") is not None and expires is None:
        return False
    return expires is None or expires - EXPIRY_MARGIN > datetime.now(timezone.utc)


@contextmanager
def _locked(path: Path):
    """This session's registration lock: the thread lock, then an
    exclusive flock on `<cache>.lock`."""
    with _thread_lock:
        lock_path = path.with_suffix(".lock")
        fd = os.open(lock_path, os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW, 0o600)
        try:
            fcntl.flock(fd, fcntl.LOCK_EX)
            yield
        finally:
            os.close(fd)  # releases the flock


# -- registering ------------------------------------------------------------

def _server_error(response: httpx.Response) -> tuple[str, object]:
    try:
        detail = response.json().get("detail")
    except Exception:
        detail = None
    if isinstance(detail, dict):
        return detail.get("message") or str(detail), detail
    return (str(detail) if detail else f"HTTP {response.status_code}"), detail


def _registrar_call(method: str, url: str, credential: str | None, body: dict | None = None) -> dict:
    """One request with the registrar credential. Only this module makes
    them, and only to /auth/me, /teams and /agents/register. With no
    `credential` (header mode) it carries no Authorization, and the
    proxy's X-Chaotic-Registrar-Key is the credential."""
    headers = {"Content-Type": "application/json", "X-Chaotic-Interactive": "0"}
    if credential:
        headers["Authorization"] = f"Bearer {credential}"
    with httpx.Client() as client:
        response = client.request(method, url, headers=headers, json=body)
    if response.is_success:
        try:
            return response.json()
        except ValueError:
            raise SessionIdentityError(
                f"Session identity registration: the server returned a non-JSON body. {NO_FALLBACK}",
                status_code=response.status_code,
            )
    message, detail = _server_error(response)
    if response.status_code == 401 and not credential:
        message = (
            f"no usable registrar key reached the server ({message}). With {VIA_ENV}=header the "
            f"environment's proxy must add {REGISTRAR_KEY_HEADER} to requests to this server: check "
            "the network secret's host and header name, and that the key is not revoked"
        )
    elif response.status_code == 401:
        message = (
            f"the configured key was rejected ({message}); it may be revoked or its holder "
            "deactivated; check `chaotic auth set-key`"
        )
    raise SessionIdentityError(
        f"Session identity registration failed: {message.rstrip('.')}. {NO_FALLBACK}",
        status_code=response.status_code, detail=detail,
    )


def _workspace_label() -> str:
    """The git branch, or the working directory's name outside a branch."""
    try:
        branch = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True, text=True, timeout=5,
        ).stdout.strip()
    except (OSError, subprocess.SubprocessError):
        branch = ""
    if branch and branch != "HEAD":
        return branch
    return Path.cwd().name or "session"


def default_name(registrar_name: str) -> str:
    """`<registrar> · <branch> · <6 random hex>`. The tail was the
    session id's first 6 characters until CHT-1869, which showed every
    teammate part of a ref only admins may see. It is random now; the
    server uses a default name only to name a new identity, so a later
    registration of the same session never changes it."""
    name = f"{registrar_name} · {_workspace_label()} · {secrets.token_hex(3)}"
    return name[:NAME_MAX]


def _whoami(credential: str, api_url: str) -> dict:
    return _registrar_call("GET", f"{api_url}/auth/me", credential)


def _registrar_team(credential: str, api_url: str) -> str:
    """The person registrar's only team, asked with its own key (the
    session key is what is being registered), through the per-process
    lookup the stdio MCP server shares (CHT-1691). Several or none is an
    error that says what to run. It does not become the CLI's current
    team."""
    teams = _config.accessible_teams(
        api_url, credential, lambda: _registrar_call("GET", f"{api_url}/teams", credential))
    if len(teams) == 1:
        return teams[0]["id"]
    if teams:
        options = ", ".join(f"{t.get('name')} ({t.get('key')})" for t in teams)
        raise SessionIdentityError(
            f"session_identity is auto but no team is selected, and the registrar is in several "
            f"teams ({options}): run `chaotic team use <key>`. {NO_FALLBACK}"
        )
    raise SessionIdentityError(
        f"session_identity is auto but no team is selected (`chaotic team use`). {NO_FALLBACK}"
    )


def _register(ref: str, credential: str, api_url: str, team_id: str | None, me: dict) -> dict:
    """Register `ref` with the registrar `credential` (`me` is its
    /auth/me). The label goes as `default_name`, which names a new
    identity and never renames an existing one, so a rename by hand
    survives every later registration, from any slot."""
    body: dict = {"external_ref": ref}
    if me.get("is_agent"):
        if me.get("kind") == "session" or me.get("registered_by_id"):
            raise SessionIdentityError(
                f"The configured key is the session identity {me.get('name')!r}, not a registrar. "
                f"Set the registrar's key, or turn session_identity off. {NO_FALLBACK}"
            )
        if not me.get("can_register"):
            raise SessionIdentityError(
                f"The configured key's agent {me.get('name')!r} is not a registrar. Its creator or a "
                f"team admin can make it one, signed in as themselves: "
                f"`CHAOTIC_SESSION_IDENTITY=off chaotic agent update {me.get('name')!r} --registrar` "
                f"(or Make registrar in the web app's Agents page). Or set CHAOTIC_SESSION_IDENTITY=off "
                f"to use this key as is. {NO_FALLBACK}"
            )
    else:
        # A person registers for themself, in the current team.
        if not team_id:
            raise SessionIdentityError(
                f"session_identity is auto but no team is selected (`chaotic team use`). {NO_FALLBACK}"
            )
        body["team_id"] = team_id
    body["default_name"] = default_name(me.get("name") or "Claude Code")
    reg = _registrar_call("POST", f"{api_url}/agents/register", credential, body)
    agent = reg.get("agent") or {}
    if not reg.get("api_key"):
        raise SessionIdentityError(f"Session identity registration returned no key. {NO_FALLBACK}")
    return {
        "external_ref": ref,
        "api_url": api_url,
        "registrar": fingerprint(credential),
        "team_id": team_id,
        "registrar_is_agent": bool(me.get("is_agent")),
        "api_key": reg["api_key"],
        "api_key_id": reg.get("api_key_id"),
        "expires_at": reg.get("expires_at"),
        "agent_id": agent.get("id"),
        "agent_name": agent.get("name"),
        "registered_at": datetime.now(timezone.utc).isoformat(),
    }


def _register_via_header(ref: str, api_url: str) -> dict:
    """Register `ref` with the registrar key the proxy injects (CHT-1906).
    No default_name: without /auth/me this process does not know the
    registrar's name, and the server's own default names it."""
    try:
        reg = _registrar_call("POST", f"{api_url}/agents/register", None, {"external_ref": ref})
    except SessionIdentityError as exc:
        if exc.status_code == 422 and "team_id" in str(exc):
            # A person's key as the network secret: a person registers in
            # a team, which this mode never names.
            raise SessionIdentityError(
                f"Session identity registration failed: {VIA_ENV}=header needs an agent registrar's key "
                f"in {REGISTRAR_KEY_HEADER} (`chaotic agent create --registrar`), not a person's. {NO_FALLBACK}",
                status_code=exc.status_code, detail=exc.detail,
            ) from exc
        raise
    agent = reg.get("agent") or {}
    if not reg.get("api_key"):
        raise SessionIdentityError(f"Session identity registration returned no key. {NO_FALLBACK}")
    return {
        "external_ref": ref,
        "api_url": api_url,
        "registrar": HEADER_FP,
        "team_id": None,
        "registrar_is_agent": True,
        "api_key": reg["api_key"],
        "api_key_id": reg.get("api_key_id"),
        "expires_at": reg.get("expires_at"),
        "agent_id": agent.get("id"),
        "agent_name": agent.get("name"),
        "registered_at": datetime.now(timezone.utc).isoformat(),
    }


def _session_key_via_header(ref: str, api_url: str, failed_key: str | None) -> str:
    """`session_key` in header mode: one slot per (session, server), the
    same lock and cache rules, and no team (only an agent registrar can
    register without one, and a proxied secret is an agent's key)."""
    slot = cache_path(ref, api_url, HEADER_FP, None)

    def cached(trusted=True):
        record = read_cache(slot) if trusted else None
        if usable(record, ref, api_url, HEADER_FP, None) and record["api_key"] != failed_key:
            return record["api_key"]
        return None

    key = cached()
    if key:
        return key
    try:
        trusted = _ensure_dir()
        with _locked(slot):
            key = cached(trusted)
            if key:
                return key
            record = _register_via_header(ref, api_url)
            write_cache(slot, record)
            return record["api_key"]
    except OSError as exc:
        raise SessionIdentityError(
            f"Session identity: cannot use the key cache ({exc}). {NO_FALLBACK}"
        ) from exc


def session_key(ref: str, credential: str | None, api_url: str, *, failed_key: str | None = None) -> str:
    """The key to send for this session. With `failed_key` (the key a 401
    just refused), a cached key equal to it is not used: another process
    may already have replaced it, otherwise this one registers again.

    Slots: an agent registrar registers in its own team whatever the
    local current team is, so its slot leaves the team out (otherwise
    every `team use` or `.chaotic` change would register the same
    identity again and revoke the other slot's key). A person registers
    in the current team, so theirs includes it. Which one applies is
    known from the cache, or from /auth/me when registering."""
    if not credential and registrar_key_via() == "header":
        return _session_key_via_header(ref, api_url, failed_key)
    if not credential:
        raise SessionIdentityError(
            "session_identity is auto but no registrar key is configured "
            f"(`chaotic auth set-key`, or CHAOTIC_API_KEY; or {VIA_ENV}=header when a proxy "
            f"supplies it as {REGISTRAR_KEY_HEADER})."
        )
    fp = fingerprint(credential)
    hint_path = team_hint_path(ref, api_url, fp)
    # No current team: a person registrar's only team (an agent
    # registrar's slot has no team anyway), from this process's lookup
    # memo, else, only to FIND a cached key, the team this session
    # remembered (CHT-1691). Neither is trusted after a refused key, which
    # may be a team the person has left: the memo is forgotten and the
    # teams are listed again.
    configured_team = _config.get_current_team()
    if (configured_team and configured_team == _config.process_team(api_url, credential)
            and _config.configured_team() != configured_team):
        # The stdio MCP server's default: the key's only team, a lookup
        # result like the memo. A team chosen with `team use` is never
        # one, even when it is the same team (re-review L1).
        configured_team = None
    if failed_key and not configured_team:
        _config.forget_only_team(api_url, credential)
    memo_team = None if configured_team or failed_key else _config.known_only_team(api_url, credential)
    team_id = configured_team or memo_team or (None if failed_key else _hinted_team(ref, api_url, fp))
    agent_slot = cache_path(ref, api_url, fp, None)

    def person_slot():
        return cache_path(ref, api_url, fp, team_id) if team_id else None

    def cached(trusted=True):
        if not trusted:
            return None
        record = read_cache(agent_slot)
        if usable(record, ref, api_url, fp, None) and record["api_key"] != failed_key:
            return record["api_key"]
        path = person_slot()
        record = read_cache(path) if path else None
        if usable(record, ref, api_url, fp, team_id) and record["api_key"] != failed_key:
            return record["api_key"]
        return None

    key = cached()
    if key:
        return key
    try:
        trusted = _ensure_dir()
        # One lock per (session, server, registrar), whichever slot it
        # ends up in: a registrar's registrations for this ref queue.
        with _locked(agent_slot):
            key = cached(trusted)
            if key:
                return key
            # No usable key: the remembered team was only a pointer to one.
            # Register in the configured team, or the one the teams list
            # says now (review M1: a stale hint must not pick the team).
            team_id = configured_team or memo_team
            me = _whoami(credential, api_url)
            if not me.get("is_agent") and not configured_team:
                if not team_id:
                    # A person registers in a team; with none selected, its
                    # only one (CHT-1687). Its key may already be cached there.
                    team_id = _registrar_team(credential, api_url)
                # Remember it for this session's later processes, whether
                # it came from the lookup or the memo (review L1). Written
                # before the key lookup and the registration on purpose:
                # the team is right whether or not they succeed, and a
                # refused registration removes it again below.
                write_cache(hint_path, {
                    "external_ref": ref, "api_url": api_url, "registrar": fp, "team_id": team_id,
                })
                key = cached(trusted)
                if key:
                    return key
            slot_team = None if me.get("is_agent") else team_id
            try:
                new_record = _register(ref, credential, api_url, slot_team, me)
            except SessionIdentityError as exc:
                definitive = exc.status_code is not None and 400 <= exc.status_code < 500 and exc.status_code != 429
                if definitive and slot_team and not configured_team:
                    # Refused (a 4xx; not a 5xx, a 429 or a network error,
                    # which say nothing about the team) in a team that was
                    # not chosen by hand: neither the session nor this
                    # process should go back to it.
                    hint_path.unlink(missing_ok=True)
                    _config.forget_only_team(api_url, credential)
                raise
            write_cache(cache_path(ref, api_url, fp, slot_team), new_record)
            return new_record["api_key"]
    except OSError as exc:
        raise SessionIdentityError(
            f"Session identity: cannot use the key cache ({exc}). {NO_FALLBACK}"
        ) from exc

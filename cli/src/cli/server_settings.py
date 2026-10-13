"""Server settings that `chaotic system config` manages (CHT-1592).

An installed server's settings live in server.json under "settings", a
flat {NAME: value} map of environment variables. Every writer of the
systemd unit / launchd plist (install, reconfigure, upgrade's reconcile,
and `system config` itself) renders them into the file as environment
variables, so they survive every rewrite, and an install that sets none
generates exactly the file it did before.

This module is pure: it validates names and values and judges a set of
settings as a whole. It never prints a value of a secret setting; the
callers show values only through display_value().

The server is the authority on what its settings mean
(backend/app/config.py). The checks here mirror the ones that would stop
it from starting (an APP_BASE_URL that cannot be the OAuth issuer) or
that it would silently drop (an unusable FORWARDED_ALLOW_IPS entry), so
an operator finds out when setting the value rather than at the next
restart.
"""
from __future__ import annotations

import ipaddress
import re
from dataclasses import dataclass
from urllib.parse import urlsplit

SETTINGS_KEY = "settings"  # in server.json


@dataclass(frozen=True)
class Setting:
    kind: str  # bool | url | proxies | origins | port | text
    default: str  # the server's default, for display only
    help: str
    secret: bool = False


KNOWN: dict[str, Setting] = {
    "OAUTH_ENABLED": Setting(
        "bool", "false", "Serve OAuth 2.1 for remote MCP clients. Needs APP_BASE_URL."),
    "APP_BASE_URL": Setting(
        "url", "http://localhost:24267",
        "The public origin people and clients reach the server at: the OAuth issuer, and the base of emailed links."),
    "FORWARDED_ALLOW_IPS": Setting(
        "proxies", "127.0.0.1,::1",
        "Reverse proxies (IP addresses or CIDR networks) whose X-Forwarded-* headers are believed. Empty: none."),
    "MCP_CAPABILITY_URL_ENABLED": Setting(
        "bool", "true", "Serve the deprecated /mcp/<api-key> capability URL."),
    "OAUTH_DCR_ENABLED": Setting(
        "bool", "true", "Let OAuth clients register themselves (RFC 7591)."),
    "CORS_ORIGINS": Setting(
        "origins", "*", "'*' or a comma-separated list of origins allowed to call the API from a browser."),
    "SMTP_HOST": Setting("text", "", "Outgoing mail server. Empty: no email is sent."),
    "SMTP_PORT": Setting("port", "587", "Outgoing mail server port."),
    "SMTP_USER": Setting("text", "", "Outgoing mail user name."),
    "SMTP_PASSWORD": Setting("text", "", "Outgoing mail password.", secret=True),
    "SMTP_FROM": Setting("text", "noreply@chaotic.sh", "From address of outgoing mail."),
}

# Variables the service file already sets from server.json's own fields,
# or that it must set itself: never a "setting".
RESERVED: dict[str, str] = {
    "SECRET_KEY": "it is generated at install and kept in server.json; changing it logs everyone out",
    "HOST": "use 'chaotic system reconfigure --host'",
    "PORT": "use 'chaotic system reconfigure --port'",
    "DATABASE_URL": "the service file sets it to the installed database",
    "DATABASE_PATH": "the service file sets it to the installed database",
    "PATH": "the service file sets it so the server can find its tools",
}

_NAME = re.compile(r"^[A-Z][A-Z0-9_]*$")
# Characters a value may not contain. Whitespace, quotes and backslashes
# would need quoting in a systemd Environment= line (and a newline would
# start a new directive); systemd expands % specifiers there.
_UNSAFE = re.compile(r"[\s\"'\\%\x00-\x1f\x7f]")
_TRUE = frozenset({"true", "1", "yes", "on"})
_FALSE = frozenset({"false", "0", "no", "off"})
_LOOPBACK_HOSTS = frozenset({"localhost", "127.0.0.1", "::1"})
_DEFAULT_PORTS = {"http": 80, "https": 443}


def is_secret(name: str) -> bool:
    """Whether a value must never be shown. A setting this CLI does not
    know (set with --force) might hold anything, so it counts as one."""
    known = KNOWN.get(name)
    return known.secret if known else True


def display_value(name: str, value: str) -> str:
    if is_secret(name):
        return "<hidden>" if value else "<hidden, empty>"
    return value if value else "<empty>"


def name_problem(name: str, force: bool = False) -> str | None:
    """Why `name` cannot be set, or None. Unknown names need force."""
    if name in RESERVED:
        return f"{name} is not a setting: {RESERVED[name]}"
    if not _NAME.match(name):
        return f"{name!r} is not a valid name (upper-case letters, digits and _, starting with a letter)"
    if name not in KNOWN and not force:
        return (f"{name} is not a setting this CLI knows (known: {', '.join(sorted(KNOWN))}). "
                "Pass --force to set it anyway.")
    return None


def _origin(value: str, what: str) -> tuple[str, str | None]:
    """A bare http(s) origin with no trailing slash, in the form the
    server compares by exact string."""
    trimmed = value.rstrip("/")
    if not trimmed.isascii():
        return value, f"{what} {value!r} is not ASCII (write an internationalised host in its xn-- form)"
    parsed = urlsplit(trimmed)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        return value, f"{what} {value!r} is not an absolute http(s) URL, e.g. https://chaotic.example.com"
    try:
        port = parsed.port
    except ValueError:
        return value, f"{what} {value!r} has an invalid port"
    if parsed.username is not None or parsed.password is not None:
        return value, f"{what} {value!r} must not carry credentials"
    if parsed.path or parsed.query or parsed.fragment:
        return value, f"{what} {value!r} must be a bare origin, with no path, query or fragment"
    if parsed.netloc != parsed.netloc.lower():
        return value, f"{what} {value!r} must be written in lower case: {trimmed.lower()!r}"
    if port is not None and port == _DEFAULT_PORTS[parsed.scheme]:
        canonical = f"{parsed.scheme}://{parsed.netloc.rsplit(':', 1)[0]}"
        return value, f"{what} {value!r} names the default port; use {canonical!r}"
    return trimmed, None


def _proxies(value: str) -> tuple[str, str | None]:
    """The rules app.config.parse_trusted_proxies drops entries by,
    refused here instead of dropped at startup."""
    entries = [e.strip() for e in value.split(",") if e.strip()]
    for entry in entries:
        if entry == "*":
            return value, "'*' would trust forwarded headers from every sender"
        try:
            item = ipaddress.ip_network(entry, strict=True) if "/" in entry else ipaddress.ip_address(entry)
        except ValueError as exc:
            return value, f"{entry!r} is not an IP address or CIDR network: {exc}"
        if isinstance(item, (ipaddress.IPv4Network, ipaddress.IPv6Network)) and item.prefixlen == 0:
            return value, f"{entry!r} would trust forwarded headers from every sender"
    return ",".join(entries), None


def normalize(name: str, value: str) -> tuple[str, str | None]:
    """(the value to store, None) or (value, why it is refused). Never
    puts a secret value in the reason."""
    kind = KNOWN[name].kind if name in KNOWN else "text"
    shown = "the value" if is_secret(name) else repr(value)
    if kind == "bool":
        lowered = value.strip().lower()
        if lowered in _TRUE:
            value = "true"
        elif lowered in _FALSE:
            value = "false"
        else:
            return value, f"{name} must be true or false, not {shown}"
    elif kind == "url":
        value, problem = _origin(value.strip(), name)
        if problem:
            return value, problem
    elif kind == "origins":
        stripped = value.strip()
        if stripped != "*":
            parts = [p.strip() for p in stripped.split(",") if p.strip()]
            if not parts or "*" in parts:
                return value, f"{name} must be '*' alone or a comma-separated list of origins"
            normalised = []
            for part in parts:
                origin, problem = _origin(part, "origin")
                if problem:
                    return value, problem
                normalised.append(origin)
            stripped = ",".join(normalised)
        value = stripped
    elif kind == "proxies":
        value, problem = _proxies(value)
        if problem:
            return value, f"{name}: {problem}"
    elif kind == "port":
        if not value.strip().isdigit() or not 1 <= int(value.strip()) <= 65535:
            return value, f"{name} must be a port number (1-65535), not {shown}"
        value = str(int(value.strip()))
    if _UNSAFE.search(value):
        return value, (f"{name}: {shown} contains whitespace, a quote, a backslash, '%' or a control "
                       "character, which the service file cannot carry")
    return value, None


def stored_settings(server_info: dict) -> dict[str, str]:
    """The settings in server.json that are safe to put in a service
    file: a valid, unreserved name and a string value with nothing that
    could break out of an Environment= line. Anything else is left out
    (check() reports it), never written."""
    raw = server_info.get(SETTINGS_KEY)
    if not isinstance(raw, dict):
        return {}
    return {name: value for name, value in sorted(raw.items())
            if isinstance(name, str) and _NAME.match(name) and name not in RESERVED
            and isinstance(value, str) and not _UNSAFE.search(value)}


def check(server_info: dict) -> tuple[list[str], list[str]]:
    """(errors, warnings) for the settings in server.json taken
    together. An error is something the server would refuse to start
    with, or a stored entry that cannot be written to the service file;
    a warning is a likely mistake. Neither ever holds a secret value."""
    errors: list[str] = []
    warnings: list[str] = []
    raw = server_info.get(SETTINGS_KEY)
    if raw is not None and not isinstance(raw, dict):
        return [f"server.json's \"{SETTINGS_KEY}\" is not an object; it is ignored"], []
    raw = raw or {}
    settings = stored_settings(server_info)
    for name in sorted(raw):
        if name not in settings:
            errors.append(f"server.json setting {name!r} is not a valid name or value; it is left out of the service file")
            continue
        if name in KNOWN:
            value, problem = normalize(name, settings[name])
            if problem:
                errors.append(problem)
            else:
                settings[name] = value  # judge "True" as the server would: true

    if settings.get("OAUTH_ENABLED") == "true":
        base = settings.get("APP_BASE_URL")
        if not base:
            errors.append("OAUTH_ENABLED is true but APP_BASE_URL is not set: the server will not start. "
                          "Set it to the https origin clients reach this server at.")
        else:
            parsed = urlsplit(base)
            if parsed.scheme == "http" and parsed.hostname not in _LOOPBACK_HOSTS:
                errors.append(f"OAUTH_ENABLED needs APP_BASE_URL to use https; {base!r} is plain http "
                              "on a non-loopback host, so the server will not start")
            elif parsed.scheme == "http":
                warnings.append(f"APP_BASE_URL {base!r} is a loopback address: only OAuth clients on this "
                                "machine (Claude Code) can use it, not claude.ai or ChatGPT")
        if settings.get("MCP_CAPABILITY_URL_ENABLED", KNOWN["MCP_CAPABILITY_URL_ENABLED"].default) != "false":
            warnings.append("OAuth is on and the deprecated capability URL (/mcp/<api-key>) is still served; "
                            "set MCP_CAPABILITY_URL_ENABLED=false once no connector uses it")
    return errors, warnings


def parse_dotenv_names(text: str) -> dict[str, str]:
    """NAME -> value of each plain `NAME=value` line of a .env file (the
    server's own fallback source), good enough to tell an operator which
    settings it holds. Values are returned for comparison, never shown
    for a secret name."""
    found: dict[str, str] = {}
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[len("export "):].lstrip()
        name, sep, value = line.partition("=")
        name = name.strip().upper()  # pydantic-settings matches names case-insensitively
        if sep and _NAME.match(name):
            found[name] = value.strip().strip("\"'")
    return found

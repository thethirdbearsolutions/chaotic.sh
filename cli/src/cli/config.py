"""CLI configuration management.

Config is layered:
1. Local .chaotic file (found by walking up from cwd, like git)
2. Global ~/.chaotic/config.json (shared auth, defaults)
3. Profile-specific ~/.chaotic/{profile}.json (for multi-agent setups)

Local config overrides global for team/project settings.
Auth (token, api_key) is stored globally but can be overridden locally.

Profile support:
- Set CHAOTIC_PROFILE env var or use --profile flag
- Profile config is loaded instead of config.json
- Useful for multiple agents (claude, codex, etc.) on same workstation
"""
import json
import os
import subprocess
from pathlib import Path


# Module-level profile setting (set by CLI --profile flag)
_current_profile: str | None = None


def set_profile(profile: str | None):
    """Set the current profile (called by CLI --profile flag)."""
    global _current_profile
    _current_profile = profile


def get_profile() -> str | None:
    """Get current profile from module state or environment."""
    return _current_profile or os.environ.get("CHAOTIC_PROFILE")


def get_chaotic_home() -> Path:
    """Get the Chaotic home directory.

    Respects CHAOTIC_HOME env var for testing/alternate installs.
    """
    if home := os.environ.get("CHAOTIC_HOME"):
        return Path(home)
    return Path.home() / ".chaotic"


GLOBAL_CONFIG_DIR = get_chaotic_home()
LOCAL_CONFIG_NAME = ".chaotic"


class ProfileError(ValueError):
    """Invalid profile name or path."""
    pass


def get_global_config_file() -> Path:
    """Get the global config file path, respecting profile setting.

    If a profile is set (via --profile or CHAOTIC_PROFILE), uses
    ~/.chaotic/{profile}.json instead of ~/.chaotic/config.json.

    Profile names must be simple identifiers (alphanumeric, hyphen, underscore).
    Path traversal attempts are rejected for security.

    Raises:
        ProfileError: If profile name contains invalid characters or attempts
            path traversal.
    """
    profile = get_profile()
    if not profile:
        return GLOBAL_CONFIG_DIR / "config.json"

    # Security: reject path traversal and special characters
    # Only allow simple profile names: alphanumeric, hyphen, underscore
    if "/" in profile or "\\" in profile:
        raise ProfileError(f"Invalid profile name '{profile}': use simple names like 'claude', not paths")
    if ".." in profile:
        raise ProfileError(f"Invalid profile name '{profile}': path traversal not allowed")
    if profile.startswith("."):
        raise ProfileError(f"Invalid profile name '{profile}': cannot start with '.'")
    if not all(c.isalnum() or c in "-_" for c in profile):
        raise ProfileError(f"Invalid profile name '{profile}': use only letters, numbers, hyphens, underscores")

    config_file = GLOBAL_CONFIG_DIR / f"{profile}.json"

    # Extra safety: verify resolved path stays within config directory
    try:
        resolved = config_file.resolve()
        chaotic_dir = GLOBAL_CONFIG_DIR.resolve()
        if not str(resolved).startswith(str(chaotic_dir) + os.sep):
            raise ProfileError(f"Profile path escapes config directory: {resolved}")
    except OSError as e:
        raise ProfileError(f"Cannot resolve profile path: {e}")

    return config_file


# Keep for backwards compatibility
GLOBAL_CONFIG_FILE = GLOBAL_CONFIG_DIR / "config.json"

# Default port: CHAOS on phone keypad (24267)
DEFAULT_PORT = 24267


def find_local_config() -> Path | None:
    """Walk up directory tree to find .chaotic config file (like git).

    Returns the Path to .chaotic if found, None otherwise.
    Stops at home directory or git root to prevent config injection attacks.
    """
    current = Path.cwd().resolve()
    home = Path.home().resolve()

    while True:
        try:
            config_path = current / LOCAL_CONFIG_NAME
            if config_path.exists() and config_path.is_file():
                return config_path
        except (PermissionError, OSError):
            pass  # Skip inaccessible directories

        # Stop at home directory to prevent config injection from parent dirs
        if current == home:
            break

        # Stop at git root (if .git exists, don't look further up)
        try:
            if (current / ".git").exists():
                break
        except (PermissionError, OSError):
            pass

        # Stop at filesystem root
        parent = current.parent
        if parent == current:
            break
        current = parent

    return None


def get_git_root() -> Path | None:
    """Get the root directory of the current git repository.

    Returns the Path to git root if in a git repo, None otherwise.
    """
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True,
            text=True,
            check=True
        )
        git_root = result.stdout.strip()
        if git_root:
            return Path(git_root)
        return None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def get_local_config_path() -> Path:
    """Get the path where local config should be saved.

    Priority:
    1. Existing .chaotic found by walking up
    2. Git repo root (if in a git repo)
    3. Current working directory

    Skips paths that already exist as directories (e.g. ~/.chaotic/ which is
    the global config dir) to avoid conflicts.
    """
    # First check if we already have a config file
    existing = find_local_config()
    if existing:
        return existing

    # Otherwise, prefer git root, fall back to cwd
    candidates = []
    git_root = get_git_root()
    if git_root:
        candidates.append(git_root / LOCAL_CONFIG_NAME)
    candidates.append(Path.cwd() / LOCAL_CONFIG_NAME)

    for candidate in candidates:
        if not candidate.exists() or candidate.is_file():
            return candidate

    # All candidates are directories — fall back to cwd anyway and let
    # save_local_config raise a clear error
    return Path.cwd() / LOCAL_CONFIG_NAME


def ensure_global_config_dir():
    """Ensure global config directory exists."""
    GLOBAL_CONFIG_DIR.mkdir(exist_ok=True)


def load_global_config() -> dict:
    """Load global configuration.

    Respects profile setting - if a profile is active, loads from
    ~/.chaotic/{profile}.json instead of ~/.chaotic/config.json.

    Raises:
        ProfileError: If profile name is invalid.
        RuntimeError: If config file exists but cannot be read or parsed.
    """
    ensure_global_config_dir()
    config_file = get_global_config_file()  # May raise ProfileError
    if config_file.exists():
        try:
            with open(config_file) as f:
                return json.load(f)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"Invalid JSON in {config_file}: {e}")
        except PermissionError:
            raise RuntimeError(f"Permission denied reading {config_file}")
        except IsADirectoryError:
            raise RuntimeError(f"Expected file but found directory: {config_file}")
        except OSError as e:
            raise RuntimeError(f"Cannot read config file {config_file}: {e}")
    return {}


def save_global_config(config: dict):
    """Save global configuration.

    Respects profile setting - if a profile is active, saves to
    ~/.chaotic/{profile}.json instead of ~/.chaotic/config.json.
    """
    ensure_global_config_dir()
    config_file = get_global_config_file()
    with open(config_file, "w") as f:
        json.dump(config, f, indent=2)
    # Restrict permissions - config may contain API keys
    os.chmod(config_file, 0o600)


def load_local_config() -> dict:
    """Load local (project) configuration by walking up directory tree."""
    config_path = find_local_config()
    if config_path:
        try:
            with open(config_path) as f:
                return json.load(f)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"Invalid JSON in {config_path}: {e}")
    return {}


def save_local_config(config: dict):
    """Save local (project) configuration.

    Saves to:
    1. Existing .chaotic found by walking up
    2. Git repo root (if in a git repo)
    3. Current working directory

    Falls back to global config if the local path conflicts with the
    global config directory (e.g. when cwd is home dir, ~/.chaotic is
    already a directory).
    """
    config_path = get_local_config_path()
    if config_path.exists() and config_path.is_dir():
        # Path conflicts with global config dir — save to global instead
        save_global_config({**load_global_config(), **config})
        return
    with open(config_path, "w") as f:
        json.dump(config, f, indent=2)
    # Restrict permissions - config may contain API keys
    os.chmod(config_path, 0o600)


def load_config() -> dict:
    """Load merged configuration (local overrides global)."""
    global_conf = load_global_config()
    local_conf = load_local_config()
    # Merge: local overrides global
    return {**global_conf, **local_conf}


def save_config(config: dict):
    """Save configuration (to local file for project settings)."""
    # For backward compatibility, save to local if it exists, else global
    if has_local_config():
        save_local_config(config)
    else:
        save_global_config(config)


def get_api_url() -> str:
    """Get API URL from config or environment."""
    config = load_config()
    return os.environ.get("CHAOTIC_API_URL") or config.get("api_url", f"http://localhost:{DEFAULT_PORT}/api")


def set_api_url(url: str, local: bool = False):
    """Set API URL in config."""
    if local:
        config = load_local_config()
        config["api_url"] = url
        save_local_config(config)
    else:
        config = load_global_config()
        config["api_url"] = url
        save_global_config(config)


def get_token() -> str | None:
    """Get authentication token."""
    config = load_config()
    return os.environ.get("CHAOTIC_TOKEN") or config.get("token")


def set_token(token: str | None):
    """Set authentication token (global)."""
    config = load_global_config()
    if token:
        config["token"] = token
    elif "token" in config:
        del config["token"]
    save_global_config(config)


def get_current_team() -> str | None:
    """Get current team ID (prefers local, falls back to global)."""
    config = load_config()
    return config.get("current_team")


def set_current_team(team_id: str | None, local: bool = True):
    """Set current team ID (local by default for per-project config)."""
    if local:
        config = load_local_config()
        if team_id:
            config["current_team"] = team_id
        elif "current_team" in config:
            del config["current_team"]
        save_local_config(config)
    else:
        config = load_global_config()
        if team_id:
            config["current_team"] = team_id
        elif "current_team" in config:
            del config["current_team"]
        save_global_config(config)


def get_current_project() -> str | None:
    """Get current project ID (prefers local, falls back to global)."""
    config = load_config()
    return config.get("current_project")


def set_current_project(project_id: str | None, local: bool = True):
    """Set current project ID (local by default for per-project config)."""
    if local:
        config = load_local_config()
        if project_id:
            config["current_project"] = project_id
        elif "current_project" in config:
            del config["current_project"]
        save_local_config(config)
    else:
        config = load_global_config()
        if project_id:
            config["current_project"] = project_id
        elif "current_project" in config:
            del config["current_project"]
        save_global_config(config)


def get_api_key() -> str | None:
    """Get API key (prefers local, falls back to global)."""
    config = load_config()
    return os.environ.get("CHAOTIC_API_KEY") or config.get("api_key")


def set_api_key(api_key: str | None, local: bool = False):
    """Set API key (global by default, but can be local for per-project keys)."""
    if local:
        config = load_local_config()
        if api_key:
            config["api_key"] = api_key
        elif "api_key" in config:
            del config["api_key"]
        save_local_config(config)
    else:
        config = load_global_config()
        if api_key:
            config["api_key"] = api_key
        elif "api_key" in config:
            del config["api_key"]
        save_global_config(config)


def get_web_url() -> str:
    """Get web URL (frontend) by deriving from API URL."""
    api_url = get_api_url()
    # Strip /api suffix to get frontend URL
    if api_url.endswith("/api"):
        return api_url[:-4]
    return api_url.rstrip("/")


def has_local_config() -> bool:
    """Check if local .chaotic config file exists (walks up directory tree)."""
    return find_local_config() is not None


def list_profiles() -> list[str]:
    """List all available profiles in ~/.chaotic/.

    Returns profile names (without .json extension), excluding 'config'
    which is the default profile.

    Symlinks are ignored for security (to prevent path traversal attacks).
    Permission errors are handled gracefully by returning an empty list.
    """
    profiles = []
    config_dir = get_chaotic_home()
    if config_dir.exists():
        try:
            for f in config_dir.iterdir():
                # Security: skip symlinks to prevent path traversal
                if f.is_symlink():
                    continue
                if f.is_file() and f.suffix == ".json":
                    name = f.stem
                    # Skip non-profile JSON files
                    if name == "server":
                        continue
                    # Include 'config' as 'default' for clarity
                    if name == "config":
                        profiles.append("default")
                    else:
                        profiles.append(name)
        except (PermissionError, OSError):
            # Return empty list if we can't read the directory
            return []
    return sorted(profiles)


def get_effective_profile() -> str:
    """Get the effective profile name being used.

    Returns the profile from --profile/CHAOTIC_PROFILE, auto-selected single
    profile, or 'default' if none set and no profiles exist.
    """
    profile = get_profile()
    return profile if profile else "default"


class ProfileAmbiguityError(Exception):
    """Raised when multiple profiles exist but none is selected."""

    def __init__(self, profiles: list[str]):
        self.profiles = profiles
        profiles_str = ", ".join(profiles)
        super().__init__(
            f"Multiple profiles found but CHAOTIC_PROFILE not set.\n"
            f"Available profiles: {profiles_str}\n"
            f"Set CHAOTIC_PROFILE=<name> or use --profile <name>"
        )


def check_profile_ambiguity():
    """Check for profile ambiguity and auto-select single profile.

    If multiple profiles exist in ~/.chaotic/ and no profile is explicitly
    selected (via --profile or CHAOTIC_PROFILE), raises ProfileAmbiguityError.

    If exactly one profile exists and none is selected, auto-selects it.

    This enforces "fail closed" behavior to prevent accidentally using the
    wrong identity, especially important for AI agents.
    """
    # If a profile is explicitly set, no ambiguity
    if get_profile():
        return

    profiles = list_profiles()

    # No profiles - use default config.json
    if len(profiles) == 0:
        return

    # Single profile - auto-select it
    if len(profiles) == 1:
        set_profile(profiles[0])
        return

    # Multiple profiles without explicit selection - fail closed
    raise ProfileAmbiguityError(profiles)

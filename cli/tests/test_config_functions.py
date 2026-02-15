"""Tests for config.py functions (CHT-887).

Tests cover: profile management, config loading/saving, settings getters/setters,
web_url derivation, profile security, and profile ambiguity detection.
"""
import json
import os
import pytest
from pathlib import Path
from unittest.mock import patch, MagicMock


class TestProfileManagement:
    """Tests for profile get/set functions.

    Note: These tests call real config functions (not mocked) and use try/finally
    to restore state. They interact with the real module-level profile variable.
    The CHAOTIC_PROFILE env var is handled by patching os.environ where needed.
    """

    def test_set_and_get_profile(self):
        """set_profile/get_profile round-trips."""
        from cli.config import set_profile, get_profile
        original = get_profile()
        try:
            set_profile("test-profile")
            assert get_profile() == "test-profile"
        finally:
            set_profile(original)

    def test_get_profile_env_fallback(self):
        """get_profile falls back to CHAOTIC_PROFILE env var."""
        from cli.config import set_profile, get_profile
        original = get_profile()
        try:
            set_profile(None)
            with patch.dict(os.environ, {"CHAOTIC_PROFILE": "env-profile"}):
                assert get_profile() == "env-profile"
        finally:
            set_profile(original)

    def test_get_effective_profile_default(self):
        """get_effective_profile returns 'default' when no profile set."""
        from cli.config import set_profile, get_effective_profile
        original_profile = get_effective_profile()
        try:
            set_profile(None)
            with patch.dict(os.environ, {}, clear=True):
                # Clear CHAOTIC_PROFILE if set
                os.environ.pop("CHAOTIC_PROFILE", None)
                assert get_effective_profile() == "default"
        finally:
            set_profile(original_profile if original_profile != "default" else None)


class TestProfileSecurity:
    """Tests for profile name validation security."""

    def test_rejects_path_traversal_slash(self):
        """Profile with / is rejected."""
        from cli.config import get_global_config_file, set_profile, ProfileError
        try:
            set_profile("../evil")
            with pytest.raises(ProfileError, match="simple names"):
                get_global_config_file()
        finally:
            set_profile(None)

    def test_rejects_path_traversal_backslash(self):
        """Profile with \\ is rejected."""
        from cli.config import get_global_config_file, set_profile, ProfileError
        try:
            set_profile("..\\evil")
            with pytest.raises(ProfileError):
                get_global_config_file()
        finally:
            set_profile(None)

    def test_rejects_dotdot(self):
        """Profile with .. is rejected."""
        from cli.config import get_global_config_file, set_profile, ProfileError
        try:
            set_profile("foo..bar")
            with pytest.raises(ProfileError):
                get_global_config_file()
        finally:
            set_profile(None)

    def test_rejects_leading_dot(self):
        """Profile starting with . is rejected."""
        from cli.config import get_global_config_file, set_profile, ProfileError
        try:
            set_profile(".hidden")
            with pytest.raises(ProfileError, match="cannot start with"):
                get_global_config_file()
        finally:
            set_profile(None)

    def test_rejects_special_characters(self):
        """Profile with special characters is rejected."""
        from cli.config import get_global_config_file, set_profile, ProfileError
        try:
            set_profile("a@b!c")
            with pytest.raises(ProfileError, match="letters, numbers"):
                get_global_config_file()
        finally:
            set_profile(None)

    def test_accepts_valid_profile(self):
        """Valid profile names are accepted."""
        from cli.config import get_global_config_file, set_profile
        try:
            set_profile("claude-agent_01")
            path = get_global_config_file()
            assert "claude-agent_01.json" in str(path)
        finally:
            set_profile(None)


class TestConfigLoadSave:
    """Tests for config loading and saving with temp directory."""

    def test_load_global_config_empty(self, tmp_path):
        """Loading from empty dir returns empty dict."""
        from cli.config import load_global_config, set_profile
        try:
            set_profile(None)
            with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path), \
                 patch("cli.config.get_chaotic_home", return_value=tmp_path), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                result = load_global_config()
                assert result == {}
        finally:
            set_profile(None)

    def test_save_and_load_global_config(self, tmp_path):
        """save_global_config/load_global_config round-trips."""
        from cli.config import load_global_config, save_global_config, set_profile
        try:
            set_profile(None)
            with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path), \
                 patch("cli.config.get_chaotic_home", return_value=tmp_path), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                save_global_config({"api_url": "http://test:8080/api", "token": "secret"})
                result = load_global_config()
                assert result["api_url"] == "http://test:8080/api"
                assert result["token"] == "secret"
        finally:
            set_profile(None)

    def test_load_local_config_not_found(self):
        """Loading when no .chaotic file exists returns empty dict."""
        from cli.config import load_local_config
        with patch("cli.config.find_local_config", return_value=None):
            result = load_local_config()
            assert result == {}

    def test_load_config_merges_local_over_global(self):
        """load_config merges local config over global."""
        from cli.config import load_config
        with patch("cli.config.load_global_config", return_value={"api_url": "http://global", "token": "abc"}), \
             patch("cli.config.load_local_config", return_value={"current_team": "team-1"}):
            result = load_config()
            assert result["api_url"] == "http://global"
            assert result["token"] == "abc"
            assert result["current_team"] == "team-1"

    def test_load_config_local_overrides_global(self):
        """Local config values override global."""
        from cli.config import load_config
        with patch("cli.config.load_global_config", return_value={"api_url": "http://global"}), \
             patch("cli.config.load_local_config", return_value={"api_url": "http://local"}):
            result = load_config()
            assert result["api_url"] == "http://local"

    def test_invalid_json_raises(self, tmp_path):
        """Invalid JSON in config file raises RuntimeError."""
        from cli.config import load_global_config, set_profile
        bad_file = tmp_path / "config.json"
        bad_file.write_text("{not valid json")
        try:
            set_profile(None)
            with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                with pytest.raises(RuntimeError, match="Invalid JSON"):
                    load_global_config()
        finally:
            set_profile(None)


class TestSettingsGetters:
    """Tests for settings getter functions."""

    def test_get_api_url_from_config(self):
        """get_api_url returns URL from config."""
        from cli.config import get_api_url
        with patch("cli.config.load_config", return_value={"api_url": "http://test:8080/api"}), \
             patch.dict(os.environ, {}, clear=False):
            os.environ.pop("CHAOTIC_API_URL", None)
            assert get_api_url() == "http://test:8080/api"

    def test_get_api_url_env_override(self):
        """CHAOTIC_API_URL env var overrides config."""
        from cli.config import get_api_url
        with patch("cli.config.load_config", return_value={"api_url": "http://config"}), \
             patch.dict(os.environ, {"CHAOTIC_API_URL": "http://env"}):
            assert get_api_url() == "http://env"

    def test_get_api_url_default(self):
        """get_api_url returns default when nothing set."""
        from cli.config import get_api_url, DEFAULT_PORT
        with patch("cli.config.load_config", return_value={}), \
             patch.dict(os.environ, {}, clear=False):
            os.environ.pop("CHAOTIC_API_URL", None)
            assert get_api_url() == f"http://localhost:{DEFAULT_PORT}/api"

    def test_get_token_from_config(self):
        """get_token returns token from config."""
        from cli.config import get_token
        with patch("cli.config.load_config", return_value={"token": "my-token"}), \
             patch.dict(os.environ, {}, clear=False):
            os.environ.pop("CHAOTIC_TOKEN", None)
            assert get_token() == "my-token"

    def test_get_token_env_override(self):
        """CHAOTIC_TOKEN env var overrides config."""
        from cli.config import get_token
        with patch("cli.config.load_config", return_value={"token": "config-token"}), \
             patch.dict(os.environ, {"CHAOTIC_TOKEN": "env-token"}):
            assert get_token() == "env-token"

    def test_get_api_key_from_config(self):
        """get_api_key returns key from config."""
        from cli.config import get_api_key
        with patch("cli.config.load_config", return_value={"api_key": "key-123"}), \
             patch.dict(os.environ, {}, clear=False):
            os.environ.pop("CHAOTIC_API_KEY", None)
            assert get_api_key() == "key-123"

    def test_get_api_key_env_override(self):
        """CHAOTIC_API_KEY env var overrides config."""
        from cli.config import get_api_key
        with patch("cli.config.load_config", return_value={}), \
             patch.dict(os.environ, {"CHAOTIC_API_KEY": "env-key"}):
            assert get_api_key() == "env-key"


class TestWebUrl:
    """Tests for get_web_url derivation."""

    def test_strips_api_suffix(self):
        """get_web_url strips /api suffix."""
        from cli.config import get_web_url
        with patch("cli.config.get_api_url", return_value="http://localhost:24267/api"):
            assert get_web_url() == "http://localhost:24267"

    def test_strips_trailing_slash(self):
        """get_web_url strips trailing slash."""
        from cli.config import get_web_url
        with patch("cli.config.get_api_url", return_value="http://localhost:24267/"):
            assert get_web_url() == "http://localhost:24267"

    def test_no_suffix(self):
        """get_web_url handles URL without /api."""
        from cli.config import get_web_url
        with patch("cli.config.get_api_url", return_value="http://example.com"):
            assert get_web_url() == "http://example.com"


class TestSetToken:
    """Tests for set_token function."""

    def test_set_token_saves(self, tmp_path):
        """set_token saves token to global config."""
        from cli.config import set_token, load_global_config, set_profile
        try:
            set_profile(None)
            with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                set_token("new-token")
                config = load_global_config()
                assert config["token"] == "new-token"
        finally:
            set_profile(None)

    def test_set_token_none_removes(self, tmp_path):
        """set_token(None) removes token from config."""
        from cli.config import set_token, load_global_config, save_global_config, set_profile
        try:
            set_profile(None)
            with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                save_global_config({"token": "old-token"})
                set_token(None)
                config = load_global_config()
                assert "token" not in config
        finally:
            set_profile(None)


class TestProfileAmbiguity:
    """Tests for profile ambiguity detection."""

    def test_no_ambiguity_when_profile_set(self):
        """check_profile_ambiguity passes when profile is set."""
        from cli.config import check_profile_ambiguity, set_profile
        try:
            set_profile("test")
            # Should not raise
            check_profile_ambiguity()
        finally:
            set_profile(None)

    def test_no_ambiguity_no_profiles(self):
        """check_profile_ambiguity passes when no profiles exist."""
        from cli.config import check_profile_ambiguity, set_profile
        try:
            set_profile(None)
            with patch("cli.config.list_profiles", return_value=[]), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                check_profile_ambiguity()
        finally:
            set_profile(None)

    def test_auto_selects_single_profile(self):
        """check_profile_ambiguity auto-selects single non-default profile."""
        from cli.config import check_profile_ambiguity, set_profile, get_profile
        try:
            set_profile(None)
            with patch("cli.config.list_profiles", return_value=["claude"]), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                check_profile_ambiguity()
                assert get_profile() == "claude"
        finally:
            set_profile(None)

    def test_raises_on_multiple_profiles(self):
        """check_profile_ambiguity raises with multiple profiles."""
        from cli.config import check_profile_ambiguity, set_profile, ProfileAmbiguityError
        try:
            set_profile(None)
            with patch("cli.config.list_profiles", return_value=["claude", "codex"]), \
                 patch.dict(os.environ, {}, clear=False):
                os.environ.pop("CHAOTIC_PROFILE", None)
                with pytest.raises(ProfileAmbiguityError):
                    check_profile_ambiguity()
        finally:
            set_profile(None)


class TestListProfiles:
    """Tests for list_profiles function."""

    def test_lists_json_files(self, tmp_path):
        """list_profiles finds profile .json files, excluding server.json (non-profile config)."""
        from cli.config import list_profiles
        (tmp_path / "claude.json").write_text("{}")
        (tmp_path / "codex.json").write_text("{}")
        # server.json is excluded because list_profiles filters out known non-profile config files
        (tmp_path / "server.json").write_text("{}")

        with patch("cli.config.get_chaotic_home", return_value=tmp_path):
            profiles = list_profiles()

        assert "claude" in profiles
        assert "codex" in profiles
        assert "server" not in profiles

    def test_config_json_maps_to_default(self, tmp_path):
        """config.json is listed as 'default' profile."""
        from cli.config import list_profiles
        (tmp_path / "config.json").write_text("{}")

        with patch("cli.config.get_chaotic_home", return_value=tmp_path):
            profiles = list_profiles()

        assert "default" in profiles

    def test_empty_dir(self, tmp_path):
        """Empty config dir returns empty list."""
        from cli.config import list_profiles

        with patch("cli.config.get_chaotic_home", return_value=tmp_path):
            profiles = list_profiles()

        assert profiles == []

    def test_nonexistent_dir(self, tmp_path):
        """Nonexistent config dir returns empty list."""
        from cli.config import list_profiles

        with patch("cli.config.get_chaotic_home", return_value=tmp_path / "nonexistent"):
            profiles = list_profiles()

        assert profiles == []

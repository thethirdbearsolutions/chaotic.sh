"""Tests for profile management functionality (CHT-638)."""
import os
import json
import pytest
from pathlib import Path
from unittest.mock import patch, MagicMock
from click.testing import CliRunner


@pytest.fixture
def temp_chaotic_home(tmp_path):
    """Create a temporary .chaotic directory for testing."""
    chaotic_home = tmp_path / ".chaotic"
    chaotic_home.mkdir()
    return chaotic_home


class TestListProfiles:
    """Tests for list_profiles() function."""

    def test_empty_directory(self, temp_chaotic_home):
        """list_profiles returns empty list when no profiles exist."""
        from cli.config import list_profiles

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            profiles = list_profiles()

        assert profiles == []

    def test_single_default_profile(self, temp_chaotic_home):
        """list_profiles returns ['default'] when only config.json exists."""
        from cli.config import list_profiles

        (temp_chaotic_home / "config.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            profiles = list_profiles()

        assert profiles == ['default']

    def test_multiple_profiles(self, temp_chaotic_home):
        """list_profiles returns all profile names sorted."""
        from cli.config import list_profiles

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')
        (temp_chaotic_home / "codex.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            profiles = list_profiles()

        assert profiles == ['claude', 'codex', 'default']

    def test_ignores_non_json_files(self, temp_chaotic_home):
        """list_profiles ignores non-.json files."""
        from cli.config import list_profiles

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "notes.txt").write_text('some notes')
        (temp_chaotic_home / "backup").mkdir()

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            profiles = list_profiles()

        assert profiles == ['default']

    def test_ignores_symlinks(self, temp_chaotic_home):
        """list_profiles ignores symlinks for security."""
        from cli.config import list_profiles

        (temp_chaotic_home / "config.json").write_text('{}')
        # Create a symlink to a file outside the directory
        external_file = temp_chaotic_home.parent / "external.json"
        external_file.write_text('{}')
        symlink = temp_chaotic_home / "malicious.json"
        symlink.symlink_to(external_file)

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            profiles = list_profiles()

        # Should only return 'default', not 'malicious'
        assert profiles == ['default']

    def test_nonexistent_directory(self, tmp_path):
        """list_profiles returns empty list when chaotic home doesn't exist."""
        from cli.config import list_profiles

        nonexistent = tmp_path / "nonexistent"

        with patch('cli.config.get_chaotic_home', return_value=nonexistent):
            profiles = list_profiles()

        assert profiles == []

    def test_permission_error_returns_empty_list(self, temp_chaotic_home):
        """list_profiles returns empty list on permission error."""
        from cli.config import list_profiles

        (temp_chaotic_home / "config.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.object(Path, 'iterdir', side_effect=PermissionError("Access denied")):
                profiles = list_profiles()

        assert profiles == []


class TestGetEffectiveProfile:
    """Tests for get_effective_profile() function."""

    def test_returns_default_when_no_profile_set(self):
        """get_effective_profile returns 'default' when no profile is set."""
        from cli.config import get_effective_profile, set_profile

        set_profile(None)
        with patch.dict(os.environ, {}, clear=True):
            profile = get_effective_profile()

        assert profile == 'default'

    def test_returns_profile_from_module_state(self):
        """get_effective_profile returns profile set via set_profile()."""
        from cli.config import get_effective_profile, set_profile

        set_profile('claude')
        profile = get_effective_profile()
        set_profile(None)  # Clean up

        assert profile == 'claude'

    def test_returns_profile_from_env_var(self):
        """get_effective_profile returns profile from CHAOTIC_PROFILE env var."""
        from cli.config import get_effective_profile, set_profile

        set_profile(None)
        with patch.dict(os.environ, {'CHAOTIC_PROFILE': 'codex'}):
            profile = get_effective_profile()

        assert profile == 'codex'

    def test_module_state_takes_precedence_over_env(self):
        """Module state (--profile flag) takes precedence over env var."""
        from cli.config import get_effective_profile, set_profile

        set_profile('claude')
        with patch.dict(os.environ, {'CHAOTIC_PROFILE': 'codex'}):
            profile = get_effective_profile()
        set_profile(None)  # Clean up

        assert profile == 'claude'


class TestCheckProfileAmbiguity:
    """Tests for check_profile_ambiguity() function."""

    def test_no_error_when_profile_explicitly_set(self, temp_chaotic_home):
        """No error when profile is explicitly selected."""
        from cli.config import check_profile_ambiguity, set_profile

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        set_profile('claude')
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            # Should not raise
            check_profile_ambiguity()
        set_profile(None)

    def test_no_error_with_single_profile(self, temp_chaotic_home):
        """No error when only one profile exists."""
        from cli.config import check_profile_ambiguity, set_profile, ProfileAmbiguityError

        (temp_chaotic_home / "config.json").write_text('{}')

        set_profile(None)
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.dict(os.environ, {}, clear=True):
                # Should not raise
                check_profile_ambiguity()

    def test_no_error_with_no_profiles(self, temp_chaotic_home):
        """No error when no profiles exist."""
        from cli.config import check_profile_ambiguity, set_profile

        set_profile(None)
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.dict(os.environ, {}, clear=True):
                # Should not raise
                check_profile_ambiguity()

    def test_raises_error_with_multiple_profiles_no_selection(self, temp_chaotic_home):
        """Raises ProfileAmbiguityError when multiple profiles exist without selection."""
        from cli.config import check_profile_ambiguity, set_profile, ProfileAmbiguityError

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        set_profile(None)
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.dict(os.environ, {}, clear=True):
                with pytest.raises(ProfileAmbiguityError) as exc_info:
                    check_profile_ambiguity()

        assert 'claude' in str(exc_info.value)
        assert 'default' in str(exc_info.value)
        assert 'CHAOTIC_PROFILE' in str(exc_info.value)

    def test_error_includes_all_profiles(self, temp_chaotic_home):
        """ProfileAmbiguityError includes all available profiles."""
        from cli.config import check_profile_ambiguity, set_profile, ProfileAmbiguityError

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')
        (temp_chaotic_home / "codex.json").write_text('{}')
        (temp_chaotic_home / "gemini.json").write_text('{}')

        set_profile(None)
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.dict(os.environ, {}, clear=True):
                with pytest.raises(ProfileAmbiguityError) as exc_info:
                    check_profile_ambiguity()

        error = exc_info.value
        assert 'claude' in error.profiles
        assert 'codex' in error.profiles
        assert 'default' in error.profiles
        assert 'gemini' in error.profiles


class TestProfileAmbiguityError:
    """Tests for ProfileAmbiguityError class."""

    def test_error_message_format(self):
        """ProfileAmbiguityError has expected message format."""
        from cli.config import ProfileAmbiguityError

        error = ProfileAmbiguityError(['claude', 'codex', 'default'])

        assert 'Multiple profiles found' in str(error)
        assert 'CHAOTIC_PROFILE not set' in str(error)
        assert 'claude, codex, default' in str(error)
        assert '--profile' in str(error)

    def test_error_stores_profiles(self):
        """ProfileAmbiguityError stores the profile list."""
        from cli.config import ProfileAmbiguityError

        profiles = ['claude', 'codex', 'default']
        error = ProfileAmbiguityError(profiles)

        assert error.profiles == profiles


class TestProfileListCommand:
    """Tests for 'chaotic profile list' command."""

    def test_shows_all_profiles(self, cli_runner, temp_chaotic_home):
        """profile list shows all available profiles."""
        from cli.main import cli

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            result = cli_runner.invoke(cli, ['profile', 'list'])

        assert result.exit_code == 0
        assert 'default' in result.output
        assert 'claude' in result.output

    def test_indicates_active_profile(self, temp_chaotic_home):
        """profile list marks active profile with asterisk."""
        from cli.main import cli

        runner = CliRunner(env={'CHAOTIC_PROFILE': 'claude'})

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            result = runner.invoke(cli, ['profile', 'list'])

        assert result.exit_code == 0
        # Active profile should be marked
        assert '* claude' in result.output or '*claude' in result.output

    def test_shows_message_when_no_profiles(self, cli_runner, temp_chaotic_home):
        """profile list shows message when no profiles exist."""
        from cli.main import cli

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            result = cli_runner.invoke(cli, ['profile', 'list'])

        assert result.exit_code == 0
        assert 'No profiles' in result.output or 'no profiles' in result.output.lower()


class TestProfileCurrentCommand:
    """Tests for 'chaotic profile current' command."""

    def test_shows_current_profile(self, temp_chaotic_home):
        """profile current shows the active profile."""
        from cli.main import cli

        runner = CliRunner(env={'CHAOTIC_PROFILE': 'claude'})

        (temp_chaotic_home / "claude.json").write_text('{"api_key": "test-key"}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch('cli.config.GLOBAL_CONFIG_DIR', temp_chaotic_home):
                result = runner.invoke(cli, ['profile', 'current'])

        assert result.exit_code == 0
        assert 'claude' in result.output

    def test_shows_default_when_no_profile_set(self, cli_runner, temp_chaotic_home):
        """profile current shows 'default' when no profile explicitly set."""
        from cli.main import cli

        (temp_chaotic_home / "config.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch('cli.config.GLOBAL_CONFIG_DIR', temp_chaotic_home):
                result = cli_runner.invoke(cli, ['profile', 'current'])

        assert result.exit_code == 0
        assert 'default' in result.output


class TestProfileCommandsBypassAmbiguityCheck:
    """Tests that profile commands work even with ambiguous profiles."""

    def test_profile_list_works_without_profile_selection(self, temp_chaotic_home):
        """profile list command bypasses ambiguity check."""
        from cli.main import cli

        # Don't set CHAOTIC_PROFILE
        runner = CliRunner()

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            result = runner.invoke(cli, ['profile', 'list'])

        # Should succeed, not fail with ambiguity error
        assert result.exit_code == 0

    def test_check_profile_ambiguity_raises_error(self, temp_chaotic_home):
        """check_profile_ambiguity raises error when multiple profiles exist without selection.

        This verifies the underlying logic that other commands (via CLI callback) would fail.
        """
        from cli.config import check_profile_ambiguity, set_profile, ProfileAmbiguityError

        (temp_chaotic_home / "config.json").write_text('{}')
        (temp_chaotic_home / "claude.json").write_text('{}')

        set_profile(None)  # Ensure no profile is set
        with patch('cli.config.get_chaotic_home', return_value=temp_chaotic_home):
            with patch.dict(os.environ, {}, clear=True):
                with pytest.raises(ProfileAmbiguityError) as exc_info:
                    check_profile_ambiguity()

        assert 'Multiple profiles' in str(exc_info.value)
        assert 'claude' in str(exc_info.value)
        assert 'default' in str(exc_info.value)

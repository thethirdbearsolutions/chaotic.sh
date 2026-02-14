"""Tests for config show command (CHT-834)."""
import json
from unittest.mock import patch
from click.testing import CliRunner

from cli.main import cli


def _common_patches():
    """Return context managers for common patches needed by config show tests."""
    return patch('cli.main.check_profile_ambiguity')


class TestConfigShow:
    """Tests for chaotic config show."""

    def test_show_basic_output(self):
        """config show displays configuration values."""
        runner = CliRunner()
        with _common_patches(), \
             patch('cli.main.get_effective_profile', return_value='default'), \
             patch('cli.main.get_api_url', return_value='http://localhost:24267/api'), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None):
            result = runner.invoke(cli, ['config', 'show'])

        assert result.exit_code == 0
        assert 'Configuration' in result.output
        assert 'default' in result.output
        assert 'http://localhost:24267/api' in result.output

    def test_show_with_profile_and_local_config(self):
        """config show displays profile, local config path, and IDs."""
        runner = CliRunner()
        with _common_patches(), \
             patch('cli.main.get_effective_profile', return_value='claude'), \
             patch('cli.main.get_api_url', return_value='http://example.com/api'), \
             patch('cli.main.find_local_config', return_value='/some/path/.chaotic'), \
             patch('cli.main.get_token', return_value='tok123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-1'), \
             patch('cli.main.get_current_project', return_value='proj-1'):
            result = runner.invoke(cli, ['config', 'show'])

        assert result.exit_code == 0
        assert 'claude' in result.output
        assert 'http://example.com/api' in result.output
        assert '/some/path/.chaotic' in result.output
        assert 'team-1' in result.output
        assert 'proj-1' in result.output

    def test_show_json(self):
        """config show --json outputs valid JSON with all fields."""
        runner = CliRunner()
        with _common_patches(), \
             patch('cli.main.get_effective_profile', return_value='claude'), \
             patch('cli.main.get_api_url', return_value='http://example.com/api'), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value='key123'), \
             patch('cli.main.get_current_team', return_value='team-1'), \
             patch('cli.main.get_current_project', return_value=None):
            result = runner.invoke(cli, ['config', 'show', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data['profile'] == 'claude'
        assert data['api_url'] == 'http://example.com/api'
        assert data['local_config'] is None
        assert data['has_token'] is False
        assert data['has_api_key'] is True
        assert data['team_id'] == 'team-1'
        assert data['project_id'] is None

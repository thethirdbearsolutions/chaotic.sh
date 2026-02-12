"""Tests for 'issue create' command with --sprint option."""
import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture
def mock_config():
    """Mock config functions."""
    with patch('cli.main.get_token', return_value='test-token'), \
         patch('cli.main.get_current_team', return_value='team-123'), \
         patch('cli.main.get_current_project', return_value='project-123'):
        yield


@pytest.fixture
def mock_client():
    """Mock the API client."""
    with patch('cli.main.client') as mock:
        yield mock


@pytest.fixture
def sample_sprint():
    """Sample sprint data."""
    return {
        "id": "sprint-abc-123",
        "name": "Sprint 1",
        "status": "active"
    }


@pytest.fixture
def sample_issue():
    """Sample issue response."""
    return {
        "id": "issue-123",
        "identifier": "PRJ-42",
        "title": "Test Issue",
        "status": "backlog",
        "priority": "medium",
        "sprint_id": None
    }


class TestIssueCreateWithSprint:
    """Tests for creating issues with sprint assignment."""

    def test_create_issue_with_current_sprint(self, cli_runner, mock_config, mock_client, sample_sprint, sample_issue):
        """Test creating an issue and assigning it to the current sprint."""
        from cli.main import cli

        # Setup mocks
        mock_client.get_current_sprint.return_value = sample_sprint
        sample_issue_with_sprint = sample_issue.copy()
        sample_issue_with_sprint["sprint_id"] = sample_sprint["id"]
        mock_client.create_issue.return_value = sample_issue_with_sprint

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', 'current'
        ])

        # Verify the issue was created with sprint_id
        assert result.exit_code == 0
        mock_client.create_issue.assert_called_once()
        call_kwargs = mock_client.create_issue.call_args[1]
        assert call_kwargs['sprint_id'] == sample_sprint["id"]
        assert "Issue created" in result.output

    def test_create_issue_with_sprint_id(self, cli_runner, mock_config, mock_client, sample_sprint, sample_issue):
        """Test creating an issue with explicit sprint ID."""
        from cli.main import cli

        # Setup mocks
        mock_client.get_sprints.return_value = [sample_sprint]
        sample_issue_with_sprint = sample_issue.copy()
        sample_issue_with_sprint["sprint_id"] = sample_sprint["id"]
        mock_client.create_issue.return_value = sample_issue_with_sprint

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', sample_sprint["id"]
        ])

        # Verify the issue was created with sprint_id
        assert result.exit_code == 0
        mock_client.create_issue.assert_called_once()
        call_kwargs = mock_client.create_issue.call_args[1]
        assert call_kwargs['sprint_id'] == sample_sprint["id"]

    def test_create_issue_with_sprint_name(self, cli_runner, mock_config, mock_client, sample_sprint, sample_issue):
        """Test creating an issue with sprint name."""
        from cli.main import cli

        # Setup mocks
        mock_client.get_sprints.return_value = [sample_sprint]
        sample_issue_with_sprint = sample_issue.copy()
        sample_issue_with_sprint["sprint_id"] = sample_sprint["id"]
        mock_client.create_issue.return_value = sample_issue_with_sprint

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', 'Sprint 1'
        ])

        # Verify the issue was created with sprint_id
        assert result.exit_code == 0
        mock_client.create_issue.assert_called_once()
        call_kwargs = mock_client.create_issue.call_args[1]
        assert call_kwargs['sprint_id'] == sample_sprint["id"]

    def test_create_issue_with_sprint_none(self, cli_runner, mock_config, mock_client, sample_issue):
        """Test creating an issue with explicit 'none' for sprint."""
        from cli.main import cli

        # Setup mocks
        mock_client.create_issue.return_value = sample_issue

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', 'none'
        ])

        # Verify the issue was created with sprint_id = None
        assert result.exit_code == 0
        mock_client.create_issue.assert_called_once()
        call_kwargs = mock_client.create_issue.call_args[1]
        assert call_kwargs['sprint_id'] is None

    def test_create_issue_without_sprint(self, cli_runner, mock_config, mock_client, sample_issue):
        """Test creating an issue without specifying sprint (default behavior)."""
        from cli.main import cli

        # Setup mocks
        mock_client.create_issue.return_value = sample_issue

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description'
        ])

        # Verify the issue was created without sprint_id in kwargs
        assert result.exit_code == 0
        mock_client.create_issue.assert_called_once()
        call_kwargs = mock_client.create_issue.call_args[1]
        assert 'sprint_id' not in call_kwargs

    def test_create_issue_sprint_option_in_help(self, cli_runner):
        """Test that --sprint option appears in help text."""
        from cli.main import cli

        runner = cli_runner
        result = runner.invoke(cli, ['issue', 'create', '--help'])

        assert result.exit_code == 0
        assert '--sprint' in result.output
        assert 'current' in result.output
        assert 'none' in result.output


class TestIssueCreateSprintErrors:
    """Tests for error handling in sprint assignment during issue creation."""

    def test_create_issue_sprint_not_found(self, cli_runner, mock_config, mock_client):
        """Test error when specified sprint doesn't exist."""
        from cli.main import cli
        import click

        # Setup mocks - empty sprint list
        mock_client.get_sprints.return_value = []

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', 'Nonexistent Sprint'
        ])

        # Should fail with error message
        assert result.exit_code != 0
        assert 'No sprints exist' in result.output or 'not found' in result.output

    def test_create_issue_ambiguous_sprint(self, cli_runner, mock_config, mock_client):
        """Test error when sprint identifier is ambiguous."""
        from cli.main import cli

        # Setup mocks - two sprints with same prefix
        mock_client.get_sprints.return_value = [
            {"id": "abc-123", "name": "Sprint 1", "status": "active"},
            {"id": "abc-456", "name": "Sprint 2", "status": "planned"}
        ]

        runner = cli_runner
        result = runner.invoke(cli, [
            'issue', 'create',
            '--title', 'Test Issue',
            '--description', 'Test Description',
            '--sprint', 'abc'  # Ambiguous prefix
        ])

        # Should fail with ambiguity error
        assert result.exit_code != 0
        assert 'Ambiguous' in result.output or 'ambiguous' in result.output

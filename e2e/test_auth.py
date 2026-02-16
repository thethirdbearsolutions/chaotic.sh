"""E2E contract tests: Auth endpoints."""
import pytest
from cli.client import APIError


class TestSignup:
    def test_signup_creates_user(self, unauthenticated_client):
        result = unauthenticated_client.signup("New User", "new@example.com", "password123")
        assert "id" in result
        assert result["email"] == "new@example.com"

    def test_signup_duplicate_email(self, unauthenticated_client, test_user):
        with pytest.raises(APIError):
            unauthenticated_client.signup("Dup", "e2e@example.com", "password123")


class TestLogin:
    def test_login_valid_credentials(self, unauthenticated_client, test_user):
        result = unauthenticated_client.login("e2e@example.com", "testpassword123")
        assert "access_token" in result
        assert result["token_type"] == "bearer"

    def test_login_wrong_password(self, unauthenticated_client, test_user):
        with pytest.raises(APIError):
            unauthenticated_client.login("e2e@example.com", "wrongpassword")

    def test_login_nonexistent_user(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.login("nobody@example.com", "password")


class TestGetMe:
    def test_get_me_authenticated(self, api_client, test_user):
        result = api_client.get_me()
        assert result["email"] == "e2e@example.com"
        assert result["name"] == "E2E Test User"
        assert "id" in result

    def test_get_me_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.get_me()

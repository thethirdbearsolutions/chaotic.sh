"""E2E contract tests: API keys."""
import pytest
from cli.client import APIError


class TestAPIKeys:
    def test_create_api_key(self, api_client):
        key = api_client.create_api_key("Test Key")
        assert "id" in key
        assert key["name"] == "Test Key"

    def test_list_api_keys(self, api_client):
        api_client.create_api_key("Key A")
        api_client.create_api_key("Key B")
        keys = api_client.list_api_keys()
        assert isinstance(keys, list)
        assert len(keys) >= 2

    def test_revoke_api_key(self, api_client):
        key = api_client.create_api_key("To Revoke")
        result = api_client.revoke_api_key(key["id"])
        # Revoke succeeds without error (may soft-delete or hard-delete)
        assert result is None or isinstance(result, dict)

    def test_list_api_keys_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.list_api_keys()

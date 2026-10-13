"""Push notification schemas (CHT-1604)."""
from urllib.parse import urlsplit

from pydantic import BaseModel, ConfigDict, Field

from app.enums import InboxEntryKind, PushTransport
from app.utils import DateTimeUTC


class PushDeviceRegister(BaseModel):
    """PUT /push/devices/{installation_id}: what the app got from its
    UnifiedPush distributor. The keys are the subscription's, as a Web
    Push subscription carries them (RFC 8291), base64url."""

    model_config = ConfigDict(extra="forbid")

    transport: PushTransport = PushTransport.WEB_PUSH
    endpoint: str = Field(min_length=1, max_length=2048)
    p256dh: str = Field(min_length=1, max_length=128)
    auth: str = Field(min_length=1, max_length=64)
    platform: str | None = Field(default=None, max_length=32)
    label: str | None = Field(default=None, max_length=100)


class PushDeviceResponse(BaseModel):
    """A registered device, for its owner's settings page. The endpoint
    itself is not returned (anyone holding it can push to the phone), only
    its host; nor are the keys."""

    id: str
    installation_id: str
    transport: PushTransport
    endpoint_host: str
    platform: str | None = None
    label: str | None = None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    last_success_at: DateTimeUTC | None = None
    failure_count: int = 0

    @classmethod
    def of(cls, device) -> "PushDeviceResponse":
        return cls(
            id=device.id,
            installation_id=device.installation_id,
            transport=device.transport,
            endpoint_host=urlsplit(device.endpoint).hostname or "",
            platform=device.platform,
            label=device.label,
            created_at=device.created_at,
            updated_at=device.updated_at,
            last_success_at=device.last_success_at,
            failure_count=device.failure_count,
        )


class PushPreferencesResponse(BaseModel):
    """Every inbox kind, and whether it is pushed to this person."""

    kinds: dict[InboxEntryKind, bool]


class PushPreferencesUpdate(BaseModel):
    """PATCH /push/preferences: the kinds to change; the rest stay."""

    model_config = ConfigDict(extra="forbid")

    kinds: dict[InboxEntryKind, bool]


class VapidPublicKeyResponse(BaseModel):
    """The server's VAPID public key, for the app to pass to its push
    distributor: the uncompressed P-256 point, base64url (Web Push's
    applicationServerKey)."""

    public_key: str

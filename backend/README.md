# Chaotic Backend

FastAPI backend for the Chaotic issue tracking system.

## Development

```bash
uv sync --extra dev
uv run uvicorn app.main:app --reload --port 24267
```

## Testing

```bash
uv sync --extra dev
uv run pytest
```

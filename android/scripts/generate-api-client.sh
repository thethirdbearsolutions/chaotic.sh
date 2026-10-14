#!/usr/bin/env bash
# Regenerate the Android app's API client from the backend (CHT-1609).
#
#   android/scripts/generate-api-client.sh           rewrite the committed client
#   android/scripts/generate-api-client.sh --check   fail if it is stale (CI runs this)
#
# Two steps:
#   1. Dump the backend's OpenAPI schema (app.main:app.openapi()) to
#      android/core-api/openapi/chaotic.json. The schema is committed so a PR
#      that changes the API shows the contract change next to the code.
#   2. Run openapi-generator's `kotlin` generator (Ktor client,
#      kotlinx.serialization) over it into android/core-api/src/generated/kotlin.
#
# Needs: uv (the backend environment, as `just sync` builds it) and Java 11+.
# The generator jar is downloaded from Maven Central once, checked against the
# pinned SHA-256 below, and cached under ${XDG_CACHE_HOME:-~/.cache}/chaotic.
# When you change the API, run this and commit what it writes in the same PR.
set -euo pipefail

GENERATOR_VERSION=7.26.0
GENERATOR_SHA256=1760050094997b9cc790cc1350be095f15da8c08a996b184d3eadc4ccda5e35e
GENERATOR_URL="https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${GENERATOR_VERSION}/openapi-generator-cli-${GENERATOR_VERSION}.jar"

check=false
case "${1:-}" in
    "") ;;
    --check) check=true ;;
    *) echo "usage: $0 [--check]" >&2; exit 2 ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
core_api="$repo_root/android/core-api"
schema="$core_api/openapi/chaotic.json"
generated="$core_api/src/generated/kotlin"

command -v java >/dev/null || { echo "error: java is not on PATH (Java 11+ is needed)" >&2; exit 1; }
command -v uv >/dev/null || { echo "error: uv is not on PATH" >&2; exit 1; }

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

# 1. Dump the schema. Written to a file rather than stdout so nothing the app
# logs on import can end up in it.
(cd "$repo_root/backend" && uv run --locked --quiet python - "$work/chaotic.json" <<'PY'
import json
import sys

from app.main import app

with open(sys.argv[1], "w", encoding="utf-8") as f:
    json.dump(app.openapi(), f, indent=2)
    f.write("\n")
PY
)

# 2. Generate.
cache="${XDG_CACHE_HOME:-$HOME/.cache}/chaotic"
jar="$cache/openapi-generator-cli-${GENERATOR_VERSION}.jar"
if [ ! -f "$jar" ] || ! echo "$GENERATOR_SHA256  $jar" | sha256sum --check --status; then
    mkdir -p "$cache"
    curl --fail --silent --show-error --location --retry 4 --retry-all-errors \
        --output "$jar.part" "$GENERATOR_URL"
    if ! echo "$GENERATOR_SHA256  $jar.part" | sha256sum --check --status; then
        rm -f "$jar.part"
        echo "error: openapi-generator-cli ${GENERATOR_VERSION} does not match the pinned SHA-256" >&2
        exit 1
    fi
    mv "$jar.part" "$jar"
fi

# Generator options:
# - dateLibrary=string: timestamps stay ISO-8601 strings until the app needs
#   them parsed; it avoids registering contextual java.time serializers.
# - enumUnknownDefaultCase: an enum value this build does not know decodes to
#   `unknown_default_open_api` instead of failing the whole response, so an
#   older app keeps working against a newer server.
# - Free-form JSON has no kotlinx.serializer for kotlin.Any (the compiler
#   plugin crashes on Map<String, Any>), so it maps to kotlinx JSON trees:
#   `{}` (AnyType) to JsonElement, a bare `type: object` to JsonObject.
# - The schema's anyOf-of-primitives (a validation error's `loc` items, a
#   setting change's old/new value) come out as empty classes that cannot
#   decode anything; JSON_PRIMITIVE_SCHEMAS maps them to JsonPrimitive. The
#   generator still writes the (now unused) empty classes; the check below
#   fails on any other empty class, so a new anyOf cannot slip in unmapped.
JSON_PRIMITIVE_SCHEMAS="LocationInner OldValue NewValue"
type_mappings="AnyType=JsonElement,object=JsonObject"
for name in $JSON_PRIMITIVE_SCHEMAS; do
    type_mappings="$type_mappings,$name=kotlinx.serialization.json.JsonPrimitive"
done
java -jar "$jar" generate \
    --input-spec "$work/chaotic.json" \
    --generator-name kotlin \
    --library jvm-ktor \
    --output "$work/out" \
    --global-property apis,models,supportingFiles,apiDocs=false,modelDocs=false,apiTests=false,modelTests=false \
    --type-mappings "$type_mappings" \
    --import-mappings JsonElement=kotlinx.serialization.json.JsonElement,JsonObject=kotlinx.serialization.json.JsonObject \
    --additional-properties serializationLibrary=kotlinx_serialization,packageName=sh.chaotic.api,dateLibrary=string,enumUnknownDefaultCase=true,sourceFolder=src/main/kotlin \
    >"$work/generator.log" 2>&1 || { cat "$work/generator.log" >&2; exit 1; }

unmapped=""
for f in $(grep -lE '^class [A-Za-z0-9_]+ \($' "$work/out/src/main/kotlin/sh/chaotic/api/models/"*.kt || true); do
    name="$(basename "$f" .kt)"
    case " $JSON_PRIMITIVE_SCHEMAS " in
        *" $name "*) ;;
        *) unmapped="$unmapped $name" ;;
    esac
done
if [ -n "$unmapped" ]; then
    echo "error: the generator produced empty model classes:$unmapped" >&2
    echo "They cannot decode a response. Map each one (see JSON_PRIMITIVE_SCHEMAS in $0)." >&2
    exit 1
fi

if $check; then
    stale=false
    if ! diff -u "$schema" "$work/chaotic.json" >"$work/schema.diff"; then
        echo "error: android/core-api/openapi/chaotic.json is stale:" >&2
        head -n 80 "$work/schema.diff" >&2
        stale=true
    fi
    if ! diff -r -u "$generated" "$work/out/src/main/kotlin" >"$work/client.diff"; then
        echo "error: android/core-api/src/generated/kotlin is stale:" >&2
        head -n 80 "$work/client.diff" >&2
        stale=true
    fi
    if $stale; then
        echo >&2
        echo "Run android/scripts/generate-api-client.sh and commit the result." >&2
        exit 1
    fi
    echo "API client is up to date."
else
    mkdir -p "$(dirname "$schema")"
    cp "$work/chaotic.json" "$schema"
    rm -rf "$generated"
    mkdir -p "$(dirname "$generated")"
    cp -R "$work/out/src/main/kotlin" "$generated"
    echo "Wrote $schema and $generated"
fi

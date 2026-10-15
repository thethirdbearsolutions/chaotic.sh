#!/bin/bash
# Exercises scripts/android-release.sh (CHT-1729) without an Android SDK:
# its helpers, and --new-key against a throwaway HOME with a throwaway key
# (never a real one). Needs keytool (a JDK) and python3.
# Run:  bash scripts/android-release.test.sh
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="${HERE}/android-release.sh"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

fail=0
check() {
    local label="$1"
    shift
    if "$@"; then
        echo "ok   $label"
    else
        echo "FAIL $label"
        fail=1
    fi
}

# shellcheck source=scripts/android-release.sh
ANDROID_RELEASE_LIB=1 source "$SCRIPT"
set +e # the helpers are checked one by one below

FP="AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89"
check "apksigner's hex digest becomes the colon form" \
    test "$(colon_fingerprint abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789)" = "$FP"
check "a fingerprint is 32 colon-separated upper-case bytes" is_fingerprint "$FP"
check "a short one is not" bash -c "! (ANDROID_RELEASE_LIB=1 source '$SCRIPT'; is_fingerprint AB:CD)"

# assetlinks.json: the same shape backend/tests/test_oauth_app_signin.py requires.
assetlinks_json "$FP" >"$WORK/statement.json"
check "the statement names the package and the key" python3 -I - "$WORK/statement.json" "$FP" <<'EOF'
import json, sys
statements = json.load(open(sys.argv[1]))
assert statements == [{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {"namespace": "android_app", "package_name": "sh.chaotic.android",
               "sha256_cert_fingerprints": [sys.argv[2]]},
}], statements
EOF

echo "[]" >"$WORK/assetlinks.json"
check "the empty placeholder is filled in" write_assetlinks "$FP" "$WORK/assetlinks.json"
check "with exactly the statement" cmp -s "$WORK/assetlinks.json" "$WORK/statement.json"
check "writing the same key again changes nothing" write_assetlinks "$FP" "$WORK/assetlinks.json"
OTHER="${FP/AB:CD:EF:01/01:02:03:04}"
check "a file naming another key is left alone" bash -c "! (ANDROID_RELEASE_LIB=1 source '$SCRIPT'; write_assetlinks '$OTHER' '$WORK/assetlinks.json' 2>/dev/null)"
check "and keeps the key it had" cmp -s "$WORK/assetlinks.json" "$WORK/statement.json"

touch "$WORK/open"
chmod 644 "$WORK/open"
check "a file others can read is refused" bash -c "! (ANDROID_RELEASE_LIB=1 source '$SCRIPT'; require_private '$WORK/open' 2>/dev/null)"
chmod 600 "$WORK/open"
check "a private one is accepted" require_private "$WORK/open"

# --new-key, in a throwaway HOME. The password has a backslash, which the
# properties file must carry doubled.
PW='correct horse\battery staple'
printf '%s\n%s\n' "$PW" "$PW" | HOME="$WORK/home" bash "$SCRIPT" --new-key >"$WORK/new-key.log" 2>&1
check "--new-key succeeds" test $? = 0
PROPS="$WORK/home/.chaotic/android-signing.properties"
STORE="$WORK/home/.chaotic/android-release.jks"
check "it writes the keystore and the properties" test -f "$STORE" -a -f "$PROPS"
check "both private" bash -c "[ \"\$(stat -c %a '$PROPS')\" = 600 ] && [ \"\$(stat -c %a '$STORE')\" = 600 ]"
check "the properties file doubles the backslash" grep -qxF 'storePassword=correct horse\\battery staple' "$PROPS"
check "Java reads the password back as typed" python3 -I - "$PROPS" "$PW" <<'EOF'
import sys
# java.util.Properties: "\\" is one backslash.
line = next(l for l in open(sys.argv[1]) if l.startswith("keyPassword="))
assert line.rstrip("\n").split("=", 1)[1].replace("\\\\", "\\") == sys.argv[2]
EOF
export HOME="$WORK/home"
check "the prop helper reads it back as typed" test "$(prop storePassword)" = "$PW"
FROM_KEYSTORE="$(keystore_fingerprint)"
check "the keystore fingerprint is well formed" is_fingerprint "$FROM_KEYSTORE"
check "and is what --new-key printed" grep -qF "$FROM_KEYSTORE" "$WORK/new-key.log"
check "the backup advice is printed" grep -q "BACK IT UP" "$WORK/new-key.log"
printf '%s\n%s\n' "$PW" "$PW" | bash "$SCRIPT" --new-key >"$WORK/again.log" 2>&1
check "--new-key never replaces a key" bash -c "[ $? != 0 ] && grep -q 'already exists' '$WORK/again.log'"

rm -rf "$WORK/home2"
printf 'short\nshort\n' | HOME="$WORK/home2" bash "$SCRIPT" --new-key >/dev/null 2>&1
check "a short password is refused" test $? != 0 -a ! -e "$WORK/home2/.chaotic/android-release.jks"

if [ "$fail" != 0 ]; then
    echo "android-release.sh tests failed" >&2
    exit 1
fi
echo "android-release.sh tests passed"

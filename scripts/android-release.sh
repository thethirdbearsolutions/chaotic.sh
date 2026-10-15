#!/usr/bin/env bash
# Build, sign and stage a release of the Chaotic Android app (CHT-1729).
#
# Run on the release machine (the owner's Mac), from anywhere in the repo:
#
#   scripts/android-release.sh --new-key           # once, ever: make the release key
#   scripts/android-release.sh                     # build, verify, stage a GitHub Release
#   scripts/android-release.sh --snapshot          # build and verify only: any commit,
#                                                  # dirty tree allowed, nothing staged
#   scripts/android-release.sh --snapshot --write-assetlinks
#                                                  # and put the key's fingerprint in
#                                                  # website/.well-known/assetlinks.json
#
# The key and its passwords live only in ~/.chaotic (see docs/android.md):
#   ~/.chaotic/android-release.jks
#   ~/.chaotic/android-signing.properties   (read by android/app/build.gradle.kts)
# Nothing here reads a password from the environment, and CI never runs this
# script: CI builds the release unsigned (CHT-1661).
#
# The GitHub Release is staged, not created: the script prints the `gh release
# create` command and runs it only if you answer "y" at the prompt. It stages
# nothing until https://chaotic.sh/.well-known/assetlinks.json (deployed from
# the committed website/.well-known/assetlinks.json) names the release key:
# without it, sign-in has no App Links protection (CHT-1649).
#
# Written for the bash 3.2 that macOS ships.
set -euo pipefail

REPO_SLUG="thethirdbearsolutions/chaotic.sh"
PACKAGE="sh.chaotic.android"
KEY_ALIAS="chaotic"
KEY_DNAME="CN=Chaotic for Android, O=Third Bear Solutions"
KEY_VALIDITY_DAYS=10000 # about 27 years; the key can never change for installed users
MIN_PASSWORD_LENGTH=12
ASSETLINKS_URL="https://chaotic.sh/.well-known/assetlinks.json"

signing_dir() { echo "${HOME}/.chaotic"; }
signing_props() { echo "$(signing_dir)/android-signing.properties"; }
default_keystore() { echo "$(signing_dir)/android-release.jks"; }

die() {
    echo "error: $*" >&2
    exit 1
}
say() { echo "==> $*"; }

# "ab01..." (apksigner) -> "AB:01:..." (assetlinks.json, keytool).
colon_fingerprint() {
    echo "$1" | tr -d ' :\n' | tr 'abcdef' 'ABCDEF' | sed 's/../&:/g; s/:$//'
}

is_fingerprint() {
    echo "$1" | grep -Eq '^[0-9A-F]{2}(:[0-9A-F]{2}){31}$'
}

# Octal permission bits of a file, on macOS (BSD stat) and Linux (GNU stat).
file_mode() {
    stat -f '%Lp' "$1" 2>/dev/null || stat -c '%a' "$1"
}

# The signing files must not be readable by anyone else.
require_private() {
    local mode
    mode=$(file_mode "$1")
    case "$mode" in
        *00) ;;
        *) die "$1 is readable by others (mode $mode): run  chmod 600 '$1'" ;;
    esac
}

# One entry of the signing properties file (no escapes beyond what
# --new-key writes: a backslash is written doubled).
prop() {
    local value
    value=$(sed -n "s/^$1=//p" "$(signing_props)" | head -n 1)
    printf '%s' "$value" | sed 's/\\\\/\\/g'
}

# The keystore the properties file names. A relative path is relative to the
# properties file's directory, as android/app/build.gradle.kts resolves it.
store_file() {
    local path
    path=$(prop storeFile)
    case "$path" in
        /*) echo "$path" ;;
        *) echo "$(signing_dir)/$path" ;;
    esac
}

# The SHA-256 fingerprint of the release key's certificate, from the keystore.
keystore_fingerprint() {
    local store pass
    store=$(store_file)
    pass=$(prop storePassword)
    CHAOTIC_KS_PASS="$pass" keytool -list -v -keystore "$store" -alias "$(prop keyAlias)" \
        -storepass:env CHAOTIC_KS_PASS |
        sed -n 's/^[[:space:]]*SHA256:[[:space:]]*//p' | head -n 1
}

# The Digital Asset Links statement that verifies the app's App Links
# redirect for this key (CHT-1649).
assetlinks_json() {
    cat <<EOF
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "${PACKAGE}",
      "sha256_cert_fingerprints": [
        "$1"
      ]
    }
  }
]
EOF
}

# Put the fingerprint in an assetlinks.json that is still the empty
# placeholder. One that already names other keys is left for a person to
# merge: this never drops a fingerprint.
write_assetlinks() {
    local fingerprint="$1" file="$2"
    if grep -q "\"${fingerprint}\"" "$file"; then
        say "$file already names this key."
        return 0
    fi
    if [ "$(tr -d ' \n\t' <"$file")" != "[]" ]; then
        echo "$file already names another key. Add this fingerprint to its" >&2
        echo "sha256_cert_fingerprints by hand:  $fingerprint" >&2
        return 1
    fi
    assetlinks_json "$fingerprint" >"$file"
    say "Wrote $file. Commit it and deploy the website BEFORE publishing the release."
}

# Refuse to stage a release before the key's fingerprint is committed in
# website/.well-known/assetlinks.json at the release commit and served at
# $2 (the deployed website). Android checks it when the app is installed.
require_published_fingerprint() {
    local fingerprint="$1" url="$2" committed live
    committed=$(git -C "$REPO" show HEAD:website/.well-known/assetlinks.json)
    grep -q "\"${fingerprint}\"" <<<"$committed" ||
        die "website/.well-known/assetlinks.json at HEAD does not name the release key $fingerprint.
Run  scripts/android-release.sh --snapshot --write-assetlinks , merge that, deploy the website, then release."
    live=$(curl -fsS --max-time 20 "$url") || die "could not fetch $url"
    grep -q "\"${fingerprint}\"" <<<"$live" ||
        die "$url does not name the release key $fingerprint yet: deploy the website first."
    say "$url names the release key."
}

read_password() {
    local first second
    printf 'Password for the new release keystore (at least %s characters): ' "$MIN_PASSWORD_LENGTH" >&2
    IFS= read -rs first
    echo >&2
    printf 'Again: ' >&2
    IFS= read -rs second
    echo >&2
    [ "$first" = "$second" ] || die "the passwords differ"
    [ "${#first}" -ge "$MIN_PASSWORD_LENGTH" ] || die "the password is shorter than $MIN_PASSWORD_LENGTH characters"
    # A properties file drops a value's leading spaces.
    case "$first" in
        [[:space:]]* | *[[:space:]]) die "the password must not start or end with a space" ;;
    esac
    PASSWORD="$first"
}

new_key() {
    local dir props store escaped
    dir=$(signing_dir)
    props=$(signing_props)
    store=$(default_keystore)
    [ -e "$props" ] && die "$props already exists. The release key is made once; never replace it (docs/android.md)."
    [ -e "$store" ] && die "$store already exists, but $props does not. Restore the properties file from your backup instead."
    command -v keytool >/dev/null || die "keytool not found: install a JDK 17 (the one Android Studio bundles works)"

    read_password
    umask 077
    mkdir -p "$dir"
    chmod 700 "$dir"
    say "Generating a 4096-bit RSA key in $store"
    # PKCS12: the key's password is the keystore's.
    CHAOTIC_KS_PASS="$PASSWORD" keytool -genkeypair -keystore "$store" -storetype PKCS12 \
        -alias "$KEY_ALIAS" -keyalg RSA -keysize 4096 -validity "$KEY_VALIDITY_DAYS" \
        -dname "$KEY_DNAME" -storepass:env CHAOTIC_KS_PASS >/dev/null
    escaped=$(printf '%s' "$PASSWORD" | sed 's/\\/\\\\/g')
    {
        echo "# The Chaotic Android release key (CHT-1729). Keep private; back up with the keystore."
        echo "storeFile=$store"
        echo "storePassword=$escaped"
        echo "keyAlias=$KEY_ALIAS"
        echo "keyPassword=$escaped"
    } >"$props"
    chmod 600 "$props" "$store"
    PASSWORD=""

    cat <<EOF

The release key exists only on this machine now. BACK IT UP before you
publish anything signed with it:

  1. Copy $store to two places that are not this Mac
     (for example an encrypted USB drive kept offline, and a password
     manager that stores files).
  2. Store the keystore password with it (the password manager entry).
  3. Check a backup opens:  keytool -list -keystore <backup copy>

If the key is lost, no update can ever install over the app already on
people's phones: everyone has to uninstall (losing the app's local data)
and install again. If it leaks, someone else can sign "updates" that
install over Chaotic and receive its sign-in redirect: rotate the key and
tell users. See docs/android.md.

Fingerprint (for website/.well-known/assetlinks.json):
  $(keystore_fingerprint)
EOF
}

find_build_tools() {
    local sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
    if [ -z "$sdk" ] && [ -f "$ANDROID_DIR/local.properties" ]; then
        sdk=$(sed -n 's/^sdk\.dir=//p' "$ANDROID_DIR/local.properties" | head -n 1)
    fi
    [ -z "$sdk" ] && sdk="$HOME/Library/Android/sdk"
    [ -d "$sdk/build-tools" ] || die "no Android SDK build-tools under $sdk (set ANDROID_HOME)"
    local latest
    latest=$(ls "$sdk/build-tools" | sort -V | tail -n 1)
    [ -n "$latest" ] || die "no build-tools version installed under $sdk/build-tools"
    echo "$sdk/build-tools/$latest"
}

gradle_value() {
    sed -n "s/^[[:space:]]*$1 = \"*\([^\"]*\)\"*$/\1/p" "$ANDROID_DIR/app/build.gradle.kts" | head -n 1
}

sha256_of() {
    if command -v shasum >/dev/null; then shasum -a 256 "$1" | cut -d' ' -f1; else sha256sum "$1" | cut -d' ' -f1; fi
}

release() {
    local snapshot="$1" assetlinks="$2"
    local props head version code tools apk signed certs cert fingerprint expected sum stage tag name

    props=$(signing_props)
    [ -f "$props" ] || die "$props not found. Run  scripts/android-release.sh --new-key  once, or restore it from your backup."
    require_private "$props"
    [ -f "$(store_file)" ] || die "the keystore $(store_file) named in $props does not exist"
    require_private "$(store_file)"

    head=$(git -C "$REPO" rev-parse HEAD)
    if [ "$snapshot" = 0 ]; then
        # Tracked changes anywhere, and untracked files under android/ (they
        # would be compiled in), but not files .gitignore excludes (build/).
        [ -z "$(git -C "$REPO" status --porcelain --untracked-files=no)$(git -C "$REPO" status --porcelain --untracked-files=all -- android)" ] ||
            die "the working tree has uncommitted or untracked changes: a release is built from a commit (or use --snapshot)"
        git -C "$REPO" fetch --quiet origin main
        git -C "$REPO" merge-base --is-ancestor "$head" origin/main ||
            die "HEAD ($head) is not on origin/main: release from a merged commit (or use --snapshot)"
    fi

    version=$(gradle_value versionName)
    code=$(gradle_value versionCode)
    [ -n "$version" ] && [ -n "$code" ] || die "could not read versionName/versionCode from android/app/build.gradle.kts"
    tools=$(find_build_tools)

    say "Building Chaotic for Android $version (versionCode $code), foss flavor, at $head"
    # No configuration cache: it would store the signing passwords (encrypted)
    # under android/.gradle (docs/android.md).
    (cd "$ANDROID_DIR" && ./gradlew --quiet --no-configuration-cache :app:clean :app:assembleFossRelease)

    apk="$ANDROID_DIR/app/build/outputs/apk/foss/release/app-foss-release.apk"
    if [ ! -f "$apk" ]; then
        [ -f "${apk%.apk}-unsigned.apk" ] && die "the build is unsigned: android/app/build.gradle.kts did not find $props"
        die "no APK at $apk"
    fi

    say "Verifying the signature with apksigner"
    certs=$("$tools/apksigner" verify --verbose --print-certs "$apk")
    echo "$certs" | grep -q '^Verified using v2 scheme (APK Signature Scheme v2): true' ||
        die "apksigner did not verify a v2 signature:
$certs"
    echo "$certs" | grep -q '^Signer #2' && die "the APK has more than one signer"
    cert=$(echo "$certs" | sed -n 's/^Signer #1 certificate SHA-256 digest: //p')
    [ -n "$cert" ] || die "apksigner printed no signing certificate digest"
    fingerprint=$(colon_fingerprint "$cert")
    expected=$(keystore_fingerprint)
    [ "$fingerprint" = "$expected" ] || die "the APK is signed by $fingerprint, not the release key $expected"
    if [ -x "$tools/aapt2" ]; then
        # sed reads to the end, so aapt2 never gets SIGPIPE under pipefail.
        "$tools/aapt2" dump badging "$apk" | sed -n 1p
    fi
    sum=$(sha256_of "$apk")

    echo
    echo "Signing certificate SHA-256 (assetlinks.json, users' Obtainium / AppVerifier check):"
    echo "  $fingerprint"
    echo "APK SHA-256:"
    echo "  $sum"
    echo
    echo "website/.well-known/assetlinks.json must be:"
    assetlinks_json "$fingerprint"
    echo
    if [ "$assetlinks" = 1 ]; then
        write_assetlinks "$fingerprint" "$REPO/website/.well-known/assetlinks.json" || true
    elif ! grep -q "\"$fingerprint\"" "$REPO/website/.well-known/assetlinks.json"; then
        echo "warning: website/.well-known/assetlinks.json does not name this key yet: sign-in will not"
        echo "         open the app until it does and the website is deployed (rerun with --write-assetlinks)."
    fi

    [ "$snapshot" = 1 ] && {
        say "Snapshot build at $apk (nothing staged)."
        return 0
    }
    require_published_fingerprint "$fingerprint" "$ASSETLINKS_URL"

    tag="android-v$version"
    name="chaotic-android-$version.apk"
    stage="$ANDROID_DIR/app/build/github-release/$tag"
    rm -rf "$stage"
    mkdir -p "$stage"
    cp "$apk" "$stage/$name"
    (cd "$stage" && echo "$sum  $name" >SHA256SUMS)
    cat >"$stage/notes.md" <<EOF
Chaotic for Android $version (versionCode $code), built from $head.

Install: download \`$name\` below and open it, or add this repository in
Obtainium. How to install and update: https://github.com/$REPO_SLUG/blob/main/docs/android.md

Signing certificate SHA-256:
\`$fingerprint\`

APK SHA-256:
\`$sum\`
EOF

    say "Staged in $stage"
    local cmd=(gh release create "$tag" "$stage/$name" "$stage/SHA256SUMS"
        --repo "$REPO_SLUG" --target "$head" --title "Chaotic for Android $version"
        --notes-file "$stage/notes.md" --latest=false)
    echo "To publish, run:"
    printf '  %q' "${cmd[@]}"
    echo
    echo
    if git -C "$REPO" ls-remote --exit-code --tags origin "refs/tags/$tag" >/dev/null 2>&1; then
        echo "note: the tag $tag already exists on GitHub: bump versionName and versionCode first."
        return 0
    fi
    if [ -t 0 ] && command -v gh >/dev/null; then
        local answer
        printf 'Create this GitHub Release now? [y/N] '
        read -r answer
        case "$answer" in
            y | Y) "${cmd[@]}" ;;
            *) echo "Not published. Run the command above when ready." ;;
        esac
    fi
}

usage() {
    awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"
}

main() {
    local mode=release snapshot=0 assetlinks=0
    while [ $# -gt 0 ]; do
        case "$1" in
            --new-key) mode=new_key ;;
            --snapshot) snapshot=1 ;;
            --write-assetlinks) assetlinks=1 ;;
            -h | --help)
                usage
                return 0
                ;;
            *) die "unknown option $1 (see --help)" ;;
        esac
        shift
    done
    # Writing assetlinks.json changes the tree, and the website has to be
    # deployed before a release, so it never goes with staging one.
    [ "$assetlinks" = 1 ] && [ "$snapshot" = 0 ] && die "--write-assetlinks goes with --snapshot (see --help)"
    REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
    ANDROID_DIR="$REPO/android"
    if [ "$mode" = new_key ]; then
        new_key
    else
        release "$snapshot" "$assetlinks"
    fi
}

# Sourced by scripts/android-release.test.sh for its functions only.
if [ "${ANDROID_RELEASE_LIB:-0}" != 1 ]; then
    main "$@"
fi

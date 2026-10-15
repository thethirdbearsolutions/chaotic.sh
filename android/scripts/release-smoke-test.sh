#!/usr/bin/env bash
# Launch each given release APK once on a running emulator or device and
# check that it reaches the sign-in screen without crashing (CHT-1723).
#
#   android/scripts/release-smoke-test.sh app-foss-release-unsigned.apk [more.apk ...]
#
# A release build only proves that R8 found every class it was told about.
# A class reached only by reflection (a serializer, Room's _Impl, a Hilt
# entry point, a WorkManager worker) that R8 stripped or renamed shows up
# as a crash at run time instead, and the app touches most of those while
# starting: Hilt builds the application graph, the write runner opens the
# Room cache, and the navigation graph serializes its start route.
#
# What a green run does not prove: only an uncaught exception reaches the
# crash buffer, so a stripped class behind code that catches its own errors
# passes, and nothing reached only after sign-in (response serializers, the
# list and issue screens, workers run later) is exercised. It shows that
# the app starts and draws its first screen, not that R8 is fine everywhere.
#
# CI builds the release APKs unsigned (CHT-1661), and Android installs only
# signed APKs, so this signs a copy of each with a throwaway key made here
# and discarded on exit. Nothing is signed with a real key.
#
# Needs adb on PATH and apksigner (found under $ANDROID_HOME/build-tools,
# or on PATH); keytool comes with the JDK.
set -euo pipefail

PACKAGE=sh.chaotic.android
ACTIVITY=sh.chaotic.android/.MainActivity
# The sign-in screen's title, read from the app's own strings so the two
# cannot drift apart.
STRINGS="$(dirname "$0")/../app/src/main/res/values/strings.xml"
EXPECTED_TEXT=$(sed -n 's:.*<string name="sign_in_title">\(.*\)</string>.*:\1:p' "$STRINGS")
if [ -z "$EXPECTED_TEXT" ]; then
    echo "sign_in_title not found in $STRINGS" >&2
    exit 1
fi
# How long, in wall-clock seconds, the app gets to show it after launching.
WAIT_SECONDS=${SMOKE_WAIT_SECONDS:-60}
DUMP=/sdcard/smoke-window.xml

if [ "$#" -eq 0 ]; then
    echo "usage: $0 APK [APK ...]" >&2
    exit 2
fi

find_apksigner() {
    if command -v apksigner > /dev/null 2>&1; then
        command -v apksigner
        return
    fi
    local sdk=${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}
    local found
    found=$(ls -d "$sdk"/build-tools/*/apksigner 2> /dev/null | sort -V | tail -n 1 || true)
    if [ -z "$found" ]; then
        echo "apksigner not found: set ANDROID_HOME or put it on PATH" >&2
        exit 1
    fi
    echo "$found"
}

APKSIGNER=$(find_apksigner)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# A throwaway key, the same shape as Android's debug key.
if ! keytool -genkeypair -noprompt -keystore "$WORK/smoke.jks" -storepass smoketest \
    -keypass smoketest -alias smoke -keyalg RSA -keysize 2048 -validity 1 \
    -dname "CN=Chaotic CI smoke test" > "$WORK/keytool.log" 2>&1; then
    cat "$WORK/keytool.log" >&2
    echo "keytool could not make the throwaway key" >&2
    exit 1
fi

# The UI as uiautomator sees it now (Compose exposes text through
# accessibility), or nothing. The old dump is removed first: uiautomator
# can exit 0 without writing one ("could not get idle state"), and a file
# left from the previous APK would otherwise pass for this one's screen.
screen_xml() {
    adb shell rm -f "$DUMP" > /dev/null 2>&1 || true
    adb shell uiautomator dump "$DUMP" > /dev/null 2>&1 || return 0
    local xml
    xml=$(adb shell cat "$DUMP" 2> /dev/null || true)
    # Only a complete dump counts.
    [[ "$xml" == *"</hierarchy>"* ]] && printf '%s\n' "$xml"
    return 0
}

# The crash buffer, which holds every uncaught exception's stack trace.
crash_log() {
    adb logcat -d -b crash 2> /dev/null || true
}

fail() {
    echo "FAIL ($1): $2" >&2
    echo "--- crash buffer" >&2
    crash_log >&2
    echo "--- logcat for $PACKAGE (last 200 lines)" >&2
    adb logcat -d 2> /dev/null | grep -E "AndroidRuntime|$PACKAGE|R8|ClassNotFound|NoSuchMethod" | tail -n 200 >&2 || true
    # The screen only says something when the app did not crash.
    if [ "${3:-}" = with-screen ]; then
        echo "--- screen" >&2
        screen_xml >&2
    fi
    exit 1
}

for apk in "$@"; do
    name=$(basename "$apk")
    [ -f "$apk" ] || { echo "no such APK: $apk" >&2; exit 1; }
    echo "=== $name"

    signed="$WORK/${name%.apk}-smoke-signed.apk"
    "$APKSIGNER" sign --ks "$WORK/smoke.jks" --ks-pass pass:smoketest \
        --key-pass pass:smoketest --ks-key-alias smoke --out "$signed" "$apk"
    "$APKSIGNER" verify "$signed"

    # Each APK starts from nothing: no data a previous flavor left behind.
    adb uninstall "$PACKAGE" > /dev/null 2>&1 || true
    adb install -r "$signed" > /dev/null || fail "$name" "adb install failed"
    adb logcat -b all -c || true

    # -W waits for the launch to finish; it reports a crash during it.
    launch=$(adb shell am start -W -n "$ACTIVITY" 2>&1) || fail "$name" "am start failed: $launch"
    echo "$launch"
    case "$launch" in
        *Error*|*"Status: timeout"*) fail "$name" "launch did not complete" ;;
    esac

    seen=""
    captured=""
    deadline=$((SECONDS + WAIT_SECONDS))
    while [ "$SECONDS" -lt "$deadline" ]; do
        # Captured first: with pipefail, grep -q exiting early would fail
        # the pipe on the writer's SIGPIPE and read as "not found".
        crashes=$(crash_log)
        case "$crashes" in *"$PACKAGE"*) fail "$name" "the app crashed" ;; esac
        screen=$(screen_xml)
        [ -n "$screen" ] && captured=yes
        # The text, in a node that belongs to this app (the quoted parts
        # of the pattern match literally).
        if [[ "$screen" =~ "text=\"$EXPECTED_TEXT\""[^\>]*"package=\"$PACKAGE\"" ]]; then
            seen=yes
            break
        fi
        sleep 1
    done
    if [ -z "$seen" ] && [ -z "$captured" ]; then
        fail "$name" "uiautomator produced no screen dump in ${WAIT_SECONDS}s"
    fi
    [ -n "$seen" ] || fail "$name" "\"$EXPECTED_TEXT\" did not appear within ${WAIT_SECONDS}s" with-screen

    # And it is still up a few seconds later: a crash in work started after
    # the first frame (the write runner, push setup) lands here.
    sleep 5
    crashes=$(crash_log)
    case "$crashes" in
        *"$PACKAGE"*) fail "$name" "the app crashed after showing the sign-in screen" ;;
    esac
    adb shell pidof "$PACKAGE" > /dev/null || fail "$name" "the process is gone"

    echo "$name reached the sign-in screen and stayed up."
    adb uninstall "$PACKAGE" > /dev/null 2>&1 || true
done

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
# Needs adb and timeout (coreutils) on PATH and apksigner (found under
# $ANDROID_HOME/build-tools, or on PATH); keytool comes with the JDK.
#
# Every adb call has its own time limit (CHT-1836): a device that stops
# answering (an install that never returns, a launch that never reports)
# ends the run within minutes with a line naming the step, instead of at
# the CI job's timeout. Exit status: 0 passed, 1 the app or an APK failed,
# 2 usage, 3 the device stopped answering. When SMOKE_NO_RETRY_MARKER names
# a file, every failure except 3 creates it, so CI retries a stuck device
# (or an emulator that never booted) but not a crash it would only repeat.
set -euo pipefail

# The real stderr, for messages from adb calls whose output is redirected.
exec 3>&2
WORK=""
# A file under $WORK, made once a step has run out of time.
STUCK_FLAG=""
on_exit() {
    local status=$?
    if [ "$status" -ne 0 ] && [ "$status" -ne 3 ] && [ -n "${SMOKE_NO_RETRY_MARKER:-}" ] \
        && ! { [ -n "$STUCK_FLAG" ] && [ -f "$STUCK_FLAG" ]; }; then
        : > "$SMOKE_NO_RETRY_MARKER" || true
    fi
    if [ -n "$WORK" ]; then rm -rf "$WORK"; fi
    return 0
}
trap on_exit EXIT

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
# Time limits, in seconds, for one adb call: an install, a launch
# (am start -W) or a uiautomator dump, and anything else.
INSTALL_TIMEOUT=${SMOKE_INSTALL_TIMEOUT:-120}
LAUNCH_TIMEOUT=${SMOKE_LAUNCH_TIMEOUT:-60}
ADB_TIMEOUT=${SMOKE_ADB_TIMEOUT:-30}
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
STUCK_FLAG="$WORK/stuck"

# The device stopped answering: say which step, and exit 3. When called
# inside $(...), exit only ends the subshell, so it also leaves STUCK_FLAG
# for the main shell to find.
stuck() {
    echo "FAIL (device): $1" >&3
    echo "The emulator stopped answering; this says nothing about the app." >&3
    : > "$STUCK_FLAG"
    exit 3
}

# adb_within SECONDS WHAT ARGS...: runs adb ARGS, and calls stuck (naming
# WHAT) if it has not finished after SECONDS. Otherwise returns adb's
# status. Stdin is closed: adb shell forwards it, and a backgrounded
# reader of a terminal would stop rather than time out.
adb_within() {
    local secs=$1 what=$2 rc=0
    shift 2
    timeout -k 5 "$secs" adb "$@" < /dev/null || rc=$?
    # 124: timed out; 137: still running 5s later, so killed.
    if [ "$rc" -eq 124 ] || [ "$rc" -eq 137 ]; then
        stuck "$what did not finish within ${secs}s"
    fi
    return "$rc"
}

# For diagnostics printed while failing: time-limited, and never fatal.
adb_quiet() {
    timeout -k 5 "$ADB_TIMEOUT" adb "$@" < /dev/null 2> /dev/null || true
}

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
    adb_within "$ADB_TIMEOUT" "removing the old screen dump" shell rm -f "$DUMP" > /dev/null 2>&1 || true
    adb_within "$LAUNCH_TIMEOUT" "uiautomator dump" shell uiautomator dump "$DUMP" > /dev/null 2>&1 || return 0
    local xml
    xml=$(adb_within "$ADB_TIMEOUT" "reading the screen dump" shell cat "$DUMP" 2> /dev/null) || {
        if [ -f "$STUCK_FLAG" ]; then exit 3; fi
        xml=""
    }
    # Only a complete dump counts.
    [[ "$xml" == *"</hierarchy>"* ]] && printf '%s\n' "$xml"
    return 0
}

# The crash buffer, which holds every uncaught exception's stack trace.
crash_log() {
    adb_within "$ADB_TIMEOUT" "reading the crash buffer" logcat -d -b crash 2> /dev/null || true
}

fail() {
    # A step inside $(...) that ran out of time has already said so.
    if [ -f "$STUCK_FLAG" ]; then exit 3; fi
    echo "FAIL ($1): $2" >&2
    echo "--- crash buffer" >&2
    adb_quiet logcat -d -b crash >&2
    echo "--- logcat for $PACKAGE (last 200 lines)" >&2
    adb_quiet logcat -d | grep -E "AndroidRuntime|$PACKAGE|R8|ClassNotFound|NoSuchMethod" | tail -n 200 >&2 || true
    # The screen only says something when the app did not crash.
    if [ "${3:-}" = with-screen ]; then
        echo "--- screen" >&2
        adb_quiet shell uiautomator dump "$DUMP" > /dev/null
        adb_quiet shell cat "$DUMP" >&2
    fi
    exit 1
}

# The device answers, and has finished booting, before anything is installed.
booted=$(adb_within "$ADB_TIMEOUT" "asking the device whether it has booted" shell getprop sys.boot_completed) || {
    if [ -f "$STUCK_FLAG" ]; then exit 3; fi
    stuck "adb could not reach the device"
}
booted=$(printf '%s' "$booted" | tr -d '\r\n')
[ "$booted" = 1 ] || stuck "the device has not finished booting (sys.boot_completed='$booted')"

for apk in "$@"; do
    name=$(basename "$apk")
    [ -f "$apk" ] || { echo "no such APK: $apk" >&2; exit 1; }
    echo "=== $name"

    signed="$WORK/${name%.apk}-smoke-signed.apk"
    "$APKSIGNER" sign --ks "$WORK/smoke.jks" --ks-pass pass:smoketest \
        --key-pass pass:smoketest --ks-key-alias smoke --out "$signed" "$apk"
    "$APKSIGNER" verify "$signed"

    # Each APK starts from nothing: no data a previous flavor left behind.
    adb_within "$ADB_TIMEOUT" "uninstalling $PACKAGE" uninstall "$PACKAGE" > /dev/null 2>&1 || true
    # Each step says when it starts, so a log that ends names the step.
    echo "installing $name"
    adb_within "$INSTALL_TIMEOUT" "adb install of $name" install -r "$signed" > /dev/null \
        || fail "$name" "adb install failed"
    adb_within "$ADB_TIMEOUT" "clearing logcat" logcat -b all -c || true

    echo "launching $ACTIVITY"
    # -W waits for the launch to finish; it reports a crash during it.
    launch=$(adb_within "$LAUNCH_TIMEOUT" "launching $ACTIVITY (am start -W)" shell am start -W -n "$ACTIVITY" 2>&1) \
        || fail "$name" "am start failed: $launch"
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
    adb_within "$ADB_TIMEOUT" "pidof $PACKAGE" shell pidof "$PACKAGE" > /dev/null \
        || fail "$name" "the process is gone"

    echo "$name reached the sign-in screen and stayed up."
    adb_within "$ADB_TIMEOUT" "uninstalling $PACKAGE" uninstall "$PACKAGE" > /dev/null 2>&1 || true
done

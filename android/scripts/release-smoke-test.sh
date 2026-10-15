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
# Every adb call has its own time limit (CHT-1836), so a device that stops
# answering ends the run within minutes, with a line naming the step,
# instead of at the CI job's timeout. Exit status:
#   0  every APK passed
#   1  the app or an APK failed (a crash, the sign-in screen not shown, a
#      launch that never reported while the device still answered, an
#      install the device refused, a signing error)
#   2  usage
#   3  the device stopped answering: an adb call other than the launch ran
#      out of time, or the device was offline or gone when a step failed
# Exit 1 and 2 also create SMOKE_NO_RETRY_MARKER, when it names a file, so
# CI retries a stuck device (or an emulator that never booted) but not a
# failure a retry would only repeat. Exit 3 appends its reason to
# SMOKE_STUCK_LOG, when that names a file, for CI to repeat as a warning.
set -euo pipefail

# The real stderr, for messages from adb calls whose output is redirected.
exec 3>&2
WORK=""
# A file under $WORK, made once the device has stopped answering.
STUCK_FLAG=""
trap 'if [ -n "$WORK" ]; then rm -rf "$WORK"; fi' EXIT

# give_up STATUS MESSAGE: a failure a retry would not fix. Exits STATUS
# (1 or 2) after creating SMOKE_NO_RETRY_MARKER. Only these explicit paths
# create it, so a run killed by a signal or an unexpected error is retried.
give_up() {
    echo "$2" >&2
    if [ -n "${SMOKE_NO_RETRY_MARKER:-}" ]; then : > "$SMOKE_NO_RETRY_MARKER" || true; fi
    exit "$1"
}

PACKAGE=sh.chaotic.android
ACTIVITY=sh.chaotic.android/.MainActivity
# The sign-in screen's title, read from the app's own strings so the two
# cannot drift apart.
STRINGS="$(dirname "$0")/../app/src/main/res/values/strings.xml"
EXPECTED_TEXT=$(sed -n 's:.*<string name="sign_in_title">\(.*\)</string>.*:\1:p' "$STRINGS")
if [ -z "$EXPECTED_TEXT" ]; then
    give_up 1 "sign_in_title not found in $STRINGS"
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
    give_up 2 "usage: $0 APK [APK ...]"
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
        give_up 1 "apksigner not found: set ANDROID_HOME or put it on PATH"
    fi
    echo "$found"
}

APKSIGNER=$(find_apksigner)
WORK=$(mktemp -d)
STUCK_FLAG="$WORK/stuck"

# For diagnostics: time-limited, and never fatal.
adb_quiet() {
    timeout -k 5 "$ADB_TIMEOUT" adb "$@" < /dev/null 2> /dev/null || true
}

# The crash buffer and the app's recent logcat lines, to the real stderr.
# Each read is bounded, so a device that does not answer delays this by
# at most 2 x (ADB_TIMEOUT + 5) seconds.
diagnostics() {
    echo "--- crash buffer" >&3
    adb_quiet logcat -d -b crash >&3
    echo "--- logcat for $PACKAGE (last 200 lines)" >&3
    adb_quiet logcat -d | grep -E "AndroidRuntime|ActivityManager: ANR|$PACKAGE|R8|ClassNotFound|NoSuchMethod" | tail -n 200 >&3 || true
}

# The device stopped answering: say which step, print what the device
# still gives, and exit 3. When called inside $(...), exit only ends the
# subshell, so it also leaves STUCK_FLAG for the main shell to find.
stuck() {
    echo "FAIL (device): $1" >&3
    echo "The emulator stopped answering adb; CI retries once on a fresh one." >&3
    if [ -n "${SMOKE_STUCK_LOG:-}" ]; then echo "$1" >> "$SMOKE_STUCK_LOG" || true; fi
    : > "$STUCK_FLAG"
    diagnostics
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
    # 124: timed out. 137: SIGKILLed, normally by timeout -k when adb
    # ignored the TERM for 5s; if the kernel's OOM killer did it instead,
    # treating it as a stuck device (and retrying) is still right.
    if [ "$rc" -eq 124 ] || [ "$rc" -eq 137 ]; then
        stuck "$what did not finish within ${secs}s"
    fi
    return "$rc"
}

# Whether the device answers adb and reports itself booted, within
# ADB_TIMEOUT. Never exits.
device_answers() {
    local out
    out=$(timeout -k 5 "$ADB_TIMEOUT" adb shell getprop sys.boot_completed < /dev/null 2> /dev/null) || return 1
    [ "$(printf '%s' "$out" | tr -d '\r\n')" = 1 ]
}

# A throwaway key, the same shape as Android's debug key.
if ! keytool -genkeypair -noprompt -keystore "$WORK/smoke.jks" -storepass smoketest \
    -keypass smoketest -alias smoke -keyalg RSA -keysize 2048 -validity 1 \
    -dname "CN=Chaotic CI smoke test" > "$WORK/keytool.log" 2>&1; then
    cat "$WORK/keytool.log" >&2
    give_up 1 "keytool could not make the throwaway key"
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

# fail APK MESSAGE [with-screen]: a step failed. If the device no longer
# answers (offline, gone, or hung), that is the device's failure, not the
# app's, whatever the step: exit 3 like a timeout. Otherwise exit 1.
fail() {
    # A step inside $(...) that ran out of time has already said so.
    if [ -f "$STUCK_FLAG" ]; then exit 3; fi
    if ! device_answers; then
        stuck "the device stopped answering ($1: $2)"
    fi
    echo "FAIL ($1): $2" >&2
    diagnostics
    # The screen only says something when the app did not crash.
    if [ "${3:-}" = with-screen ]; then
        echo "--- screen" >&2
        adb_quiet shell uiautomator dump "$DUMP" > /dev/null
        adb_quiet shell cat "$DUMP" >&2
    fi
    give_up 1 "The app or $1 failed; a retry would not help."
}

# The device answers, and has finished booting, before anything is installed.
booted=$(adb_within "$ADB_TIMEOUT" "asking the device whether it has booted" shell getprop sys.boot_completed 2>&1) || {
    if [ -f "$STUCK_FLAG" ]; then exit 3; fi
    stuck "adb could not reach the device: $booted"
}
booted=$(printf '%s' "$booted" | tr -d '\r\n')
[ "$booted" = 1 ] || stuck "the device has not finished booting (sys.boot_completed='$booted')"

for apk in "$@"; do
    name=$(basename "$apk")
    [ -f "$apk" ] || give_up 1 "no such APK: $apk"
    echo "=== $name"

    signed="$WORK/${name%.apk}-smoke-signed.apk"
    "$APKSIGNER" sign --ks "$WORK/smoke.jks" --ks-pass pass:smoketest \
        --key-pass pass:smoketest --ks-key-alias smoke --out "$signed" "$apk" \
        || give_up 1 "apksigner could not sign $name"
    "$APKSIGNER" verify "$signed" || give_up 1 "apksigner could not verify the signed $name"

    # Each APK starts from nothing: no data a previous flavor left behind.
    adb_within "$ADB_TIMEOUT" "uninstalling $PACKAGE" uninstall "$PACKAGE" > /dev/null 2>&1 || true
    # Each step says when it starts, so a log that ends names the step.
    echo "installing $name"
    installed=$(adb_within "$INSTALL_TIMEOUT" "adb install of $name" install -r "$signed" 2>&1) \
        || fail "$name" "adb install failed: $installed"
    adb_within "$ADB_TIMEOUT" "clearing logcat" logcat -b all -c || true

    echo "launching $ACTIVITY"
    # -W waits for the launch to finish; it reports a crash during it. Its
    # timeout is not a stuck device by itself: an app that hangs while
    # starting looks the same, and a retry could pass by luck and hide it.
    # So a launch that never reports is the device's failure (exit 3,
    # retried) only when the device has stopped answering too, and the
    # app's (exit 1, not retried) when it still answers.
    launch_rc=0
    launch=$(timeout -k 5 "$LAUNCH_TIMEOUT" adb shell am start -W -n "$ACTIVITY" < /dev/null 2>&1) || launch_rc=$?
    if [ "$launch_rc" -eq 124 ] || [ "$launch_rc" -eq 137 ]; then
        device_answers || stuck "launching $ACTIVITY (am start -W) did not finish within ${LAUNCH_TIMEOUT}s, and the device no longer answers"
        fail "$name" "am start -W did not report within ${LAUNCH_TIMEOUT}s while the device still answers: the app hung while starting"
    elif [ "$launch_rc" -ne 0 ]; then
        fail "$name" "am start failed: $launch"
    fi
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

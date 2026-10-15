#!/usr/bin/env bash
# Run every cli/tests file on its own, each in a fresh pytest process (CHT-1834).
#
# This catches a test file that passes in the full suite only because an
# earlier file imported or patched something for it. CHT-1825 found 39 such
# files on Python 3.10.
#
# Files run in parallel, JOBS at a time (default: nproc). Each file's output
# is buffered and printed in one piece only if that file fails, so failures
# don't interleave in the log. A file that runs longer than PER_FILE_TIMEOUT
# seconds (default 300) is killed and reported as timed out.
# Exits 1 if any file fails or times out, or if no test files are found.
#
# Expects the cli venv to be synced already (it calls `uv run --no-sync`).
# Linux/GNU only (nproc, timeout, mapfile); CI runs it from
# .github/workflows/cli-tests.yml.
set -euo pipefail
cd "$(dirname "$0")/.."

PER_FILE_TIMEOUT="${PER_FILE_TIMEOUT:-300}"
JOBS="${JOBS:-$(nproc)}"

mapfile -d '' files < <(find tests -type f -name 'test_*.py' -print0 | sort -z)
if [ "${#files[@]}" -eq 0 ]; then
  echo "::error::no test files found under cli/tests; the per-file check ran nothing"
  exit 1
fi

logdir=$(mktemp -d)
trap 'rm -rf "$logdir"' EXIT
export PER_FILE_TIMEOUT logdir

# Each worker writes <log>.ok on success and <log>.rc on failure. A file that
# has no .ok afterwards counts as failed, even if its worker died before
# writing anything.
# shellcheck disable=SC2016  # $1, $logdir expand in the worker shell
printf '%s\0' "${files[@]}" | xargs -0 -P "$JOBS" -I{} bash -c '
  log="$logdir/$(printf %s "$1" | tr / _)"
  if timeout -k 10 "$PER_FILE_TIMEOUT" uv run --no-sync pytest -q -p no:cacheprovider "$1" >"$log.out" 2>&1; then
    : >"$log.ok"
  else
    echo "$?" >"$log.rc"
  fi
' _ {} || true

passed=0
failed=0
for f in "${files[@]}"; do
  log="$logdir/$(printf %s "$f" | tr / _)"
  if [ -e "$log.ok" ]; then
    passed=$((passed + 1))
    continue
  fi
  failed=$((failed + 1))
  rc=$(cat "$log.rc" 2>/dev/null || echo "?")
  if [ "$rc" = "124" ] || [ "$rc" = "137" ]; then
    why="timed out after ${PER_FILE_TIMEOUT}s"
  else
    why="fails when run on its own (exit $rc)"
  fi
  echo "::error file=cli/$f::$f $why"
  echo "::group::output of $f"
  cat "$log.out" 2>/dev/null || echo "(no output captured)"
  echo "::endgroup::"
done

echo "Ran ${#files[@]} test files one at a time: $passed passed, $failed failed."
[ "$failed" -eq 0 ]

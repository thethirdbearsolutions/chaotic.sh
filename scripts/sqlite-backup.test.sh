#!/bin/bash
# Exercises scripts/sqlite-backup.sh against a throwaway database at chosen
# instants (CHAOTIC_BACKUP_NOW) and asserts which slots exist afterwards.
# Run:  bash scripts/sqlite-backup.test.sh
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="${HERE}/sqlite-backup.sh"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

DB="${WORK}/live.db"
DIR="${WORK}/backups"
mkdir -p "$DIR"
sqlite3 "$DB" "create table t(x); insert into t values (1);"

fail=0
assert_slots() {
    local label="$1"; shift
    local expected="$*"
    local actual
    actual=$(cd "$DIR" && ls backup.*.db 2>/dev/null | tr '\n' ' ' | sed 's/ $//')
    if [ "$actual" = "$expected" ]; then
        echo "ok   $label"
    else
        echo "FAIL $label"
        echo "     expected: $expected"
        echo "     actual:   $actual"
        fail=1
    fi
}

# epoch for a UTC instant, portable across GNU and BSD date
epoch() {
    date -u -d "$1" '+%s' 2>/dev/null || date -u -j -f '%Y-%m-%d %H:%M:%S' "$1" '+%s'
}

run_at() {
    CHAOTIC_DB_PATH="$DB" CHAOTIC_BACKUP_DIR="$DIR" CHAOTIC_BACKUP_MIN_FREE_KB=0 \
    CHAOTIC_BACKUP_NOW="$(epoch "$1")" bash "$SCRIPT"
}

# Monday 2026-09-07 00:00 UTC is ISO week 2026W37, day 1.
run_at "2026-09-07 00:00:00"
assert_slots "first run of a week writes every orbit" \
    backup.10min.db backup.1hr.db backup.1min.db backup.6hr.db \
    backup.daily.20260907.db backup.weekly.2026W37.db

run_at "2026-09-07 00:01:00"
assert_slots "minute 1 writes only the 1min slot (others already exist)" \
    backup.10min.db backup.1hr.db backup.1min.db backup.6hr.db \
    backup.daily.20260907.db backup.weekly.2026W37.db

# 07:30: not a 10-minute mark, not minute 0. Same day and week.
before=$(stat -f %m "$DIR/backup.10min.db" 2>/dev/null || stat -c %Y "$DIR/backup.10min.db")
sleep 1
run_at "2026-09-07 07:33:00"
after=$(stat -f %m "$DIR/backup.10min.db" 2>/dev/null || stat -c %Y "$DIR/backup.10min.db")
if [ "$before" = "$after" ]; then echo "ok   07:33 leaves the 10min slot alone"; else echo "FAIL 07:33 rewrote the 10min slot"; fail=1; fi

# Four more days: dailies prune to the newest three.
run_at "2026-09-08 03:15:00"
run_at "2026-09-09 03:15:00"
run_at "2026-09-10 03:15:00"
assert_slots "three dailies kept, oldest pruned" \
    backup.10min.db backup.1hr.db backup.1min.db backup.6hr.db \
    backup.daily.20260908.db backup.daily.20260909.db backup.daily.20260910.db \
    backup.weekly.2026W37.db

# Three more weeks: weeklies prune to the newest three; dailies keep rolling.
run_at "2026-09-14 09:00:00"
run_at "2026-09-21 09:00:00"
run_at "2026-09-28 09:00:00"
assert_slots "three weeklies kept, oldest pruned; dailies roll on" \
    backup.10min.db backup.1hr.db backup.1min.db backup.6hr.db \
    backup.daily.20260914.db backup.daily.20260921.db backup.daily.20260928.db \
    backup.weekly.2026W38.db backup.weekly.2026W39.db backup.weekly.2026W40.db

# A foreign file in the directory is never pruned.
touch "$DIR/chaotic.db.predeploy-a19-20260906.db"
run_at "2026-10-05 09:00:00"
if [ -f "$DIR/chaotic.db.predeploy-a19-20260906.db" ]; then
    echo "ok   unrelated file survives pruning"
else
    echo "FAIL pruning removed an unrelated file"; fail=1
fi
rm -f "$DIR/chaotic.db.predeploy-a19-20260906.db"

# Disk guard: an absurd reserve makes the run refuse before touching anything.
count_before=$(ls "$DIR"/backup.*.db | wc -l | tr -d ' ')
if CHAOTIC_DB_PATH="$DB" CHAOTIC_BACKUP_DIR="$DIR" CHAOTIC_BACKUP_MIN_FREE_KB=999999999999 \
   CHAOTIC_BACKUP_NOW="$(epoch "2026-10-06 00:00:00")" bash "$SCRIPT" 2>/dev/null; then
    echo "FAIL disk guard did not refuse"; fail=1
else
    count_after=$(ls "$DIR"/backup.*.db | wc -l | tr -d ' ')
    if [ "$count_before" = "$count_after" ] && grep -q "ALERT: .* free on backup volume" "$DIR/backup.log"; then
        echo "ok   disk guard refuses and writes nothing"
    else
        echo "FAIL disk guard refused but changed files or did not log"; fail=1
    fi
fi

# Corrupt live database: refused, slots untouched.
cp "$DB" "$WORK/good.db"
printf 'not a database' > "$DB"
if CHAOTIC_DB_PATH="$DB" CHAOTIC_BACKUP_DIR="$DIR" CHAOTIC_BACKUP_MIN_FREE_KB=0 \
   CHAOTIC_BACKUP_NOW="$(epoch "2026-10-06 00:01:00")" bash "$SCRIPT" 2>/dev/null; then
    echo "FAIL corrupt live db was backed up"; fail=1
else
    if [ "$(sqlite3 "$DIR/backup.1min.db" 'select x from t')" = "1" ]; then
        echo "ok   corrupt live db is refused; last good 1min slot intact"
    else
        echo "FAIL 1min slot damaged after corrupt-db run"; fail=1
    fi
fi
cp "$WORK/good.db" "$DB"

# Every surviving slot is a readable copy with the data.
for f in "$DIR"/backup.*.db; do
    if [ "$(sqlite3 "$f" 'select x from t')" != "1" ]; then
        echo "FAIL $(basename "$f") is not a valid copy"; fail=1
    fi
done
echo "ok   every slot is a valid copy"

if [ "$fail" -eq 0 ]; then echo "ALL PASSED"; else echo "SOME FAILED"; exit 1; fi

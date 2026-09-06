#!/bin/bash
# SQLite rolling backup with health checks and bounded, multi-tier retention.
# Run via cron every minute:  * * * * * /root/.chaotic/sqlite-backup.sh
#
# Ten slots across four orbits (CHT-1418). The file count is fixed, so a
# growing database cannot fill the disk by accumulation, and the outer orbits
# keep states that are days and weeks old, so a bad edit noticed later is
# still recoverable:
#
#   minutes : backup.1min.db            every run
#             backup.10min.db           when the minute is a multiple of 10
#   hours   : backup.1hr.db             at minute 0
#             backup.6hr.db             at minute 0 of hours 0, 6, 12, 18
#   days    : backup.daily.YYYYMMDD.db  first run of each UTC day,  keep 3
#   weeks   : backup.weekly.YYYYWww.db  first run of each ISO week, keep 3
#
# The dated tiers are written when the period's file does not exist yet, not
# at a fixed minute, so a reboot over midnight still yields that day's copy.
# Pruning touches only backup.daily.* and backup.weekly.* files: other files
# in the directory (pre-deploy snapshots, logs) are never removed.
#
# Safety, unchanged from the original: the live database and the fresh copy
# must both pass a health check before any slot is touched; a slot is replaced
# by an atomic rename, never a partial write; a good slot is never overwritten
# by a bad copy. New: a disk guard skips the run when the volume would fall
# under MIN_FREE_KB after writing, and a lock prevents overlapping runs.
#
# Environment (all optional):
#   CHAOTIC_DB_PATH      database to back up   (default ~/.chaotic/data/chaotic.db)
#   CHAOTIC_BACKUP_DIR   where slots live      (default ~/.chaotic/backups)
#   CHAOTIC_BACKUP_MIN_FREE_KB  free space to preserve (default 1048576 = 1 GB)
#   CHAOTIC_BACKUP_KEEP_DAILY / _WEEKLY  dated files to keep (default 3 each)
#   CHAOTIC_BACKUP_NOW   epoch seconds to treat as "now" (tests only)

set -euo pipefail

DB_PATH="${CHAOTIC_DB_PATH:-${HOME}/.chaotic/data/chaotic.db}"
BACKUP_DIR="${CHAOTIC_BACKUP_DIR:-${HOME}/.chaotic/backups}"
MIN_FREE_KB="${CHAOTIC_BACKUP_MIN_FREE_KB:-1048576}"
KEEP_DAILY="${CHAOTIC_BACKUP_KEEP_DAILY:-3}"
KEEP_WEEKLY="${CHAOTIC_BACKUP_KEEP_WEEKLY:-3}"
LOGFILE="${BACKUP_DIR}/backup.log"

mkdir -p "$BACKUP_DIR"

log() {
    echo "$(date -u '+%Y-%m-%d %H:%M:%S') $1" >> "$LOGFILE"
}

# One run at a time. A .backup of a large database can outlast the cron
# interval; a second copy racing the first would double the disk peak.
if command -v flock >/dev/null 2>&1; then
    exec 9>"${BACKUP_DIR}/.backup.lock"
    if ! flock -n 9; then
        log "SKIP: previous run still active."
        exit 0
    fi
fi

# "Now", overridable so the rotation can be tested at chosen instants.
NOW="${CHAOTIC_BACKUP_NOW:-$(date -u '+%s')}"
utc() {
    # GNU date takes -d @epoch; BSD/macOS date takes -r epoch.
    date -u -d "@${NOW}" "$1" 2>/dev/null || date -u -r "${NOW}" "$1"
}
MINUTE=$((10#$(utc '+%M')))
HOUR=$((10#$(utc '+%H')))
DAY_STAMP=$(utc '+%Y%m%d')
WEEK_STAMP=$(utc '+%GW%V')

# Health check: verify file is a valid SQLite database
check_health() {
    local dbfile="$1"
    if [ ! -f "$dbfile" ]; then
        return 1
    fi
    # Check header bytes
    local header
    header=$(head -c 15 "$dbfile" 2>/dev/null || true)
    if [ "$header" != "SQLite format 3" ]; then
        return 1
    fi
    # Quick integrity check (faster than full integrity_check)
    local result
    result=$(sqlite3 "$dbfile" "PRAGMA quick_check;" 2>/dev/null || echo "FAIL")
    if [ "$result" != "ok" ]; then
        return 1
    fi
    return 0
}

# Step 1: Health check the live database
if ! check_health "$DB_PATH"; then
    log "ALERT: Live database FAILED health check. Skipping backup."
    exit 1
fi

# Step 2: Disk guard. A run writes at most the temp copy plus one slot copy
# at a time (each slot is cp'd to a .tmp then renamed over the old file), so
# the transient peak is about two copies of the database beyond what the
# slots already hold. Refuse if that would eat into the reserve.
db_kb=$(( ($(wc -c < "$DB_PATH") + 1023) / 1024 ))
free_kb=$(df -Pk "$BACKUP_DIR" | awk 'NR==2 {print $4}')
need_kb=$(( db_kb * 2 + MIN_FREE_KB ))
if [ "$free_kb" -lt "$need_kb" ]; then
    log "ALERT: ${free_kb} KB free on backup volume, need ${need_kb} KB (db ${db_kb} KB x2 + reserve ${MIN_FREE_KB} KB). Skipping backup."
    exit 1
fi

# Step 3: Create a safe online backup via sqlite3
TEMP_BACKUP="${BACKUP_DIR}/.backup.tmp.db"
if ! sqlite3 "$DB_PATH" ".backup '${TEMP_BACKUP}'" 2>/dev/null; then
    log "ERROR: sqlite3 .backup command failed."
    rm -f "$TEMP_BACKUP"
    exit 1
fi

# Step 4: Health check the backup we just made
if ! check_health "$TEMP_BACKUP"; then
    log "ALERT: Fresh backup FAILED health check. Discarding."
    rm -f "$TEMP_BACKUP"
    exit 1
fi

# Step 5: Rotate into slots. cp to a temp name, then mv (atomic on the same
# filesystem), so a reader never sees a half-written slot.
rotate() {
    local target="$1"
    cp "$TEMP_BACKUP" "${target}.tmp"
    mv "${target}.tmp" "$target"
}

# Keep the newest $2 files matching "$1"*.db in BACKUP_DIR; names carry the
# period stamp, so lexical order is chronological order.
prune() {
    local prefix="$1" keep="$2"
    local files=()
    while IFS= read -r f; do files+=("$f"); done < <(
        find "$BACKUP_DIR" -maxdepth 1 -name "${prefix}*.db" -print | sort
    )
    local excess=$(( ${#files[@]} - keep ))
    local i
    for (( i = 0; i < excess; i++ )); do
        rm -f "${files[$i]}"
        log "PRUNE: removed $(basename "${files[$i]}")"
    done
}

written="1min"

# minutes orbit
if [ $((MINUTE % 10)) -eq 0 ]; then
    rotate "${BACKUP_DIR}/backup.10min.db"; written="$written 10min"
fi

# hours orbit
if [ "$MINUTE" -eq 0 ]; then
    rotate "${BACKUP_DIR}/backup.1hr.db"; written="$written 1hr"
fi
if [ "$MINUTE" -eq 0 ] && [ $((HOUR % 6)) -eq 0 ]; then
    rotate "${BACKUP_DIR}/backup.6hr.db"; written="$written 6hr"
fi

# days orbit: first run of the UTC day
daily="${BACKUP_DIR}/backup.daily.${DAY_STAMP}.db"
if [ ! -f "$daily" ]; then
    rotate "$daily"; written="$written daily.${DAY_STAMP}"
    prune "backup.daily." "$KEEP_DAILY"
fi

# weeks orbit: first run of the ISO week
weekly="${BACKUP_DIR}/backup.weekly.${WEEK_STAMP}.db"
if [ ! -f "$weekly" ]; then
    rotate "$weekly"; written="$written weekly.${WEEK_STAMP}"
    prune "backup.weekly." "$KEEP_WEEKLY"
fi

# The 1-minute slot takes the temp file itself: one fewer copy per run.
mv "$TEMP_BACKUP" "${BACKUP_DIR}/backup.1min.db"

log "OK: Backup complete (min=$MINUTE hr=$HOUR wrote: $written)"

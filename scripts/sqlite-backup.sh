#!/bin/bash
# SQLite rotating backup with health checks.
# Run via cron every minute: * * * * * /path/to/sqlite-backup.sh
#
# Keeps backups at 1min, 5min, 10min, 1hr, 4hr, 12hr, 24hr intervals.
# Never overwrites a good backup with a corrupted database.
# Uses sqlite3 .backup (online-safe, WAL-aware) instead of cp.

set -euo pipefail

DB_PATH="${CHAOTIC_DB_PATH:-/root/.chaotic/data/chaotic.db}"
BACKUP_DIR="${CHAOTIC_BACKUP_DIR:-/root/.chaotic/backups}"
LOGFILE="${BACKUP_DIR}/backup.log"

mkdir -p "$BACKUP_DIR"

log() {
    echo "$(date -u '+%Y-%m-%d %H:%M:%S') $1" >> "$LOGFILE"
}

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

# Step 2: Create a safe online backup via sqlite3
TEMP_BACKUP="${BACKUP_DIR}/.backup.tmp.db"
sqlite3 "$DB_PATH" ".backup '${TEMP_BACKUP}'" 2>/dev/null
if [ $? -ne 0 ]; then
    log "ERROR: sqlite3 .backup command failed."
    rm -f "$TEMP_BACKUP"
    exit 1
fi

# Step 3: Health check the backup we just made
if ! check_health "$TEMP_BACKUP"; then
    log "ALERT: Fresh backup FAILED health check. Discarding."
    rm -f "$TEMP_BACKUP"
    exit 1
fi

# Step 4: Rotate into time-based slots
MINUTE=$(date -u '+%M' | sed 's/^0//')
HOUR=$(date -u '+%H' | sed 's/^0//')
MINUTE=${MINUTE:-0}
HOUR=${HOUR:-0}

# 1-minute: always
cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.1min.db"

# 5-minute
if [ $((MINUTE % 5)) -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.5min.db"
fi

# 10-minute
if [ $((MINUTE % 10)) -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.10min.db"
fi

# 1-hour
if [ "$MINUTE" -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.1hr.db"
fi

# 4-hour
if [ "$MINUTE" -eq 0 ] && [ $((HOUR % 4)) -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.4hr.db"
fi

# 12-hour
if [ "$MINUTE" -eq 0 ] && [ $((HOUR % 12)) -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.12hr.db"
fi

# 24-hour
if [ "$MINUTE" -eq 0 ] && [ "$HOUR" -eq 0 ]; then
    cp "$TEMP_BACKUP" "${BACKUP_DIR}/backup.24hr.db"
fi

rm -f "$TEMP_BACKUP"
log "OK: Backup complete (min=$MINUTE hr=$HOUR)"

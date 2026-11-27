#!/usr/bin/env bash
# The Android job of .github/workflows/ci.yml, run locally (CHT-2140).
# Keep it in step with that job. Not covered here: android-release-smoke
# (it boots an emulator); dispatch CI for that before an Android release.
# Needs Java 17+, the Android SDK and jq.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../android"

./gradlew detekt
./gradlew :app:lintFossDebug :app:lintPlayDebug
./gradlew test

# The committed Room schema is current (the build exported it), compared
# as JSON so formatting is not a change.
changed=""
for f in $(git ls-files --modified -- app/schemas); do
    if ! diff <(git show "HEAD:./$f" | jq -S .) <(jq -S . "$f"); then changed="$changed $f"; fi
done
added=$(git ls-files --others --exclude-standard -- app/schemas)
for f in $added; do echo "--- new file: $f"; cat "$f"; echo; done
if [ -n "$changed$added" ]; then
    echo "The Room schema changed: bump ChaoticDatabase's version and commit app/schemas." >&2
    exit 1
fi

# Committed schemas are append-only, against where this branch left main
# (CI's PR-only step; the merge base, so a schema main gained since is not
# read as a deletion here).
git fetch --no-tags -q origin main
edited=$(git diff --name-status "$(git merge-base origin/main HEAD)" -- app/schemas | grep -v '^A' || true)
if [ -n "$edited" ]; then
    echo "$edited"
    echo "A committed Room schema was changed or removed: bump ChaoticDatabase's version instead." >&2
    exit 1
fi

./gradlew :app:checkFossDependencies

# The foss check fails on non-free and local dependencies.
mkdir -p app/foss-canary && touch app/foss-canary/canary.jar
trap 'rm -rf app/foss-canary canary.log' EXIT
if ./gradlew :app:checkFossDependencies -Pchaotic.fossCanary=true > canary.log 2>&1; then
    cat canary.log
    echo "checkFossDependencies passed with non-free dependencies added" >&2
    exit 1
fi
for expected in com.google.android.gms:play-services-base "com.huawei.hms:push" "local file canary.jar"; do
    grep -qF "$expected" canary.log || { cat canary.log; echo "the failure did not name $expected" >&2; exit 1; }
done

./gradlew assembleFossDebug assemblePlayDebug
# R8: a missing keep or -dontwarn rule shows only in a release build.
./gradlew --continue assembleFossRelease assemblePlayRelease
echo "Android checks passed."

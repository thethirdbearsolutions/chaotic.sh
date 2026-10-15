# Chaotic for Android

The Android app (`android/`, application id `sh.chaotic.android`) is
published as a signed APK on this repository's
[GitHub Releases](https://github.com/thethirdbearsolutions/chaotic.sh/releases),
tagged `android-v<version>`. It is not on Google Play. You can install
it directly or let [Obtainium](https://obtainium.imranr.dev/) install it
and keep it updated. Every release is the `foss` build, which has no
Google Play Services in it.

## Installing

### Directly

1. On the phone, open the latest `android-v…` release and download
   `chaotic-android-<version>.apk`.
2. Open the downloaded file. Android asks you to allow your browser (or
   file manager) to install unknown apps the first time: allow it for
   that app only, then install.
3. Play Protect may say it doesn't recognise the developer. Choose
   "Install anyway" (or "More details", then "Install anyway").

The phone must be online while it installs: Android then checks
`https://chaotic.sh/.well-known/assetlinks.json`, which lets the app
receive the sign-in redirect (see "Sign-in" below).

To update, download the newer release's APK and open it the same way.
It installs over the app you have and keeps your sign-in.

### With Obtainium

1. Install Obtainium (from its GitHub releases or F-Droid).
2. Add an app with the source URL
   `https://github.com/thethirdbearsolutions/chaotic.sh`.
3. This repository also publishes command-line releases, which have no
   APK. In the app's settings in Obtainium, set "Filter release titles
   by regular expression" to `^Chaotic for Android`.
4. Install. Obtainium checks for new releases and offers updates.

### Checking the download

Each release's notes list the APK's SHA-256 checksum (also in its
`SHA256SUMS` file) and the signing certificate's SHA-256 fingerprint.
The fingerprint never changes between releases. To check it on a
computer with the Android SDK:

```bash
apksigner verify --print-certs chaotic-android-<version>.apk
```

and compare "Signer #1 certificate SHA-256 digest" with the release
notes. Android itself refuses an update signed by a different key.

## Sign-in

The app signs in to your Chaotic server in the browser (OAuth, with the
server's built-in client `builtin:sh.chaotic.android`). The browser then
returns to the app at `https://chaotic.sh/app/oauth2redirect`, an
[Android App Link](https://developer.android.com/training/app-links):
chaotic.sh publishes the release key's fingerprint, so Android delivers
that address only to the app signed with that key, whichever server you
use (CHT-1649). That protection starts once the fingerprint is published
(CHT-1738), and holds on a phone that verified the link when the app was
installed.

If Android has not verified the link (the phone was offline when the app
was installed, the app isn't the official build, or you built it
yourself), the browser shows "The Chaotic app didn't open" on chaotic.sh
instead and nothing is signed in. That page deliberately passes the
sign-in to nothing: handing it to "the app called sh.chaotic.android"
would trust a name any APK can take. Install or update the official
release while online and sign in again. On Android 10 and 11 an
unverified link can instead show a chooser of apps: pick Chaotic only if
you just tapped "Sign in" in it.

When the link is not verified, the website's host also logs the page's
address: a one-time code (useless without the app's PKCE secret), and
your server's address. Keeping that out of the address is CHT-1737.

## Building it yourself

Debug builds (`./gradlew :app:assembleFossDebug`) are signed with your
debug key, which chaotic.sh does not list, so Android never verifies the
link for them and sign-in ends on the "didn't open" page. On Android 12
or newer, approve the link for your build once (this is your explicit
choice for this phone; undo it by uninstalling, or with `false`):

```bash
adb shell pm set-app-links-user-selection --user cur --package sh.chaotic.android true chaotic.sh
```

On Android 10 and 11, pick Chaotic in the chooser the link shows.

A release build without the release key (`./gradlew assembleFossRelease`
anywhere but the release machine, CI included) is unsigned.

## Releasing (maintainers)

Releases are built and signed on the release machine (the owner's Mac)
by `scripts/android-release.sh`. The release key never leaves that
machine and its backups: CI never sees it and builds the release unsigned
(CHT-1661).

Needs: a JDK 17 (Android Studio's works), the Android SDK with
build-tools (Android Studio installs it; set `ANDROID_HOME` if it isn't
in `~/Library/Android/sdk`), and the GitHub CLI (`gh auth login`).

### Once: the release key

```bash
scripts/android-release.sh --new-key
```

asks for a password (twice) and writes:

| File | What |
|------|------|
| `~/.chaotic/android-release.jks` | the key (PKCS12, RSA 4096, valid about 27 years) |
| `~/.chaotic/android-signing.properties` | where it is and its password; `android/app/build.gradle.kts` reads it |

Both are mode 600, outside the repository, and must never be committed
or uploaded anywhere. The script builds with `--no-configuration-cache`:
a `./gradlew assembleFossRelease` you run by hand on that machine stores
the signing passwords, encrypted with a key in `~/.gradle`, in Gradle's
configuration cache under `android/.gradle/`. Delete
`android/.gradle/configuration-cache` afterwards if that matters to you. **Back them up before the first release**: copy
the `.jks` file to two places that are not the Mac (an encrypted USB
drive kept offline, a password manager that stores files), store the
password with it, and check that a copy opens with
`keytool -list -keystore <copy>`.

- **Lost key:** no update can ever install over the app on people's
  phones. Everyone has to uninstall, losing the app's local data, and
  install a build signed with a new key, and assetlinks.json has to list
  the new fingerprint.
- **Leaked key:** someone else can sign an APK that installs over
  Chaotic as an update and receives its sign-in redirect. Make a new key,
  replace the fingerprint in assetlinks.json, publish a release, and tell
  users to reinstall.

The script refuses to replace an existing key. To restore a backup,
copy the `.jks` and the properties file back into `~/.chaotic` (mode 600).

### Once: publish the fingerprint (assetlinks.json)

`website/.well-known/assetlinks.json` is what makes Android hand the
sign-in redirect to the app. It is `[]` until the release key exists.
Fill it in before the first release, because Android checks it when
the app is installed:

```bash
scripts/android-release.sh --snapshot --write-assetlinks
```

builds and verifies a signed APK, prints the key's SHA-256 fingerprint,
and writes it into `website/.well-known/assetlinks.json` (only with
`--snapshot`: nothing is staged in the same run). Or paste it by
hand: the file must be exactly

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "sh.chaotic.android",
      "sha256_cert_fingerprints": [
        "AB:CD:...:EF"
      ]
    }
  }
]
```

with your fingerprint (32 upper-case hex bytes separated by colons). An
F-Droid build is signed by F-Droid's key: if the app is listed there,
add that fingerprint to the same list. A backend test checks the file's
shape.

Commit it through a pull request, merge, and deploy the website
(`website/`). Then check what Android will see. Both must hold:

```bash
# 200, Content-Type application/json, and no redirect (Android does not follow one)
curl -sI https://chaotic.sh/.well-known/assetlinks.json
# Google's view of the statement: it must list sh.chaotic.android
curl -s 'https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://chaotic.sh&relation=delegate_permission/common.handle_all_urls'
```

If `chaotic.sh` redirects to `www.chaotic.sh`, verification fails: the
redirect URI's host, `chaotic.sh`, must serve the file itself.

### Each release

1. Raise `versionCode` (by one) and `versionName` in
   `android/app/build.gradle.kts`, through a pull request. Android
   installs an update only if its `versionCode` is higher.
2. On the merged `main`, with a clean working tree:

   ```bash
   git checkout main && git pull
   scripts/android-release.sh
   ```

   It builds `assembleFossRelease` signed, verifies the signature with
   `apksigner` (and that the signer is the key in `~/.chaotic`), prints
   the signing-cert fingerprint and the APK's SHA-256. It refuses to go
   on unless `assetlinks.json` names that key both at the release commit
   and live on `https://chaotic.sh` (the website is deployed). Then it
   stages
   `chaotic-android-<version>.apk`, `SHA256SUMS` and the release notes in
   `android/app/build/github-release/android-v<version>/`.
3. It prints the `gh release create android-v<version> …` command and
   asks before running it. Answer `y` to publish, or run the command
   later yourself. The release is not marked "Latest", so the CLI's
   releases keep that place; the CLI's PyPI workflow ignores
   `android-v*` releases.

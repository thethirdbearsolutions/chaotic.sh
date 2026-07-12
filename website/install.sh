#!/bin/sh
# Chaotic CLI installer
# Usage: curl -sSL https://chaotic.sh/install.sh | sh
#
# This script:
# 1. Detects your OS (Linux/macOS)
# 2. Checks for prerequisites (git, python3.10+)
# 3. Installs uv and just if missing
# 4. Installs the Chaotic CLI via uv
# 5. Runs 'chaotic system install' to set up a local server
#
# Environment variables:
#   CHAOTIC_SKIP_SYSTEM_INSTALL=1  Skip 'chaotic system install' (CLI only)
#   CHAOTIC_PORT=<port>            Port for the server (default: 24267)
#   CHAOTIC_HOST=<host>            Host/IP to bind (default: 127.0.0.1)
#
# CHT-210: if the CLI install succeeds but 'chaotic system install' fails,
# the on_error trap below prints what state ~/.chaotic is left in and what
# to do next, instead of dying silently.

set -eu
# pipefail isn't POSIX (dash, a common /bin/sh, lacks it) -- enable it
# opportunistically on shells that support it (bash, macOS's /bin/sh)
# without breaking dash. No internal pipelines rely on it today; this is
# belt-and-suspenders for future changes.
(set -o pipefail 2>/dev/null) && set -o pipefail || true

# Normalize optional env vars up front so `set -u` doesn't trip on them.
CHAOTIC_SKIP_SYSTEM_INSTALL="${CHAOTIC_SKIP_SYSTEM_INSTALL:-0}"
CHAOTIC_PORT="${CHAOTIC_PORT:-}"
CHAOTIC_HOST="${CHAOTIC_HOST:-}"

# Milestone flags read by on_error to tailor the failure message.
CLI_INSTALLED=0
SYSTEM_INSTALL_ATTEMPTED=0

# Colors for output (only if terminal supports it)
if [ -t 1 ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[0;33m'
    BLUE='\033[0;34m'
    BOLD='\033[1m'
    NC='\033[0m' # No Color
else
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    BOLD=''
    NC=''
fi

info() {
    printf "${BLUE}==>${NC} ${BOLD}%s${NC}\n" "$1"
}

success() {
    printf "${GREEN}==>${NC} ${BOLD}%s${NC}\n" "$1"
}

warn() {
    printf "${YELLOW}Warning:${NC} %s\n" "$1"
}

error() {
    printf "${RED}Error:${NC} %s\n" "$1" >&2
    exit 1
}

# Fires on any nonzero exit (set -e, `error()`, or a failing final command).
# Before the CLI is installed, nothing persistent has happened yet, so the
# error()/prereq messages already printed are sufficient -- stay quiet.
# After the CLI is installed, the user has a partial install on disk and
# needs to know it; tailor the message to how far we got.
on_error() {
    ec=$?
    if [ "$ec" -eq 0 ]; then
        exit 0
    fi
    if [ "$SYSTEM_INSTALL_ATTEMPTED" = "1" ]; then
        echo "" >&2
        printf "${RED}Installation did not finish.${NC}\n" >&2
        echo "The 'chaotic' CLI is installed, but 'chaotic system install' failed" >&2
        echo "(see the error above). You may be left with a partial ~/.chaotic:" >&2
        echo "  - ~/.chaotic/server/  may hold a partial or full git clone" >&2
        echo "  - ~/.chaotic/data/    may or may not have a migrated database" >&2
        echo "  - the systemd/launchd service may not be installed or started" >&2
        echo "" >&2
        echo "Next steps:" >&2
        echo "  1. chaotic system status        # see what actually happened" >&2
        echo "  2. Fix the issue reported above, then retry:" >&2
        echo "       chaotic system install $INSTALL_ARGS" >&2
        echo "     If that now says 'already installed', the clone step" >&2
        echo "     succeeded previously -- use this instead:" >&2
        echo "       chaotic system upgrade --yes" >&2
        echo "       chaotic system start" >&2
        echo "  3. We never delete ~/.chaotic for you. For a clean slate," >&2
        echo "     back it up and move it aside yourself, then retry:" >&2
        echo "       mv ~/.chaotic ~/.chaotic.bak" >&2
        echo "" >&2
    elif [ "$CLI_INSTALLED" = "1" ]; then
        echo "" >&2
        printf "${RED}Installation did not finish.${NC}\n" >&2
        echo "The 'chaotic' CLI package installed, but a step before" >&2
        echo "'chaotic system install' failed (see above) -- no server" >&2
        echo "files were touched. Fix the issue and re-run this installer," >&2
        echo "or run 'chaotic system install' yourself once ready." >&2
        echo "" >&2
    fi
    exit "$ec"
}
trap on_error EXIT

# Detect OS
detect_os() {
    case "$(uname -s)" in
        Linux*)  OS="linux";;
        Darwin*) OS="darwin";;
        MINGW*|MSYS*|CYGWIN*)
            error "Windows is not supported. Please use WSL2 (Windows Subsystem for Linux)."
            ;;
        *)
            error "Unsupported operating system: $(uname -s)"
            ;;
    esac
    echo "$OS"
}

# Check if a command exists
has_command() {
    command -v "$1" >/dev/null 2>&1
}

# Ensure ~/.local/bin is in the user's shell profile
ensure_path_in_profile() {
    PATH_LINE="export PATH=\"\$HOME/.local/bin:\$PATH\""

    # Determine shell profile file
    SHELL_NAME="$(basename "${SHELL:-}")"
    if [ -z "$SHELL_NAME" ]; then
        # $SHELL unset — detect from existing rc files
        if [ -f "$HOME/.zshrc" ]; then
            SHELL_NAME="zsh"
        elif [ -f "$HOME/.bashrc" ]; then
            SHELL_NAME="bash"
        else
            SHELL_NAME="sh"
        fi
    fi

    case "$SHELL_NAME" in
        zsh)  PROFILE="$HOME/.zshrc" ;;
        bash)
            if [ -f "$HOME/.bash_profile" ]; then
                PROFILE="$HOME/.bash_profile"
            elif [ -f "$HOME/.bashrc" ]; then
                PROFILE="$HOME/.bashrc"
            else
                PROFILE="$HOME/.profile"
            fi
            ;;
        *)    PROFILE="$HOME/.profile" ;;
    esac

    # Check if ~/.local/bin is already in PATH exports in the profile
    if [ -f "$PROFILE" ] && grep -q 'PATH.*\.local/bin' "$PROFILE" 2>/dev/null; then
        return 0
    fi

    # Add it
    {
        echo ""
        echo "# Added by Chaotic installer"
        echo "$PATH_LINE"
    } >> "$PROFILE" 2>/dev/null || {
        warn "Could not update $PROFILE — you may need to manually add ~/.local/bin to your PATH"
        return 0
    }
    PROFILE_UPDATED=1
}

# Check for Python 3.10+
check_python() {
    if has_command python3; then
        PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
        MAJOR=$(echo "$PYTHON_VERSION" | cut -d. -f1)
        MINOR=$(echo "$PYTHON_VERSION" | cut -d. -f2)
        # Check for Python >= 3.10: either major > 3, or major == 3 and minor >= 10
        if [ "$MAJOR" -gt 3 ] || { [ "$MAJOR" -eq 3 ] && [ "$MINOR" -ge 10 ]; }; then
            return 0
        fi
    fi
    return 1
}

main() {
    # Ensure common tool install paths are on PATH
    export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"

    echo ""
    printf "${BOLD}Chaotic CLI Installer${NC}\n"
    echo "====================="
    echo ""

    # Detect OS
    info "Detecting operating system..."
    OS=$(detect_os)
    success "Detected: $OS"

    # Check hard prerequisites (can't auto-install these)
    info "Checking prerequisites..."
    MISSING=""

    if ! has_command git; then
        printf "  git: ${RED}MISSING${NC}\n"
        MISSING="$MISSING git"
    else
        printf "  git: ${GREEN}OK${NC}\n"
    fi

    if ! check_python; then
        printf "  python3.10+: ${RED}MISSING${NC}\n"
        MISSING="$MISSING python"
    else
        printf "  python3.10+: ${GREEN}OK${NC} ($PYTHON_VERSION)\n"
    fi

    if [ -n "$MISSING" ]; then
        echo ""
        printf "${BOLD}Please install missing prerequisites:${NC}\n"
        echo ""
        case "$MISSING" in
            *git*)
                echo "  git:"
                if [ "$OS" = "darwin" ]; then
                    echo "    brew install git"
                    echo "    or: xcode-select --install"
                else
                    echo "    sudo apt install git      # Debian/Ubuntu"
                    echo "    sudo dnf install git      # Fedora"
                    echo "    sudo pacman -S git        # Arch"
                fi
                echo ""
                ;;
        esac
        case "$MISSING" in
            *python*)
                echo "  Python 3.10+:"
                if [ "$OS" = "darwin" ]; then
                    echo "    brew install python@3.11"
                else
                    echo "    sudo apt install python3  # Debian/Ubuntu"
                    echo "    sudo dnf install python3  # Fedora"
                fi
                echo ""
                ;;
        esac
        error "Please install missing prerequisites and run this script again."
    fi

    # Auto-install uv if missing
    if ! has_command uv; then
        printf "  uv: ${YELLOW}MISSING${NC}\n"
        if [ -t 0 ]; then
            printf "  Install uv now? [Y/n] "
            read _answer < /dev/tty
            case "$_answer" in
                [nN]*) error "uv is required. Install manually: https://docs.astral.sh/uv/" ;;
            esac
        fi
        info "Installing uv..."
        curl -LsSf https://astral.sh/uv/install.sh | sh
        export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
        if has_command uv; then
            success "uv installed"
        else
            error "Failed to install uv. Install manually: https://docs.astral.sh/uv/"
        fi
    else
        printf "  uv: ${GREEN}OK${NC}\n"
    fi

    # Auto-install just if missing (via uv from PyPI)
    if ! has_command just; then
        printf "  just: ${YELLOW}MISSING${NC}\n"
        if [ -t 0 ]; then
            printf "  Install just now? [Y/n] "
            read _answer < /dev/tty
            case "$_answer" in
                [nN]*) error "just is required. Install manually: https://github.com/casey/just#installation" ;;
            esac
        fi
        info "Installing just..."
        uv tool install rust-just
        export PATH="$HOME/.local/bin:$PATH"
        if has_command just; then
            success "just installed"
        else
            error "Failed to install just. Install manually: https://github.com/casey/just#installation"
        fi
    else
        printf "  just: ${GREEN}OK${NC}\n"
    fi

    echo ""

    # Install Chaotic CLI
    info "Installing Chaotic CLI..."
    # Allow pre-releases for chaotic-cli itself without enabling pre-release
    # resolution for all transitive dependencies.
    uv tool install "chaotic-cli>=0.1.0a0"
    success "Chaotic CLI installed"
    CLI_INSTALLED=1

    # Ensure ~/.local/bin is in the user's shell profile for future sessions
    PROFILE_UPDATED=0
    ensure_path_in_profile

    # Verify installation
    if ! has_command chaotic; then
        warn "chaotic command not found in PATH"
        warn "You may need to add ~/.local/bin to your PATH:"
        echo '  export PATH="$HOME/.local/bin:$PATH"'
        echo ""
        if [ -f "$HOME/.local/bin/chaotic" ]; then
            CHAOTIC_CMD="$HOME/.local/bin/chaotic"
        else
            error "Could not locate chaotic command. Please check your installation."
        fi
    else
        CHAOTIC_CMD="chaotic"
    fi

    echo ""

    # Run system install (unless skipped)
    if [ "${CHAOTIC_SKIP_SYSTEM_INSTALL:-0}" = "1" ]; then
        info "Skipping system install (CHAOTIC_SKIP_SYSTEM_INSTALL=1)"
    else
        info "Setting up local Chaotic server..."
        echo ""
        INSTALL_ARGS="--yes"
        if [ -n "$CHAOTIC_PORT" ]; then
            INSTALL_ARGS="$INSTALL_ARGS --port $CHAOTIC_PORT"
        fi
        if [ -n "$CHAOTIC_HOST" ]; then
            INSTALL_ARGS="$INSTALL_ARGS --host $CHAOTIC_HOST"
        fi
        SYSTEM_INSTALL_ATTEMPTED=1
        "$CHAOTIC_CMD" system install $INSTALL_ARGS
        SYSTEM_INSTALL_ATTEMPTED=0
    fi

    echo ""
    success "Installation complete!"
    echo ""

    # Tell user to restart their shell if we updated the profile
    if [ "$PROFILE_UPDATED" = "1" ]; then
        printf "${YELLOW}NOTE: We added ~/.local/bin to your PATH in ${PROFILE}${NC}\n"
        printf "${YELLOW}To use chaotic in this terminal, run:${NC}\n"
        echo ""
        printf "${YELLOW}  . ${PROFILE}${NC}\n"
        echo ""
        printf "${YELLOW}Or open a new terminal session.${NC}\n"
        echo ""
    fi

    printf "${BOLD}Get started:${NC}\n"
    echo "  chaotic quickstart     # Interactive setup (recommended)"
    echo "  chaotic init           # Browser-based setup"
    echo ""
    printf "${YELLOW}Remote server?${NC} If you installed on a remote machine and want\n"
    printf "it accessible outside localhost, run:\n"
    echo ""
    echo "  chaotic system reconfigure --host 0.0.0.0"
    echo ""
    printf "${YELLOW}(Not recommended yet — this is alpha software!)${NC}\n"
    echo ""
}

main "$@"

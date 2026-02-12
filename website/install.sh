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

set -e

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
    uv tool install chaotic-cli
    success "Chaotic CLI installed"

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

    # Run system install
    info "Setting up local Chaotic server..."
    echo ""
    "$CHAOTIC_CMD" system install --yes

    echo ""
    success "Installation complete!"
    echo ""
    printf "${BOLD}Get started:${NC}\n"
    echo "  chaotic auth signup    # Create your account"
    echo "  chaotic team create    # Create a team"
    echo "  chaotic init           # Initialize a project"
    echo ""
}

main "$@"

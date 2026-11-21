#!/usr/bin/env bash
# Instala a skill DOS Window globalmente para o seu usuário:
#   Claude Code -> ~/.claude/skills/dos-window
#   Codex       -> ~/.codex/skills/dos-window
# Uso: ./install.sh            (instala nos dois)
#      ./install.sh claude     (só Claude Code)
#      ./install.sh codex      (só Codex)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/dos-window"
[ -f "$SRC/SKILL.md" ] || { echo "SKILL.md não encontrado em $SRC" >&2; exit 1; }
TARGET="${1:-all}"
case "$TARGET" in
  all|claude|codex) ;;
  *) printf 'Uso: %s [all|claude|codex]\n' "$0" >&2; exit 2 ;;
esac

install_to() {
  local dest="$1"
  mkdir -p "$(dirname "$dest")"
  if [ -e "$dest" ]; then
    local archive bak
    archive="$(dirname "$(dirname "$dest")")/skill-backups"
    mkdir -p "$archive"
    bak="$(mktemp -d "$archive/dos-window-$(date +%Y%m%d-%H%M%S).XXXXXX")"
    mv "$dest" "$bak/dos-window"
    echo "  versão anterior movida para $bak"
  fi
  mkdir -p "$dest"
  cp -R "$SRC/SKILL.md" "$SRC/assets" "$SRC/references" "$dest/"
  echo "  ok -> $dest"
}

if [ "$TARGET" = "all" ] || [ "$TARGET" = "claude" ]; then
  echo "Claude Code:"
  install_to "$HOME/.claude/skills/dos-window"
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "codex" ]; then
  echo "Codex:"
  install_to "${CODEX_HOME:-$HOME/.codex}/skills/dos-window"
fi

echo "Pronto. Reinicie o Claude Code / Codex para carregar a skill."

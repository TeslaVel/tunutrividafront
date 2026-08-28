#!/usr/bin/env bash
# Levanta el frontend (vite dev server) en segundo plano.
# Corré ./setup.sh primero si es la primera vez.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

mkdir -p .pids log

if [ -f .pids/vite.pid ] && kill -0 "$(cat .pids/vite.pid)" 2>/dev/null; then
  echo "Ya está corriendo (pid $(cat .pids/vite.pid)). Corré ./stop.sh primero si querés reiniciar."
  exit 1
fi

if ! command -v node >/dev/null 2>&1 && [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1091
  ( source "$HOME/.nvm/nvm.sh" && nvm use ) || true
fi

echo "--> Iniciando Vite (log: log/vite.log)"
# setsid + PID negativo en stop.sh: npm lanza un proceso hijo (vite) y
# matar solo el PID de npm lo dejaba huérfano corriendo en el puerto.
setsid nohup npm run dev > log/vite.log 2>&1 &
echo $! > .pids/vite.pid

sleep 2
echo ""
echo "Frontend arriba (pid $(cat .pids/vite.pid))"
echo "Mirá log/vite.log para la URL exacta (por defecto http://localhost:5173)"
echo "Bajar: ./stop.sh"

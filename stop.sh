#!/usr/bin/env bash
# Baja todo lo que levantó ./start.sh (lee los pids de .pids/).
cd "$(dirname "${BASH_SOURCE[0]}")"

stopped_any=false
shopt -s nullglob
for pidfile in .pids/*.pid; do
  pid="$(cat "$pidfile")"
  name="$(basename "$pidfile" .pid)"
  if kill -0 "$pid" 2>/dev/null; then
    echo "--> Deteniendo $name (pid $pid)"
    kill "$pid"
    stopped_any=true
  else
    echo "--> $name (pid $pid) ya no estaba corriendo"
  fi
  rm -f "$pidfile"
done

if [ "$stopped_any" = false ]; then
  echo "No había nada corriendo (según .pids/)."
fi

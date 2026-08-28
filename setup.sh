#!/usr/bin/env bash
# Configuración inicial (o reinstalación) del frontend. Seguro de correr varias veces.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

echo "==> Configurando tunutrividafront"

# Si ya hay un node utilizable en el PATH (via mise, asdf, el sistema, etc.)
# lo usamos tal cual: no vale la pena pelear con nvm si hay otro version
# manager activo (típicamente choca por el "prefix" global de npm). Solo
# recurrimos a nvm cuando no hay node disponible en absoluto.
if command -v node >/dev/null 2>&1; then
  echo "--> Usando node $(node -v) (ya está en el PATH)"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1091
  ( source "$HOME/.nvm/nvm.sh" && nvm install && nvm use ) \
    || echo "AVISO: no se pudo activar node vía nvm."
else
  echo "AVISO: no se encontró node ni nvm. Instalá Node $(cat .nvmrc 2>/dev/null || echo '20.10.0') antes de continuar."
fi

echo "--> npm install"
npm install

if [ ! -f .env ]; then
  echo "--> Creando .env desde .env.example"
  cp .env.example .env
  echo "    Revisá .env y completá los valores reales (VITE_APP_SECRET_TK, etc.)"
else
  echo "--> .env ya existe, no se toca"
fi

echo ""
echo "Listo. Ahora podés correr: ./start.sh"

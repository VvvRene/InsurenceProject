#!/bin/sh
set -eu

cd /app

echo "[entrypoint] Running Prisma migrations..."
if [ "${PRISMA_ALLOW_INSECURE_TLS:-1}" = "1" ]; then
  echo "[entrypoint] PRISMA_ALLOW_INSECURE_TLS=1, disabling TLS verification for Prisma migration download path"
  export NODE_TLS_REJECT_UNAUTHORIZED=0
fi

npm exec -- prisma migrate deploy --schema /app/prisma/schema.prisma
unset NODE_TLS_REJECT_UNAUTHORIZED

echo "[entrypoint] Starting app..."
exec npm run start
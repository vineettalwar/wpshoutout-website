#!/bin/bash
set -e
pnpm install --frozen-lockfile

# Apply DB migrations (production-safe, versioned SQL files under lib/db/migrations/).
# Do NOT use `pnpm --filter db push` — push diffs schema directly against the live DB
# and can drop columns without warning on schema conflicts.
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL is not set — skipping database migrations."
  echo "   Provision a database and set DATABASE_URL, then run:"
  echo "   pnpm --filter @workspace/db run migrate"
else
  pnpm --filter @workspace/db run migrate
fi

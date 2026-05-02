import { defineConfig } from "drizzle-kit";
import path from "path";

// DATABASE_URL is only required for commands that connect to the database
// (migrate, push, pull, studio). For `generate`, it can be omitted.
const needsDb = !process.argv.some((a) =>
  ["generate", "check"].includes(a),
);

if (needsDb && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Ensure the database is provisioned.");
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://localhost/placeholder",
  },
});

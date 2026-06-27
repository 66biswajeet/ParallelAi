// server/drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
// dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models/index.ts", // Pointing directly to our schema entry hub
  out: "./drizzle-migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

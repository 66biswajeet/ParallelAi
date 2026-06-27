// server/src/lib/migrate.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";
dotenv.config();

const migrationPoolConnection = neon(process.env.DATABASE_URL!);
const migrationDbEngine = drizzle(migrationPoolConnection);

const runDatabaseMigrations = async () => {
  try {
    console.log("Parsing current local schema tracking structures...");
    await migrate(migrationDbEngine, {
      migrationsFolder: "./drizzle-migrations",
    });
    console.log("SQL changes propagated cleanly to Neon cluster instances.");
    process.exit(0);
  } catch (error) {
    console.error("Migration phase operational failure:", error);
    process.exit(1);
  }
};

runDatabaseMigrations();

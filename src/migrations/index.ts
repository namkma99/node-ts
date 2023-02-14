import { pool } from "../database";
import fs from "fs";

const migrationFiles = [
  "./src/migrations/create-users-table.sql",
  "./src/migrations/create-roles-table.sql",
  "./src/migrations/create-user-roles-table.sql",
];

async function runMigrations() {
  try {
    const client = await pool.connect();
    for (const migrationFile of migrationFiles) {
      const migration = fs.readFileSync(migrationFile, "utf8");
      await client.query(migration);
      console.log(`Migration ${migrationFile} successful`);
    }
    client.release();
  } catch (err) {
    console.error("Error running migrations", err);
  }
}

runMigrations();

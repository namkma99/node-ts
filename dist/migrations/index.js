"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const fs_1 = __importDefault(require("fs"));
const migrationFiles = [
    "./src/migrations/create-users-table.sql",
    "./src/migrations/create-roles-table.sql",
    "./src/migrations/create-user-roles-table.sql",
];
async function runMigrations() {
    try {
        const client = await database_1.pool.connect();
        for (const migrationFile of migrationFiles) {
            const migration = fs_1.default.readFileSync(migrationFile, "utf8");
            await client.query(migration);
            console.log(`Migration ${migrationFile} successful`);
        }
        client.release();
    }
    catch (err) {
        console.error("Error running migrations", err);
    }
}
runMigrations();

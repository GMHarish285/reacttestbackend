import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            multipleStatements: true, // Allow executing multiple SQL statements
        });

        const sql = fs.readFileSync(path.join(__dirname, "initDb.sql"), "utf-8");
        await connection.query(sql);

        console.log("Database initialized successfully.");
        await connection.end();
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
};

export { initDb };

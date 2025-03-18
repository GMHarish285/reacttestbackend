import { createPool } from "mysql2";
import { pool_db } from "../config/config.js";
// import { appendFileSync } from "fs";

let db = null;
try {
    db = createPool(pool_db);
} catch (err) {
    const timeStamp = new Date().toLocaleString();
    const errMessage = `[ERROR]: ${timeStamp} - ${err.message}`;
    console.error(errMessage);
    // appendFileSync("./logs/connection/poolConnection.log", `${errMessage}\n`);
}

export { db };

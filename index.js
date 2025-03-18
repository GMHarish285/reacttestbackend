import "dotenv/config.js";

// For testing.
console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)

import express from "express";
import cookieParser from "cookie-parser";
import { appendFileSync } from "fs";
import cors from "cors";

import { authRouter } from "./router/authRouter.js";
import { appRouter } from "./router/appRouter.js";
import { userRouter } from "./router/userRouter.js";
import { activityRouter } from "./router/activityRouter.js";
// import { initLog } from "./logs/logsInit.js";
import { initDb } from "./db/initDb.js"

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// initLog();

app.use("/", appRouter);
app.use("/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", activityRouter);

const startServer = async () => {
    await initDb(); // Initialize database before starting server
    app.listen(port, (err) => {
        if (err) {
            const timeStamp = new Date().toLocaleString();
            const errMessage = `[ERROR]: ${timeStamp} - ${err.message}`;
            console.error(errMessage);
            appendFileSync("./logs/index.log", `${errMessage}\n`);
        } else {
            console.info(`[INFO]: Server is running on http://localhost:${port}`);
        }
    });
};

startServer();
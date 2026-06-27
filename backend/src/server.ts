import "dotenv/config";
import express, { Request, Response } from "express";

import { createServer } from "http";
import { initializeWebSocketHub } from "./lib/socket.js";
import { initializeCodeWorker } from "./workers/code.worker.js";

import cors from "cors";
import cookieParser from "cookie-parser"; // Ensure this import is active

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(
  cors({
    origin: process.env.TRUSTED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

const port = process.env.PORT;

initializeWebSocketHub(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

initializeCodeWorker();

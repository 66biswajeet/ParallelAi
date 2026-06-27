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
const parseTrustedOrigins = (): string[] => {
  const origins = process.env.TRUSTED_ORIGINS?.trim();
  if (!origins) return ["http://localhost:5173"];

  try {
    const parsed = JSON.parse(origins);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to comma-separated parsing if JSON parse fails
  }

  return origins.split(",").map((origin) => origin.trim());
};

app.use(
  cors({
    origin: parseTrustedOrigins(),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

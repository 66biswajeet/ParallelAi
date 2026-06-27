// server/src/lib/queue.ts
import { Queue } from "bullmq";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const isSecure = REDIS_URL.startsWith("rediss://");
export const queueConnectionConfig = {
  connection: {
    url: REDIS_URL,
    maxRetriesPerRequest: null, // Keeps required compatibility setting for BullMQ workers intact
    ...(isSecure ? { tls: { rejectUnauthorized: false } } : {}),
  },
};

// Initialize our unified code generation task queue channel
export const codeGenerationQueue = new Queue("code-generation", {
  ...queueConnectionConfig, // Spreads our verified configuration option parameters block
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

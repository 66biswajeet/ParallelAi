// // server/src/workers/code.worker.ts
// import { Worker, Job } from "bullmq";
// import { queueConnectionConfig } from "../lib/queue.js";
// import { db } from "../lib/db.js";
// import { websiteProjects } from "../models/project.model.js";
// import { eq } from "drizzle-orm";
// import { io } from "../lib/socket.js"; // 🧱 Import our global WebSocket hook reference
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// interface GenerationJobData {
//   projectId: string;
//   userId: string;
//   prompt: string;
//   name: string;
// }

// export const initializeCodeWorker = () => {
//   console.log(
//     "⚙️  Background Code Generation Worker initialized and listening to Redis...",
//   );

//   const worker = new Worker(
//     "code-generation",
//     async (job: Job<GenerationJobData>) => {
//       const { projectId, prompt, name } = job.data;
//       console.log(
//         `\n[Job ${job.id}] Processing Canvas Generation Request for: "${name}"`,
//       );

//       try {
//         // 🧱 PHASE 1: Send a real-time event that prompt expansion has started
//         if (io) {
//           io.to(projectId).emit("generation_status", {
//             status: "refining_prompt",
//             message:
//               "Analyzing system requirements and structuring UI layout rules...",
//           });
//         }
//         await new Promise((resolve) => setTimeout(resolve, 7000)); // Mock latency

//         // 🧱 PHASE 2: Send a real-time event that code streaming has begun
//         if (io) {
//           io.to(projectId).emit("generation_status", {
//             status: "streaming_code",
//             message: "Beginning real-time UI canvas construction rendering...",
//           });
//         }

//         let compiledMockHTML = `<html>\n<head><title>${name}</title></head>\n<body>\n`;
//         const mockUISections = [
//           `  <nav class="bg-slate-900 text-white p-4 flex justify-between"><div>LOGO</div><div>Links</div></nav>\n`,
//           `  <header class="py-20 text-center bg-white text-black"><h1>Welcome to ${name}</h1></header>\n`,
//           `  <footer class="bg-gray-100 p-8 text-center text-sm">Powered by PyarelalAi Core Sandbox</footer>\n`,
//         ];

//         for (const section of mockUISections) {
//           await new Promise((resolve) => setTimeout(resolve, 7000)); // Mock token streaming intervals
//           compiledMockHTML += section;

//           // 🧱 LIVE STREAM BYPASS: Push the code snippet instantly to the private project room
//           // This broadcast passes strictly through memory (RAM) and completely bypasses PostgreSQL!
//           if (io) {
//             io.to(projectId).emit("code_stream_chunk", { chunk: section });
//           }
//           console.log(
//             `[Job ${job.id}] Dispatched real-time chunk event over socket pipe.`,
//           );
//         }

//         compiledMockHTML += `</body>\n</html>`;

//         // PHASE 3: Atomic Final Committed Database Write
//         await db
//           .update(websiteProjects)
//           .set({ currentCode: compiledMockHTML, updatedAt: new Date() })
//           .where(eq(websiteProjects.id, projectId));

//         // 🧱 PHASE 4: Send a real-time event that generation is complete
//         if (io) {
//           io.to(projectId).emit("generation_status", {
//             status: "completed",
//             message:
//               "Canvas layout successfully committed to database storage.",
//           });
//         }
//         console.log(
//           `[✓ Job ${job.id}] Final code successfully committed to PostgreSQL database.`,
//         );
//         return { success: true, projectId };
//       } catch (jobError: any) {
//         console.error(
//           `[❌ Job ${job.id}] Processing failure dropped context:`,
//           jobError.message,
//         );

//         // 🧱 Notify the client of the failure state
//         if (io) {
//           io.to(projectId).emit("generation_status", {
//             status: "failed",
//             message:
//               "Generation pipeline encountered a transactional runtime fault.",
//           });
//         }
//         throw jobError;
//       }
//     },
//     queueConnectionConfig,
//   );
// };

// server/src/workers/code.worker.ts
import { Worker, Job } from "bullmq";
import { queueConnectionConfig } from "../lib/queue.js";
import { db } from "../lib/db.js";
import { websiteProjects } from "../models/project.model.js";
import { eq } from "drizzle-orm";
import { io } from "../lib/socket.js";
import { GoogleGenAI } from "@google/genai"; // Import official modern Google Gen AI SDK

// Initialize our server-side AI interface handler using our secret environment key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface GenerationJobData {
  projectId: string;
  userId: string;
  prompt: string;
  name: string;
}

export const initializeCodeWorker = () => {
  console.log(
    "⚙️  Production AI Code Generation Worker active and monitoring Redis queues...",
  );

  const worker = new Worker(
    "code-generation",
    async (job: Job<GenerationJobData>) => {
      const { projectId, prompt, name } = job.data;
      console.log(
        `\n[Job ${job.id}] Launching live AI streaming compilation for project: "${name}"`,
      );

      try {
        // PHASE 1: SIGNAL PROMPT REFINEMENT TO FRONTEND OVER WEBSOCKETS
        if (io) {
          io.to(projectId).emit("generation_status", {
            status: "refining_prompt",
            message:
              "Refining base requirements and applying elite component prompt layout specifications...",
          });
        }

        // CRAFT THE BLUEPRINT CONSTRAINTS (Injecting Core System Layout Prompt Rules)
        const systemRefinementBlueprint = `
          You are an elite Staff Frontend Engineer and Expert Prompt Engineer with years of experience building single-page user interfaces.
          Task: Generate a stunning, fully styled single-page web app layout based on the user's request.
          
          Project Workspace Name Target: "${name}"
          User Input Requirements Definition: "${prompt}"
          
          Strict Clean Code Output Rules:
          1. Return ONLY semantic, valid HTML inside a complete standalone page structure.
          2. You MUST use fully responsive mobile-first Tailwind CSS utility classes via a public CDN script tag for all layouts, styling, spacing, grids, and components.
          3. Enforce the 80-10-10 palette rules: 80% clean white dominant base background space, 10% contrasting dark/slate structural element containers, and 10% vivid, creative brand colors for accents and micro-interactive elements.
          4. Build detailed, high-quality interactive sections: a sticky navigation bar with a clear logo container, a bold hero presentation deck with distinct call-to-action buttons, responsive features grids, a test customer testimonial slider block, a functional lead collection form, and a structured footer block.
          5. Ensure elements have transition animations (hover scales, shadow translations, color fades).
          6. DO NOT write markdown backticks or wrappers like \`\`\`html or \`\`\` text in your output stream. Output the raw HTML code block directly from character 1 to ensure flawless real-time token transmission parsing.
        `;

        // PHASE 2: INITIALIZE LIVE STREAM WITH GEMINI ENGINE
        if (io) {
          io.to(projectId).emit("generation_status", {
            status: "streaming_code",
            message:
              "Handshake established with AI core. Beginning real-time canvas code streaming...",
          });
        }

        // Invoke the fast gemini-2.5-flash model optimized for streaming speed and high context windows
        const streamingResponseStream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: systemRefinementBlueprint,
        });

        let finalCompiledHTML = "";

        // PHASE 3: LIVE STREAM MEMORY BYPASS LOOP
        // Intercept chunks from the AI cloud as they pass through our worker memory thread
        for await (const fragment of streamingResponseStream) {
          const textTokenChunk = fragment.text;

          if (textTokenChunk) {
            finalCompiledHTML += textTokenChunk;

            // Direct Memory Bypass: Stream the text chunk straight out over WebSockets
            // Scalability Win: Keeps your Neon cloud database entirely free from high-frequency update spam!
            if (io) {
              io.to(projectId).emit("code_stream_chunk", {
                chunk: textTokenChunk,
              });
            }
          }
        }

        // Sanitization Guard: strip out any raw markdown code block tags if the LLM slipped them in
        finalCompiledHTML = finalCompiledHTML
          .replace(/^```html\s*|```$/gi, "")
          .trim();

        // PHASE 4: ATOMIC FINAL DATABASE WRITE COMMIT
        // High Concurrency Win: We hit PostgreSQL exactly ONCE here, saving the full code payload
        // only when the streaming event indicates the task is completely finished.
        await db
          .update(websiteProjects)
          .set({
            currentCode: finalCompiledHTML,
            updatedAt: new Date(),
          })
          .where(eq(websiteProjects.id, projectId));

        // PHASE 5: SIGNAL PIPELINE COMPLETION
        if (io) {
          io.to(projectId).emit("generation_status", {
            status: "completed",
            message:
              "Canvas layout compilation finalized and committed to secure database engines.",
          });
        }

        console.log(
          `[✓ Job ${job.id}] Live AI compilation complete. Database record finalized safely for project: ${projectId}`,
        );
        return { success: true, projectId };
      } catch (error: any) {
        console.error(
          `[❌ Critical AI Pipeline Exception at Job ${job.id}]:`,
          error.message,
        );

        if (io) {
          io.to(projectId).emit("generation_status", {
            status: "failed",
            message: `Generation process failed due to server error: ${error.message}`,
          });
        }
        throw error; // Allows BullMQ to track the failure state and schedule automated backoff retries
      }
    },
    queueConnectionConfig,
  );
};

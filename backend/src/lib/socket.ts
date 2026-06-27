import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";

// This global reference lets our background worker grab the socket engine later
export let io: SocketServer | null = null;

export const initializeWebSocketHub = (server: HttpServer): SocketServer => {
  io = new SocketServer(server, {
    cors: {
      origin: process.env.TRUSTED_ORIGINS?.split(",") || [
        "http://localhost:5173",
      ],
      credentials: true,
    },
    path: "/socket.io",
  });

  console.log("🔌 Real-time WebSocket Gateway established safely.");

  io.on("connection", (socket) => {
    console.log(`[Socket Connected] Client active: ${socket.id}`);

    // When the client sends the "join_project_canvas" event, put them in a private room
    socket.on("join_project_canvas", (projectId: string) => {
      socket.join(projectId); // This places the socket socket into an isolated room channel
      console.log(
        `[Canvas Room] Client ${socket.id} joined room channel: ${projectId}`,
      );
    });

    socket.on("disconnect", () => {
      console.log(`[Socket Disconnected] Client left: ${socket.id}`);
    });
  });

  return io;
};

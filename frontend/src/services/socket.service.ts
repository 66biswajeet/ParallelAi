import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./api";

// Set autoConnect to false to connect dynamically when the user is logged in
export const socket: Socket = io(API_BASE_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});

import { Server, Socket } from "socket.io";
import http from "http";
import express, { Application, Request, Response } from "express";

// Initialize express application
const app: Application = express();

// New HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-space-sand.vercel.app"],
    methods: ["GET", "POST", "PUT"],
  },
});

// Type definition for user socket mapping
interface UserSocketMap {
  [userId: string]: string; // Mapping user ID to socket ID
}

const userSocketMap: UserSocketMap = {};

// Get receiver socket ID
const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

// Handle socket connections
io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Start the server
const startServer = (req: Request, res: Response): void => {
  server.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
};

// Export the modules
export { app, io, server, getReceiverSocketId, startServer };

// const Server = require("socket.io");
// const http = require("http");
// const express = require("express");
// const app = express();

// //new http server
// const server = http.createServer(app);

// //  initialize socket.io
// const io = Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "https://chat-space-sand.vercel.app"],
//     methods: ["GET", "POST", "PUT"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   },
//   transports: ["websocket"],
// });
// // const io = Server(server, {
// //   cors: {
// //     origin: true, // Allow requests from any origin
// //   },
// // });

// const userSocketMap = {}; //{userId: socketId}

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId != "undefined") userSocketMap[userId] = socket.id;

//   //send event to every client
//   // io.emit() is used to send events to all the connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // socket.on() is used to listen to the events. can be used both on client and server side
//   socket.on("disconnect", () => {
//     console.log("a user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// // module.exports = (req, res) => {
// //   server.listen(3000, () => {
// //     console.log("Server listening on port 3000");
// //   });
// // };

// // Export the modules
// module.exports = {
//   app,
//   io,
//   server,
//   getReceiverSocketId: (receiverId) => userSocketMap[receiverId],
// };
// const Server = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();

// const server = http.createServer(app);
// const io = Server(server, {
//   cors: {
//     // origin: ["http://localhost:5173", "https://chat-space-sand.vercel.app"],
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId: socketId}

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId != "undefined") userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all the connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // socket.on() is used to listen to the events. can be used both on client and server side
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// module.exports = { app, io, server, getReceiverSocketId }

// exports.socketHandler = https.onRequest((req, res) => {
//   server.emit("request", req);
//   res.send("Socket.IO server is running.");
// });
const Server = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

//new http server
const server = http.createServer(app);

//  initialize socket.io
const io = Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-space-sand.vercel.app"],
    methods: ["GET", "POST", "PUT"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //send event to every client
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = (req, res) => {
  server.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
};

// Export the modules
module.exports = { app, io, server, getReceiverSocketId };

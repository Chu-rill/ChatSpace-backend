// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const authRoutes = require("./src/routes/AuthRoutes");
// const messageRoutes = require("./src/routes/MessageRoutes");
// const userRoutes = require("./src/routes/UserRoutes");
// const port = process.env.PORT || 4000;
// const { app, server } = require("./src/socket/socket");

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true,
//   })
// );

// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({ status: "success" });
// });

// const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";

// // const _dirname = path.resolve();
// mongoose
//   .connect(URI)
//   .then(() => {
//     console.log("Connected to the database");
//     server.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed");
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/msg", messageRoutes);
// app.use("/api/users", userRoutes);
// // app.use(express.static(path.join(_dirname, "/client/dist")));
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
// // });

// const Server = require("socket.io");
// const http = require("http");
// const express = require("express");
// const app = express();

// //new http server
// const server = http.createServer(app);

// //  initialize socket.io
// const io = Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT"],
//   },
// });

// const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

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

// module.exports = (req, res) => {
//   server.listen(3000, () => {
//     console.log("Server listening on port 3000");
//   });
// };

// // Export the modules
// module.exports = { app, io, server, getReceiverSocketId };

const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/AuthRoutes");
const messageRoutes = require("./src/routes/MessageRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const Server = require("socket.io");

const app = express();
const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = Server(server, {
  cors: {
    origin: ["https://chat-space-sand.vercel.app/"], // Your frontend URL
    methods: ["GET", "POST", "PUT"],
  },
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // Send event to every client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/users", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ status: "success" });
});

// Connect to MongoDB and start server
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to the database");
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

// Export modules if needed
module.exports = { app, io, server, getReceiverSocketId };

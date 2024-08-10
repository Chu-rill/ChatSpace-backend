const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/AuthRoutes");
const messageRoutes = require("./src/routes/MessageRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const { app, server } = require("./src/socket/socket");

// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-space-sand.vercel.app"], // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

app.get("/test", (req, res) => {
  res.send("Test endpoint");
});

const port = 3001;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";

if (URI == "mongodb://127.0.0.1:27017/e-commerce") {
  console.log("local");
}

mongoose
  .connect(URI, {
    serverSelectionTimeoutMS: 3000000,
  })
  .then(() => {
    console.log("Connected to the database");
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/users", userRoutes);

// Export the function to handle both WebSocket and HTTP requests
exports.api = functions.https.onRequest((req, res) => {
  if (req.url.startsWith("/socket.io")) {
    return server(req, res); // Handle WebSocket requests
  } else {
    return app(req, res); // Handle HTTP requests
  }
});

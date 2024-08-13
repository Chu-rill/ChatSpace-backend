const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/AuthRoutes");
const messageRoutes = require("./src/routes/MessageRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const { app, server } = require("./src/socket/socket");

// cors middle ware for origin error
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

const port = process.env.PORT;
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

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/users", userRoutes);

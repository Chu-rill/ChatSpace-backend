import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import rateLimit from "express-rate-limit";
import { connectDB } from "./utils/db";
// const swaggerui = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load(
//   path.resolve(__dirname, ".././src/swagger.yaml")
// );
import authRoutes from "./component/auth/auth.routes";
import userRoutes from "./component/user/user.routes";
import messageRoutes from "./component/message/message.routes";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Provide a fallback port in case PORT is undefined

const MONGODB_URL =
  process.env.MONGODB_URI || "mongodb://localhost:27017/chatapp";

// Set up the rate limiter to allow 100 requests per hour
const limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "We have received too many requests from this IP. Please try again after one hour.",
});

// Middleware setup
app.use(
  cors({
    origin: process.env.ALLOWED_URL || "*", // Your frontend URL, default to *
    methods: "*",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// Start server and connect to the database
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("📦 Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });

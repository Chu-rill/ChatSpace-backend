import express, { Request, Response, NextFunction } from "express";
import messageController from "./message.controller";
import { protect } from "../../middleware/jwt";
import { io } from "../../utils/socket";

const messageRoutes = express.Router();

// POST /send/:id - Send a message
messageRoutes.post("/:receiverId", protect, messageController.sendMessage);

// GET /:id - Get messages
messageRoutes.get("/:userToChatId", protect, messageController.getMessages);

export default messageRoutes;

import express, { Request, Response, NextFunction } from "express";
import { sendMessage, getMessages } from "./message.controller";
import { protect } from "../../middleware/jwt";
import { io } from "../../utils/socket";

const messageRoutes = express.Router();

// POST /send/:id - Send a message
messageRoutes.post(
  "/send/:id",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    sendMessage(req, res);
  }
);

// GET /:id - Get messages
messageRoutes.get(
  "/:id",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    getMessages(req, res);
  }
);

export default messageRoutes;

import { Request, Response } from "express";
import messageRepository from "./message.repository";

class MessageController {
  /**
   * Handles sending a message.
   * @param req - Express request object
   * @param res - Express response object
   */
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message } = req.body;
      const { receiverId } = req.params;
      const senderId = req.user._id; // Assuming req.user is set by middleware

      const response = await messageRepository.sendMessage(
        message,
        receiverId,
        senderId
      );

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /**
   * Handles fetching messages between users.
   * @param req - Express request object
   * @param res - Express response object
   */
  async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id; // Assuming req.user is set by middleware

      const messages = await messageRepository.getMessages(
        senderId,
        userToChatId
      );

      res.status(messages.statusCode).json(messages);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

// Exporting the class instance
export default new MessageController();

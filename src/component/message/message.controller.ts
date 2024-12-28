import { Request, Response } from "express";
import { io, getReceiverSocketId } from "../../utils/socket";
import Conversation from "../../model/conversation";
import Message from "../../model/message";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Assuming req.user is properly typed middleware

    // Check if conversation exists between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create a new conversation if none exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the message to the array
    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Send event to a specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; // Assuming req.user is properly typed middleware

    // Fetch conversation from the database
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

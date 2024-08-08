const express = require("express");
const Conversation = require("../model/conversation_model");
const Message = require("../model/message_model");
const { getReceiverSocketId } = require("../socket/socket");
const NodeCache = require("node-cache");
const messageCache = new NodeCache();

exports.sendMessage = async (req, res, io) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Check if conversation exists between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // Ensure both IDs are present
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

    // Update cache for both participants
    const cacheKeySender = `conversation_${senderId}_${receiverId}`;
    const cacheKeyReceiver = `conversation_${receiverId}_${senderId}`;

    // Invalidate or update the cache for both participants
    messageCache.del(cacheKeySender);
    messageCache.del(cacheKeyReceiver);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //send event to a specific client
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Generate a unique cache key for the conversation
    const cacheKey = `conversation_${senderId}_${userToChatId}`;

    // Check if messages are in cache
    const cachedMessages = messageCache.get(cacheKey);
    if (cachedMessages) {
      return res.status(200).json(cachedMessages);
    }

    //fetch conversation from db
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }, // Ensure both IDs are present
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);

    if (!conversation) {
      // Cache an empty array if no conversation found
      messageCache.set(cacheKey, []);
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    // Store messages in cache
    messageCache.set(cacheKey, messages);

    res.status(200).json(messages);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//comment

const express = require("express");
const { io } = require("../socket/socket");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/MessageController");
const protectRoute = require("../middleware/protectRoute");
const messageRoutes = express.Router();

messageRoutes.post("/send/:id", protectRoute, (req, res) => {
  sendMessage(req, res, io);
});
messageRoutes.get("/:id", protectRoute, getMessages);
messageRoutes.delete("/delete/:id", protectRoute, deleteMessage);
module.exports = messageRoutes;

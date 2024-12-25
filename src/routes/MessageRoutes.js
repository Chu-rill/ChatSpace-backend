const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/MessageController");
const protectRoute = require("../middleware/protectRoute");
const messageRoutes = express.Router();
const { io } = require("../socket/socket");

messageRoutes.post("/send/:id", protectRoute, (req, res) => {
  sendMessage(req, res, io);
});
messageRoutes.get("/:id", protectRoute, getMessages);
module.exports = messageRoutes;

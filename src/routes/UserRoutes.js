const express = require("express");
const userRoutes = express.Router();
const protectRoute = require("../middleware/protectRoute");
const {
  getUserForSidebar,
  editProfile,
  deleteUser,
} = require("../controllers/UserController");

userRoutes.get("/", protectRoute, getUserForSidebar);
userRoutes.put("/update/:id", protectRoute, editProfile);
userRoutes.delete("/delete/:id", protectRoute, deleteUser);
module.exports = userRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const jwt_1 = require("../middleware/jwt");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/users", jwt_1.protect, user_controller_1.default.getAllUsers);
userRoutes.get("/user/:id", jwt_1.protect, user_controller_1.default.getUser);
userRoutes.put("/user/:id", jwt_1.protect, user_controller_1.default.updateUser);
userRoutes.delete("/deleteUser/:id", jwt_1.protect, user_controller_1.default.deleteUser);
exports.default = userRoutes;

import { Router } from "express";
import userController from "./user.controller";
import { protect } from "../../middleware/jwt";

const userRoutes = Router();

userRoutes.get("", protect, userController.getAllUsers);
userRoutes.get("/:id", protect, userController.getUser);
userRoutes.put("/:id", protect, userController.updateUser);
userRoutes.delete("/:id", protect, userController.deleteUser);

export default userRoutes;

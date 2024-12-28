import { Request, Response } from "express";
// import { sendErrorResponse } from "../error/validation.error";
import userService from "./user.service";
import { UserServiceResponse } from "./user.response";

// Define the type for the response returned by the user service

class UserController {
  // Delete user method
  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response: UserServiceResponse = await userService.deleteUser(id);

      if (response.status === "success") {
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
      }

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get all users method
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const response: UserServiceResponse | any =
        await userService.getAllUsers();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get users error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a specific user by id
  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response: UserServiceResponse = await userService.getUser(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a user's information
  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const response: UserServiceResponse | any = await userService.updateUser(
        id,
        updateData
      );
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default new UserController();

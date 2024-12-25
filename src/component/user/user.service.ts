import jwt from "jsonwebtoken";
import { comparePassword, encrypt } from "../../utils/encryption";
import {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} from "../../error/error";
import httpStatus from "http-status";
import userRepository from "./user.repository";
import {
  LoginResponse,
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  User,
  UserDocument,
} from "./user.response";

class UserService {
  async loginUser(
    username: string,
    password: string
  ): Promise<
    | LoginResponse
    | typeof doesNotExistError
    | typeof passwordMismatchError
    | typeof defaultError
  > {
    try {
      const user = (await userRepository.getUserByUsername(
        username
      )) as UserDocument;
      if (!user) return doesNotExistError;

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) return passwordMismatchError;

      const userId = user._id.toString();
      const payload = { username: user.username, id: userId };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        user: { username: user.username, id: userId }, // Ensure _id is a string
        token,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<
    CreateUserResponse | typeof noDuplicateError | typeof defaultError
  > {
    try {
      const existingUser = await userRepository.getUserByUsername(username);
      if (existingUser) return noDuplicateError;

      const hashedPassword = await encrypt(password);
      const user = await userRepository.createUser({
        username,
        password: hashedPassword,
        email,
      });

      if (!user) return defaultError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        user: { username, email },
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async deleteUser(
    id: string
  ): Promise<DeleteUserResponse | typeof doesNotExistError> {
    try {
      const user = await userRepository.delete(id);
      if (!user) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async getAllUsers(): Promise<{
    status: string;
    error?: boolean;
    statusCode?: number;
    message: string;
    data?: User[];
  }> {
    try {
      const users = await userRepository.findAll();
      if (!users || users.length === 0) {
        return { status: "error", message: "No users found." };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async getUser(
    id: string
  ): Promise<GetUserResponse | typeof doesNotExistError> {
    try {
      const user = await userRepository.findById(id);
      if (!user) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: user,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async updateUser(
    id: string,
    updateData: Partial<User>
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: User;
      }
    | { status: string; message: string }
  > {
    try {
      const user = await userRepository.findById(id);

      // Check if the user exists
      if (!user) {
        return {
          status: "error",
          statusCode: 404,
          message: "No user found.",
        };
      }

      // Update the user details
      const updatedUser = await userRepository.update(id, updateData);

      if (!updatedUser) {
        return {
          status: "error",
          statusCode: 400,
          message: "Failed to update user.",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }
}

export default new UserService();

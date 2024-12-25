"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const encryption_1 = require("../../utils/encryption");
const error_1 = require("../../error/error");
const http_status_1 = __importDefault(require("http-status"));
const user_repository_1 = __importDefault(require("./user.repository"));
class UserService {
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield user_repository_1.default.getUserByUsername(username));
                if (!user)
                    return error_1.doesNotExistError;
                const isPasswordCorrect = yield (0, encryption_1.comparePassword)(password, user.password);
                if (!isPasswordCorrect)
                    return error_1.passwordMismatchError;
                const userId = user._id.toString();
                const payload = { username: user.username, id: userId };
                const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_LIFETIME,
                });
                return {
                    status: "success",
                    error: false,
                    statusCode: http_status_1.default.OK,
                    user: { username: user.username, id: userId }, // Ensure _id is a string
                    token,
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
    createUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_repository_1.default.getUserByUsername(username);
                if (existingUser)
                    return error_1.noDuplicateError;
                const hashedPassword = yield (0, encryption_1.encrypt)(password);
                const user = yield user_repository_1.default.createUser({
                    username,
                    password: hashedPassword,
                    email,
                });
                if (!user)
                    return error_1.defaultError;
                return {
                    status: "success",
                    error: false,
                    statusCode: http_status_1.default.CREATED,
                    user: { username, email },
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.delete(id);
                if (!user)
                    return error_1.doesNotExistError;
                return {
                    status: "success",
                    error: false,
                    statusCode: http_status_1.default.OK,
                    message: "User deleted successfully",
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_repository_1.default.findAll();
                if (!users || users.length === 0) {
                    return { status: "error", message: "No users found." };
                }
                return {
                    status: "success",
                    error: false,
                    statusCode: http_status_1.default.OK,
                    message: "Users retrieved successfully",
                    data: users,
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(id);
                if (!user)
                    return error_1.doesNotExistError;
                return {
                    status: "success",
                    error: false,
                    statusCode: http_status_1.default.OK,
                    message: "User retrieved successfully",
                    data: user,
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(id);
                // Check if the user exists
                if (!user) {
                    return {
                        status: "error",
                        statusCode: 404,
                        message: "No user found.",
                    };
                }
                // Update the user details
                const updatedUser = yield user_repository_1.default.update(id, updateData);
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
                    statusCode: http_status_1.default.OK,
                    message: "User updated successfully",
                    data: updatedUser,
                };
            }
            catch (error) {
                console.error(error);
                return error_1.defaultError;
            }
        });
    }
}
exports.default = new UserService();

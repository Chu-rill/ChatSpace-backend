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
// import { sendErrorResponse } from "../error/validation.error";
const user_service_1 = __importDefault(require("../service/user.service"));
// Define the type for the response returned by the user service
class UserController {
    // Delete user method
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield user_service_1.default.deleteUser(id);
                if (response.status === "success") {
                    // Clear the JWT cookie
                    res.cookie("jwt", "", { maxAge: 0 });
                }
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Delete error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    // Get all users method
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.default.getAllUsers();
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Get users error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    // Get a specific user by id
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield user_service_1.default.getUser(id);
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Get user error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    // Update a user's information
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateData = req.body;
            try {
                const response = yield user_service_1.default.updateUser(id, updateData);
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Update user error:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = new UserController();

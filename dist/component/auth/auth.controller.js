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
const user_service_1 = __importDefault(require("../user/user.service")); // Ensure the userService is exported correctly
const email_1 = __importDefault(require("../../utils/email")); // Ensure the emailService is exported correctly
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const response = yield user_service_1.default.loginUser(username, password);
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Login error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = req.body;
            try {
                const response = yield user_service_1.default.createUser(username, password, email);
                if (response.error) {
                    return res.status(response.statusCode).json(response);
                }
                const data = {
                    subject: "Welcome to Express Template",
                    username: username,
                };
                yield email_1.default.sendEmailWithTemplate(email, data);
                return res.status(response.statusCode).send(response);
            }
            catch (err) {
                console.error("Signup error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = new AuthController(); // Use ES module syntax to export

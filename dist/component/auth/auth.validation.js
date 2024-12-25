"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_query_validator = exports.register_query_validator = void 0;
const joi_1 = __importDefault(require("joi"));
// Register validator schema
exports.register_query_validator = joi_1.default.object({
    username: joi_1.default.string().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "any.required": "Username is a required field",
    }),
    password: joi_1.default.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "any.required": "Password is a required field",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "any.required": "Email is a required field",
    }),
});
// Login validator schema
exports.login_query_validator = joi_1.default.object({
    username: joi_1.default.string().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "any.required": "Username is a required field",
    }),
    password: joi_1.default.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "any.required": "Password is a required field",
    }),
});

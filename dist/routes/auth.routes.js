"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_validation_1 = require("../validation/auth.validation");
const ValidationMiddleware_1 = require("../middleware/ValidationMiddleware");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, ValidationMiddleware_1.validateSchema)(auth_validation_1.register_query_validator), // Use the named import
auth_controller_1.default.signup);
authRoutes.post("/login", (0, ValidationMiddleware_1.validateSchema)(auth_validation_1.login_query_validator), // Use the named import
auth_controller_1.default.login);
exports.default = authRoutes;

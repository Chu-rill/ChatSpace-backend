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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jwt = require("jsonwebtoken");
const User = require("../component/user/User");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from the Bearer token in the Authorization header
            token = req.headers.authorization.split(" ")[1];
            // Verify the token using the JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user from the database based on the decoded token (without password)
            req.user = yield User.findById(decoded.id).select("-password");
            // Proceed to the next middleware or route handler
            next();
        }
        catch (err) {
            console.error("Token verification failed", err);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
});
exports.protect = protect;

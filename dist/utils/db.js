"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/template";
function connectDB() {
    mongoose_1.default
        .connect(URI, {
    // serverSelectionTimeoutMS: 3000000, // Uncomment if you need it
    })
        .then(() => {
        console.log("Connected to the database");
    })
        .catch((error) => {
        console.error("Connection failed", error);
    });
}
exports.default = connectDB;

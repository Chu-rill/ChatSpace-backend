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
exports.comparePassword = exports.encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Function to encrypt a password
const encrypt = (plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = yield bcryptjs_1.default.hash(plainPassword, salt); // Hash the password with the salt
    return hashedPassword;
});
exports.encrypt = encrypt;
// Function to compare a password with a hashed one
const comparePassword = (plainPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcryptjs_1.default.compare(plainPassword, hashedPassword); // Compare the passwords
    return isMatch; // Returns true if passwords match, false otherwise
});
exports.comparePassword = comparePassword;

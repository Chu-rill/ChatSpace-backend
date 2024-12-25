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
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    // Find all users
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.find();
        });
    }
    // Find user by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findById(id);
        });
    }
    // Create a new user
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, email, }) {
            const user = yield User_1.default.create({
                username,
                password,
                email,
            });
            return user;
        });
    }
    // Update a user by ID
    update(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findByIdAndUpdate(id, updatedUser, {
                new: true,
                runValidators: true,
            });
        });
    }
    // Delete a user by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findByIdAndDelete(id);
        });
    }
    // Find user by username
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ username });
        });
    }
}
exports.default = new UserRepository();

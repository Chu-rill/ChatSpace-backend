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
jest.mock("../../component/user/user.service");
jest.mock("../../component/user/user.repository");
const user_service_1 = __importDefault(require("../../component/user/user.service"));
describe("User Service Tests", () => {
    let userId;
    let user;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    beforeAll(() => {
        (userId = "tes-userid"),
            (user = {
                username: "testuser",
                email: "testuser@example.com",
                password: "test-password",
                _id: "test-id",
            });
    });
    describe("getUser", () => {
        it("should get a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.default.getUser.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 200,
                message: "User retrieved successfully",
                data: user,
            });
            const result = yield user_service_1.default.getUser(userId);
            expect(result.status).toBe("success");
            if ("data" in result) {
                expect(result.data).toEqual(user);
            }
        }));
    });
    describe("updateUser", () => {
        it("should update a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateData = { username: "Updated User" };
            user_service_1.default.updateUser.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 200,
                message: "User updated successfully",
                data: Object.assign(Object.assign({}, user), updateData),
            });
            const result = yield user_service_1.default.updateUser(userId, updateData);
            expect(result.status).toBe("success");
            if ("data" in result && result.data) {
                expect(result.data.username).toBe("Updated User");
            }
        }));
    });
    describe("deleteUser", () => {
        it("should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.default.deleteUser.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 200,
                message: "User deleted successfully",
            });
            const result = yield user_service_1.default.deleteUser(userId);
            expect(result.status).toBe("success");
        }));
    });
    describe("getAllUsers", () => {
        it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.default.getAllUsers.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 200,
                message: "Users retrieved successfully",
                data: [user],
            });
            const result = yield user_service_1.default.getAllUsers();
            expect(result.status).toBe("success");
            expect(result.data).toEqual([user]);
        }));
    });
});

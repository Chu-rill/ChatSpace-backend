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
jest.mock("../../utils/email");
// jest.mock("../../utils/otp");
const user_service_1 = __importDefault(require("../../component/user/user.service"));
const email_1 = __importDefault(require("../../utils/email"));
// import { sendOTPToUser } from "../../utils/otp";
const auth_controller_1 = __importDefault(require("../../component/auth/auth.controller"));
// import prismaMock from "./__mocks__/prisma";
describe("Auth Controller Tests", () => {
    let req;
    let res;
    let statusMock;
    let sendMock;
    let jsonMock;
    beforeEach(() => {
        jest.clearAllMocks();
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn().mockReturnThis();
        res = {
            status: statusMock,
            send: sendMock,
            json: jsonMock,
        };
    });
    describe("login", () => {
        it("should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                body: {
                    username: "testuser",
                    password: "testpassword",
                },
            };
            user_service_1.default.loginUser.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 200,
                data: { username: "testuser", id: "test-user-id" },
                token: "test-token",
            });
            yield auth_controller_1.default.login(req, res);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith({
                status: "success",
                error: false,
                statusCode: 200,
                data: { username: "testuser", id: "test-user-id" },
                token: "test-token",
            });
        }));
    });
    describe("signup", () => {
        it("should signup a user", () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                body: {
                    fullName: "Test User",
                    username: "testuser",
                    password: "testpassword",
                    email: "testuser@example.com",
                    phone: "1234567890",
                    dateOfBirth: "2000-01-01",
                    profile: "test-profile-url",
                    address: "123 Test St",
                    role: "USER",
                },
            };
            user_service_1.default.createUser.mockResolvedValue({
                status: "success",
                error: false,
                statusCode: 201,
                data: { id: "test-user-id" },
            });
            //   (sendOTPToUser as jest.Mock).mockResolvedValue("123456");
            email_1.default.sendEmailWithTemplate.mockResolvedValue(true);
            yield auth_controller_1.default.signup(req, res);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(sendMock).toHaveBeenCalledWith({
                status: "success",
                error: false,
                statusCode: 201,
                data: { id: "test-user-id" },
            });
        }), 10000);
    });
    //   describe("validateOTP", () => {
    //     it("should validate OTP", async () => {
    //       req = {
    //         params: { id: "test-user-id" },
    //         body: { OTP: "123456" },
    //       };
    //       (userService.validateOTP as jest.Mock).mockResolvedValue({
    //         status: "success",
    //         error: false,
    //         statusCode: 200,
    //         message: "OTP Validated successfully",
    //       });
    //       await authController.validateOTP(req as Request, res as Response);
    //       expect(statusMock).toHaveBeenCalledWith(200);
    //       expect(sendMock).toHaveBeenCalledWith({
    //         status: "success",
    //         error: false,
    //         statusCode: 200,
    //         message: "OTP Validated successfully",
    //       });
    //     });
    //   });
    //   describe("ResetPassword", () => {
    //     it("should send OTP for password reset", async () => {
    //       req = {
    //         params: { id: "test-user-id" },
    //         body: { email: "testuser@example.com" },
    //       };
    //       (sendOTPToUser as jest.Mock).mockResolvedValue("123456");
    //       (emailService.sendResetPasswordEmail as jest.Mock).mockResolvedValue(
    //         true
    //       );
    //       await authController.ResetPassword(req as Request, res as Response);
    //       expect(statusMock).toHaveBeenCalledWith(200);
    //       expect(jsonMock).toHaveBeenCalledWith({ message: "OTP sent to User" });
    //     });
    //   });
    //   describe("confirmResetPassword", () => {
    //     it("should confirm password reset", async () => {
    //       req = {
    //         params: { id: "test-user-id" },
    //         body: { OTP: "123456", newPassword: "newpassword" },
    //       };
    //       (userService.validateOTP as jest.Mock).mockResolvedValue(true);
    //       (userService.updatePassword as jest.Mock).mockResolvedValue(true);
    //       await authController.confirmResetPassword(
    //         req as Request,
    //         res as Response
    //       );
    //       expect(statusMock).toHaveBeenCalledWith(200);
    //       expect(jsonMock).toHaveBeenCalledWith({
    //         message: "Password successfully updated",
    //       });
    //     });
    //   });
});

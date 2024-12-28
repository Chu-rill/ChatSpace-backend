jest.mock("../../component/user/user.service");
jest.mock("../../utils/email");
// jest.mock("../../utils/otp");

import userService from "../../component/user/user.service";
import emailService from "../../utils/email";
// import { sendOTPToUser } from "../../utils/otp";
import authController from "../../component/auth/auth.controller";
import { Request, Response } from "express";
// import prismaMock from "./__mocks__/prisma";

describe("Auth Controller Tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;
  let jsonMock: jest.Mock;

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
    it("should login a user", async () => {
      req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
      };

      (userService.loginUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        data: { username: "testuser", id: "test-user-id" },
        token: "test-token",
      });

      await authController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        status: "success",
        error: false,
        statusCode: 200,
        data: { username: "testuser", id: "test-user-id" },
        token: "test-token",
      });
    });
  });

  describe("signup", () => {
    it("should signup a user", async () => {
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

      (userService.createUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 201,
        data: { id: "test-user-id" },
      });

      //   (sendOTPToUser as jest.Mock).mockResolvedValue("123456");
      (emailService.sendEmailWithTemplate as jest.Mock).mockResolvedValue(true);

      await authController.signup(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({
        status: "success",
        error: false,
        statusCode: 201,
        data: { id: "test-user-id" },
      });
    }, 10000);
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

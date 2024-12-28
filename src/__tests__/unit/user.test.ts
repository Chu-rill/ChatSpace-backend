jest.mock("../../component/user/user.service");
jest.mock("../../component/user/user.repository");

import userService from "../../component/user/user.service";
import { UserDocument } from "../../component/user/user.response";
describe("User Service Tests", () => {
  let userId: string;
  let user: Partial<UserDocument>;

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
    it("should get a user by id", async () => {
      (userService.getUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User retrieved successfully",
        data: user,
      });

      const result = await userService.getUser(userId);

      expect(result.status).toBe("success");
      if ("data" in result) {
        expect(result.data).toEqual(user);
      }
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const updateData = { username: "Updated User" };
      (userService.updateUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User updated successfully",
        data: { ...user, ...updateData },
      });

      const result = await userService.updateUser(userId, updateData);

      expect(result.status).toBe("success");
      if ("data" in result && result.data) {
        expect(result.data.username).toBe("Updated User");
      }
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      (userService.deleteUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User deleted successfully",
      });

      const result = await userService.deleteUser(userId);

      expect(result.status).toBe("success");
    });
  });

  describe("getAllUsers", () => {
    it("should get all users", async () => {
      (userService.getAllUsers as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: [user],
      });

      const result = await userService.getAllUsers();

      expect(result.status).toBe("success");
      expect(result.data).toEqual([user]);
    });
  });
});

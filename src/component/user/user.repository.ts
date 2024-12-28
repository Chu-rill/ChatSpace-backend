import User from "../../model/User";
import { UserDocument } from "./user.response";

class UserRepository {
  // Find all users
  async findAll(): Promise<UserDocument[]> {
    return await User.find();
  }

  // Find user by ID
  async findById(id: string): Promise<UserDocument | null> {
    return await User.findById(id);
  }

  // Create a new user
  async createUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<UserDocument> {
    const user = await User.create({
      username,
      password,
    });
    return user as UserDocument;
  }

  // Update a user by ID
  async update(
    id: string,
    updatedUser: Partial<UserDocument>
  ): Promise<UserDocument | null> {
    return await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a user by ID
  async delete(id: string): Promise<UserDocument | null> {
    return await User.findByIdAndDelete(id);
  }

  // Find user by username
  async getUserByUsername(username: string): Promise<UserDocument | null> {
    return await User.findOne({ username });
  }
}

export default new UserRepository();

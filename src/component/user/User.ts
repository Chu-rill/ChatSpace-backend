import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// Export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;

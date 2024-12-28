import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  password: string;
  profilePicture: string;
  Bio: string;
  isActive: boolean;
  lastActive: Date;
  createdAt: Date;
}

// Create the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "", // URL to the profile picture
  },
  Bio: {
    type: String,
    // required: true,
    default: "Hey there! I am using ChatSpace.",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a text index on the username field
UserSchema.index({ username: "text" });

// Export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;

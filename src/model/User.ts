import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  isActive: boolean;
  lastActive: Date;
  friends: mongoose.Types.ObjectId[];
  blockedUsers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
    bio: {
      type: String,
      default: "Hey there! I am using ChatSpace.",
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
UserSchema.index({ username: "text" });
UserSchema.index({ email: 1 });
UserSchema.index({ friends: 1 });

// Export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;

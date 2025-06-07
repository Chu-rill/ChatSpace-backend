import mongoose, { Document, Schema } from "mongoose";

interface IFriendRequest extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FriendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one friend request per sender-receiver pair
FriendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const FriendRequest = mongoose.model<IFriendRequest>(
  "FriendRequest",
  FriendRequestSchema
);
export default FriendRequest;

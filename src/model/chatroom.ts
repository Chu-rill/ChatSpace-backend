import mongoose, { Document, Schema } from "mongoose";

interface IChatRoom extends Document {
  name: string;
  description?: string;
  isGroupChat: boolean;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  avatar?: string;
  lastMessage?: mongoose.Types.ObjectId;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
ChatRoomSchema.index({ members: 1 });
ChatRoomSchema.index({ createdBy: 1 });
ChatRoomSchema.index({ lastActivity: -1 });

const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", ChatRoomSchema);
export default ChatRoom;

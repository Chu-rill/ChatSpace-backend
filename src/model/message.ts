import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "file" | "voice";
  attachments: string[];
  readBy: Array<{
    user: mongoose.Types.ObjectId;
    readAt: Date;
  }>;
  editedAt?: Date;
  replyTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "voice"],
      default: "text",
    },
    attachments: [
      {
        type: String, // URLs to attachments
      },
    ],
    readBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    editedAt: {
      type: Date,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;

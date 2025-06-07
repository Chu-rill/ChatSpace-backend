import mongoose, { Document, Schema } from "mongoose";

interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  lastActivity: Date;
  chatRoom?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique conversations between participants
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastActivity: -1 });

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);
export default Conversation;

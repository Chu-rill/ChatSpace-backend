import mongoose from "mongoose";
import User from "../model/User";

export const FriendshipHelpers = {
  // Check if two users are friends
  async areFriends(
    userId1: mongoose.Types.ObjectId,
    userId2: mongoose.Types.ObjectId
  ): Promise<boolean> {
    const user = await User.findById(userId1).select("friends");
    return user?.friends.includes(userId2) || false;
  },

  // Check if user can message another user
  async canMessage(
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId
  ): Promise<boolean> {
    // Users can't message themselves
    if (senderId.toString() === receiverId.toString()) return false;

    // Check if they are friends
    const areFriends = await this.areFriends(senderId, receiverId);
    if (!areFriends) return false;

    // Check if either user has blocked the other
    const [sender, receiver] = await Promise.all([
      User.findById(senderId).select("blockedUsers"),
      User.findById(receiverId).select("blockedUsers"),
    ]);

    const senderBlocked = receiver?.blockedUsers.includes(senderId) || false;
    const receiverBlocked = sender?.blockedUsers.includes(receiverId) || false;

    return !senderBlocked && !receiverBlocked;
  },

  // Add friend relationship (mutual)
  async addFriend(
    userId1: mongoose.Types.ObjectId,
    userId2: mongoose.Types.ObjectId
  ): Promise<void> {
    await Promise.all([
      User.findByIdAndUpdate(userId1, { $addToSet: { friends: userId2 } }),
      User.findByIdAndUpdate(userId2, { $addToSet: { friends: userId1 } }),
    ]);
  },

  // Remove friend relationship (mutual)
  async removeFriend(
    userId1: mongoose.Types.ObjectId,
    userId2: mongoose.Types.ObjectId
  ): Promise<void> {
    await Promise.all([
      User.findByIdAndUpdate(userId1, { $pull: { friends: userId2 } }),
      User.findByIdAndUpdate(userId2, { $pull: { friends: userId1 } }),
    ]);
  },
};

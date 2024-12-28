import Message from "../../model/message";
import Conversation from "../../model/conversation";

class MessageRepository {
  public async sendMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<any> {
    try {
      // Check if conversation exists between sender and receiver
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      // Create a new conversation if none exists
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      // Create a new message
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      // Add the message to the array
      conversation.messages.push(newMessage._id);

      await Promise.all([conversation.save(), newMessage.save()]);

      return newMessage;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return { message: "Internal Server Error" };
    }
  }

  public async getMessages(
    senderId: string,
    userToChatId: string
  ): Promise<any> {
    try {
      // Fetch conversation from the database
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      });

      return conversation;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return { message: "Internal Server Error" };
    }
  }
}

export default new MessageRepository();

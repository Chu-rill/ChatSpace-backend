import Conversation from "../../model/conversation";
import Message from "../../model/message";

class ConversationRepository {
  async getConversation(senderId: string, userToChatId: string): Promise<any> {
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
  async createConversation(
    senderId: string,
    userToChatId: string
  ): Promise<any> {
    try {
      let conversation = await Conversation.create({
        participants: [senderId, userToChatId],
      });

      return conversation;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return { message: "Internal Server Error" };
    }
  }
  async addMessageToConversation(
    conversationId: string,
    messageId: any
  ): Promise<any> {
    try {
      // Find the conversation by ID
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }

      // Add the message to the array
      conversation.messages.push(messageId);

      // Save the conversation and the message
      await Promise.all([
        conversation.save(),
        Message.findByIdAndUpdate(messageId, { conversation: conversationId }),
      ]);

      return conversation;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return { message: "Internal Server Error" };
    }
  }
}

export default new ConversationRepository();

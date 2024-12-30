import {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} from "../../error/error";
import httpStatus from "http-status";
import messageRepository from "./message.repository";
import {
  CreateMessageResponse,
  //   DeleteMessageResponse,
  GetMessageResponse,
  Message,
  //   MessageDocument,
} from "./message.response";
import { getReceiverSocketId, io } from "../../utils/socket";

class MessageService {
  async sendMessage(
    message: string,
    receiverId: string,
    senderId: string
  ): Promise<CreateMessageResponse | typeof defaultError> {
    try {
      const newMessage = await messageRepository.sendMessage(
        message,
        receiverId,
        senderId
      );

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        // Send event to a specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        data: newMessage,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async getMessages(
    senderId: string,
    userToChatId: string
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data: Message[];
      }
    | typeof defaultError
  > {
    try {
      const messages = await messageRepository.getMessages(
        senderId,
        userToChatId
      );
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Messages fetched successfully",
        data: messages,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }
}

export default new MessageService();

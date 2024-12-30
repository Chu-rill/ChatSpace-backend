import mongoose from "mongoose";
export type Message = {
  message: string;
  sender: string;
  receiver: string;
  createdAt: Date;
  _id: mongoose.Types.ObjectId | String;
};
export type CreateMessageResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  data: {
    message: string;
    sender: string;
    receiver: string;
    createdAt: Date;
    _id: mongoose.Types.ObjectId | String;
  };
};
export type DeleteMessageResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};
export type GetMessageResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: Message[];
};

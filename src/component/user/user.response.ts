import mongoose from "mongoose";

// Define various response types
export type LoginResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  user: { username: string; id: string };
  token?: string;
};
export type User = {
  username: string;
  email: string;
};
export type CreateUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  user: { username: string; email: string };
};

export type DeleteUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};

export type GetUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: User | null;
};
// substitute for extend
export type UserDocument = mongoose.Document & {
  username: string;
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId | String;
};
export type UserServiceResponse = {
  status: string;
  statusCode: number; // Make statusCode optional
  message?: string;
  data?: any;
  error?: boolean;
};

// export interface UserDocument extends Document {
//   username: string;
//   email: string;
//   password: string;
//   _id: mongoose.Types.ObjectId;
// }

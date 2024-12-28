import { UserDocument } from "../model/User"; // Adjust the path to your UserDocument type

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument; // Add the user property with the UserDocument type
    }
  }
}

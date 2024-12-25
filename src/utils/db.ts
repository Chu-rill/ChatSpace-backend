import mongoose from "mongoose";

const URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/template";

export function connectDB(): void {
  mongoose
    .connect(URI, {
      // serverSelectionTimeoutMS: 3000000, // Uncomment if you need it
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Connection failed", error);
    });
}

export default connectDB;

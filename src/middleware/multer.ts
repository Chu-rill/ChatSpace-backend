import multer, { StorageEngine } from "multer";
import { Request } from "express";

// Define the storage configuration
const storage: StorageEngine = multer.diskStorage({
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname); // Use the original file name
  },
});

// Initialize the `multer` upload middleware
const upload = multer({ storage });

export default upload;

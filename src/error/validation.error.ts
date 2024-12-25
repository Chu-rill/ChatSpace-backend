import { Response } from "express";

/**
 * Sends an error response with a specified message and status code.
 *
 * @param res - Express response object
 * @param message - Error message to send
 * @param code - HTTP status code (default is 400)
 * @returns The Express response with the error message and status code
 */
const sendErrorResponse = (
  res: Response,
  message: string,
  code: number = 400
): Response => {
  return res.status(code).json({
    status: "error",
    error: true,
    message,
  });
};

export default sendErrorResponse;

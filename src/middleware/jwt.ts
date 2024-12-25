import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const User = require("../component/user/User");

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the Bearer token in the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the database based on the decoded token (without password)
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };

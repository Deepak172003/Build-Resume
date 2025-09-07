import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if token exists and starts with Bearer
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, invalid token",
      error: error.message
    });
  }
};

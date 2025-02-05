import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Ensure token is coming from cookies
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // Set user details in request object
    next();
  } catch (error) {
    console.log("Error Occurring in Authentication: ", error);
    return res.status(401).json({ error: "User not authenticated" });
  }
};

// Authorization Middleware
export const isAdmin = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ error: "User not authenticated or role not defined" });
      }
  
      // Fix: Allow Admins if they are permitted
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: `User with role ${req.user.role} is not allowed` });
      }
  
      next();
    };
  };
  
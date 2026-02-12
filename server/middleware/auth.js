import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("Token received:", token ? "Yes" : "No");

    if (!token) {
      return res.status(401).json({ success: false, message: "not authorised" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // 👈 CHECK THIS: does it have .id or ._id?

    // Use decoded.id or decoded._id based on what the log shows
  // Change this line in your protect middleware:
const userId = typeof decoded === "string" ? decoded : (decoded.id || decoded._id);

const user = await User.findById(userId).select("-password");

    if (!user) {
      console.log("User not found in DB for ID:", userId);
      return res.status(401).json({ success: false, message: "user not found" });
    }

    req.user = user;
    console.log("Auth Successful, calling next()...");
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ success: false, message: "invalid token" });
  }
};

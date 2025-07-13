import jwt from "jsonwebtoken";
import User from "../lib/model/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Validate header presence and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No authentication token, access denied" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default isAuthenticated;

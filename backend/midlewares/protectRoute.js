import jwt from "jsonwebtoken";
import Profile from "../models/profile.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const profile = await Profile.findById(decoded.userId).select("-password");
    console.log(profile);
    
    if (!profile) {
      return res.status(401).json({ message: "Unauthorized - Profile not found" });
    }

    req.profile = profile;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

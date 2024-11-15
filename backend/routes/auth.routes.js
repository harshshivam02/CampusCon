import express from "express";
import { signup, login, logout, verifyOTP } from "../controllers/auth.controller.js";
import { protectRoute } from "../midlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-otp", verifyOTP);
router.get("/verify", protectRoute, (req, res) => {
  res.status(200).json({ profile: req.profile });
});

export default router;
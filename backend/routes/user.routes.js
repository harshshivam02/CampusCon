import express from "express";
import { getUserProfile, mentorList, } from "../controllers/user.controller.js";
import {protectRoute} from "../midlewares/protectRoute.js";
import { mySelf } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getUserProfile/:id", protectRoute, getUserProfile);
router.get("/mentorList",protectRoute, mentorList);
router.get("/myself",protectRoute, mySelf);

export default router;
import express from "express";
import { acceptMeet, createMeet, mentorMeetList, studentMeetList } from "../controllers/meet.Controller.js";
import { protectRoute } from "../midlewares/protectRoute.js";

const router = express.Router();

router.post("/acceptMeet/:id", protectRoute, acceptMeet);
router.post("/createMeet/:id", protectRoute, createMeet);
router.get("/mentorMeetList", protectRoute, mentorMeetList);
router.get("/studentMeetList", protectRoute, studentMeetList);

export default router;
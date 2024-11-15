import express from "express";
import { createPost, getPosts, getPostById, deletePost, savePost, getSavedPosts , likeUnlikePost} from "../controllers/post.controller.js";
import {protectRoute} from "../midlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/allPosts", getPosts);
router.get("/getPostById/:id", getPostById);
router.delete("/deletePost/:id", protectRoute, deletePost);
router.post("/savePost/:id", protectRoute, savePost);
router.get("/getSavedPosts", protectRoute, getSavedPosts);
router.post("/likeUnlikePost/:id", protectRoute, likeUnlikePost);

export default router;
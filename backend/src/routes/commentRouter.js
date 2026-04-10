import express from "express";
import {
  addComment,
  getCommentsByPostId,
} from "../controllers/CommentController.js";
import { authenticateToken } from "../utilities/utilities.js";

const commentRouter = express.Router();

// POST /api/comments - create a new comment
commentRouter.post("/add-comment/:id", addComment);
commentRouter.get("/by-post/:id", getCommentsByPostId);

export default commentRouter;

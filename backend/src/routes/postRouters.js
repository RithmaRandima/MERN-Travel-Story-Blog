import express from "express";
import {
  addStory,
  EditStory,
  getAllStory,
} from "../controllers/postController.js";
import { authenticateToken } from "../utilities/utilities.js";
import upload from "../utilities/multerConfig.js";

const postRoute = express.Router();

// Add Story
postRoute.post(
  "/add-story",
  authenticateToken,
  upload.single("image"),
  addStory,
);

// get App Story
postRoute.get("/get-all-stories", authenticateToken, getAllStory);

// Update Story
postRoute.post(
  "/edit-story/:id",
  authenticateToken,
  upload.single("image"),
  EditStory,
);

export default postRoute;

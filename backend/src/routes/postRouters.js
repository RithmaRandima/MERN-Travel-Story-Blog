import express from "express";
import {
  addStory,
  getAllStory,
  uploadImage,
} from "../controllers/postController.js";
import { authenticateToken } from "../utilities/utilities.js";

const postRoute = express.Router();

postRoute.post("/add-story", authenticateToken, addStory);
postRoute.get("/get-all-stories", authenticateToken, getAllStory);
postRoute.post("/image-upload", authenticateToken, uploadImage);

export default postRoute;

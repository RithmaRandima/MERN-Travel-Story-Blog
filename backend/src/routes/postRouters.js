import express from "express";
import {
  addStory,
  deleteStroy,
  EditStory,
  getAllStoriesByUser,
  getAllStory,
  getStoriesByAuthorId,
  getStoryById,
  updateFavouriteStatus,
} from "../controllers/postController.js";
import { authenticateToken } from "../utilities/utilities.js";
import upload from "../utilities/multerConfig.js";

const postRoute = express.Router();

// Add Story
postRoute.post(
  "/add-story",
  authenticateToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addStory,
);
// get all Stories
postRoute.get("/get-all-stories", getAllStory);

// get Story by id
postRoute.get("/get-story/:id", getStoryById);

// get Story by User
postRoute.get("/get-user-stories", authenticateToken, getAllStoriesByUser);

postRoute.get("/get-stories-by-author/:id", getStoriesByAuthorId);

// Update Story
postRoute.post(
  "/edit-story/:id",
  authenticateToken,
  upload.single("image"),
  EditStory,
);

// Delete Story
postRoute.delete(
  "/delete-story/:id",
  authenticateToken,
  upload.single("image"),
  deleteStroy,
);

// update favourite
postRoute.put(
  "/update-favourite/:id",
  authenticateToken,
  updateFavouriteStatus,
);

export default postRoute;

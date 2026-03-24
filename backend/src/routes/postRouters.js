import express from "express";
import { addStory } from "../controllers/postController.js";
import { authenticateToken } from "../utilities/utilities.js";

const postRoute = express.Router();

postRoute.post("/add-story", authenticateToken, addStory);
// postRoute.post("/login", loginUser);

export default postRoute;

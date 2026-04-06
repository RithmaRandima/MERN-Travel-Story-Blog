import express from "express";
import {
  createAccount,
  getUser,
  loginUser,
} from "../controllers/userControllers.js";
import { authenticateToken } from "../utilities/utilities.js";
import upload from "../utilities/multerConfig.js";

const userRoute = express.Router();

userRoute.post(
  "/create-account",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  createAccount,
);
userRoute.post("/login", loginUser);
userRoute.get("/get-user", authenticateToken, getUser);
export default userRoute;

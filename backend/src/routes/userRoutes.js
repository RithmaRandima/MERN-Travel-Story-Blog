import express from "express";
import {
  createAccount,
  getAllUsers,
  getUser,
  getUserById,
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
    { name: "userImage1", maxCount: 1 },
    { name: "userImage2", maxCount: 1 },
  ]),
  createAccount,
);
userRoute.post("/login", loginUser);
userRoute.get("/get-user", authenticateToken, getUser);
userRoute.get("/get-all-users", getAllUsers);
userRoute.get("/get-users-by-id/:id", getUserById);
export default userRoute;

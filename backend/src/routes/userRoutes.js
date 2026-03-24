import express from "express";
import {
  createAccount,
  getUser,
  loginUser,
} from "../controllers/userControllers.js";
import { authenticateToken } from "../utilities/utilities.js";

const userRoute = express.Router();

userRoute.post("/create-account", createAccount);
userRoute.post("/login", loginUser);
userRoute.get("/get-user", authenticateToken, getUser);
export default userRoute;

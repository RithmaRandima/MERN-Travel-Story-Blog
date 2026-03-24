import express from "express";
import { createAccount, loginUser } from "../controllers/userControllers.js";

const userRoute = express.Router();

userRoute.post("/create-account", createAccount);
userRoute.post("/login", loginUser);

export default userRoute;

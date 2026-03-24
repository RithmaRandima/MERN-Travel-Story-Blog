import express from "express";
import { createAccount } from "../controllers/userControllers.js";

const userRoute = express.Router();

userRoute.post("/create-account", createAccount);

export default userRoute;

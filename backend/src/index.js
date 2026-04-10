import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRouters.js";
import commentRouter from "./routes/commentRouter.js";
import path from "node:path";
import { fileURLToPath } from "url";

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/story", postRoute);
app.use("/api/comment", commentRouter);
app.use("/images", express.static("uploads"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on port: ", PORT);
  });
});

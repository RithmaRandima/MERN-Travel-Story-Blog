import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRouters.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on port: ", PORT);
  });
});

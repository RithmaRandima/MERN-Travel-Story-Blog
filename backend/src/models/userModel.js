import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePic: {
      type: String, // store image path or URL
      default: "",
    },
    coverPic: {
      type: String, // store image path or URL
      default: "",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;

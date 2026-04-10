import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: { type: String, default: "" },
    myStory: { type: String, default: "" },
    myPerspective: { type: String, default: "" },
    profilePic: {
      type: String, // store image path or URL
      default: "",
    },
    coverPic: {
      type: String, // store image path or URL
      default: "",
    },
    userImages: { type: [String], default: [] }, // image1 - image4
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;

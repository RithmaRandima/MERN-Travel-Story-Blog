import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String }, // difficulty or category
    story: { type: String, required: true },
    tips: { type: String }, // Tips For Visiting
    distance: { type: String }, // could be number, but keeping string to match frontend
    elevationGain: { type: String },
    estimatedTime: { type: String },
    difficultyStatus: { type: String },
    thingsToDo: { type: String },
    visitedDate: { type: Date, required: true }, // was VisitedDate
    isFavourite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mainImage: { type: String }, // main image URL
    galleryImages: { type: [String], default: [] }, // image1 - image4
  },
  { timestamps: true },
);

const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default postModel;

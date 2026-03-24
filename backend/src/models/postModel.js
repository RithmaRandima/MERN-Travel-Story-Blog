import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    story: { type: String, required: true },
    visitedLocation: { type: [String], default: [] },
    isFavourite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    image: { type: String, required: true },
    VisitedDate: { type: Date, required: true }, // fixed from Data → Date
  },
  { timestamps: true },
);

const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default postModel;

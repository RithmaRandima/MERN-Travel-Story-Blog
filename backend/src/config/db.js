import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO SERVER CONNECTED");
  } catch (error) {
    console.log("MONGO SERVER NOT CONNECTED");
    process.exit(1);
  }
};

export default connectDB;

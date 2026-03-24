import fs from "fs";
import path from "path";
import postModel from "../models/postModel.js";

// Add Story
export const addStory = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { title, story, visitedLocation, VisitedDate } = req.body;
  const { userId } = req.user;

  if (
    !title?.trim() ||
    !story?.trim() ||
    !visitedLocation?.trim() ||
    !visitedLocation?.trim()
  ) {
    return res
      .status(400)
      .json({ error: true, message: "All Fields are required!" });
  }

  const parasedVisitedDate = new Date(parseInt(VisitedDate));

  try {
    const travelStory = new postModel({
      title,
      story,
      visitedLocation,
      userId,
      image: image_filename,
      VisitedDate: parasedVisitedDate,
    });

    await travelStory.save();
    return res
      .status(201)
      .json({ story: travelStory, message: "Added Successfully!" });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error on Server",
    });
    console.log("Error in addStory function!", error);
    process.exit(1);
  }
};

// Get All Stories
export const getAllStory = async (req, res) => {
  const { userId } = req.user;

  try {
    const travelStories = await postModel
      .find({ userId: userId })
      .sort({ isFavourite: -1 });
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server Error" });
    console.log("Error on getAllStory Function", error);
    process.exit(1);
  }
};

// edit travel Strory
export const EditStory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, story, visitedLocation, VisitedDate } = req.body;

  if (
    !title?.trim() ||
    !story?.trim() ||
    !visitedLocation?.trim() ||
    !visitedLocation?.trim()
  ) {
    return res
      .status(400)
      .json({ error: true, message: "All Fields are required!" });
  }

  const parsedVisitedDate = new Date(parseInt(VisitedDate));

  try {
    const travelStory = await postModel.findOne({ _id: id, userId: userId });

    if (!travelStory) {
      return res
        .status(404)
        .json({ error: true, message: "Travel story not found!" });
    }

    // Handle image update if a new file is uploaded
    if (req.file) {
      // Delete old image
      fs.unlink(path.join("uploads", travelStory.image), (err) => {
        if (err) console.log("Error deleting old image:", err);
      });
    }

    // Update other fields
    // Set new image filename
    travelStory.image = req.file.filename;
    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.VisitedData = parsedVisitedDate;

    // Save changes
    await travelStory.save();

    res.status(200).json({
      success: true,
      message: "Travel story updated!",
      story: travelStory,
    });
  } catch (error) {
    console.log("Error in EditStory function:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

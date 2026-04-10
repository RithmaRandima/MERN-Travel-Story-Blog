import fs from "fs";
import path from "path";
import postModel from "../models/postModel.js";

// Add Story
export const addStory = async (req, res) => {
  try {
    const {
      title,
      country,
      category,
      story,
      tips,
      distance,
      elevationGain,
      estimatedTime,
      difficultyStatus,
      thingsToDo,
      visitedDate,
    } = req.body;

    const { userId } = req.user;

    // Validate required fields
    if (!title?.trim() || !story?.trim() || !visitedDate) {
      return res.status(400).json({
        success: false,
        message: "Title, Story and Visited Date are required!",
      });
    }

    // Parse visitedDate (if coming as timestamp)

    // Validate visitedDate
    const parsedVisitedDate = new Date(visitedDate); // use string directly
    if (isNaN(parsedVisitedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid visitedDate",
      });
    }

    // Handle main image
    let mainImage = req.files?.mainImage?.[0]?.filename || null;

    // Handle gallery images
    const galleryImages = [];
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      if (req.files?.[key]?.[0]?.filename) {
        galleryImages.push(req.files[key][0].filename);
      }
    });

    const travelStory = new postModel({
      title,
      country,
      story,
      category,
      tips,
      distance,
      elevationGain,
      estimatedTime,
      difficultyStatus,
      thingsToDo,
      visitedDate: parsedVisitedDate,
      userId,
      mainImage,
      galleryImages,
    });

    await travelStory.save();

    return res.status(201).json({
      success: true,
      story: travelStory,
      message: "Added Successfully!",
    });
  } catch (error) {
    console.error("Error in addStory function!", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Stories
export const getAllStory = async (req, res) => {
  try {
    const travelStories = await postModel.find().populate("userId");

    res.status(200).json({ success: true, stories: travelStories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log("Error on getAllStory Function", error);
  }
};

// Get All Stories by User
export const getAllStoriesByUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const travelStories = await postModel
      .find({ userId: userId })
      .sort({ isFavourite: -1 });
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server Error" });
    console.log("Error on getAllStoryByUser Function", error);
    process.exit(1);
  }
};

// get Storyby ID
export const getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await postModel.findById(id).populate("userId");

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log("Error in getStoryById:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get Stories by UserId
export const getStoriesByAuthorId = async (req, res) => {
  const { id } = req.params;

  try {
    // find ALL posts by userId
    const stories = await postModel
      .find({ userId: id })
      .populate("userId")
      .sort({ createdAt: -1 }); // optional: latest first

    if (!stories || stories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No stories found for this user",
      });
    }

    res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    console.log("Error in getStoriesByUserId:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Edit Travel Strory
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

    let image_filename = travelStory.image; // keep old image

    if (req.file) {
      image_filename = req.file.filename; // replace if new uploaded
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
    travelStory.image = image_filename;
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

// Delete Travel Story
export const deleteStroy = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const travelStory = await postModel.findOne({ _id: id, userId: userId });

    if (!travelStory) {
      return res
        .status(404)
        .json({ error: true, message: "Travel story not found!" });
    }

    // Delete image file
    fs.unlink(path.join("uploads", travelStory.image), (err) => {
      if (err) console.log("Error deleting image:", err);
    });

    // Delete story from DB
    await postModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Travel story deleted!" });
  } catch (error) {
    console.log("Error in DeleteStory function:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// change Favourite Status
export const updateFavouriteStatus = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const { userId } = req.user;

  // 🔥 Add these logs here
  console.log("Story ID:", id);
  console.log("User ID from token:", userId);

  try {
    const travelStory = await postModel.findOne({ _id: id, userId: userId });
    if (!travelStory) {
      return res
        .status(404)
        .json({ error: true, message: "Travel story not found!" });
    }
    console.log(travelStory);
    console.log("------------------");

    travelStory.isFavourite = isFavourite;

    await travelStory.save();

    res.status(200).json({
      success: true,
      message: "Update Successful",
      story: travelStory,
    });
    console.log(travelStory);
  } catch (error) {
    console.log("Error in updateFavouriteStatus function:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

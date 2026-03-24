import postModel from "../models/postModel.js";

// Add Story
export const addStory = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, VisitedData } = req.body;
  const { userId } = req.user;

  if (
    !title.trim() ||
    !story.trim() ||
    !visitedLocation.trim() ||
    !imageUrl.trim() ||
    !visitedLocation.trim()
  ) {
    return res
      .status(400)
      .json({ error: true, message: "All Fields are required!" });
  }

  const parasedVisitedDate = new Date(parseInt(VisitedData));

  try {
    const travelStory = new postModel({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      VisitedData: parasedVisitedDate,
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

// route to handel image upload
export const uploadImage = async () => {};

import postModel from "../models/postModel.js";

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
    console.log("Error in createAccount function!", error);
    process.exit(1);
  }
};

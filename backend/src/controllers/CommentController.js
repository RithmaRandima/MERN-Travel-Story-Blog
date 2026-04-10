import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req, res) => {
  const { id } = req.params;
  try {
    const { content, rating, userId } = req.body;

    // 1. Validate input
    if (!content || !rating || !userId) {
      return res.status(400).json({
        success: false,
        message: "Content, Rating and User ID are required",
      });
    }

    //  Check if post exists
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create comment
    const newComment = await Comment.create({
      content,
      rating,
      userId,
      postId: id,
    });

    // 5. Return response
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCommentsByPostId = async (req, res) => {
  const { id: postId } = req.params; // post ID from URL

  try {
    // 1. Check if postId is provided
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    // 2. Fetch comments and populate user info
    const comments = await Comment.find({ postId })
      .populate("userId", "firstName lastName profilePic email") // populate only necessary fields
      .sort({ createdAt: -1 }); // newest comments first

    // 3. Return response
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

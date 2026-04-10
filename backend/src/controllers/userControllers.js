import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create Account
export const createAccount = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    aboutMe,
    myStory,
    myPerspective,
  } = req.body;

  try {
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existsUser = await userModel.findOne({ email: cleanEmail });

    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // email check
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid Email!" });
    }

    // password check
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and symbol",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Get uploaded files safely
    let profilePic = req.files?.profilePic?.[0]?.path || "";
    let coverPic = req.files?.coverPic?.[0]?.path || "";

    // Function to format image paths
    const formatPath = (filePath) => {
      if (!filePath) return "";
      let formatted = filePath.replace(/\\/g, "/");
      formatted = formatted.replace(/^uploads\//, "");
      return formatted;
    };

    // Format profile & cover pics
    profilePic = formatPath(profilePic);
    coverPic = formatPath(coverPic);

    // Handle gallery images
    let userImages = [];
    ["userImage1", "userImage2"].forEach((key) => {
      if (req.files?.[key]?.[0]?.path) {
        userImages.push(req.files[key][0].path);
      }
    });

    // Format gallery images
    userImages = userImages.map((img) => formatPath(img));

    const user = new userModel({
      firstName,
      lastName,
      email: cleanEmail,
      password: hashedPassword,
      profilePic,
      coverPic,
      aboutMe,
      myStory,
      myPerspective,
      userImages,
    });

    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5h",
      },
    );

    res.status(201).json({
      success: true,
      user,
      accessToken,
      message: "Registration Successful!",
    });
  } catch (error) {
    console.log("Error in createAccount function!", error);
    res.status(500).json({
      success: false,
      message: "Error on Server",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required!" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5h" },
    );

    return res.status(200).json({
      error: false,
      message: "Login Successfull!",
      user: user,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error on Server",
    });
    console.log("Error in createAccount function!", error);
    process.exit(1);
  }
};

// get User
export const getUser = async (req, res) => {
  const { userId } = req.user;

  const isUser = await userModel.findOne({ _id: userId });
  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: isUser,
    message: "",
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      error: false,
      users: users,
      message: "Users Successfully Fetched",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error on Server",
    });
    console.log("Error in getAllUsers function!", error);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Cant find",
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: "User Successfully Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: error,
      message: "Error on Server",
    });
    console.log("Error in getUserById function!", error);
  }
};

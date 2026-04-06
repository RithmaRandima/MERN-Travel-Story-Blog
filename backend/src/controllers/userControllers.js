import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create Account
export const createAccount = async (req, res) => {
  const { firstName, lastName, email, password, bio } = req.body;
  try {
    if (
      !firstName?.trim() ||
      !lastName.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists!" });
    }
    // email check
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: true, message: "Please enter valid Email!" });
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
        error: true,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and symbol",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Get uploaded files safely
    let profilePic = req.files?.profilePic?.[0]?.path || "";
    let coverPic = req.files?.coverPic?.[0]?.path || "";

    // Replace backslashes with forward slashes (Windows fix)
    profilePic = profilePic.replace(/\\/g, "/");
    coverPic = coverPic.replace(/\\/g, "/");

    // Remove the "uploads/" prefix if your static route is /images
    profilePic = profilePic.replace(/^uploads\//, "");
    coverPic = coverPic.replace(/^uploads\//, "");

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePic,
      coverPic,
      bio,
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
      error: false,
      user: user,
      accessToken,
      message: "Registration Successfull!",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error on Server",
    });
    console.log("Error in createAccount function!", error);
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

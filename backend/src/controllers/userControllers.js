import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create Account
export const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ error: true, message: "All Fields are required!" });
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

    const user = new userModel({
      fullName,
      email,
      password: hashedPassword,
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
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successfull!",
    });
  } catch (error) {
    console.log("Error in createAccount function!", error);
    return res.status(400).json({
      error: true,
      message: "Error on Server",
    });
    process.exit(1);
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ error: true, message: "All Fields are required!" });
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

    return res.status(400).json({
      error: false,
      message: "Login Successfull!",
      user: { fullName: user.fullName, email: user.email },
      accessToken,
    });
  } catch (error) {
    console.log("Error in createAccount function!", error);
    return res.status(400).json({
      error: true,
      message: "Error on Server",
    });
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

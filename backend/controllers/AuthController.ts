import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/User";
import { generateToken } from "../utils/generateToken";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req: Request, res: Response) => {
  const { name, email, password, answer } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Check the length of the password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      answer,
    });

    // generate token
    const token = generateToken(newUser._id);

    // Take out password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    // send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      ...userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(existingUser._id);

    // Take out password from response
    const { password: _, ...userWithoutPassword } = existingUser.toObject();

    // send response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      ...userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
};

// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
};

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id).select("-password");

    // check user existince
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // generate token
    const token = generateToken(user?._id);

    // Remove password
    const { password: _, ...result } = user.toObject();
    // send response
    res.status(200).json({
      success: true,
      message: "Your profile",
      result,
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = async (req: Request, res: Response) => {
  const { email, answer, newPassword } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ msg: "Please provide an email" });
    }

    // Check if answer is provided
    if (!answer) {
      return res.status(400).json({ msg: "Please provide an answer" });
    }

    // Check if newPassword is provided
    if (existingUser.answer !== answer) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if newPassword is empty
    if (!newPassword) {
      return res.status(400).json({ msg: "Please provide a new password" });
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    const user = await UserModel.findByIdAndUpdate(existingUser._id, {
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
};

export { register, login, logout, getProfile, forgotPassword };

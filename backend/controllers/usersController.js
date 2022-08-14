import User from "../models/User.js";
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  users
    ? res.status(200).json(users)
    : res.status(400).json({ message: "No users found" });
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { userName, password, roles } = req.body;

  //Data validation
  if (!userName || !password || !Array.isArray(roles) || !roles.length)
    return res.status(400).json({ message: "All fields are required" });

  // Check for duplicate
  const duplicate = await User.findOne({ userName }).lean().exec();
  if (duplicate) return res.status(400).json({ message: "Duplicate username" });

  //hash password
  const hashedPws = await bcrypt.hash(password, 10); //salt rounds

  //user object
  const user = await User.create({ userName, password: hashedPws, roles });
  user
    ? res.status(201).json({ message: `New user ${userName} created` })
    : res.status(400).json({ message: "Invalid user data received", err });
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

// @desc Delete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

export { getAllUsers, createNewUser, updateUser, deleteUser };

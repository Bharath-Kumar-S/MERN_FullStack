import User from "../models/User.js";
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  users.length > 0
    ? res.status(200).json(users)
    : res.status(200).json({ message: "No users found" });
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
const updateUser = asyncHandler(async (req, res) => {
  const { id, userName, roles, active, password } = req.body;

  //Confirm data
  if (
    !id ||
    !userName ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  )
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found" });

  //Check for duplicate
  const duplicate = await User.findOne({ userName }).lean().exec();
  //Allow updates to original user
  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate username" });

  user.userName = userName;
  user.roles = roles;
  user.active = active;

  password ? (user.password = await bcrypt.hash(password, 10)) : null;

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.userName} updated` });
});

// @desc Delete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "User ID required" });

  const note = await Note.findOne({ user: id }).lean().exec();

  if (note)
    return res.status(400).json({ message: "User has assigned notes" });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found" });

  const result = await user.deleteOne();

  const reply = `Username ${result.userName} with ID ${result._id} deleted`;

  res.json(reply).status(200);
});

export { getAllUsers, createNewUser, updateUser, deleteUser };

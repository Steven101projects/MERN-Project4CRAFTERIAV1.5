import User from "../models/userModel.js";

// get current logged in user
export async function getProfile(req, res) {
  const user = await User.findById(req.user.id).select("name email role createdAt");
  res.json(user);
}

// admin only get all users
export async function getUsers(req, res) {
  const users = await User.find().select("name email role createdAt");
  res.json(users);
}

// admin only delete user
export async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
}
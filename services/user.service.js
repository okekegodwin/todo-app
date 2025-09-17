const User = require("../models/user.model");

exports.getUserById = async (userId) => {
  return await User.findById(userId);
}

exports.updateUserProfile = async (userId, updates) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
}

exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
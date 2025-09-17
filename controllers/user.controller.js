const userService = require("../services/user.service");

exports.fetchProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      username: user.username,
      email: user.email
    })

  } catch (error) {
    res.status(500).json({
      message: "Error fetchinig user profile",
      err: error.message
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const updatedUser = await userService.updateUserProfile(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error updating user profile',
      err: error.message
    });
  }
}

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.params.userId
    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
    
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user profile',
      err: error.message
    });
  }
}
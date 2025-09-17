const bcrypt = require("bcryptjs");

exports.verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    
    const user = req.user;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error verifying password",
      err: error.message
    })
  }
}

exports.isLoggedIn = async(req, res, next) => {
  
}
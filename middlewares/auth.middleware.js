const bcrypt = require("bcryptjs");

exports.hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword  = await bcrypt.hash(password, 10);
    
    req.body.password = hashedPassword;

    next();

  } catch (error) {

    res.status(500).json({
      message: "Error occurred while hashing the password",
      err: error.message
    });
    
  }
}

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
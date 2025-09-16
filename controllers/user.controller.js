require("dotenv").config();

const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  res.status(201).json({ message: "User signed up successfully" });
}

exports.login = async (req, res) => {
  try {
    const user = req.user;

    const payload = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 1000 * 60 * 60});

    res.status(200).json({
      message: "Login successful",
      token: token
    })
  } catch (error) {
    res.status(500).json({ 
      message: "Login failed", 
      err: error.message 
    });
  }
}
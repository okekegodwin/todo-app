const User = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{username}, {email}]});

    if (existingUser) {
      res.status(409).json({message: "User already exists"});
    }

    const user = new User({ username, email, password })
    await user.save();

    req.user = user;

    next();
  } catch (error) {
    res.status(500);
    res.json({
      message: "Error occured while trying to sign-up this user",
      err: error.message
    })
  }
}

exports.findUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = user;
    
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error finding user",
      err: error.message
    })
  }
}
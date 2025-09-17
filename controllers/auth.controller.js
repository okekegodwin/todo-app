exports.signup = (req, res) => {
  res.status(201).json({ message: "User signed up successfully" });
}

exports.login = async (req, res) => {
  try {
    const user = req.user;

    req.session.user = {
      id: user._id,
      username: user.username
    }

    res.status(200).json({
      message: "Logged in successfully"
    })
  } catch (error) {
    res.status(500).json({ 
      message: "Login failed", 
      err: error.message 
    });
  }
}

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logged out successfully"})
  })
}
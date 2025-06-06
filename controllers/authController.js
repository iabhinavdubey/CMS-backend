const User = require("../models/User.js");
const jwt = require("jsonwebtoken");


// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password)
  try {
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);


    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token (using jsonwebtoken)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });


    res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          userRole: user.userRole,
          email: user.email,
        },
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

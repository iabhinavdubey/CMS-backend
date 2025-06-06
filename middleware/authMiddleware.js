const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
require("dotenv").config();


// Authenticate User
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect header: "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure token payload contains 'id'
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user)
      return res.status(401).json({ message: "User not found" });

    console.log(req.user)

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Role Based Authorization Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Use userType as defined in your User model
    if (!roles.includes(req.user.userType)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };

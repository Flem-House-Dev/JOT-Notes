const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1].trim();
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log('Received token:', token);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Error during authentication: ", error);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;

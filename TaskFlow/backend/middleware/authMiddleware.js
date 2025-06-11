const jwt = require("jsonwebtoken");
const User = require("../models/userM");

const protect = async (req, res, next) => {
  let token;
  //1- check if Authorization exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //2- get token from header
      token = req.headers.authorization.split(" ")[1];
      //3- verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //4- get user from token and attach to req.user (excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  //4- no token at all
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;

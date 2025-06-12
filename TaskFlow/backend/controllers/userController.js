const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userM");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //1- check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  //2- check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  //3- hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }
  
  //4- create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //5- create jwt token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //6- return success response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

// *********************************************************LOG*****************IN*****************USER*************
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //1- check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  //2- find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  //3- compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  //4- generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //5- return success response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

// *********************************************************DELETE**********************************USER*************

module.exports = { registerUser, loginUser };

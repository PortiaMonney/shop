const res = require("express/lib/response");
const User = require("../models/user.model");
const { loginSchema, registerSchema } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const { validate } = require("../models/user.model");
const jwt=require ("jsonwebtoken");

const register = async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.message);
  }
  
  let user = await User.findOne({ email: value.email });

  if (user) {
    return res.status(409).json({ msg: "email already in use" });
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  user = await User.create({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });
  res.status(200).json(user);
};

const login = async (req, res) => {
  //validate user input
  const { data, error } = loginSchema.validate(req.body);

  //check if user is in the database
  let user = await User.findOne({ email: req.body.email });

  //if user is not found
  if (!user) {
    return res.status(400).json({ msg: "invalid credentials" });
  }
  // compare candidate's password with thestored user's password
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  //if password do not match
  if (!isMatch) {
    return res.status(400).json({ msg: "invalid credentials" });
  }
  // generate token
  const token =jwt.sign({
    id: user._id,
    username: user.username,
    //secret key used to encode the payload
  },"secret",{
    // options
    expiresIn: "1hr",
  }); 
  res.status(200).json(token)
};

module.exports = {
  register,
  login,
};

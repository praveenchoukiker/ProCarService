const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  // Check id all fields are filled

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!");
  }

  // Check if user already exists
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    // res.status(401);
    throw new Error("User Already Exist");
  }

  // Hash Password

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Registerd User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(401);
    throw new Error("User not Created");
  }

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,
  });

  // res.json({
  //   mesg: "User Registered!!",
  // });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  // Check id all fields are filled

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invaild Credentials!");
  }
  // res.json({
  //   mesg: "User Login!!",
  // });
});

const privateController = expressAsyncHandler(async (req, res) => {
  res.send(" I am protected Route");
});

//  Genrate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, privateController };

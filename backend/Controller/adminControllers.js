const expressAsyncHandler = require("express-async-handler");
const Users = require("../model/userModel");
const Cars = require("../model/carServiceModel");
const Notes = require("../model/noteModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  // res.send("All Users");
  // console.log("object")
  const users = await Users.find().select("-password");

  if (!users) {
    res.status(404);
    throw new Error("User Not Found!!");
  }
  res.status(200).json(users);
});

const getAllComplaints = expressAsyncHandler(async (req, res) => {
  const cars = await Cars.find();

  if (!cars) {
    res.status(404);
    throw new Error("Cars Not Found");
  }
  res.status(200).json(cars);
});

const getAllNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Notes.find();

  if (!notes) {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json(notes);
});

module.exports = { getUsers, getAllComplaints, getAllNotes };

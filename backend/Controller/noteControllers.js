const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const Note = require("../model/noteModel");
const { text } = require("express");

const getNotes = expressAsyncHandler(async (req, res) => {
  // res.send("All notes")

  //  Check User Using JWT

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  // Find Notes

  const notes = await Note.find({ user: user._id });
  if (!notes) {
    res.status(404);
    throw new Error("Notes Not found");
  }

  res.status(200).json(notes);
});
const addNote = expressAsyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  // res.send("Get notes");

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }
  
  // Create Note

  const note = await Note.create({
    user: user._id,
    car: req.params.id,
    note: text,
  });

  if (!note) {
    res.status(400);
    throw new Error("Note Can't Be Added");
  }
  res.status(201).json(note);
});


module.exports = { getNotes, addNote };

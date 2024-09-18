const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Car = require("../model/carServiceModel");

const getComplaints = expressAsyncHandler(async (req, res) => {
  //  Check User Using JWT

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  //  Find Complaints

  const complaints = await Car.find({ user: user._id });
  if (!complaints) {
    res.status(404);
    throw new Error("Complaints Not Found");
  }

  res.status(200).json(complaints);

  // res.send("Complaints Seen everyone");
});

const getComplaint = expressAsyncHandler(async (req, res) => {
  //  Check User Using JWT

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  //  Find Complaints

  const complaint = await Car.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaints Not Found");
  }

  res.status(200).json(complaint);
});
// res.send("Complaint Seen");

const raisedComplaint = expressAsyncHandler(async (req, res) => {
  const { car, description, registration } = req.body;

  if (!car || !description || !registration) {
    res.status(401);
    throw new Error("Please Fill All Details");
  }
    // console.log(req.user._id.toString());

  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  const complaint = await Car.create({
    user: req.user._id,
    car: car.toLowerCase(),
    registration,
    description: description,
    status: "open",
    isAdmin: "car.isAdmin",
  });

  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not Raised");
  }

  res.status(201).json(complaint);
});

const closedComplaint = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  const updatedComplaint = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error("Complaint Not Raised");
  }
  // console.log(updatedComplaint);
  res.status(201).json(updatedComplaint);

  // res.send("Complaint Closed");
});

module.exports = {
  getComplaints,
  getComplaint,
  raisedComplaint,
  closedComplaint,
};

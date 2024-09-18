const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getComplaints,
  getComplaint,
  raisedComplaint,
  closedComplaint,
} = require("../Controller/carServiceControllers");

const router = express.Router();

router.get("/", protect, getComplaints);
router.post("/", protect, raisedComplaint);
router.get("/:id", protect, getComplaint);
router.put("/:id", protect, closedComplaint);


// Note Route


router.use("/:id/note", require("./noteRoutes"));


module.exports = router;

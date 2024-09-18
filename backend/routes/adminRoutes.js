const express = require("express");
const {
  getUsers,
  getAllNotes,
  getAllComplaints,
} = require("../Controller/adminControllers");
const adminProtect = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/users", adminProtect, getUsers);
router.get("/complaints", adminProtect, getAllComplaints);
router.get("/notes", adminProtect, getAllNotes);

module.exports = router;


const express = require("express");
const { getNotes, addNote  } = require("../Controller/noteControllers");

const protect = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

router.get("/", protect, getNotes);
router.post("/", protect, addNote);



module.exports = router;

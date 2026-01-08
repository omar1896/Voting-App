const express = require("express");
const router = express.Router();
const { addVote, getVotes } = require("../controllers/voteController");

router.post("/", addVote);
router.get("/", getVotes);

module.exports = router;

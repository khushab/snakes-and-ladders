const express = require("express");
const auth = require("../middlewares/auth");
const { saveUserScore, getLeaderboard } = require("../controller/scores");

const router = express.Router();

router.route("/getLeaderboard").get(getLeaderboard);

router.route("/saveUserScore").post(auth, saveUserScore);

module.exports = router;

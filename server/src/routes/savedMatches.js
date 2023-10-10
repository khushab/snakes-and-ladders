const express = require("express");
const auth = require("../middlewares/auth");
const {
  saveMatch,
  getSavedMatchesForUser,
  getSavedMatch,
  deleteSavedMatch,
} = require("../controller/savedMatches");
const router = express.Router();

router.route("/testMatch").get((req, res) => res.send("Test Match"));

router.route("/save").post(auth, saveMatch);

router.route("/getSavedMatches").get(auth, getSavedMatchesForUser);

router.route("/getSavedMatch/:id").get(auth, getSavedMatch);

router.route("/getSavedMatch/:id").delete(auth, deleteSavedMatch);

module.exports = router;

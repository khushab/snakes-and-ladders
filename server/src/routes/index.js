const express = require("express");
const usersRoutes = require("./users");
const matchesRoutes = require("./savedMatches");
const scoreRoutes = require("./scores");

const router = express.Router();

router.use("/users", usersRoutes);

router.use("/savedMatches", matchesRoutes);

router.use("/scores", scoreRoutes);

module.exports = router;

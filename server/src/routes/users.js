const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  register,
  login,
  logout,
  getCurrUserData,
} = require("../controller/users");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(auth, logout);

router.route("/getCurrUserData").get(auth, getCurrUserData);

module.exports = router;

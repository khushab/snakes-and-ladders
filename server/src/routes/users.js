const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const userController = require("../controller/users");

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

router.route("/logout").get(auth, userController.logout);

router.route("/getCurrUserData").get(auth, userController.getCurrUserData);

module.exports = router;

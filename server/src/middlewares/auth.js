const jwt = require("jsonwebtoken");
const User = require("../models/users");
const jwtSecret = process.env.JWT_SECRET || "thisisasecretkey";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, jwtSecret);

    const _id = decoded._id;
    const user = await User.findOne({ _id, token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;

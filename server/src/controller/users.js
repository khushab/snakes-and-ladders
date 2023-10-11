const User = require("../models/users");

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ success: true, user, token });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ success: false, message: "Username already exists" });
    }
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByCredentials(username, password);

    const token = await user.generateAuthToken();

    res.send({ success: true, user, token });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Invalid Credentials", error });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;
    user.token = null;

    await user.save();
    res.send({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const getCurrUserData = (req, res) => {
  res.send(req.user);
};

module.exports = {
  register,
  login,
  logout,
  getCurrUserData,
};

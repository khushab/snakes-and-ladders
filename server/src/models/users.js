const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "thisisasecretkey";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password should contain "password"');
        }
      },
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//removing not required data when sending the user back
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.token;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, jwtSecret);

  user.token = token;
  await user.save();

  return token;
};

//finding user by email and password
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error();
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error();
  }

  return user;
};

//hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;

const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = [
  // validate inputs
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),

  // check for duplicate email
  check("email").custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
  }),
  async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // create user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //secure the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
      // save the user
      const created_user = await user.save();
      // Respond excluding password
      const response = {
        id: created_user._id,
        username: created_user.username,
        email: created_user.email,
      };
      res.status(200).json(response);
    } catch (err) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  },
];

exports.logUser = async (req, res) => {
  try {
    let user;

    if (req.body.email === "johndoe@gmail.com") {
      // for demo user, skip password check
      user = await User.findOne({ email: "johndoe@gmail.com" });

      if (!user) {
        return res.status(404).json({ msg: "Demo user not found!" });
      }
    } else {
      // for regular user
      user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ msg: "Email is not registered!" });
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ msg: "Password is incorrect!" });
      }
    }

    const accessToken = jwt.sign(
      { username: user.username, email: user.email, id: user._id },
      process.env.key,
      { expiresIn: "10h" }
    );

    return res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    console.error("Error in logUser:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

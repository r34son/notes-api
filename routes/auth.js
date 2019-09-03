const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).json("Email already exist");
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const savedUser = await User.create({
      email: req.body.email,
      password: hash
    });
    res.send(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).json("Incorrect email");
  bcrypt.compare(req.body.password, user.password, (err, correct) => {
    if (err) res.status(401).json("Auth failed");
    if (!correct) res.status(400).json("Incorrect password");
    jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) res.status(401).json("Auth failed");
        res.header("auth", token).json({ token });
      }
    );
  });
});

module.exports = router;

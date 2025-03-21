const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();
router.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(500)
        .json({ message: "Error: Duplicate field value, user already exists" });
    }
    user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
      { username: user.username, role: user.role, userId: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password, captchaToken } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!captchaToken) {
    return res.status(400).json({ message: "reCAPTCHA verification failed" });
  }
  try {
    const API_KEY = process.env.API_KEY;
    const verifyUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/idkw-1742454213205/assessments?key=${API_KEY}`;

    const captchaResponse = await axios.post(verifyUrl, {
      event: {
        token: captchaToken,
        expectedAction: "login",
        siteKey: process.env.SITE_KEY,
      },
    });

    if (!captchaResponse.data.tokenProperties.valid) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

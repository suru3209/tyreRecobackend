import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // JWT Generate ✅
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT Generate ✅
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

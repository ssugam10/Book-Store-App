import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const router = express.Router();

// POST /signup - Signup Route
router.post("/", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password != confirmPassword) {
    return res
      .status(400)
      .json({ message: "Please enter the same password twice" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

export default router;

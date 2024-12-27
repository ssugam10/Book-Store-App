
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/:id", (req, res) => {
    const userId = req.params.id;
  
    // Fetch borrowed books for the user from the database
    Book.find({ borrowedBy: userId })
      .then((books) => {
        res.json({ books });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error fetching borrowed books" });
      });
  });
    
  export default router;
  
import { Book } from "../models/bookModel.js";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers.token;
    //console.log(token);

    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    //console.log(userId);

    const user = await User.findById(userId);
    //console.log(user);

    const borrowedBooks = user.booksBorrowed;
    //console.log(borrowedBooks);

    const books = await Book.find({ _id: { $in: borrowedBooks } });
    //console.log(books);

    res.status(200).json(books);
  } catch (error) {}
});

export default router;

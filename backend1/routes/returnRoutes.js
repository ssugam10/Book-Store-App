import express from "express";
import { Book } from "../models/bookModel.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to return a book by ID
router.post("/:id", async (request, response) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    //console.log(token);

    const { id } = request.params; // Book ID
    //console.log(id);

    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    //console.log(userId);

    // Find the book by ID
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const idx = user.booksBorrowed.indexOf(id);
    user.booksBorrowed.splice(idx, 1);

    // Increment the book quantity
    book.quantity += 1;

    // Save the updates
    await book.save();
    await user.save();

    return response.status(200).send({
      message: "Book returned successfully",
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: "Internal server error" });
  }
});

export default router;

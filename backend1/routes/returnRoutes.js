import express from "express";
import { Book } from "../models/bookModel.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to authenticate the user
const authenticateUser = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.status(401).send({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.userId = decoded.id; // Attach the user ID to the request object
    next();
  } catch (error) {
    return response.status(401).send({ message: "Invalid or expired token" });
  }
};

// Route to return a book by ID
router.post("/:id", authenticateUser, async (request, response) => {
  try {
    const { id } = request.params; // Book ID
    const userId = request.userId; // Authenticated User ID

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

    // Check if the user has borrowed the book
    const bookborrow = user.bookborrow.indexOf(id);
    if (borrowedIndex === -1) {
      return response.status(400).send({ message: "Book not borrowed by the user" });
    }

    // Remove the book ID from the borrowedBooks array
    user.bookborrow.splice(borrowedIndex, 1);

    // Increment the book quantity
    book.quantity += 1;

    // Save the updates
    await book.save();
    await user.save();

    return response.status(200).send({
      message: "Book returned successfully",
      book: {
        id: book._id,
        title: book.title,
        quantity: book.quantity,
      },
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: "Internal server error" });
  }
});

export default router;

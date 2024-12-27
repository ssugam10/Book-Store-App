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
    request.userId = decoded.userId; // Attach the user ID to the request object
    next();
  } 
  catch (error) {
    return response.status(401).send({ message: "Invalid or expired token" });
  }
};

router.post("/:id", authenticateUser, async (request, response) => {
  try {
    const { id } = request.params; // Book ID
    const userId = request.userId; // Authenticated User ID

    // Find the book by ID
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Check if the book is available for borrowing
    if (book.quantity <= 0) {
      return response.status(400).send({ message: "Book is currently unavailable" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Check if the user has already borrowed the book
    if (user.bookborrow.includes(id)) {
      return response.status(400).send({ message: "Book already borrowed by the user" });
    }

    console.log("3");

    const borrowedIndex = user.bookborrow.indexOf(id);
    if (borrowedIndex !=-1) {

      return response.status(400).send({ message: "User already taken one copy of book " });
    }

    // Update the book's quantity and user's borrowed books
    book.quantity -= 1;
    user.bookborrow.push(id);

    console.log("hello");

    // Save the updates
    await book.save();
    await user.save();
    console.log("4");


    return response.status(200).send({
      message: "Book borrowed successfully",
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


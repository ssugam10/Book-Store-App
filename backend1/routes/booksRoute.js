import express from "express";
import { Book } from "../models/bookModel.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import mongoose from "mongoose";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (request, response) => {
  try {
    const token = request.headers.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.genre ||
      !request.body.price
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear,genre and price",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      createdBy: new mongoose.Types.ObjectId(userId),
      genre: request.body.genre,
      price: request.body.price,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (request, response) => {
  try {
    const token = request.headers.token;
    //console.log(token);

    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    //console.log(userId);

    const user = await User.findById(userId);
    //console.log(user);

    //console.log(request.body);

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.genre ||
      !request.body.price
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear,genre and price",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const token = request.headers.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

    const book = await Book.findById(id);
    // console.log(book.createdBy.toString());
    if (book.createdBy.toString() === userId) {
      const result = await Book.findByIdAndDelete(id);
      console.log("Book deleted!");
    } else {
      const error = new Error();
      error.message = "Unauthorized to delete book!";
      throw error;
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

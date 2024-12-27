import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import booksRoutes from "./routes/booksRoute.js";
import signupRoutes from "./routes/signupRoute.js";
import loginRoutes from "./routes/loginRoute.js";
import returnRoutes from "./routes/returnRoutes.js";
import borrowRoutes from "./routes/borrowRoute.js";
import userborrowedbookRoutes from "./routes/userborrowedbookRoute.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoutes);
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/borrow", borrowRoutes);
app.use("/return", returnRoutes);
app.use("/borrowedbook", userborrowedbookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UserBorrowedBooks = () => {
  const [loading, setLoading] = useState(false);
  const [bookborrow, setBorrowedBooks] = useState([]);
  const { id } = useParams(); // Getting the user ID from URL parameters
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    // Fetch borrowed books for the user with the specified ID
    axios
      .get(`http://localhost:5555/borrowedbook/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")).token, // Including token for authentication
        },
      })
      .then((response) => {
        setLoading(false);
        setBorrowedBooks(response.data.books); // Store the list of borrowed books
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching borrowed books", { variant: "error" });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Books Borrowed by User</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl mb-4">Borrowed Books by User {id}</h3>
        {bookborrow.length === 0 ? (
          <p>No books borrowed by this user.</p>
        ) : (
          <ul className="w-full">
            {bookborrow.map((book) => (
              <li
                key={book._id}
                className="flex flex-col items-start border-b-2 border-gray-300 py-4"
              >
                <div className="mb-2">
                  <strong>Title:</strong> {book.title}
                </div>
                <div className="mb-2">
                  <strong>Author:</strong> {book.author}
                </div>
                <div className="mb-2">
                  <strong>Publish Date:</strong> {book.publishDate}
                </div>
                <div className="mb-2">
                  <strong>Genre:</strong> {book.genre}
                </div>
                <div className="mb-2">
                  <strong>Description:</strong> {book.description}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBorrowedBooks;

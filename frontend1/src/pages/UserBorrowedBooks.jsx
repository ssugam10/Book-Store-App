import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const UserBorrowedBooks = () => {
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State for borrowed books
  const { enqueueSnackbar } = useSnackbar();

  const { token } = JSON.parse(localStorage.getItem("token"));

  // Function to handle book return
  const handleReturnBook = (id) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5555/return/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        enqueueSnackbar(response.data.message || "Book returned successfully", {
          variant: "success",
        });

        // Remove the returned book from the local state
        setBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== id)
        );
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error returning book", { variant: "error" });
        console.error(error);
      });
  };

  // Fetch borrowed books on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/borrowedbook", {
        headers: { token },
      })
      .then((response) => {
        setLoading(false);
        setBorrowedBooks(response.data); // Update state with borrowed books
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching borrowed books", { variant: "error" });
        console.error(error);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Books Borrowed by User</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-start border-2 border-sky-400 rounded-xl p-8">
        {borrowedBooks.length === 0 ? (
          <p>No books borrowed by this user.</p>
        ) : (
          <ul className="w-full space-y-6">
            {borrowedBooks.map((book) => (
              <li
                key={book._id}
                className="flex flex-col items-start border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Publish Date:</strong> {book.publishYear}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Description:</strong> {book.description}
                </p>
                <button
                  className="self-start px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                  onClick={() => handleReturnBook(book._id)}
                >
                  Return Book
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBorrowedBooks;

import { useId, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useSnackbar } from "notistack";
import axios from "axios";

const BooksTable = ({ books }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);


  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { token, isAdmin } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    // Get the userId from the backend
    axios
      .get("http://localhost:5555/some-secure-route", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserId(response.data.userId); // Save the userId from the backend response
      })
      .catch((error) => {
        console.error("Error fetching userId", error);
      });
  }, [token]);
  
  
 
  const handleBorrow = (id) => {
    setLoading(true);
    axios
      .post(`http://localhost:5555/borrow/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book borrowed successfully", { variant: "success" });
        navigate("/Home");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error?.response?.data?.message || "Error", {
          variant: "error",
        });
      });
  };

  return (
    <div>

    {/* Conditionally render My Books button only for regular users */}
    {!isAdmin && (
      <div className="flex justify-end mb-4">
        <Link to={`/borrowedbooks/${userId}`}>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            My Books
          </button>
        </Link>
      </div>
    )}

    {/* now the table for two diff positions-user/admin */}
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Genre
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Quantity
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.genre}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.quantity}
            </td>
            {isAdmin ? (
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            ) : (
              <td>
              
                <div className="bg-blue-400 text-center py-px text-orange-700 border-4 border-indigo-800 rounded-md">
                  <button
                    onClick={() => handleBorrow(book._id)}
                    disabled={loading}
                  >
                    {loading ? "Borrowing..." : "Borrow"}
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default BooksTable;

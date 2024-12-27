import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
// only use table
// import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    localStorage.setItem(
      "token",
      JSON.stringify({ token: "0", isAdmin: false })
    );
  }

  const isAdmin = JSON.parse(localStorage.getItem("token")).isAdmin;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-4">
          {/*............................................. remove card type of showcase of book */}

          {/* <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >
            Table
          </button> */}
          {/* <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >
            Card
          </button> */}
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>

        {isAdmin ? (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        ) : (
          <></>
        )}
      </div>

      {loading ? <Spinner /> : <BooksTable books={books} />}
    </div>
  );
};

export default Home;

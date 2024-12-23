//made chnages-for genre and price
import { Link, Navigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  const { token, isAdmin } = JSON.parse(localStorage.getItem("token"));

  const handleBorrow = () => {
    console.log(
      "Nandini please implement this!, You need to add qty in books in backend, create route for borrowing books and returning appropriate message when the qty of book is zero, if a book is borrowed by a user then it should reflect in the user also, it means you need to change user model also, please create a meaningful route like /borrow/:id where id is the id of the book to be borrowed"
    );
  };

  return (
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
            price
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
              {book.price}
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
                <div className="bg-amber-950 text-center py-px text-orange-700 border-4 border-indigo-800 rounded-md">
                  <button onClick={handleBorrow}>Borrow</button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;

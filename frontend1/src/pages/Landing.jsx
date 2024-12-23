import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-sky-600 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">BookManager</h1>
          <div className="space-x-6">
            <button
              className="py-2 px-4 bg-white text-sky-600 rounded hover:bg-sky-700 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="py-2 px-4 bg-gray-200 text-sky-600 rounded hover:bg-gray-300"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1200x600?text=Library+Management')",
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-5xl font-bold mb-4 text-sky-600">
            Welcome to BookManager
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your library efficiently with BookManager. Keep track of all
            your books easily.
          </p>
          <div className="space-x-4">
            <button
              className="py-2 px-6 bg-sky-600 text-white text-lg rounded-lg hover:bg-sky-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="py-2 px-6 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>

            <button
              className="py-2 px-4 bg-gray-200 text-sky-600 rounded hover:bg-gray-300"
              onClick={() => navigate("/Home")}
            >
              Homepage
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 BookManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

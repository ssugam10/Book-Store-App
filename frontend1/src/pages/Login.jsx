import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5555/login", {
        email,
        password,
      });

      setLoading(false);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar("Login successful!", { variant: "success" });
        navigate("/Home"); // Adjust the route as needed
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.response?.data?.message || "Error logging in", {
        variant: "error",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Login</h1>
      <form
        className="flex flex-col items-center border-2 border-gray-300 rounded-xl w-[400px] p-8 mx-auto"
        onSubmit={handleLogin}
      >
        <label className="w-full text-left mb-2 text-lg">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter your email"
        />

        <label className="w-full text-left mb-2 text-lg">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="p-4 bg-blue-600 text-white w-full rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

{/* signup option */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Create a account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;

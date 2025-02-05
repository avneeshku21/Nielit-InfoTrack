import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role is required
  const navigate = useNavigate();

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate Inputs
    if (!email || !password || !role) {
      toast.error("Please fill in all required fields", { duration: 3000 });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login Response:", data);

      // Store Token & Update State
      localStorage.setItem("jwt", data.token);
      setProfile(data.user); // Ensure `user` object is set correctly
      setIsAuthenticated(true);

      toast.success("Logged in successfully!", { duration: 3000 });

      // Reset Form
      setEmail("");
      setPassword("");
      setRole("");

      // Redirect to Dashboard/Home
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message || "Invalid email or password",
        { duration: 3000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
        <form onSubmit={handleLogin}>
          <div className="font-semibold text-xl text-center mb-6">
            Nielit<span className="text-blue-600">Track</span>
          </div>
          <h1 className="text-xl font-semibold mb-6">Login</h1>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Register Link */}
          <p className="text-center mb-4">
            New User?{" "}
            <Link to="/register" className="text-blue-600">
              Register Now
            </Link>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState(""); // Declare education state

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password || !role) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login", 
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json', // Content-Type should be application/json for login
          }
        }
      );
      console.log(data);
      alert("Login Successful");
      
      // Reset form fields
      setEmail("");
      setPassword("");
      setRole("");
      setEducation("");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl text-center mb-6">
              Nielit<span className="text-blue-600">Track</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>

            {/* Role selection */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            {/* Email input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Password input */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Education selection */}
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BA">BA</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BTECH">BTECH</option>
              <option value="O-Level">O-Level</option>
              <option value="A-Level">A-Level</option>
            </select>

            <p className="text-center mb-4">
              New User?{" "}
              <Link to="/register" className="text-blue-600">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

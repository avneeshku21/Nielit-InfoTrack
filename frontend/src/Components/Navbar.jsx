// src/Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  // Fetch user details on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/myProfile", { withCredentials: true });
        setProfile(data); // Ensure profile updates
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated, setProfile]);

  // Check if the user is an Admin
  const isAdmin = profile?.role === "Admin"; // Ensure role is correctly accessed

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });
      console.log(data);
      localStorage.removeItem("jwt"); // Remove token from storage
      toast.success(data.message);
      setIsAuthenticated(false);
      setProfile(null); // Clear profile on logout
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-4 py-3">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Nielit-<span className="text-blue-600">Track</span>
          </div>

          {/* Desktop Navbar */}
          <div className="mx-6">
            <ul className="space-x-6 hidden md:flex">
              <Link to="/" className="hover:text-blue-600">HOME</Link>
              <Link to="/courses" className="hover:text-blue-600">COURSE</Link>
              <Link to="/creators" className="hover:text-blue-600">CREATORS</Link>
              <Link to="/about" className="hover:text-blue-600">ABOUT</Link>
              
              <Link to="/contests" className="hover:text-blue-600">CONTESTS</Link>
              <Link to="/results" className="hover:text-blue-600">RESULTS</Link>
              <Link to="course-schedule" className="hover:text-blue-600">SCHEDULE</Link>
            </ul>

            {/* Mobile Menu Icon */}
            <div className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-x-2 hidden md:flex items-center">
            {/* Show Dashboard button only for Admins */}
            {isAdmin && (
              <Link to="/dashboard" className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md">
                Dashboard
              </Link>
            )}

            {/* Show Logout and Profile if authenticated, otherwise show Login */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <img
                  src={profile?.photo?.url || "/default-avatar.jpg"}
                  alt={profile?.name}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-700 text-white font-semibold hover:bg-blue-900 duration-300 px-4 py-2 rounded-md">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className="bg-white h-screen flex items-center justify-center md:hidden">
            <ul className="flex flex-col space-y-6 text-xl text-center">
              <Link to="/" className="hover:text-blue-600" onClick={() => setShow(false)}>HOME</Link>
              <Link to="/courses" className="hover:text-blue-600" onClick={() => setShow(false)}>COURSE</Link>
              <Link to="/creators" className="hover:text-blue-600" onClick={() => setShow(false)}>CREATORS</Link>
              <Link to="/about" className="hover:text-blue-600" onClick={() => setShow(false)}>ABOUT</Link>
              <Link to="/contact" className="hover:text-blue-600" onClick={() => setShow(false)}>CONTACT</Link>
              <Link to="/contests" className="hover:text-blue-600" onClick={() => setShow(false)}>CONTESTS</Link>
              <Link to="/results" className="hover:text-blue-600" onClick={() => setShow(false)}>RESULTS</Link>
              <Link to="/course-schedule"className="hover:text-blue-600" onClick={() => setShow(false)}>SCHEDULE</Link>

              {/* Show Dashboard button for Admins */}
              {isAdmin && (
                <Link to="/dashboard" className="hover:text-blue-600" onClick={() => setShow(false)}>
                  DASHBOARD
                </Link>
              )}

              {/* Show Logout if authenticated, otherwise show Login */}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="text-red-600 hover:underline">LOGOUT</button>
              ) : (
                <Link to="/login" className="text-blue-800 hover:underline" onClick={() => setShow(false)}>LOGIN</Link>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
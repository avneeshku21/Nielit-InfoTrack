import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", { withCredentials: true });
      toast.success(data.message);
      localStorage.removeItem("jwt"); // Remove token from localStorage
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  // ✅ Corrected Profile Image Handling
  const profileImage = profile?.photo?.url || "/default-profile.png";

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer" onClick={() => setShow(!show)}>
        <CiMenuBurger className="text-2xl" />
      </div>

      {/* Sidebar */}
      <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close Icon for Mobile */}
        <div className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer" onClick={() => setShow(!show)}>
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        {/* User Info */}
        <div className="text-center p-4">
          <img className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border-2 border-gray-300" src={profileImage} alt="User" onError={(e) => (e.target.src = "/default-profile.png")} />
          <p className="text-lg font-semibold">{profile?.name || "User"}</p>
          <p className="text-sm text-gray-600">{profile?.role === "Admin" ? "Administrator" : "User"}</p>
        </div>

        {/* Sidebar Buttons */}
        <ul className="space-y-4 mx-4">
          <button onClick={() => setComponent("MyCourses")} className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300">My Courses</button>
          {profile?.role === "Admin" && (
            <button onClick={() => setComponent("AdminDashboard")} className="w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300">Admin Dashboard</button>
          )}
          <button onClick={() => setComponent("MyProfile")} className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300">My Profile</button>
          <button onClick={() => navigateTo("/")} className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300">Home</button>
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300">Logout</button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;

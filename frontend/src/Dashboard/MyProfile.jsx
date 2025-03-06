import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // ✅ Profile Image Handling
  const profileImage = profile?.photo?.url || "/default-profile.png";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        <div className="relative">
          <img src={profileImage} alt="avatar" className="w-full h-48 object-cover" />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img
              src={profileImage}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
            />
          </div>
        </div>
        <div className="px-6 py-8 mt-2">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            {profile?.name || "User"}
          </h2>
          <p className="text-center text-gray-600 mt-2">{profile?.email || "No Email"}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.phone || "No Phone"}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.location || "No Location"}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.currentCourse || "No Course"}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.college || "No College"}</p>
          <p className="text-center text-gray-600 mt-2">CGPA: {profile?.cgpa ?? "N/A"}</p>
          <p className="text-center text-gray-600 mt-2">
            {profile?.role === "Admin" ? "Administrator" : "User"}
          </p>

          {/* ✅ Fixed misplaced parenthesis */}
          {profile?.role === "Admin" && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              onClick={() => navigate(`/edit-profile/${profile.id}`)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

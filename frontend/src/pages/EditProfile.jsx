import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL params
  const userId = id || profile?._id; // Fallback to profile._id if id is not in URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    address: "",
    currentCourse: "",
    college: "",
    cgpa: "",
    relevantCoursework: "",
    linkedin: "",
    github: "",
    portfolio: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        education: profile?.education || "",
        address: profile?.address || "",
        currentCourse: profile?.currentCourse || "",
        college: profile?.college || "",
        cgpa: profile?.cgpa || "",
        relevantCoursework: profile?.relevantCoursework?.join(", ") || "",
        linkedin: profile?.socialLinks?.linkedin || "",
        github: profile?.socialLinks?.github || "",
        portfolio: profile?.socialLinks?.portfolio || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing. Please try again.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        relevantCoursework: formData.relevantCoursework.split(", ")
      };

      const response = await axios.put(
        `http://localhost:4001/api/users/update-profile/${userId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${profile?.token}` }
        }
      );

      alert(response.data?.message || "Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

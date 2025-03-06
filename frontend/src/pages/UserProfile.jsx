import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function UserProfile() {
  const { profile, setProfile } = useAuth(); // Assuming setProfile updates context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    education: profile?.education || "",
    password: "",
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const profileImage = profile?.photo?.url || "/default-profile.png";

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        education: profile.education || "",
        password: "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    if (formData.name) data.append("name", formData.name);
    if (formData.email) data.append("email", formData.email);
    if (formData.phone) data.append("phone", formData.phone);
    if (formData.education) data.append("education", formData.education);
    if (formData.password) data.append("password", formData.password);
    if (photo) data.append("photo", photo);

    try {
      const response = await fetch("http://localhost:4001/api/users/myProfile", {
        method: "PUT",
        credentials: "include", // For JWT cookie
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      // Update profile in context
      setProfile(result.user);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        <div className="relative">
          <img src={profileImage} alt="avatar" className="w-full h-48 object-cover" />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img src={profileImage} alt="avatar" className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700" />
          </div>
        </div>
        <div className="px-6 py-8 mt-2">
          {!isEditing ? (
            <>
              <h2 className="text-center text-2xl font-semibold text-gray-800">{profile?.name || "User"}</h2>
              <p className="text-center text-gray-600 mt-2">{profile?.email || "No Email"}</p>
              <p className="text-center text-gray-600 mt-2">{profile?.phone || "No Phone"}</p>
              <p className="text-center text-gray-600 mt-2">{profile?.education || "No Education"}</p>
              <p className="text-center text-gray-600 mt-2">{profile?.role === "Admin" ? "Administrator" : "User"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password (leave blank to keep unchanged)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full p-2"
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
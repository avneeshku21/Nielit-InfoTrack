import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [courseImg, setCourseImg] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection and show preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseImg(file);

    // Create a preview for user
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !about || !courseImg) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("courseImg", courseImg);

    try {
      console.log("Form Data:", Object.fromEntries(formData));

      const { data } = await axios.post(
        "http://localhost:4001/api/courses/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating course:", error.response);
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Create a New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title */}
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          />

          {/* Course Category */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          />

          {/* About Course */}
          <textarea
            placeholder="About Course"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          ></textarea>

          {/* Course Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          />

          {/* Image Preview */}
          {preview && (
            <div className="mt-4 flex justify-center">
              <img src={preview} alt="Course Preview" className="w-32 h-32 rounded-md shadow-md" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

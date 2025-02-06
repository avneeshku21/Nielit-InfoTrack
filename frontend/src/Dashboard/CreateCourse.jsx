import React, { useState } from "react"; // ✅ Import React
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [courseImg, setCourseImg] = useState(null);

  const handleFileChange = (e) => {
    setCourseImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("courseImg", courseImg);

    try {
      const { data } = await axios.post("http://localhost:4001/api/courses/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message);
      navigate("/dashboard"); // ✅ Redirect to Dashboard after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="About Course"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          className="w-full border rounded p-2"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;

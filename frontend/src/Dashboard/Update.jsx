import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Update() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { profile, isAuthenticated } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [courseImg, setCourseImg] = useState("");
  const [courseImagePreview, setCourseImagePreview] = useState("");

  // Restrict Access: Redirect if not an Admin
  useEffect(() => {
    if (!isAuthenticated || profile?.role !== "Admin") {
      toast.error("Access Denied. Admins Only.");
      navigateTo(`/courses/update/${id}`); // Redirect to home if not admin
    }
  }, [isAuthenticated, profile, navigateTo,id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCourseImagePreview(reader.result);
      setCourseImg(file);
    };
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/courses/singleCourse/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setCourseImg(data?.courseImg?.url);
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Course not found!");
      }
    };
    fetchCourse();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("courseImg", courseImg);

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/courses/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Course updated successfully");
      navigateTo("/dashboard"); // Redirect to dashboard after update
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE COURSE</h3>
        <form>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="DataScience">Data Science</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment/Games</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="COURSE TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 font-semibold">COURSE IMAGE</label>
            <img
              src={courseImagePreview || courseImg || "/imgPL.webp"}
              alt="Course"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>
          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Enter course description (min 200 characters)"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleUpdate}
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default Update;

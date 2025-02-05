import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx"; // Ensure auth context is used

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [courseImg, setCourseImg] = useState(null);
  const [courseImgPreview, setCourseImgPreview] = useState("");
  
  const { profile } = useAuth(); // Get user profile from context

  // Handle image selection
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCourseImgPreview(reader.result);
        setCourseImg(file);
      };
    }
  };

  // Handle course submission
  const handleCreateCourse = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !category || !about || !courseImg) {
      return toast.error("Please fill all required fields and upload an image.");
    }

    if (profile?.role !== "Admin") {
      return toast.error("Only admins can create courses.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("courseImg", courseImg);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/courses/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Course created successfully!");

      // Reset form fields after success
      setTitle("");
      setCategory("");
      setAbout("");
      setCourseImg(null);
      setCourseImgPreview("");
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create course. Try again.");
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">Create Course</h3>
        
        {profile?.role !== "Admin" ? (
          <h2 className="text-red-500 text-center">Access Denied: Only admins can create courses.</h2>
        ) : (
          <form onSubmit={handleCreateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={courseImgPreview ? courseImgPreview : "/imgPL.webp"}
                  alt="Course Preview"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                accept="image/png, image/jpeg, image/webp"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about the course"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Post Course
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateCourse;

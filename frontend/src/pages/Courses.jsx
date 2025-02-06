import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
          withCredentials: true,
        });
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className=" text-center text-2xl font-bold mb-5">All COURSES</h1>
      <p className="text-center mb-8">
        Explore a variety of courses across different domains.
      </p>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {courses.map((course) => ( // ✅ Fixed incorrect variable name
            <Link
              to={`/course/${course._id}`} // ✅ Fixed incorrect reference
              key={course._id}
              className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={course?.courseImg?.url || "https://via.placeholder.com/300"} // ✅ Make sure "image.url" matches backend schema
                alt={course?.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4 text-red">
                <h2 className="text-lg font-semibold">{course?.title}</h2>
                <p className="text-sm">{course?.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">No courses available.</div>
      )}
    </div>
  );
}

export default Courses;

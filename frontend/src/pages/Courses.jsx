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
      <h1 className="text-center text-3xl font-extrabold mb-5 text-gray-800">
        All COURSES
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Explore a variety of courses across different domains.
      </p>

      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {courses.map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course._id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={course?.courseImg?.url || "https://via.placeholder.com/300"}
                alt={course?.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h2 className="text-lg font-bold">{course?.title}</h2>
                <p className="text-sm opacity-90">{course?.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500">No courses available.</div>
      )}
    </div>
  );
}

export default Courses;

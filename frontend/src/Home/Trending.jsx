// src/Home/Trending.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseCarouselBlock } from "./CourseCarousel";

function Trending() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your original fetch logic (untouched)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/courses/allcourses",
          { withCredentials: true }
        );
        setCourses(data);
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <CourseCarouselBlock
      title="Trending"
      courses={courses}
      loading={loading}
      accent="linear-gradient(180deg, #a78bfa, #818cf8)"
    />
  );
}

export default Trending;
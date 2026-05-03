// src/Home/TechCourse.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseCarouselBlock } from "./CourseCarousel";

function TechCourse() {
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
      title="Technical"
      courses={courses}
      loading={loading}
      accent="linear-gradient(180deg, #6366f1, #4f46e5)"
    />
  );
}

export default TechCourse;
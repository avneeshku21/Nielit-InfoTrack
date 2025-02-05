import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [courses, setcourses] = useState({});
  console.log(courses);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/courses/singleCourse/${id}`,

          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setcourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, [id]);
  return (
    <div>
      <div>
        {courses && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {courses?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{courses?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={courses?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{courses?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {courses?.courseImg && (
                <img
                  src={courses?.courseImg?.url}
                  alt="mainCourseImg"
                  className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{courses?.about}</p>
                {/* Add more content here if needed */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Detail;
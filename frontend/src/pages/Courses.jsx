import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
                    withCredentials: true,
                });
                console.log("Courses Data:", data);
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Courses</h1>

            {loading ? (
                <div>Loading...</div>
            ) : courses.length > 0 ? (
                courses.map((course) => (
                    <div key={course._id}>
                        <h2>{course.title}</h2>
                    </div>
                ))
            ) : (
                <div>No courses available.</div>
            )}
        </div>
    );
}

export default Courses;

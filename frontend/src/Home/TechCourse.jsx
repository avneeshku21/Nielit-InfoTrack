import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TechCourse() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
                    withCredentials: true,
                });
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Technical</h1>
            {loading ? (
                <div>Loading...</div>
            ) : courses.length > 0 ? (
                <Carousel responsive={responsive}>
                    {courses.slice(0, 6).map((element) => (
                        <div
                            key={element._id}
                            className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2"
                        >
                            <Link to={`/courses/${element._id}`}>
                                <div className="relative">
                                    <img
                                        src={element.courseImg?.url || "/placeholder.jpg"} // Correct field for image
                                        alt={element.title || "Course Image"}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                        {element.category || "Category"}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                                    <h1
                                        className="text-lg font-bold mb-2 overflow-hidden text-ellipsis"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {element.title || "Untitled Course"}
                                    </h1>
                                    <div className="flex items-center">
                                        <img
                                            src={element.adminPhoto?.url || "/default-avatar.jpg"} // Correct field for admin photo
                                            alt={element.adminName || "Author Avatar"}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <p className="ml-3 text-gray-400 text-sm">
                                            {element.adminName || "Unknown Author"}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div>No courses available.</div>
            )}
        </div>
    );
}

export default TechCourse;

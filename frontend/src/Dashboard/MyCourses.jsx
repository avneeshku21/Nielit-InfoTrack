import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/courses/myCourse",
          { withCredentials: true }
        );
        console.log(data);
        setMyCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourses();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4001/api/courses/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Course deleted successfully");
        setMyCourses((value) => value.filter((courses) => courses._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete Courses");
      });
  };
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myCourses && myCourses.length > 0 ? (
            myCourses.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.courseImg && (
                  <img
                    src={element?.courseImg.url}
                    alt="courseImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/courses/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any Course to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
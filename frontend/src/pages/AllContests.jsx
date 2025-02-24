import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("https://contest-hive.vercel.app/api/all");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging API response

        if (!data || !data.data || typeof data.data !== "object") {
          throw new Error("Invalid API response: Expected an object with contests");
        }

        // ✅ Merge all contest lists from different platforms into one array
        const contestList = Object.values(data.data).flat();

        if (!Array.isArray(contestList) || contestList.length === 0) {
          throw new Error("No contests found.");
        }

        setContests(contestList);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🚀 Upcoming Coding Contests</h2>

      {/* Back Button */}
      <button
      onClick={() => navigate("/")} // ✅ Redirect to Home Page
      className="mb-4 px-6 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition shadow-md"
    >
      Back
    </button>

      {loading && <p className="text-center text-gray-500">Loading contests...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && contests.length === 0 && (
        <p className="text-center text-gray-500">No contests available.</p>
      )}

      {!loading && !error && contests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <a
              key={index}
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-lg rounded-lg p-5 border flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-lg font-semibold text-center mb-2">
                {contest.title || "Unnamed Contest"}
              </h3>
              <p className="text-gray-600 text-sm">📌 {contest.platform || "Unknown Platform"}</p>
              <p className="text-sm font-medium text-gray-700">
                🕒 {contest.startTime ? new Date(contest.startTime).toLocaleString() : "No Start Time"}
              </p>
              <p className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition text-center">
                View Contest
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContests;

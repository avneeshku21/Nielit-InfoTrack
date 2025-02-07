import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // API Base URL
  const API_BASE_URL = "http://localhost:40001/api";

  // Manually Defined Course Options
  const courseOptions = [
    { id: "o_level", name: "O Level" },
    { id: "a_level", name: "A Level" },
    { id: "dgr_batch", name: "DGR Batch" },
  ];

  // Fetch schedules for selected course
  useEffect(() => {
    if (selectedCourse) {
      axios
        .get(`${API_BASE_URL}/courseSchedule/course/${selectedCourse}`)
        .then((res) => setSchedules(res.data))
        .catch((err) => console.error("Error fetching schedule:", err));
    }
  }, [selectedCourse]);

  // Handle Schedule Creation
  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/courseSchedule/create`,
        { courseId: selectedCourse, date, startTime, endTime, description },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Schedule Created Successfully!");
      setSchedules([...schedules, res.data.schedule]);
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Failed to create schedule.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Course Schedule Management</h2>

      {/* Select Course */}
      <div className="mb-4">
        <label className="block font-medium">Select Class:</label>
        <select
          className="border p-2 w-full"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select a Class --</option>
          {courseOptions.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Schedule Form */}
      <form onSubmit={handleCreateSchedule} className="bg-white p-4 shadow rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Date:</label>
            <input
              type="date"
              className="border p-2 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Start Time:</label>
            <input
              type="time"
              className="border p-2 w-full"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">End Time:</label>
            <input
              type="time"
              className="border p-2 w-full"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Class details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Add Schedule
        </button>
      </form>

      {/* Schedule List */}
      <h3 className="text-xl font-semibold mb-2">Scheduled Classes</h3>
      <ul className="border rounded-lg p-4">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <li key={schedule._id} className="border-b py-2">
              <strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()} | 
              <strong> Time:</strong> {schedule.startTime} - {schedule.endTime} |
              <strong> Details:</strong> {schedule.description}
            </li>
          ))
        ) : (
          <p>No schedule found for this class.</p>
        )}
      </ul>
    </div>
  );
};

export default CourseSchedule;

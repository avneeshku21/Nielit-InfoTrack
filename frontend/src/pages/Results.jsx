import { useState, useEffect } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { staticData } from "../studentdata.js";

const Results = () => {
  const courses = [
    { id: 1, name: "A-Level-2023" },
    { id: 2, name: "O-Level-2024" },
    { id: 3, name: "IGCSE-2023" },
    { id: 4, name: "SAT-2024" },
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0].name);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(staticData[selectedCourse] || []);
  }, [selectedCourse]);

  const averageGrade =
    results.length > 0
      ? (
          results.reduce((sum, result) => sum + parseFloat(result.grade), 0) /
          results.length
        ).toFixed(2)
      : "N/A";

  const gradeDistribution = [
    { range: "0-20", students: results.filter((r) => r.grade <= 20).length },
    { range: "21-40", students: results.filter((r) => r.grade > 20 && r.grade <= 40).length },
    { range: "41-60", students: results.filter((r) => r.grade > 40 && r.grade <= 60).length },
    { range: "61-80", students: results.filter((r) => r.grade > 60 && r.grade <= 80).length },
    { range: "81-100", students: results.filter((r) => r.grade > 80).length },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Results Overview</h1>

      {/* Course Selection */}
      <div className="mb-6 flex flex-col items-center">
        <label htmlFor="course" className="block text-lg font-semibold mb-2">
          Select Course:
        </label>
        <select
          id="course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name.replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Performance Summary */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Performance for {selectedCourse.replace("-", " ")}
        </h2>
        <p className="text-lg">
          Average Grade: <span className="font-bold">{averageGrade}</span>
        </p>
      </div>

      {/* Chart (Grade Distribution) */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gradeDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#4A90E2" name="Number of Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Student Results Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Student Results for {selectedCourse.replace("-", " ")}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-100 text-center">
                    <td className="py-2 px-4 border-b">{result.id}</td>
                    <td className="py-2 px-4 border-b">{result.name}</td>
                    <td className="py-2 px-4 border-b">{result.grade}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-red-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;

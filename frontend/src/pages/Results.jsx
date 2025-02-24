import React, { useState, useEffect } from "react";
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
import { staticData } from "../studentdata";

const Results = () => {
  const courses = [
    { id: 1, name: "ALevel", batch: "2023" },
    { id: 2, name: "OLevel", batch: "2024" },
    { id: 3, name: "IGCSE", batch: "2023" },
    { id: 4, name: "SAT", batch: "2024" },
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const key = `${selectedCourse.name}-${selectedCourse.batch}`;
    console.log("Selected key:", key); // Debugging
    console.log("Results:", staticData[key]); // Debugging
    setResults(staticData[key] || []);
  }, [selectedCourse]);

  const averageGrade =
    results.length > 0
      ? (
          results.reduce((sum, result) => sum + parseFloat(result.grade), 0) /
          results.length
        ).toFixed(2)
      : "N/A"; // Avoid NaN issue

  const gradeDistribution = [
    { range: "0-20", students: results.filter((r) => r.grade <= 20).length },
    { range: "21-40", students: results.filter((r) => r.grade > 20 && r.grade <= 40).length },
    { range: "41-60", students: results.filter((r) => r.grade > 40 && r.grade <= 60).length },
    { range: "61-80", students: results.filter((r) => r.grade > 60 && r.grade <= 80).length },
    { range: "81-100", students: results.filter((r) => r.grade > 80).length },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Results</h1>

      <div className="mb-8">
        <label htmlFor="course" className="block text-lg font-semibold mb-2">
          Select Course and Batch:
        </label>
        <select
          id="course"
          value={`${selectedCourse.name}-${selectedCourse.batch}`}
          onChange={(e) => {
            const [name, batch] = e.target.value.split("-");
            const course = courses.find((c) => c.name === name && c.batch === batch);
            if (course) setSelectedCourse(course);
          }}
          className="p-2 border border-gray-300 rounded-md"
        >
          {courses.map((course) => (
            <option key={course.id} value={`${course.name}-${course.batch}`}>
              {course.name} ({course.batch} Batch)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Overall Performance for {selectedCourse.name} ({selectedCourse.batch} Batch)
        </h2>
        <p className="text-lg">
          Average Grade: <span className="font-bold">{averageGrade}</span>
        </p>
        <div className="mt-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" name="Number of Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Student Results for {selectedCourse.name} ({selectedCourse.batch} Batch)
      </h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Batch</th>
            <th className="py-2 px-4 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{result.id}</td>
              <td className="py-2 px-4 border-b text-center">{result.name}</td>
              <td className="py-2 px-4 border-b text-center">{selectedCourse.name}</td>
              <td className="py-2 px-4 border-b text-center">{selectedCourse.batch}</td>
              <td className="py-2 px-4 border-b text-center">{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;

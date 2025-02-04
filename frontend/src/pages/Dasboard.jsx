import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../Dasboard/Sidebar.jsx"; // Fixed folder name
import Courses from "./Courses";
import Update from "../Dasboard/Upadate.jsx"; // Fixed incorrect import
import MyProfile from "../Dasboard/MyProfile.jsx";
import { Navigate } from "react-router-dom";
import CreateCourse from "../Dasboard/CreateCourse.jsx"; // Fixed incorrect import

function Dashboard() {
  const [component, setComponent] = useState("My Course");
  const { profile, isAuthenticated } = useAuth() || {}; // Prevent undefined error

  // Redirect if user is not logged in
  if (isAuthenticated === undefined) return <h2>Loading...</h2>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />

      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Course" ? (
        profile?.isAdmin ? (
          <CreateCourse />
        ) : (
          <h2 className="text-center text-red-500">Access Denied: Only admins can create courses</h2>
        )
      ) : component === "Update Course" ? (
        <Update />
      ) : (
        <Courses />
      )}
    </div>
  );
}

export default Dashboard;

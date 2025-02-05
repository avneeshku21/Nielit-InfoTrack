import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Sidebar from "../Dashboard/Sidebar.jsx";
import Update from "../Dashboard/Update.jsx";
import MyProfile from "../Dashboard/MyProfile.jsx";
import { Navigate } from "react-router-dom";
import CreateCourse from "../Dashboard/CreateCourse.jsx";
import MyCourses from "../Dashboard/MyCourses.jsx";

function Dashboard() {
  const [component, setComponent] = useState("MyCourses");
  const { profile, isAuthenticated } = useAuth() || {};

  // Handle authentication loading state
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <h2>Loading...</h2>;
  }
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main content area */}
      <div className="w-full p-4">
        {component === "MyProfile" && <MyProfile />}
        {component === "Update" && <Update />}
        {component === "CreateCourse" ? (
          profile?.role === "Admin" ? (
            <CreateCourse/>
          ) : (
            <h2 className="text-center text-red-500">
              Access Denied: Only admins can create courses
            </h2>
          )
        ) : (
          <MyCourses />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

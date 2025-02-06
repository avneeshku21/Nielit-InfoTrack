import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../Dashboard/Sidebar";
import Update from "../Dashboard/Update";
import MyProfile from "../Dashboard/MyProfile";
import { Navigate } from "react-router-dom";
import CreateCourse from "../Dashboard/CreateCourse";
import MyCourses from "../Dashboard/MyCourses";

function Dashboard() {
  const [component, setComponent] = useState("MyCourses");
  const { profile, isAuthenticated, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex">
      <Sidebar setComponent={setComponent} />
      <div className="w-full p-4">
        {component === "MyProfile" && <MyProfile />}
        {component === "Update" && <Update />}
        {component === "CreateCourse" && profile?.role === "Admin" ? (
          <CreateCourse />
        ) : component === "CreateCourse" ? (
          <h2 className="text-center text-red-500">
            Access Denied: Only admins can create courses
          </h2>
        ) : (
          <MyCourses />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

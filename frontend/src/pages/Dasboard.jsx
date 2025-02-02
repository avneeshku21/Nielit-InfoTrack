import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../Dasboard/Sidebar'
import Courses from './Courses'
import Upadate from '../Dasboard/Upadate'
import MyProfile from '../Dasboard/MyProfile.jsx'
import { Navigate } from "react-router-dom";
import CreateCourse from "../Dasboard/Upadate.jsx"
function Dasboard() {
  const [component,setComponent]=useState("My Course")
  const {profile,isAuthenticated}=useAuth()
  console.log(profile)
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile/>
        ) : component === "Create Course" ? (
          <CreateCourse />
        ) : component === "Update Course" ? (
          <Upadate/>
        ) : (
          <Courses />
        )}
      </div>
    </div>
  )
}

export default Dasboard

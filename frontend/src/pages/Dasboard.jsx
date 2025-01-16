import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Cookies from "js-cookie"
import Sidebar from '../Dasboard/Sidebar'
import Courses from './Courses'
import Upadate from '../Dasboard/Upadate'
import MyProfile from '../Dasboard/MyProfile.jsx'
function Dasboard() {
  const [component,setComponent]=useState("My Course")
  const {profile,isAuthenticated}=useAuth()
  console.log(profile)
  console.log(isAuthenticated)

  
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile/>
        ) : component === "Create Course" ? (
          <CreateBlog />
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

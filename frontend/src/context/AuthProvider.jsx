// Contextapi ka use hota hai state ko globally manage krne k liye

//Axios is a package for use https requests
import axios from 'axios'
import React, {createContext, useEffect, useState,useContext } from 'react'
export const AuthContext=createContext() // it return value to the childern means componets
export const AuthProvider = ({children}) => {

    const [courses,setCourses]=useState()


    useEffect(()=>{
const fetchCourses=async()=>{
    try {
        const response=await axios.get("http://localhost:4001/api/courses/allcourses")
        console.log(response.data)
        setCourses(response.data)
    } catch (error) {
        console.error("Error fetching courses:", error.message);
    }
}
fetchCourses()

    },[])
  return (
    <AuthContext.Provider value={{courses}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
return useContext(AuthContext);
};


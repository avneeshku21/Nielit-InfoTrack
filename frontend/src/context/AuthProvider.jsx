// Contextapi ka use hota hai state ko globally manage krne k liye

//Axios is a package for use https requests
import axios from 'axios'
import React, {createContext, useEffect, useState,useContext } from 'react'
export const AuthContext=createContext() // it return value to the childern means componets
export const AuthProvider = ({children}) => {

    const [courses,setCourses]=useState();
    const [profile,setProfile]=useState();
    const [isAuthenticated,setIsAuthenticated]=useState(false) 
 

    useEffect(()=>{
const fetchCourses=async()=>{
    try {
        const {data}=await axios.get("http://localhost:4001/api/courses/allcourses",{withCredentials:true,
        })
        console.log(data)
        setCourses(data);
       
    } catch (error) {
        console.error("Error fetching courses:", error.message);
    }
};
const fetchProfile=async()=>{
    try {
        const token=Cookies.get('token');
        const parsedTokenn=token?JSON.parse(token):undefined;
       if(parsedTokenn)
       {
        const {data}=await axios.get("http://localhost:4001/api/users/myProfile",{withCredentials:true,
            headers:{'Content-Type':'applivatiom/json'},
        })
        console.log(data)
        setCourses(data);
        setProfile(data);
        setIsAuthenticated(true)
       }
    } catch (error) {
        console.error("Error fetching courses:", error.message);
    }
};
fetchProfile();
fetchCourses();

    },[])
  return (
    <AuthContext.Provider value={{courses,profile,isAuthenticated}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
return useContext(AuthContext);
};


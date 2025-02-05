import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [courses, setCourses] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect is running");

        const fetchProfile = async () => {
            try {
                const token=Cookies.get("token")
                const parsedToken=token?JSON.parse(token):undefined;
            if(parsedToken)
            {
                const { data } = await axios.get("http://localhost:4001/api/users/myProfile", {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log("Profile Data:", data);
                setProfile(data);
                setIsAuthenticated(true);
            }
                
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data?.message || error.message);
                setIsAuthenticated(false);
            }
        };

        const fetchCourses = async () => {
            try {
                console.log("Fetching courses...");
                const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
                    withCredentials: true,
                });
                console.log("Courses Data:", data);
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error.response?.data?.message || error.message);
            }
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([fetchProfile(), fetchCourses()]);
            } catch (error) {
                console.error("Error in fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ courses, profile, isAuthenticated, loading , setProfile, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [courses, setCourses] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("useEffect is running");
        const fetchCourses = async () => {
            console.log("Fetching courses...");
            try {
                const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
                    withCredentials: true,
                });
                console.log("Courses Data:", data);
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error.message);
            }
        };
    
        fetchCourses();
    }, []);

    return (
        <AuthContext.Provider value={{ courses, profile, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
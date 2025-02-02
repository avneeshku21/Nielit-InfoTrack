import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(); // It returns value to the children (components)

export const AuthProvider = ({ children }) => {
    const [courses, setCourses] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
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

        const fetchProfile = async () => {
            try {
                const token = Cookies.get('token');
                const parsedToken = token ? JSON.parse(token) : undefined;

                if (parsedToken) {
                    const { data } = await axios.get("http://localhost:4001/api/users/myProfile", {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' },
                    });
                    console.log("Profile Data:", data);
                    setProfile(data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error fetching profile:", error.message);
            }
        };

        fetchProfile();
        fetchCourses();
    }, []);

    return (
        <AuthContext.Provider value={{ courses, profile, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

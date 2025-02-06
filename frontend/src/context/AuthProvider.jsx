import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [courses, setCourses] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get("token");
                if (token) {
                    const { data } = await axios.get("http://localhost:4001/api/users/myProfile", {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' }
                    });
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
                const { data } = await axios.get("http://localhost:4001/api/courses/allcourses", {
                    withCredentials: true,
                });
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error.response?.data?.message || error.message);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchProfile(), fetchCourses()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ courses, profile, isAuthenticated, loading, setProfile, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

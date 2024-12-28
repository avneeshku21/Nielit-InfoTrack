import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData);
      alert(response.message);
      
      // Redirect based on the role
      if (formData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return <AuthForm isLogin={isLogin} onSubmit={handleLogin} togglePage={togglePage} />;
};

export default LoginPage;

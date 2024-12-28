import React from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await registerUser(formData);
      alert(response.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return <AuthForm onSubmit={handleRegister} />;
};

export default RegisterPage;

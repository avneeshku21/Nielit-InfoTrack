// src/pages/Login.jsx
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Login handler (your original logic, untouched)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill in all required fields", { autoClose: 3000 });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("jwt", data.token);
      setProfile(data.user);
      setIsAuthenticated(true);
      toast.success("Logged in successfully!", { autoClose: 3000 });

      setEmail("");
      setPassword("");
      setRole("");

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message || "Invalid email or password",
        { autoClose: 3000 }
      );
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .login-input::placeholder { color: rgba(255,255,255,0.28); }
        .login-input:focus { border-color: rgba(129,140,248,0.55) !important; outline: none; }
        .login-select option { background: #0d0d16; color: #fff; }
        .login-btn-submit:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {/* Ambient glow */}
      <div style={styles.glow} />

      {/* Card */}
      <div style={styles.card}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={styles.logoIcon}>
              <span style={styles.logoIconText}>IN</span>
            </div>
            <span style={styles.logoText}>
              INFO<span style={{ color: "#818cf8" }}>NEXT</span>
            </span>
          </div>
        </Link>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subheading}>Sign in to your INFONEXT account</p>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>

          {/* Role Select */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="login-select"
              required
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
              style={styles.input}
            />
          </div>

          {/* Redirect to register */}
          <p style={styles.switchText}>
            New User?{" "}
            <Link to="/register" style={styles.linkAccent}>
              Register Now
            </Link>
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn-submit"
            style={styles.btnSubmit}
          >
            Sign In
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

/* ── Styles ── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#050508",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "fixed",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "650px",
    height: "650px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "2.5rem 2.25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIconText: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "13px",
    fontFamily: "'Syne', sans-serif",
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "1.4rem",
    color: "#ffffff",
    letterSpacing: "-0.02em",
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "1.55rem",
    color: "#ffffff",
    textAlign: "center",
    margin: "0 0 0.4rem",
  },
  subheading: {
    color: "rgba(255,255,255,0.42)",
    fontSize: "0.88rem",
    textAlign: "center",
    margin: "0 0 2rem",
  },
  fieldWrap: {
    marginBottom: "1rem",
    width: "100%",
  },
  label: {
    display: "block",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "6px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
    appearance: "none",
  },
  switchText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.42)",
    fontSize: "0.875rem",
    margin: "0.5rem 0 1.5rem",
  },
  linkAccent: {
    color: "#818cf8",
    fontWeight: 600,
    textDecoration: "none",
  },
  btnSubmit: {
    width: "100%",
    background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.2s",
  },
};

export default Login;
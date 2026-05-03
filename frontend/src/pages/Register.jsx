// src/pages/Register.jsx
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  // Your original state (untouched)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // Your original photo handler (untouched)
  const changedPhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setPhoto(file);
      };
    }
  };

  // Your original register handler (untouched)
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    formData.append("photoPreview", photoPreview);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      alert("User Registered Successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto(null);
      setPhotoPreview("");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .reg-input::placeholder { color: rgba(255,255,255,0.28); }
        .reg-input:focus { border-color: rgba(129,140,248,0.55) !important; outline: none; }
        .reg-select option { background: #0d0d16; color: #fff; }
        .reg-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .reg-file-input { color: rgba(255,255,255,0.5); font-size: 0.85rem; }
        .reg-file-input::file-selector-button {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(129,140,248,0.3);
          color: #818cf8;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          margin-right: 10px;
          transition: background 0.2s;
        }
        .reg-file-input::file-selector-button:hover {
          background: rgba(99,102,241,0.28);
        }
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

        <h1 style={styles.heading}>Create Account</h1>
        <p style={styles.subheading}>Join INFONEXT at NIELIT Delhi</p>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>

          {/* Role */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="reg-select"
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Name */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="reg-input"
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reg-input"
              style={styles.input}
            />
          </div>

          {/* Phone */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="number"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="reg-input"
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="reg-input"
              style={styles.input}
            />
          </div>

          {/* Education */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Education</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="reg-select"
              style={styles.input}
            >
              <option value="">Select Your Education</option>
              <option value="BA">BA</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BTECH">BTECH</option>
              <option value="O-Level">O-Level</option>
              <option value="A-Level">A-Level</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Profile Photo</label>
            <div style={styles.photoRow}>
              {/* Preview */}
              <div style={styles.photoPreviewWrap}>
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={styles.photoPreviewImg}
                  />
                ) : (
                  <div style={styles.photoPlaceholder}>
                    <span style={{ fontSize: "1.4rem" }}>👤</span>
                  </div>
                )}
              </div>

              {/* File input */}
              <input
                type="file"
                accept="image/*"
                onChange={changedPhotoHandler}
                className="reg-file-input"
                style={{ flex: 1, background: "none", border: "none", padding: "4px 0" }}
              />
            </div>
          </div>

          {/* Redirect to login */}
          <p style={styles.switchText}>
            Already registered?{" "}
            <Link to="/login" style={styles.linkAccent}>
              Login Now
            </Link>
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="reg-btn"
            style={styles.btnSubmit}
          >
            Create Account
          </button>
        </form>
      </div>
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
    top: "40%",
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
    maxWidth: "460px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "2.5rem 2.25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
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
  photoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "10px 14px",
  },
  photoPreviewWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid rgba(129,140,248,0.4)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(99,102,241,0.1)",
  },
  photoPreviewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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

export default Register;
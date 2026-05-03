// src/Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  // Scroll detection for frosted glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile on mount (your original logic)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/myProfile",
          { withCredentials: true }
        );
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated, setProfile]);

  const isAdmin = profile?.role === "Admin";

  // Logout handler (your original logic)
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      setProfile(null);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Course" },
    { to: "/creators", label: "Members" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/contests", label: "Contests" },
    { to: "/results", label: "Results" },
    ...(isAdmin ? [{ to: "/create-schedule", label: "Schedule" }] : []),
  ];

  // Profile/login links (your original logic)
  const renderProfileLinks = () => {
    if (isAuthenticated) {
      return isAdmin ? (
        <Link to="/dashboard" style={s.btnPrimary}>
          Dashboard
        </Link>
      ) : (
        <Link to="/myProfile" style={s.btnPrimary}>
          My Profile
        </Link>
      );
    }
    return (
      <Link to="/login" style={s.btnOutline}>
        Login
      </Link>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .infonext-nav-link:hover { color: #fff !important; }
        .infonext-mobile-link:hover { color: #818cf8 !important; }
        @media (max-width: 900px) {
          .infonext-desktop-links { display: none !important; }
          .infonext-desktop-right { display: none !important; }
          .infonext-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .infonext-hamburger { display: none !important; }
        }
      `}</style>

      {/* ── Fixed Navbar ── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "68px",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,8,0.92)" : "rgba(5,5,8,0.65)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.4s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "13px", fontFamily: "'Syne', sans-serif" }}>
              IN
            </span>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#ffffff", letterSpacing: "-0.02em" }}>
            INFO<span style={{ color: "#818cf8" }}>NEXT</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="infonext-desktop-links" style={{
          display: "flex", gap: "1.6rem", listStyle: "none", margin: 0, padding: 0, alignItems: "center",
        }}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="infonext-nav-link"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  transition: "color 0.2s",
                }}
              >
                {link.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right: Profile + Logout */}
        <div className="infonext-desktop-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {renderProfileLinks()}

          {isAuthenticated && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={profile?.photo?.url || "/default-avatar.jpg"}
                alt={profile?.name || "User"}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  border: "2px solid #818cf8", objectFit: "cover",
                }}
              />
              <button
                onClick={handleLogout}
                style={s.btnDanger}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="infonext-hamburger"
          onClick={() => setShow(!show)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px", alignItems: "center" }}
        >
          {show ? <IoCloseSharp size={24} color="#fff" /> : <AiOutlineMenu size={24} color="#fff" />}
        </button>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      {show && (
        <div style={{
          position: "fixed",
          top: "68px", left: 0, right: 0, bottom: 0,
          background: "rgba(5,5,8,0.98)",
          backdropFilter: "blur(24px)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.6rem",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="infonext-mobile-link"
              onClick={() => setShow(false)}
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "1.15rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                transition: "color 0.2s",
              }}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: "50px", height: "1px", background: "rgba(255,255,255,0.1)" }} />

          {/* Profile / Login link */}
          {renderProfileLinks()}

          {/* Logout */}
          {isAuthenticated && (
            <button
              onClick={(e) => { handleLogout(e); setShow(false); }}
              style={{ ...s.btnDanger, padding: "10px 32px", fontSize: "0.95rem" }}
            >
              Logout
            </button>
          )}

          {/* Avatar in mobile */}
          {isAuthenticated && (
            <img
              src={profile?.photo?.url || "/default-avatar.jpg"}
              alt={profile?.name || "User"}
              style={{
                width: "52px", height: "52px", borderRadius: "50%",
                border: "2px solid #818cf8", objectFit: "cover", marginTop: "0.5rem",
              }}
            />
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "68px" }} />
    </>
  );
}

/* ── Shared button styles ── */
const s = {
  btnPrimary: {
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.85rem",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    display: "inline-block",
    transition: "opacity 0.2s",
  },
  btnOutline: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 500,
    fontSize: "0.85rem",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    display: "inline-block",
  },
  btnDanger: {
    background: "rgba(220,38,38,0.12)",
    border: "1px solid rgba(220,38,38,0.3)",
    color: "#f87171",
    fontWeight: 600,
    fontSize: "0.85rem",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "opacity 0.2s",
  },
};

export default Navbar;
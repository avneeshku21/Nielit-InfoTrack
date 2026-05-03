// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// ── Core Layout ──
import Navbar  from "./Components/Navbar.jsx";
import Footer  from "./Components/Footer.jsx";
import Home    from "./Components/Home.jsx";
import Intro   from "./Components/Intro.jsx";

// ── Pages ──
import Courses     from "./pages/Courses.jsx";
import About       from "./pages/About.jsx";
import Contact     from "./pages/Contact.jsx";
import Login       from "./pages/Login.jsx";
import Register    from "./pages/Register.jsx";
import Dashboard   from "./pages/Dashboard.jsx";
import Detail      from "./pages/Details.jsx";
import Results     from "./pages/Results.jsx";
import AllContests from "./pages/AllContests.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";

// ── Dashboard ──
import Update from "./Dashboard/Update.jsx";

// ── Home Sections ──
import Creator from "./Home/Creator.jsx";

// ── Auth ──
import { useAuth } from "./context/AuthProvider.jsx";

/* ─────────────────────────────────────────────
   AppContent — all routes
───────────────────────────────────────────── */
function AppContent({ introDone }) {
  const location = useLocation();
  const { courses } = useAuth();
  console.log(courses);

  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <div
      style={{
        opacity: introDone ? 1 : 0,
        transition: introDone ? "opacity 0.6s ease" : "none",
        pointerEvents: introDone ? "auto" : "none",
        minHeight: "100vh",
      }}
    >
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/courses"            element={<Courses />} />
        <Route path="/courses/:id"        element={<Detail />} />
        <Route path="/creators"           element={<Creator />} />
        <Route path="/about"              element={<About />} />
        <Route path="/contact"            element={<Contact />} />
        <Route path="/login"              element={<Login />} />
        <Route path="/register"           element={<Register />} />
        <Route path="/dashboard"          element={<Dashboard />} />
        <Route path="/courses/update/:id" element={<Update />} />
        <Route path="/edit-profile/:id"   element={<EditProfile />} />
        <Route path="/myProfile"          element={<UserProfile />} />
        <Route path="/results"            element={<Results />} />
        <Route path="/contests"           element={<AllContests />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root App
───────────────────────────────────────────── */
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = () => {
    setIntroDone(true);
    setTimeout(() => setShowIntro(false), 100);
  };

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <AppContent introDone={introDone} />
    </>
  );
}

export default App;
// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/Components/Navbar.jsx";
import Home from "../src/Components/Home.jsx";
import Footer from "../src/Components/Footer.jsx";
import Courses from "../src/pages/Courses.jsx";
import About from "../src/pages/About.jsx";
import Contact from "../src/pages/Contact.jsx";
import Login from "../src/pages/Login.jsx";
import Register from "../src/pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // ✅ Fixed Typo (Dashboard)
import { useAuth } from "./context/AuthProvider.jsx";
import Creator from "./Home/Creator.jsx";
import Detail from "./pages/Details.jsx";
import CourseSchedule from "./pages/CourseSchedule.jsx";
// import Results from "./pages/Results.jsx"; // ✅ Correct placement
import AllContests from "./pages/AllContests.jsx";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);

  const { courses } = useAuth();
  console.log(courses);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Detail />} />
        <Route path="/creators" element={<Creator />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Fixed typo */}
        <Route path="/course-schedule" element={<CourseSchedule />} />
        {/* <Route path="/results" element={<Results />} /> ✅ Route added */}
        <Route path="/contests" element={<AllContests />} /> {/* ✅ Route added */}
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;

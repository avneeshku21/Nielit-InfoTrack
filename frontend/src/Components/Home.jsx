// src/Components/Home.jsx  (or wherever your Home component lives)
// Drop-in replacement for the existing Home/Homee component.
// Works with your existing App.jsx, AuthProvider, and routing.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthProvider";

/* ══════════════════════════════════════════
   ANIMATED BACKGROUND
══════════════════════════════════════════ */
const Background = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    {/* SVG Grid */}
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hgrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#818cf8" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hgrid)" />
    </svg>

    {/* Floating orbs */}
    {[
      { top: "5%",  left: "10%", size: 600, color: "rgba(99,102,241,0.11)", dur: "14s", delay: "0s" },
      { top: "55%", left: "65%", size: 480, color: "rgba(129,140,248,0.09)", dur: "18s", delay: "4s" },
      { top: "75%", left: "5%",  size: 320, color: "rgba(167,139,250,0.07)", dur: "12s", delay: "7s" },
      { top: "20%", left: "75%", size: 380, color: "rgba(99,102,241,0.08)", dur: "16s", delay: "2s" },
    ].map((o, i) => (
      <div key={i} style={{
        position: "absolute", top: o.top, left: o.left,
        width: o.size, height: o.size, borderRadius: "50%",
        background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
        animation: `hOrb${i} ${o.dur} ease-in-out infinite`,
        animationDelay: o.delay,
      }} />
    ))}
    <style>{`
      @keyframes hOrb0{0%,100%{transform:translate(0,0)}50%{transform:translate(35px,-45px)}}
      @keyframes hOrb1{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}
      @keyframes hOrb2{0%,100%{transform:translate(0,0)}50%{transform:translate(28px,-28px)}}
      @keyframes hOrb3{0%,100%{transform:translate(0,0)}50%{transform:translate(-25px,40px)}}
    `}</style>
  </div>
);

/* ══════════════════════════════════════════
   REUSABLE SECTION LABEL
══════════════════════════════════════════ */
const SectionLabel = ({ text }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "100px", padding: "5px 16px", marginBottom: "1rem",
    fontSize: "0.72rem", fontWeight: 600, color: "#818cf8",
    letterSpacing: "0.14em", textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
    {text}
  </div>
);

/* ══════════════════════════════════════════
   FEATURE CARD (Features section)
══════════════════════════════════════════ */
const FeatureCard = ({ icon, title, desc }) => (
  <div
    className="h-feat-card"
    style={{
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "18px", padding: "2rem 1.75rem",
      transition: "transform 0.3s, border-color 0.3s, background 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-7px)";
      e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
      e.currentTarget.style.background = "rgba(99,102,241,0.07)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      e.currentTarget.style.background = "rgba(255,255,255,0.025)";
    }}
  >
    <div style={{
      fontSize: "1.5rem", width: "52px", height: "52px",
      background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: "14px", display: "flex", alignItems: "center",
      justifyContent: "center", marginBottom: "1.25rem",
    }}>{icon}</div>
    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.55rem" }}>{title}</h3>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.75, margin: 0 }}>{desc}</p>
  </div>
);

/* ══════════════════════════════════════════
   STAT BLOCK
══════════════════════════════════════════ */
const Stat = ({ value, label, icon }) => (
  <div style={{ textAlign: "center", padding: "0 1rem" }}>
    <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{icon}</div>
    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#818cf8", lineHeight: 1 }}>{value}</div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.42)", marginTop: "0.35rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
  </div>
);

/* ══════════════════════════════════════════
   PLATFORM CARD (Platform features section)
══════════════════════════════════════════ */
const PlatformCard = ({ number, icon, title, points, accent }) => (
  <div
    className="h-plat-card"
    style={{
      background: "rgba(255,255,255,0.025)", border: `1px solid ${accent}22`,
      borderRadius: "20px", padding: "2rem", position: "relative", overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = `0 24px 48px rgba(0,0,0,0.4)`;
      e.currentTarget.style.borderColor = `${accent}55`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.borderColor = `${accent}22`;
    }}
  >
    {/* Number watermark */}
    <div style={{
      position: "absolute", top: "-10px", right: "16px",
      fontFamily: "'Syne', sans-serif", fontWeight: 800,
      fontSize: "5rem", color: `${accent}12`, lineHeight: 1, userSelect: "none",
    }}>{number}</div>

    <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{icon}</div>
    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "1rem" }}>{title}</h3>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {points.map((p, i) => (
        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ color: accent, fontSize: "0.75rem", marginTop: "4px", flexShrink: 0 }}>✦</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* ══════════════════════════════════════════
   TECHNOLOGY PILL
══════════════════════════════════════════ */
const TechPill = ({ icon, name, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "100px", padding: "8px 18px",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
    color: "rgba(255,255,255,0.7)", fontWeight: 500,
    transition: "all 0.2s",
  }}
    onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
  >
    <span style={{ fontSize: "1.1rem" }}>{icon}</span>
    {name}
  </div>
);

/* ══════════════════════════════════════════
   COURSE CARD (from useAuth courses)
══════════════════════════════════════════ */
const CourseCard = ({ element, navigate }) => (
  <div
    className="h-course-card"
    onClick={() => navigate(`/courses/${element._id}`)}
    style={{
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", overflow: "hidden", cursor: "pointer",
      transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
      <img src={element.courseImg?.url} alt={element.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} className="h-course-img" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,12,0.85) 0%, transparent 60%)" }} />
      {element.category && (
        <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(99,102,241,0.9)", borderRadius: "100px", padding: "3px 12px", fontSize: "0.68rem", fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {element.category}
        </div>
      )}
      <h3 style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff", margin: 0, lineHeight: 1.3 }} className="h-course-title">
        {element.title}
      </h3>
    </div>
    <div style={{ padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ padding: "2px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#818cf8)", flexShrink: 0 }}>
        <img src={element.adminPhoto || "/default-avatar.jpg"} alt={element.adminName} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", display: "block", border: "1.5px solid #05050c" }} onError={e => (e.target.src = "/default-avatar.jpg")} />
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#fff", margin: 0 }}>{element.adminName || "Instructor"}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#818cf8", margin: 0 }}>✦ New Course</p>
      </div>
      <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }} className="h-course-arrow">→</span>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const { courses } = useAuth();
  const pageRef = useRef(null);
  const [contestCount, setContestCount] = useState("50+");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".h-anim", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15 });
      // Feature cards
      gsap.fromTo(".h-feat-card", { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out", delay: 0.4 });
      // Platform cards
      gsap.fromTo(".h-plat-card", { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.5 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Data ── */
  const features = [
    { icon: "🏆", title: "Coding Contests", desc: "Time-bound challenges with automated code evaluation, real-time leaderboards, and multiple problem categories." },
    { icon: "📅", title: "Timetable Schedule", desc: "Create, modify, and view class schedules. Automated notifications for students and faculty about upcoming events." },
    { icon: "📊", title: "Results Management", desc: "View grades, analyze performance trends, export and print results with rich performance insights." },
    { icon: "🎓", title: "Trending Courses", desc: "Explore top-enrolled courses with ratings, instructor details, and direct enrollment options." },
    { icon: "📋", title: "All Courses", desc: "Comprehensive course catalog with categorized listings, instructor profiles, and enrollment deadlines." },
    { icon: "🛠️", title: "Admin Dashboard", desc: "User management, contest monitoring, performance analytics, and content creation tools for admins." },
  ];

  const platformCards = [
    {
      number: "01", icon: "⚡", title: "AllCoding Contest",
      accent: "#818cf8",
      points: [
        "Time-bound programming challenges",
        "Automated code evaluation engine",
        "Real-time leaderboard tracking",
        "Multiple problem categories & fair scoring",
        "Powered by Contest Hive platform",
      ],
    },
    {
      number: "02", icon: "📅", title: "Timetable & Schedule",
      accent: "#34d399",
      points: [
        "Create and modify timetables",
        "View schedules for students & faculty",
        "Automated notifications for class timings",
        "Easy access to course-related events",
      ],
    },
    {
      number: "03", icon: "📈", title: "Results Management",
      accent: "#fbbf24",
      points: [
        "View student grades and performance",
        "Analyze trends and performance insights",
        "Export and print results easily",
        "Comprehensive evaluation system",
      ],
    },
    {
      number: "04", icon: "🛡️", title: "Admin & Creator Dashboard",
      accent: "#f87171",
      points: [
        "User management for students & teachers",
        "Contest and timetable monitoring",
        "Performance analytics and reports",
        "Content creation for courses and tests",
      ],
    },
    {
      number: "05", icon: "💬", title: "Contact & Support",
      accent: "#38bdf8",
      points: [
        "Contact form for queries & assistance",
        "Admin support system for troubleshooting",
        "Frequently Asked Questions section",
      ],
    },
    {
      number: "06", icon: "ℹ️", title: "About NIELIT-InfoTrack",
      accent: "#a78bfa",
      points: [
        "Vision & mission of the platform",
        "Development team details",
        "History and objectives",
        "NIELIT Delhi — premier tech institute",
      ],
    },
  ];

  const techs = [
    { icon: "⚛️", name: "React.js",     color: "#38bdf8" },
    { icon: "🟢", name: "Node.js",      color: "#34d399" },
    { icon: "🚂", name: "Express.js",   color: "#818cf8" },
    { icon: "🍃", name: "MongoDB",      color: "#34d399" },
    { icon: "🔐", name: "JWT Auth",     color: "#fbbf24" },
    { icon: "🎨", name: "Tailwind CSS", color: "#38bdf8" },
    { icon: "📡", name: "REST APIs",    color: "#a78bfa" },
    { icon: "🏁", name: "Contest Hive", color: "#f87171" },
  ];

  return (
    <div ref={pageRef} style={{ minHeight: "100vh", background: "#05050c", color: "#fff", fontFamily: "'DM Sans', sans-serif", position: "relative", overflowX: "hidden" }}>
      <Background />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .h-course-card:hover .h-course-img{transform:scale(1.07);}
        .h-course-card:hover .h-course-title{color:#818cf8;}
        .h-course-card:hover .h-course-arrow{color:#818cf8;transform:translateX(4px);}
        .h-course-arrow{transition:all 0.2s;}
        .h-view-btn:hover{background:rgba(99,102,241,0.12)!important;border-color:rgba(129,140,248,0.5)!important;}
        .h-cta-btn:hover{opacity:0.88!important;transform:translateY(-2px)!important;}
        .h-outline-btn:hover{border-color:rgba(129,140,248,0.5)!important;color:#fff!important;}
        @media(max-width:700px){
          .h-stats-row{gap:1.5rem!important;padding:1.5rem!important;}
          .h-platform-grid{grid-template-columns:1fr!important;}
          .h-tech-row{justify-content:flex-start!important;}
        }
      `}</style>

      {/* ═══════════════════════════
          HERO SECTION
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "7rem 2rem 5rem", textAlign: "center" }}>

        {/* Badge */}
        <div className="h-anim" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.28)", borderRadius: "100px", padding: "6px 18px", marginBottom: "2rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#818cf8", display: "inline-block", animation: "hPulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#818cf8", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            NIELIT Delhi · Academic Management Platform
          </span>
        </div>
        <style>{`@keyframes hPulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

        {/* Main Headline */}
        <h1 className="h-anim" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 9vw, 7.5rem)", lineHeight: 1.0, letterSpacing: "-0.035em", marginBottom: "0.5rem", maxWidth: "950px" }}>
          NIELIT
        </h1>
        <h1 className="h-anim" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 9vw, 7.5rem)", lineHeight: 1.0, letterSpacing: "-0.035em", marginBottom: "1.75rem", maxWidth: "950px", background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          InfoTrack
        </h1>

        {/* Description */}
        <p className="h-anim" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,255,255,0.52)", lineHeight: 1.8, maxWidth: "640px", marginBottom: "3rem" }}>
          A comprehensive learning and competition management platform — seamless course tracking, coding contests, timetable scheduling, and result management for students, educators, and administrators.
        </p>

        {/* CTA Row */}
        <div className="h-anim" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "5rem" }}>
          <button
            onClick={() => navigate("/register")}
            className="h-cta-btn"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", border: "none", borderRadius: "10px", padding: "14px 34px", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s" }}
          >
            Get Started Free →
          </button>
          <button
            onClick={() => navigate("/contests")}
            className="h-outline-btn"
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", padding: "14px 34px", color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}
          >
            🏆 Join Contests
          </button>
          <button
            onClick={() => navigate("/courses")}
            className="h-outline-btn"
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", padding: "14px 34px", color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}
          >
            🎓 Browse Courses
          </button>
        </div>

        {/* Stats Row */}
        <div className="h-anim h-stats-row" style={{ display: "flex", gap: "clamp(1.5rem,5vw,4rem)", flexWrap: "wrap", justifyContent: "center", padding: "2rem 3rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px" }}>
          <Stat value="500+"  label="Students"  icon="👥" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
          <Stat value="50+"   label="Contests"  icon="🏆" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
          <Stat value="120+"  label="Courses"   icon="📚" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
          <Stat value="30+"   label="Events"    icon="🚀" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
          <Stat value="98%"   label="Uptime"    icon="⚡" />
        </div>
      </section>

      {/* ═══════════════════════════
          TRENDING COURSES (Live data from useAuth)
      ═══════════════════════════ */}
      {courses && courses.length > 0 && (
        <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <SectionLabel text="Live from Platform" />
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "-0.025em", color: "#fff" }}>
                Trending <span style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Courses</span>
              </h2>
            </div>
            <button onClick={() => navigate("/courses")} className="h-view-btn" style={{ background: "none", border: "1px solid rgba(129,140,248,0.28)", borderRadius: "10px", padding: "10px 22px", color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" }}>
              View All Courses →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.4rem" }}>
            {courses.slice(0, 4).map(el => (
              <CourseCard key={el._id} element={el} navigate={navigate} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════
          PLATFORM FEATURES SECTION
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionLabel text="Everything Included" />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em", color: "#fff", marginBottom: "0.75rem" }}>
            Built for <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Learning</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto" }}>
            Six powerful modules seamlessly integrated into one platform for students, educators, and administrators.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.3rem" }}>
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </section>

      {/* ═══════════════════════════
          PLATFORM CARDS (Detailed)
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionLabel text="Platform Deep-Dive" />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em", color: "#fff" }}>
            What You Get
          </h2>
        </div>

        <div className="h-platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.3rem" }}>
          {platformCards.map((card, i) => <PlatformCard key={i} {...card} />)}
        </div>
      </section>

      {/* ═══════════════════════════
          CONTEST HIVE HIGHLIGHT
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem 5rem" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(167,139,250,0.08) 100%)", border: "1px solid rgba(99,102,241,0.22)", borderRadius: "24px", padding: "clamp(2rem,5vw,4rem)", display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 300px" }}>
            <SectionLabel text="Coding Platform Integration" />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", letterSpacing: "-0.025em", color: "#fff", marginBottom: "1rem" }}>
              Powered by<br />
              <span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Contest Hive</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.75rem", maxWidth: "420px" }}>
              Our AllCoding Contest module is powered by Contest Hive — a real-time competitive programming platform where participants solve algorithmic and logical problems within a given time frame.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/contests")}
                className="h-cta-btn"
                style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", borderRadius: "10px", padding: "12px 28px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s" }}
              >
                View Contests →
              </button>
              <a
                href="https://contest-hive.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="h-outline-btn"
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", padding: "12px 28px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}
              >
                ↗ Contest Hive
              </a>
            </div>
          </div>

          {/* Contest mini stats */}
          <div style={{ flex: "0 1 260px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Active Contests",    value: "12",    icon: "⚡", color: "#818cf8" },
              { label: "Problems Available", value: "240+",  icon: "💡", color: "#34d399" },
              { label: "Participants",        value: "500+",  icon: "👥", color: "#fbbf24" },
              { label: "Avg Rating",          value: "4.9 ★", icon: "🏆", color: "#f87171" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem 1.25rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: item.color }}>{item.value}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.42)" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          TECH STACK
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel text="Technology Stack" />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", letterSpacing: "-0.025em", color: "#fff" }}>
            Built with Modern Tech
          </h2>
        </div>

        <div className="h-tech-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {techs.map((t, i) => <TechPill key={i} {...t} />)}
        </div>
      </section>

      {/* ═══════════════════════════
          BOTTOM CTA
      ═══════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto 6rem", padding: "0 2rem" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(167,139,250,0.08) 100%)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "24px", padding: "clamp(2.5rem,5vw,4.5rem) 2rem", textAlign: "center" }}>

          {/* Decorative top line */}
          <div style={{ width: "60px", height: "3px", borderRadius: "2px", background: "linear-gradient(90deg,#6366f1,#818cf8)", margin: "0 auto 2rem" }} />

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "1rem" }}>
            Ready to Transform<br />
            <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Learning Journey?</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.98rem", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Join hundreds of NIELIT Delhi students and faculty already using InfoTrack to learn, compete, and grow together.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/register")}
              className="h-cta-btn"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", borderRadius: "10px", padding: "14px 40px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s" }}
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate("/about")}
              className="h-outline-btn"
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", padding: "14px 40px", color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              Learn More
            </button>
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
            {["🔐 JWT Secured", "📡 REST API", "🍃 MongoDB", "⚡ Real-time"].map((item, i) => (
              <span key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


// import React from 'react'
// import Hero from "../Home/Hero.jsx"
// import Trending from '../Home/Trending.jsx'
// import TechCourse from "../Home/TechCourse.jsx"
// import Creator from '../Home/Creator.jsx'
// function Home() {
//   return (
//     <>
//      <Hero/>
//      <Trending/>
//      <TechCourse/>
//      <Creator/>
//     </>
//   )
// }

// export default Home

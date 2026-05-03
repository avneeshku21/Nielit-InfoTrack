// src/Home/Hero.jsx
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div style={s.skeletonCard}>
      <div style={s.skeletonImg} />
      <div style={{ padding: "1.25rem" }}>
        <div style={{ ...s.skeletonLine, width: "80%", marginBottom: "10px" }} />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={s.skeletonAvatar} />
          <div style={{ ...s.skeletonLine, width: "55%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Course Card ── */
function CourseCard({ element }) {
  return (
    <Link
      to={`/courses/${element._id}`}
      style={s.cardLink}
      className="hero-card"
    >
      {/* Image Block */}
      <div style={s.cardImgWrap}>
        <img
          src={element.courseImg?.url}
          alt={element.title}
          style={s.cardImg}
        />
        {/* Gradient overlay */}
        <div style={s.cardImgOverlay} className="hero-card-overlay" />

        {/* Category badge */}
        {element.category && (
          <div style={s.cardCategoryBadge}>
            <span style={s.categoryDot} />
            {element.category}
          </div>
        )}

        {/* Title on image bottom */}
        <h3 style={s.cardImgTitle} className="hero-card-title">
          {element.title}
        </h3>
      </div>

      {/* Author Row */}
      <div style={s.cardBody}>
        <div style={s.authorAvatarRing}>
          <img
            src={element.adminPhoto || "/default-avatar.jpg"}
            alt={element.adminName}
            style={s.authorAvatar}
            onError={(e) => (e.target.src = "/default-avatar.jpg")}
          />
        </div>
        <div>
          <p style={s.authorName}>{element.adminName || "Instructor"}</p>
          <span style={s.newBadge}>✦ New</span>
        </div>

        {/* Arrow icon */}
        <div style={s.cardArrow} className="hero-card-arrow">→</div>
      </div>
    </Link>
  );
}

/* ── Main Hero Component ── */
function Hero() {
  const { courses } = useAuth();
  console.log(courses);

  return (
    <section style={s.section}>
      <style>{globalCSS}</style>

      {/* Section header */}
      <div style={s.sectionHeader}>
        <div style={s.sectionBadge}>
          <span style={{ ...s.categoryDot, background: "#818cf8" }} />
          Featured Courses
        </div>
        <h2 style={s.sectionTitle}>
          Start Learning <span style={s.titleAccent}>Today</span>
        </h2>
        <p style={s.sectionSubtitle}>
          Hand-picked courses to accelerate your skills
        </p>
      </div>

      {/* Cards Grid */}
      {courses && courses.length > 0 ? (
        <div style={s.grid}>
          {courses.slice(0, 4).map((element) => (
            <CourseCard key={element._id} element={element} />
          ))}
        </div>
      ) : (
        /* Skeleton loading */
        <div style={s.grid}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* View All CTA */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link to="/courses" style={s.viewAllBtn} className="hero-view-all">
          View All Courses →
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const s = {
  section: {
    padding: "5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'DM Sans', sans-serif",
  },

  /* Section Header */
  sectionHeader: {
    textAlign: "center",
    marginBottom: "3.5rem",
  },
  sectionBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "100px",
    padding: "5px 16px",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#818cf8",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: "1.1rem",
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    letterSpacing: "-0.03em",
    color: "#ffffff",
    marginBottom: "0.6rem",
  },
  titleAccent: {
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.42)",
    fontSize: "0.95rem",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },

  /* Card */
  cardLink: {
    textDecoration: "none",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },

  /* Card Image */
  cardImgWrap: {
    position: "relative",
    aspectRatio: "16/10",
    overflow: "hidden",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  cardImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(5,5,12,0.85) 0%, rgba(5,5,12,0.2) 50%, transparent 100%)",
    transition: "opacity 0.3s ease",
  },
  cardCategoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(99,102,241,0.85)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(129,140,248,0.4)",
    borderRadius: "100px",
    padding: "4px 12px",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  categoryDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    display: "inline-block",
    flexShrink: 0,
  },
  cardImgTitle: {
    position: "absolute",
    bottom: "12px",
    left: "14px",
    right: "14px",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#ffffff",
    margin: 0,
    lineHeight: 1.3,
    transition: "color 0.2s",
  },

  /* Card Body */
  cardBody: {
    padding: "1.1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    flex: 1,
    position: "relative",
  },
  authorAvatarRing: {
    padding: "2px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    flexShrink: 0,
  },
  authorAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    border: "2px solid #05050c",
  },
  authorName: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#ffffff",
    margin: "0 0 3px",
  },
  newBadge: {
    fontSize: "0.68rem",
    color: "#818cf8",
    fontWeight: 500,
    letterSpacing: "0.06em",
  },
  cardArrow: {
    marginLeft: "auto",
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.2)",
    transition: "color 0.2s, transform 0.2s",
  },

  /* View All */
  viewAllBtn: {
    display: "inline-block",
    background: "none",
    border: "1px solid rgba(129,140,248,0.35)",
    borderRadius: "10px",
    padding: "11px 32px",
    color: "#818cf8",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "all 0.2s",
    letterSpacing: "0.02em",
  },

  /* Skeleton */
  skeletonCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "18px",
    overflow: "hidden",
    animation: "sk-pulse 1.6s ease-in-out infinite",
  },
  skeletonImg: {
    width: "100%",
    aspectRatio: "16/10",
    background: "rgba(255,255,255,0.07)",
  },
  skeletonLine: {
    height: "12px",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.07)",
  },
  skeletonAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    flexShrink: 0,
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }

  @keyframes sk-pulse {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }

  .hero-card:hover {
    transform: translateY(-6px) !important;
    border-color: rgba(129,140,248,0.3) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
  }
  .hero-card:hover img {
    transform: scale(1.05);
  }
  .hero-card:hover .hero-card-title {
    color: #818cf8 !important;
  }
  .hero-card:hover .hero-card-arrow {
    color: #818cf8 !important;
    transform: translateX(4px) !important;
  }
  .hero-view-all:hover {
    background: rgba(99,102,241,0.1) !important;
    border-color: rgba(129,140,248,0.6) !important;
  }
`;

export default Hero;
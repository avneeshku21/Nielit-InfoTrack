// src/Home/CourseCarousel.jsx
// Shared carousel card + styles used by TechCourse & Trending
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop:           { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet:            { breakpoint: { max: 1024, min: 600  }, items: 2 },
  mobile:            { breakpoint: { max: 600,  min: 0    }, items: 1 },
};

/* ── Skeleton Card ── */
export function CarouselSkeletonCard() {
  return (
    <div style={cs.skeletonWrap}>
      <div style={cs.skeletonImg} />
      <div style={{ padding: "1rem" }}>
        <div style={{ ...cs.skeletonLine, width: "85%", marginBottom: "8px" }} />
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={cs.skeletonAvatar} />
          <div style={{ ...cs.skeletonLine, width: "55%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Course Card ── */
export function CarouselCourseCard({ element }) {
  return (
    <Link to={`/courses/${element._id}`} style={cs.cardLink} className="cc-card">
      {/* Image */}
      <div style={cs.imgWrap}>
        <img
          src={element.courseImg?.url || "/placeholder.jpg"}
          alt={element.title || "Course"}
          style={cs.img}
        />
        {/* Overlay */}
        <div style={cs.imgOverlay} />

        {/* Category pill */}
        <div style={cs.categoryPill}>
          <span style={cs.categoryDot} />
          {element.category || "General"}
        </div>
      </div>

      {/* Body */}
      <div style={cs.body}>
        <h3 style={cs.title} className="cc-title">
          {element.title || "Untitled Course"}
        </h3>
        <div style={cs.authorRow}>
          <div style={cs.avatarRing}>
            <img
              src={element.adminPhoto || "/default-avatar.jpg"}
              alt={element.adminName || "Instructor"}
              style={cs.avatar}
              onError={(e) => (e.target.src = "/default-avatar.jpg")}
            />
          </div>
          <p style={cs.authorName}>{element.adminName || "Instructor"}</p>
          <span style={cs.arrowIcon} className="cc-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Carousel Wrapper ── */
export function CourseCarouselBlock({ courses, loading, title, accent }) {
  return (
    <div style={cs.block}>
      <style>{carouselCSS}</style>

      {/* Header */}
      <div style={cs.header}>
        <div style={{ ...cs.accentBar, background: accent || "linear-gradient(90deg,#6366f1,#818cf8)" }} />
        <div>
          <h2 style={cs.sectionTitle}>{title}</h2>
          <p style={cs.sectionSub}>
            {title === "Trending"
              ? "Most popular picks right now"
              : "Curated technical skill-builders"}
          </p>
        </div>
        <Link to="/courses" style={cs.seeAllBtn} className="cc-see-all">
          See all →
        </Link>
      </div>

      {loading ? (
        /* Skeleton row */
        <div style={cs.skeletonRow}>
          {[1, 2, 3, 4].map((i) => (
            <CarouselSkeletonCard key={i} />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={false}
          itemClass="cc-item-class"
          containerClass="cc-container"
          arrows
        >
          {courses.slice(0, 6).map((element) => (
            <CarouselCourseCard key={element._id} element={element} />
          ))}
        </Carousel>
      ) : (
        <div style={cs.empty}>
          <span style={{ fontSize: "2rem" }}>📭</span>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            No courses available yet.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const cs = {
  block: {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'DM Sans', sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  accentBar: {
    width: "4px",
    height: "42px",
    borderRadius: "4px",
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
    letterSpacing: "-0.02em",
    color: "#ffffff",
    margin: "0 0 4px",
  },
  sectionSub: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.38)",
    margin: 0,
  },
  seeAllBtn: {
    marginLeft: "auto",
    textDecoration: "none",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "#818cf8",
    border: "1px solid rgba(129,140,248,0.25)",
    borderRadius: "8px",
    padding: "7px 16px",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },

  /* Card */
  cardLink: {
    textDecoration: "none",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    margin: "0 8px",
  },
  imgWrap: {
    position: "relative",
    aspectRatio: "16/9",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(5,5,12,0.7) 0%, transparent 60%)",
  },
  categoryPill: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(99,102,241,0.85)",
    backdropFilter: "blur(6px)",
    borderRadius: "100px",
    padding: "3px 10px",
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  categoryDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    display: "inline-block",
    flexShrink: 0,
  },
  body: {
    padding: "1rem 1.1rem",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    color: "#ffffff",
    margin: 0,
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    transition: "color 0.2s",
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "auto",
  },
  avatarRing: {
    padding: "1.5px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    flexShrink: 0,
  },
  avatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    border: "1.5px solid #05050c",
  },
  authorName: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.48)",
    margin: 0,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  arrowIcon: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.2)",
    transition: "color 0.2s, transform 0.2s",
    marginLeft: "auto",
  },

  /* Skeleton */
  skeletonRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
  },
  skeletonWrap: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    overflow: "hidden",
    animation: "cc-pulse 1.6s ease-in-out infinite",
  },
  skeletonImg: {
    width: "100%",
    aspectRatio: "16/9",
    background: "rgba(255,255,255,0.07)",
  },
  skeletonLine: {
    height: "11px",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.07)",
  },
  skeletonAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    flexShrink: 0,
  },

  /* Empty */
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
  },
};

const carouselCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }

  @keyframes cc-pulse {
    0%,100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }

  /* Override react-multi-carousel dots/arrows */
  .cc-container { padding-bottom: 0.5rem; }
  .cc-item-class { display: flex; align-items: stretch; }

  .react-multiple-carousel__arrow {
    background: rgba(99,102,241,0.2) !important;
    border: 1px solid rgba(129,140,248,0.3) !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  .react-multiple-carousel__arrow:hover {
    background: rgba(99,102,241,0.5) !important;
  }
  .react-multiple-carousel__arrow::before {
    color: #818cf8 !important;
    font-size: 14px !important;
  }

  .cc-card:hover {
    transform: translateY(-5px) !important;
    border-color: rgba(129,140,248,0.28) !important;
    box-shadow: 0 16px 32px rgba(0,0,0,0.4) !important;
  }
  .cc-card:hover img { transform: scale(1.06); }
  .cc-card:hover .cc-title { color: #818cf8 !important; }
  .cc-card:hover .cc-arrow { color: #818cf8 !important; transform: translateX(4px) !important; }
  .cc-see-all:hover {
    background: rgba(99,102,241,0.1) !important;
    border-color: rgba(129,140,248,0.5) !important;
  }
`;
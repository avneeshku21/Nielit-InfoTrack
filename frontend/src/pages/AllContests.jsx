// src/pages/AllContests.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════
   PLATFORM CONFIG — logo, colors, description, icon
══════════════════════════════════════════ */
const PLATFORM_CONFIG = {
  Codeforces: {
    color: "#e8534a",
    bg: "rgba(232,83,74,0.1)",
    border: "rgba(232,83,74,0.25)",
    icon: "⚔️",
    logo: "https://codeforces.org/s/0/images/codeforces-sponsored-by-ton.png",
    fallbackLogo: "CF",
    desc: "Competitive programming platform with diverse problem sets and global rankings.",
    tag: "Competitive",
  },
  CodeChef: {
    color: "#f5a623",
    bg: "rgba(245,166,35,0.1)",
    border: "rgba(245,166,35,0.25)",
    icon: "🍴",
    logo: "https://cdn.codechef.com/images/cc-logo.svg",
    fallbackLogo: "CC",
    desc: "Monthly coding contests with beginner to expert difficulty levels.",
    tag: "Rated",
  },
  Atcoder: {
    color: "#4a9eff",
    bg: "rgba(74,158,255,0.1)",
    border: "rgba(74,158,255,0.25)",
    icon: "🎯",
    logo: null,
    fallbackLogo: "AC",
    desc: "High-quality algorithmic contests from Japan, renowned for mathematical depth.",
    tag: "Algorithm",
  },
  LeetCode: {
    color: "#ffa116",
    bg: "rgba(255,161,22,0.1)",
    border: "rgba(255,161,22,0.25)",
    icon: "🧩",
    logo: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
    fallbackLogo: "LC",
    desc: "Interview-style programming challenges with weekly and biweekly contests.",
    tag: "Interview",
  },
  HackerEarth: {
    color: "#3b88f7",
    bg: "rgba(59,136,247,0.1)",
    border: "rgba(59,136,247,0.25)",
    icon: "🌐",
    logo: null,
    fallbackLogo: "HE",
    desc: "Hackathons and coding challenges with prizes and hiring opportunities.",
    tag: "Hackathon",
  },
  HackerRank: {
    color: "#2ec866",
    bg: "rgba(46,200,102,0.1)",
    border: "rgba(46,200,102,0.25)",
    icon: "🏅",
    logo: null,
    fallbackLogo: "HR",
    desc: "Skills-based contests focusing on domains like AI, SQL, and algorithms.",
    tag: "Skills",
  },
  GeeksForGeeks: {
    color: "#2f8d46",
    bg: "rgba(47,141,70,0.1)",
    border: "rgba(47,141,70,0.25)",
    icon: "📖",
    logo: null,
    fallbackLogo: "GFG",
    desc: "Practice contests focused on placement preparation and DSA mastery.",
    tag: "Practice",
  },
  default: {
    color: "#818cf8",
    bg: "rgba(129,140,248,0.1)",
    border: "rgba(129,140,248,0.25)",
    icon: "🏆",
    logo: null,
    fallbackLogo: "??",
    desc: "Competitive programming contest with challenging problems for all skill levels.",
    tag: "Contest",
  },
};

function getPlatformConfig(platform) {
  if (!platform) return PLATFORM_CONFIG.default;
  const key = Object.keys(PLATFORM_CONFIG).find(
    (k) => k.toLowerCase() === platform.toLowerCase()
  );
  return PLATFORM_CONFIG[key] || PLATFORM_CONFIG.default;
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function formatDuration(seconds) {
  if (!seconds) return "N/A";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatDate(iso) {
  if (!iso) return "TBA";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function getStatus(startTime, endTime) {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "ended";
}

function getTimeUntil(startTime) {
  const diff = new Date(startTime).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${mins}m`;
  return `Starts in ${mins}m`;
}

/* ══════════════════════════════════════════
   PLATFORM LOGO / BADGE
══════════════════════════════════════════ */
function PlatformBadge({ platform, config }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      width: "44px", height: "44px", borderRadius: "12px",
      background: config.bg, border: `1px solid ${config.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: config.logo && !imgError ? "0" : "0.7rem",
      fontFamily: "'Syne', sans-serif", fontWeight: 800,
      color: config.color, flexShrink: 0, overflow: "hidden",
    }}>
      {config.logo && !imgError ? (
        <img
          src={config.logo}
          alt={platform}
          onError={() => setImgError(true)}
          style={{ width: "28px", height: "28px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
      ) : (
        <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          {config.fallbackLogo}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTEST CARD
══════════════════════════════════════════ */
function ContestCard({ contest }) {
  const cfg = getPlatformConfig(contest.platform);
  const status = getStatus(contest.startTime, contest.endTime);
  const timeUntil = status === "upcoming" ? getTimeUntil(contest.startTime) : null;

  const statusConfig = {
    live:     { label: "● Live Now",  color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" },
    upcoming: { label: "⏳ Upcoming", color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
    ended:    { label: "✓ Ended",    color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
  }[status];

  return (
    <a
      href={contest.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
      className="ac-card-link"
    >
      <div
        className="ac-card"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid rgba(255,255,255,0.07)`,
          borderRadius: "18px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* ── Colored top bar ── */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}55)`,
        }} />

        {/* ── Card Header: Banner area ── */}
        <div style={{
          background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(5,5,12,0) 100%)`,
          padding: "1.4rem 1.4rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative bg number */}
          <div style={{
            position: "absolute", right: "-8px", top: "-10px",
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "5.5rem", color: `${cfg.color}08`,
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>
            {cfg.icon}
          </div>

          {/* Top row: Logo + Status */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <PlatformBadge platform={contest.platform} config={cfg} />
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.38)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Platform
                </p>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.88rem", fontWeight: 700, color: cfg.color, margin: 0 }}>
                  {contest.platform || "Unknown"}
                </p>
              </div>
            </div>

            {/* Status pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: statusConfig.bg, border: `1px solid ${statusConfig.border}`,
              borderRadius: "100px", padding: "4px 10px",
              fontSize: "0.68rem", fontWeight: 600,
              color: statusConfig.color, fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.04em",
            }}>
              {statusConfig.label}
            </div>
          </div>

          {/* Contest Title */}
          <h3 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700,
            fontSize: "0.97rem", color: "#ffffff", lineHeight: 1.4,
            margin: "0 0 0.75rem",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {contest.title || "Unnamed Contest"}
          </h3>

          {/* Tag */}
          <span style={{
            display: "inline-block",
            background: `${cfg.color}18`, border: `1px solid ${cfg.color}30`,
            borderRadius: "100px", padding: "3px 10px",
            fontSize: "0.66rem", fontWeight: 600, color: cfg.color,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "'DM Sans',sans-serif",
          }}>
            {cfg.tag}
          </span>
        </div>

        {/* ── Description ── */}
        <div style={{ padding: "1rem 1.4rem 0", flex: 1 }}>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem",
            color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0,
          }}>
            {cfg.desc}
          </p>
        </div>

        {/* ── Details Grid ── */}
        <div style={{ padding: "1rem 1.4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {/* Start Date */}
          <div style={detailBox}>
            <span style={detailIcon}>📅</span>
            <div>
              <p style={detailLabel}>Start Date</p>
              <p style={detailValue}>{formatDate(contest.startTime)}</p>
            </div>
          </div>
          {/* Start Time */}
          <div style={detailBox}>
            <span style={detailIcon}>🕒</span>
            <div>
              <p style={detailLabel}>Start Time</p>
              <p style={detailValue}>{formatTime(contest.startTime)}</p>
            </div>
          </div>
          {/* End Time */}
          <div style={detailBox}>
            <span style={detailIcon}>🏁</span>
            <div>
              <p style={detailLabel}>End Time</p>
              <p style={detailValue}>{formatTime(contest.endTime)}</p>
            </div>
          </div>
          {/* Duration */}
          <div style={detailBox}>
            <span style={detailIcon}>⏱️</span>
            <div>
              <p style={detailLabel}>Duration</p>
              <p style={{ ...detailValue, color: cfg.color }}>{formatDuration(contest.duration)}</p>
            </div>
          </div>
        </div>

        {/* ── Time Until / CTA ── */}
        <div style={{
          padding: "0 1.4rem 1.4rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "10px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1rem",
        }}>
          {timeUntil && (
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem",
              color: "#fbbf24", fontWeight: 600,
            }}>
              ⚡ {timeUntil}
            </span>
          )}
          {status === "live" && (
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#34d399", fontWeight: 600 }}>
              🔴 Contest is Live!
            </span>
          )}
          {status === "ended" && (
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
              Contest ended
            </span>
          )}

          <div
            style={{
              marginLeft: "auto",
              background: status === "ended"
                ? "rgba(255,255,255,0.06)"
                : `linear-gradient(135deg, ${cfg.color}cc, ${cfg.color}88)`,
              border: status === "ended" ? "1px solid rgba(255,255,255,0.1)" : "none",
              borderRadius: "8px",
              padding: "8px 18px",
              color: status === "ended" ? "rgba(255,255,255,0.35)" : "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="ac-cta"
          >
            {status === "ended" ? "View Results" : "Register Now"} →
          </div>
        </div>
      </div>
    </a>
  );
}

const detailBox = {
  display: "flex", gap: "8px", alignItems: "flex-start",
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "10px", padding: "0.6rem 0.75rem",
};
const detailIcon = { fontSize: "0.85rem", marginTop: "2px", flexShrink: 0 };
const detailLabel = { fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px" };
const detailValue = { fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#ffffff", margin: 0 };

/* ══════════════════════════════════════════
   SKELETON CARD
══════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "18px", overflow: "hidden", animation: "acPulse 1.6s ease-in-out infinite",
    }}>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ padding: "1.4rem" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: "10px", background: "rgba(255,255,255,0.07)", borderRadius: "6px", marginBottom: "6px", width: "40%" }} />
            <div style={{ height: "13px", background: "rgba(255,255,255,0.09)", borderRadius: "6px", width: "60%" }} />
          </div>
        </div>
        <div style={{ height: "16px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", marginBottom: "8px" }} />
        <div style={{ height: "16px", background: "rgba(255,255,255,0.07)", borderRadius: "6px", width: "75%" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FILTER PILL
══════════════════════════════════════════ */
function FilterPill({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? `${color || "#818cf8"}22` : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? (color || "#818cf8") + "55" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "100px", padding: "7px 18px",
        color: active ? (color || "#818cf8") : "rgba(255,255,255,0.55)",
        fontFamily: "'DM Sans',sans-serif", fontWeight: active ? 600 : 500,
        fontSize: "0.82rem", cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [filterPlatform, setFilterPlatform] = useState("All");
  const [filterStatus, setFilterStatus]     = useState("All");
  const navigate = useNavigate();

  /* ── Fetch (your original logic, untouched) ── */
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("https://contest-hive.vercel.app/api/all");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("API Response:", data);
        if (!data || !data.data || typeof data.data !== "object")
          throw new Error("Invalid API response: Expected an object with contests");
        const contestList = Object.values(data.data).flat();
        if (!Array.isArray(contestList) || contestList.length === 0)
          throw new Error("No contests found.");
        setContests(contestList);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  /* ── Derived data ── */
  const platforms = useMemo(() => {
    const p = [...new Set(contests.map(c => c.platform).filter(Boolean))];
    return ["All", ...p];
  }, [contests]);

  const filtered = useMemo(() => {
    return contests.filter(c => {
      const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.platform?.toLowerCase().includes(search.toLowerCase());
      const matchPlatform = filterPlatform === "All" || c.platform === filterPlatform;
      const status = getStatus(c.startTime, c.endTime);
      const matchStatus = filterStatus === "All" || status === filterStatus.toLowerCase();
      return matchSearch && matchPlatform && matchStatus;
    });
  }, [contests, search, filterPlatform, filterStatus]);

  const liveCount     = contests.filter(c => getStatus(c.startTime, c.endTime) === "live").length;
  const upcomingCount = contests.filter(c => getStatus(c.startTime, c.endTime) === "upcoming").length;

  return (
    <div style={{ minHeight: "100vh", background: "#05050c", color: "#fff", fontFamily: "'DM Sans', sans-serif", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes acPulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes acSpin  { to{transform:rotate(360deg)} }
        .ac-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(129,140,248,0.28) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5) !important;
        }
        .ac-back-btn:hover { color:#fff!important; border-color:rgba(129,140,248,0.4)!important; }
        .ac-search:focus   { border-color:rgba(129,140,248,0.5)!important; box-shadow:0 0 0 3px rgba(99,102,241,0.1)!important; }
        .ac-search::placeholder { color:rgba(255,255,255,0.22); }
      `}</style>

      {/* BG */}
      <div style={{ position:"fixed",top:"-5%",left:"5%",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%)",pointerEvents:"none",zIndex:0 }} />
      <div style={{ position:"fixed",bottom:"0",right:"5%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.08) 0%,transparent 65%)",pointerEvents:"none",zIndex:0 }} />
      <div style={{ position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(129,140,248,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none",zIndex:0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate("/")}
          className="ac-back-btn"
          style={{ background:"none",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",padding:"7px 16px",borderRadius:"8px",cursor:"pointer",marginBottom:"2.5rem",transition:"all 0.2s",display:"inline-flex",alignItems:"center",gap:"6px" }}
        >
          ← Back to Home
        </button>

        {/* ── Page Header ── */}
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          {/* Live pulse badge */}
          {liveCount > 0 && (
            <div style={{ display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(52,211,153,0.1)",border:"1px solid rgba(52,211,153,0.3)",borderRadius:"100px",padding:"5px 16px",marginBottom:"1.25rem",fontSize:"0.75rem",fontWeight:600,color:"#34d399",letterSpacing:"0.1em",textTransform:"uppercase" }}>
              <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#34d399",display:"inline-block",animation:"acPulse 1.5s ease-in-out infinite" }} />
              {liveCount} Contest{liveCount > 1 ? "s" : ""} Live Now
            </div>
          )}

          <h1 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(2rem,6vw,4rem)",letterSpacing:"-0.035em",marginBottom:"0.75rem",background:"linear-gradient(135deg,#ffffff 40%,#818cf8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
            Coding Contests
          </h1>
          <p style={{ color:"rgba(255,255,255,0.42)",fontSize:"0.95rem",maxWidth:"520px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Real-time contest listings from Codeforces, CodeChef, AtCoder and more — powered by Contest Hive.
          </p>

          {/* Quick stats */}
          <div style={{ display:"flex",gap:"1.5rem",justifyContent:"center",flexWrap:"wrap" }}>
            {[
              { label:"Total",    value: contests.length,  color:"#818cf8" },
              { label:"Live",     value: liveCount,         color:"#34d399" },
              { label:"Upcoming", value: upcomingCount,     color:"#fbbf24" },
              { label:"Platforms",value: platforms.length - 1, color:"#38bdf8" },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:"center",padding:"0.75rem 1.5rem",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px" }}>
                <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:s.color,lineHeight:1 }}>{loading ? "—" : s.value}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem",color:"rgba(255,255,255,0.38)",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:"4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem",alignItems:"center",marginBottom:"2.5rem",padding:"1.25rem 1.5rem",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px" }}>
          {/* Search */}
          <input
            type="text"
            placeholder="🔍  Search contests or platforms…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="ac-search"
            style={{ flex:"1 1 240px",minWidth:"200px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"10px 14px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem",outline:"none",transition:"border-color 0.2s,box-shadow 0.2s" }}
          />

          {/* Status Filter */}
          <div style={{ display:"flex",gap:"6px",flexWrap:"wrap" }}>
            {["All","Live","Upcoming","Ended"].map(s => (
              <FilterPill key={s} label={s} active={filterStatus === s} onClick={() => setFilterStatus(s)}
                color={s==="Live"?"#34d399":s==="Upcoming"?"#fbbf24":s==="Ended"?"rgba(255,255,255,0.3)":undefined}
              />
            ))}
          </div>
        </div>

        {/* Platform filters */}
        <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"2rem" }}>
          {platforms.map(p => {
            const cfg = getPlatformConfig(p);
            return (
              <FilterPill key={p} label={p} active={filterPlatform === p}
                onClick={() => setFilterPlatform(p)}
                color={p === "All" ? "#818cf8" : cfg.color}
              />
            );
          })}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.4rem",marginBottom:"2rem" }}>
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",paddingTop:"1rem" }}>
              <div style={{ width:"36px",height:"36px",border:"3px solid rgba(99,102,241,0.2)",borderTopColor:"#818cf8",borderRadius:"50%",animation:"acSpin 0.8s linear infinite" }} />
              <p style={{ color:"rgba(255,255,255,0.38)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem" }}>Fetching live contests from Contest Hive…</p>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div style={{ textAlign:"center",padding:"4rem 2rem",background:"rgba(248,113,113,0.05)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:"20px" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>⚠️</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#f87171",marginBottom:"0.5rem" }}>Failed to Load Contests</h3>
            <p style={{ color:"rgba(255,255,255,0.4)",fontSize:"0.88rem",marginBottom:"1.5rem" }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ background:"rgba(248,113,113,0.15)",border:"1px solid rgba(248,113,113,0.3)",borderRadius:"10px",padding:"10px 24px",color:"#f87171",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"0.88rem",cursor:"pointer" }}>
              Try Again
            </button>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign:"center",padding:"4rem 2rem" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>📭</div>
            <p style={{ color:"rgba(255,255,255,0.38)",fontSize:"0.95rem" }}>No contests match your search.</p>
            <button onClick={() => { setSearch(""); setFilterPlatform("All"); setFilterStatus("All"); }} style={{ marginTop:"1rem",background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:"8px",padding:"8px 20px",color:"#818cf8",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",cursor:"pointer",fontWeight:600 }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* ── Contest Grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.3)",marginBottom:"1.25rem",letterSpacing:"0.04em" }}>
              Showing {filtered.length} of {contests.length} contests
            </p>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.4rem" }}>
              {filtered.map((contest, index) => (
                <ContestCard key={`${contest.platform}-${index}`} contest={contest} />
              ))}
            </div>
          </>
        )}

        {/* ── Powered by footer ── */}
        {!loading && !error && (
          <div style={{ textAlign:"center",marginTop:"4rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.25)" }}>
              Contest data powered by{" "}
              <a href="https://contest-hive.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color:"#818cf8",textDecoration:"none",fontWeight:600 }}>
                Contest Hive ↗
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContests;
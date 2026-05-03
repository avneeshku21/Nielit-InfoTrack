// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/* ─────────────────────────────────────────────
   Field config — label, icon, type, placeholder
───────────────────────────────────────────── */
const FIELDS = [
  {
    section: "Personal Info",
    icon: "👤",
    fields: [
      { key: "name",      label: "Full Name",    type: "text",   placeholder: "Your full name",        icon: "✦" },
      { key: "email",     label: "Email",        type: "email",  placeholder: "your@email.com",        icon: "✦" },
      { key: "phone",     label: "Phone",        type: "text",   placeholder: "+91 99999 99999",       icon: "✦" },
      { key: "address",   label: "Address",      type: "text",   placeholder: "City, State, Country",  icon: "✦" },
    ],
  },
  {
    section: "Academic Info",
    icon: "🎓",
    fields: [
      { key: "education",          label: "Education",           type: "text", placeholder: "BCA / MCA / B.Tech …" },
      { key: "college",            label: "College / Institute", type: "text", placeholder: "NIELIT Delhi" },
      { key: "currentCourse",      label: "Current Course",      type: "text", placeholder: "Full Stack Development" },
      { key: "cgpa",               label: "CGPA / Percentage",   type: "text", placeholder: "8.5 / 85%" },
      { key: "relevantCoursework", label: "Relevant Coursework", type: "text", placeholder: "DSA, React, Node.js (comma-separated)" },
    ],
  },
  {
    section: "Social Links",
    icon: "🔗",
    fields: [
      { key: "linkedin",  label: "LinkedIn",  type: "url", placeholder: "https://linkedin.com/in/yourname" },
      { key: "github",    label: "GitHub",    type: "url", placeholder: "https://github.com/yourname" },
      { key: "portfolio", label: "Portfolio", type: "url", placeholder: "https://yourportfolio.com" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Single Field Component
───────────────────────────────────────────── */
function Field({ label, fieldKey, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={s.label}>{label}</label>
      <input
        type={type || "text"}
        name={fieldKey}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...s.input,
          borderColor: focused ? "rgba(129,140,248,0.6)" : "rgba(255,255,255,0.09)",
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section Card
───────────────────────────────────────────── */
function SectionCard({ section, icon, fields, formData, onChange }) {
  return (
    <div style={s.card}>
      {/* Section Header */}
      <div style={s.cardHeader}>
        <div style={s.cardIconWrap}>
          <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        </div>
        <h3 style={s.cardTitle}>{section}</h3>
        <div style={s.cardDivider} />
      </div>

      {/* Fields Grid */}
      <div style={s.fieldsGrid}>
        {fields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            fieldKey={f.key}
            type={f.type}
            placeholder={f.placeholder}
            value={formData[f.key] || ""}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main EditProfile Component
───────────────────────────────────────────── */
function EditProfile() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id || profile?._id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    address: "",
    currentCourse: "",
    college: "",
    cgpa: "",
    relevantCoursework: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  // Populate from profile (your original logic, untouched)
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        education: profile?.education || "",
        address: profile?.address || "",
        currentCourse: profile?.currentCourse || "",
        college: profile?.college || "",
        cgpa: profile?.cgpa || "",
        relevantCoursework: profile?.relevantCoursework?.join(", ") || "",
        linkedin: profile?.socialLinks?.linkedin || "",
        github: profile?.socialLinks?.github || "",
        portfolio: profile?.socialLinks?.portfolio || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler (your original logic, untouched)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        ...formData,
        relevantCoursework: formData.relevantCoursework.split(", "),
      };

      const response = await axios.put(
        `http://localhost:4001/api/users/update-profile/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${profile?.token}` } }
      );

      alert(response.data?.message || "Profile updated successfully!");
      navigate("/myProfile");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <style>{globalCSS}</style>

      {/* ── Background ── */}
      <div style={s.bgGlow1} />
      <div style={s.bgGlow2} />
      <div style={s.bgGrid} />

      {/* ── Page Content ── */}
      <div style={s.wrapper}>

        {/* ── Page Header ── */}
        <div style={s.pageHeader}>
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={s.backBtn}
            className="ep-back-btn"
          >
            ← Back
          </button>

          {/* Title block */}
          <div style={s.titleBlock}>
            {/* Avatar circle */}
            <div style={s.avatarRing}>
              <div style={s.avatar}>
                {profile?.photo?.url ? (
                  <img
                    src={profile.photo.url}
                    alt={profile.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <span style={s.avatarInitial}>
                    {formData.name ? formData.name[0].toUpperCase() : "U"}
                  </span>
                )}
              </div>
            </div>

            <h1 style={s.pageTitle}>Edit Profile</h1>
            <p style={s.pageSubtitle}>
              Keep your academic and social details up to date
            </p>

            {/* Decorative accent line */}
            <div style={s.accentLine} />
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          {/* Section Cards */}
          {FIELDS.map((section) => (
            <SectionCard
              key={section.section}
              {...section}
              formData={formData}
              onChange={handleChange}
            />
          ))}

          {/* ── Submit Row ── */}
          <div style={s.submitRow}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={s.cancelBtn}
              className="ep-cancel-btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...s.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              className="ep-submit-btn"
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                  <span style={s.spinner} />
                  Saving…
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const s = {
  page: {
    minHeight: "100vh",
    background: "#05050c",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    padding: "3rem 1.5rem 5rem",
    position: "relative",
    overflowX: "hidden",
  },

  /* BG effects */
  bgGlow1: {
    position: "fixed",
    top: "-10%",
    left: "20%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGlow2: {
    position: "fixed",
    bottom: "0",
    right: "10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 65%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Wrapper */
  wrapper: {
    position: "relative",
    zIndex: 1,
    maxWidth: "780px",
    margin: "0 auto",
  },

  /* Page Header */
  pageHeader: {
    marginBottom: "2.5rem",
  },
  backBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem",
    padding: "7px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "2rem",
    transition: "all 0.2s",
    display: "inline-block",
  },
  titleBlock: {
    textAlign: "center",
  },
  avatarRing: {
    display: "inline-flex",
    padding: "3px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #818cf8, #a78bfa)",
    marginBottom: "1.25rem",
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#0d0d1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarInitial: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "1.8rem",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    letterSpacing: "-0.03em",
    margin: "0 0 0.5rem",
    background: "linear-gradient(135deg, #ffffff 40%, #818cf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSubtitle: {
    color: "rgba(255,255,255,0.42)",
    fontSize: "0.92rem",
    margin: "0 0 1.5rem",
  },
  accentLine: {
    width: "60px",
    height: "3px",
    borderRadius: "2px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    margin: "0 auto",
  },

  /* Section Card */
  card: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "2rem",
    marginBottom: "1.5rem",
    backdropFilter: "blur(12px)",
    transition: "border-color 0.3s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "1.75rem",
  },
  cardIconWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "0.02em",
  },
  cardDivider: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)",
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "0 1.5rem",
  },

  /* Field */
  label: {
    display: "block",
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.42)",
    marginBottom: "6px",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.93rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },

  /* Submit Row */
  submitRow: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    marginTop: "0.5rem",
    flexWrap: "wrap",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px 28px",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 36px",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.2s",
    minWidth: "160px",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "ep-spin 0.7s linear infinite",
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  input::placeholder { color: rgba(255,255,255,0.22) !important; }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px #0d0d1a inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  @keyframes ep-spin {
    to { transform: rotate(360deg); }
  }

  .ep-back-btn:hover {
    color: #fff !important;
    border-color: rgba(129,140,248,0.4) !important;
  }
  .ep-cancel-btn:hover {
    background: rgba(255,255,255,0.08) !important;
    color: #fff !important;
  }
  .ep-submit-btn:hover {
    opacity: 0.88 !important;
    transform: translateY(-2px) !important;
  }

  @media (max-width: 540px) {
    .ep-submit-row { flex-direction: column !important; }
    .ep-submit-row button { width: 100% !important; }
  }
`;

export default EditProfile;
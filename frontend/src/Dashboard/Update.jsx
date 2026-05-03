// src/Dashboard/Update.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/* ═══════════════════════════════════════════════
   RICH TEXT EDITOR  (pure JS — no extra install)
   Uses execCommand API — works in all browsers
═══════════════════════════════════════════════ */
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInitialized = useRef(false);

  /* Set initial content once */
  useEffect(() => {
    if (editorRef.current && value && !isInitialized.current) {
      editorRef.current.innerHTML = value;
      isInitialized.current = true;
    }
  }, [value]);

  const exec = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    syncContent();
  };

  const syncContent = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertList = (ordered) => {
    editorRef.current?.focus();
    document.execCommand(ordered ? "insertOrderedList" : "insertUnorderedList");
    syncContent();
  };

  const setFontSize = (size) => exec("fontSize", size);
  const setColor    = (color) => exec("foreColor", color);
  const setFont     = (font)  => exec("fontName", font);
  const setAlign    = (cmd)   => exec(cmd);

  /* ── Toolbar Buttons ── */
  const ToolBtn = ({ title, onClick, children, active }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        ...tb.btn,
        background: active ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.04)",
        borderColor: active ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.1)",
        color: active ? "#818cf8" : "rgba(255,255,255,0.7)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(99,102,241,0.15)";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = active ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.04)";
        e.currentTarget.style.color = active ? "#818cf8" : "rgba(255,255,255,0.7)";
      }}
    >
      {children}
    </button>
  );

  const Divider = () => <div style={tb.divider} />;

  const COLORS = [
    "#ffffff", "#818cf8", "#a78bfa", "#34d399",
    "#fbbf24", "#f87171", "#38bdf8", "#fb923c",
  ];

  const FONTS = [
    "Arial", "Georgia", "Courier New", "Times New Roman",
    "Verdana", "Trebuchet MS",
  ];

  return (
    <div style={tb.wrap}>
      {/* ── Toolbar ── */}
      <div style={tb.toolbar}>

        {/* Headings */}
        <select
          onChange={(e) => exec("formatBlock", e.target.value)}
          style={tb.select}
          defaultValue=""
        >
          <option value="" disabled>Heading</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="p">Paragraph</option>
          <option value="blockquote">Blockquote</option>
        </select>

        <Divider />

        {/* Font Family */}
        <select
          onChange={(e) => setFont(e.target.value)}
          style={tb.select}
          defaultValue=""
        >
          <option value="" disabled>Font</option>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
          ))}
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => setFontSize(e.target.value)}
          style={{ ...tb.select, width: "64px" }}
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <option key={s} value={s}>{[10,13,16,18,24,32,48][s-1]}px</option>
          ))}
        </select>

        <Divider />

        {/* Format */}
        <ToolBtn title="Bold (Ctrl+B)"      onClick={() => exec("bold")}          ><b>B</b></ToolBtn>
        <ToolBtn title="Italic (Ctrl+I)"    onClick={() => exec("italic")}        ><i>I</i></ToolBtn>
        <ToolBtn title="Underline (Ctrl+U)" onClick={() => exec("underline")}     ><u>U</u></ToolBtn>
        <ToolBtn title="Strikethrough"      onClick={() => exec("strikeThrough")} ><s>S</s></ToolBtn>

        <Divider />

        {/* Alignment */}
        <ToolBtn title="Align Left"    onClick={() => setAlign("justifyLeft")}   >⬅</ToolBtn>
        <ToolBtn title="Align Center"  onClick={() => setAlign("justifyCenter")} >↔</ToolBtn>
        <ToolBtn title="Align Right"   onClick={() => setAlign("justifyRight")}  >➡</ToolBtn>
        <ToolBtn title="Justify"       onClick={() => setAlign("justifyFull")}   >☰</ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn title="Bullet List"   onClick={() => insertList(false)}>• List</ToolBtn>
        <ToolBtn title="Numbered List" onClick={() => insertList(true)} >1. List</ToolBtn>

        <Divider />

        {/* Indent */}
        <ToolBtn title="Indent"    onClick={() => exec("indent")}  >→|</ToolBtn>
        <ToolBtn title="Outdent"   onClick={() => exec("outdent")} >|←</ToolBtn>

        <Divider />

        {/* Link */}
        <ToolBtn
          title="Insert Link"
          onClick={() => {
            const url = prompt("Enter URL:", "https://");
            if (url) exec("createLink", url);
          }}
        >
          🔗
        </ToolBtn>

        {/* Clear Formatting */}
        <ToolBtn title="Clear Formatting" onClick={() => exec("removeFormat")}>✕ Clear</ToolBtn>

        {/* Colors */}
        <Divider />
        <div style={tb.colorRow}>
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={`Color: ${c}`}
              onClick={() => setColor(c)}
              style={{
                ...tb.colorBtn,
                background: c,
                border: c === "#ffffff" ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
            />
          ))}
          {/* Custom color picker */}
          <label style={tb.colorPickerLabel} title="Custom color">
            <input
              type="color"
              style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
              onChange={(e) => setColor(e.target.value)}
            />
            🎨
          </label>
        </div>
      </div>

      {/* ── Editable Area ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        onBlur={syncContent}
        style={tb.editor}
        data-placeholder="Write your course description here… Use the toolbar above to format headings, bullet points, bold text, colors and more."
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.2);
          pointer-events: none;
        }
        [contenteditable] h1 { font-size:2rem; font-weight:800; margin:0.75rem 0; font-family:'Syne',sans-serif; }
        [contenteditable] h2 { font-size:1.5rem; font-weight:700; margin:0.65rem 0; font-family:'Syne',sans-serif; }
        [contenteditable] h3 { font-size:1.2rem; font-weight:600; margin:0.5rem 0; }
        [contenteditable] h4 { font-size:1rem;   font-weight:600; margin:0.4rem 0; color:#818cf8; }
        [contenteditable] p  { margin:0.4rem 0; line-height:1.8; }
        [contenteditable] ul { padding-left:1.5rem; margin:0.5rem 0; list-style:disc; }
        [contenteditable] ol { padding-left:1.5rem; margin:0.5rem 0; list-style:decimal; }
        [contenteditable] li { margin:0.25rem 0; line-height:1.7; }
        [contenteditable] blockquote {
          border-left:3px solid #6366f1;
          margin:0.75rem 0;
          padding:0.5rem 1rem;
          background:rgba(99,102,241,0.08);
          border-radius:0 8px 8px 0;
          color:rgba(255,255,255,0.7);
          font-style:italic;
        }
        [contenteditable] a { color:#818cf8; text-decoration:underline; }
        [contenteditable] b, [contenteditable] strong { font-weight:700; }
      `}</style>
    </div>
  );
}

/* ── Toolbar styles ── */
const tb = {
  wrap: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.02)",
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    padding: "10px 12px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    alignItems: "center",
  },
  btn: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "7px",
    padding: "5px 10px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
    lineHeight: 1,
    minWidth: "32px",
    textAlign: "center",
  },
  select: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "7px",
    color: "rgba(255,255,255,0.7)",
    padding: "5px 8px",
    fontSize: "0.78rem",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    outline: "none",
    maxWidth: "130px",
  },
  divider: {
    width: "1px",
    height: "22px",
    background: "rgba(255,255,255,0.1)",
    margin: "0 4px",
    flexShrink: 0,
  },
  colorRow: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  colorBtn: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
    transition: "transform 0.15s",
  },
  colorPickerLabel: {
    cursor: "pointer",
    fontSize: "0.9rem",
    position: "relative",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
  editor: {
    minHeight: "280px",
    padding: "1.25rem 1.5rem",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    lineHeight: "1.8",
    outline: "none",
    wordBreak: "break-word",
    overflowY: "auto",
  },
};

/* ═══════════════════════════════════════════════
   MAIN UPDATE COMPONENT
═══════════════════════════════════════════════ */
function Update() {
  const navigateTo = useNavigate();
  const { id }     = useParams();
  const { profile, isAuthenticated } = useAuth();

  const [title,              setTitle]             = useState("");
  const [category,           setCategory]          = useState("");
  const [about,              setAbout]             = useState("");   // now stores HTML
  const [courseImg,          setCourseImg]          = useState("");
  const [courseImagePreview, setCourseImagePreview] = useState("");
  const [saving,             setSaving]            = useState(false);
  const [charCount,          setCharCount]         = useState(0);

  /* ── Access guard (your original logic) ── */
  useEffect(() => {
    if (!isAuthenticated || profile?.role !== "Admin") {
      toast.error("Access Denied. Admins Only.");
      navigateTo(`/courses/update/${id}`);
    }
  }, [isAuthenticated, profile, navigateTo, id]);

  /* ── Fetch existing course (your original logic) ── */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/courses/singleCourse/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setCourseImg(data?.courseImg?.url || "");
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Course not found!");
      }
    };
    fetchCourse();
  }, [id]);

  /* ── Photo handler (your original logic) ── */
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCourseImagePreview(reader.result);
      setCourseImg(file);
    };
  };

  /* Strip HTML tags to count plain-text chars */
  const stripHtml = (html) =>
    html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

  const handleAboutChange = (html) => {
    setAbout(html);
    setCharCount(stripHtml(html).length);
  };

  /* ── Update handler (your original logic) ── */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (charCount < 200) {
      toast.error("Description must be at least 200 characters.");
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);         // sends HTML to backend
    formData.append("courseImg", courseImg);

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/courses/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Course updated successfully");
      navigateTo("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  /* ── Field label component ── */
  const Label = ({ children, required }) => (
    <label style={s.label}>
      {children}
      {required && <span style={{ color: "#f87171", marginLeft: "3px" }}>*</span>}
    </label>
  );

  return (
    <div style={s.page}>
      <style>{globalCSS}</style>

      {/* BG effects */}
      <div style={s.bgGlow1} />
      <div style={s.bgGlow2} />
      <div style={s.bgGrid} />

      <div style={s.wrapper}>

        {/* ── Page Header ── */}
        <div style={s.pageHeader}>
          <button
            type="button"
            onClick={() => navigateTo("/dashboard")}
            style={s.backBtn}
            className="upd-back"
          >
            ← Dashboard
          </button>

          <div style={s.titleBlock}>
            <div style={s.iconBadge}>✏️</div>
            <h1 style={s.pageTitle}>Update Course</h1>
            <p style={s.pageSubtitle}>
              Edit course details — use the rich editor to format your description
            </p>
            <div style={s.accentLine} />
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleUpdate}>

          {/* ── Row 1: Category + Title ── */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={s.cardIcon}>📋</div>
              <h3 style={s.cardTitle}>Basic Info</h3>
              <div style={s.cardDivider} />
            </div>

            <div style={s.twoCol}>
              {/* Category */}
              <div>
                <Label required>Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={s.select}
                  className="upd-select"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Tech</option>
                  <option value="DataScience">Data Science</option>
                  <option value="Coding">Coding</option>
                  <option value="Entertainment">Entertainment / Games</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <Label required>Course Title</Label>
                <input
                  type="text"
                  placeholder="Enter course title…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={s.input}
                  className="upd-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* ── Row 2: Course Image ── */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={s.cardIcon}>🖼️</div>
              <h3 style={s.cardTitle}>Course Image</h3>
              <div style={s.cardDivider} />
            </div>

            <div style={s.imageRow}>
              {/* Preview */}
              <div style={s.imgPreviewWrap}>
                <img
                  src={courseImagePreview || courseImg || "/imgPL.webp"}
                  alt="Course Preview"
                  style={s.imgPreview}
                />
                <div style={s.imgPreviewOverlay}>
                  <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                </div>
              </div>

              {/* Upload */}
              <div style={{ flex: 1 }}>
                <p style={s.imgHint}>
                  Upload a high-quality image (16:9 recommended). JPG, PNG, or WebP.
                </p>
                <label style={s.fileLabel} className="upd-file-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changePhotoHandler}
                    style={{ display: "none" }}
                  />
                  📁 Choose Image
                </label>
                {courseImagePreview && (
                  <p style={{ marginTop: "8px", fontSize: "0.78rem", color: "#34d399" }}>
                    ✓ New image selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Row 3: Rich Description ── */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={s.cardIcon}>📝</div>
              <h3 style={s.cardTitle}>Course Description</h3>
              <div style={s.cardDivider} />
              {/* Char counter */}
              <span style={{
                fontSize: "0.75rem",
                color: charCount >= 200 ? "#34d399" : "rgba(255,255,255,0.35)",
                marginLeft: "auto",
                whiteSpace: "nowrap",
              }}>
                {charCount} / 200 chars {charCount >= 200 ? "✓" : "min"}
              </span>
            </div>

            <p style={s.editorHint}>
              Use the toolbar to add <strong style={{ color: "#818cf8" }}>headings</strong>,{" "}
              <strong style={{ color: "#818cf8" }}>bullet points</strong>,{" "}
              <strong style={{ color: "#818cf8" }}>bold/italic</strong>, text{" "}
              <strong style={{ color: "#818cf8" }}>colors</strong>, and more.
            </p>

            <RichEditor value={about} onChange={handleAboutChange} />
          </div>

          {/* ── Submit Row ── */}
          <div style={s.submitRow}>
            <button
              type="button"
              onClick={() => navigateTo("/dashboard")}
              style={s.cancelBtn}
              className="upd-cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              style={{
                ...s.submitBtn,
                opacity: saving ? 0.7 : 1,
                cursor: saving ? "not-allowed" : "pointer",
              }}
              className="upd-submit"
            >
              {saving ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                  <span style={s.spinner} /> Saving…
                </span>
              ) : (
                "💾 Update Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page Styles
───────────────────────────────────────────── */
const s = {
  page: {
    minHeight: "100vh",
    background: "#05050c",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    padding: "3rem 1.5rem 6rem",
    position: "relative",
    overflowX: "hidden",
  },
  bgGlow1: {
    position: "fixed", top: "-5%", left: "5%",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)",
    pointerEvents: "none", zIndex: 0,
  },
  bgGlow2: {
    position: "fixed", bottom: "0", right: "10%",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.09) 0%, transparent 65%)",
    pointerEvents: "none", zIndex: 0,
  },
  bgGrid: {
    position: "fixed", inset: 0,
    backgroundImage: `
      linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none", zIndex: 0,
  },

  wrapper: {
    position: "relative", zIndex: 1,
    maxWidth: "820px", margin: "0 auto",
  },

  /* Header */
  pageHeader: { marginBottom: "2.5rem" },
  backBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem", padding: "7px 16px",
    borderRadius: "8px", cursor: "pointer",
    marginBottom: "2rem", transition: "all 0.2s",
    display: "inline-block",
  },
  titleBlock: { textAlign: "center" },
  iconBadge: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "56px", height: "56px", borderRadius: "16px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.25)",
    fontSize: "1.6rem", marginBottom: "1rem",
  },
  pageTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em",
    background: "linear-gradient(135deg, #ffffff 40%, #818cf8 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    margin: "0 0 0.5rem",
  },
  pageSubtitle: {
    color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", margin: "0 0 1.5rem",
  },
  accentLine: {
    width: "60px", height: "3px", borderRadius: "2px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    margin: "0 auto",
  },

  /* Card */
  card: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px", padding: "2rem",
    marginBottom: "1.5rem",
    backdropFilter: "blur(12px)",
  },
  cardHeader: {
    display: "flex", alignItems: "center",
    gap: "12px", marginBottom: "1.5rem",
  },
  cardIcon: {
    width: "36px", height: "36px", borderRadius: "10px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.25)",
    display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "1rem", flexShrink: 0,
  },
  cardTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: "1rem", color: "#ffffff", margin: 0,
    letterSpacing: "0.02em",
  },
  cardDivider: {
    flex: 1, height: "1px",
    background: "linear-gradient(90deg, rgba(99,102,241,0.35), transparent)",
  },

  /* Two-col grid */
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.25rem",
  },

  /* Fields */
  label: {
    display: "block", fontSize: "0.75rem",
    color: "rgba(255,255,255,0.42)", marginBottom: "6px",
    letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 500,
  },
  input: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px",
    padding: "11px 14px", color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  select: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px",
    padding: "11px 14px", color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem",
    outline: "none", cursor: "pointer", appearance: "none",
    boxSizing: "border-box",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23818cf8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
  },

  /* Image */
  imageRow: {
    display: "flex", gap: "1.5rem",
    alignItems: "flex-start", flexWrap: "wrap",
  },
  imgPreviewWrap: {
    position: "relative", width: "180px", height: "120px",
    borderRadius: "12px", overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0,
  },
  imgPreview: {
    width: "100%", height: "100%", objectFit: "cover", display: "block",
  },
  imgPreviewOverlay: {
    position: "absolute", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: 0, transition: "opacity 0.2s",
  },
  imgHint: {
    fontSize: "0.82rem", color: "rgba(255,255,255,0.38)",
    marginBottom: "1rem", lineHeight: 1.6,
  },
  fileLabel: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "10px", padding: "9px 20px",
    color: "#818cf8", fontSize: "0.88rem",
    fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
  },

  /* Editor hint */
  editorHint: {
    fontSize: "0.82rem", color: "rgba(255,255,255,0.38)",
    marginBottom: "1rem", lineHeight: 1.65,
  },

  /* Submit row */
  submitRow: {
    display: "flex", gap: "1rem",
    justifyContent: "flex-end", flexWrap: "wrap",
    marginTop: "0.5rem",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "12px 28px",
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500, fontSize: "0.95rem", cursor: "pointer",
    transition: "all 0.2s",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    border: "none", borderRadius: "10px",
    padding: "12px 36px", color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700, fontSize: "0.95rem",
    minWidth: "180px", transition: "opacity 0.2s, transform 0.2s",
  },
  spinner: {
    display: "inline-block", width: "14px", height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff", borderRadius: "50%",
    animation: "upd-spin 0.7s linear infinite",
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes upd-spin { to { transform: rotate(360deg); } }

  .upd-back:hover   { color:#fff !important; border-color:rgba(129,140,248,0.4) !important; }
  .upd-cancel:hover { background:rgba(255,255,255,0.08) !important; color:#fff !important; }
  .upd-submit:hover { opacity:0.88 !important; transform:translateY(-2px) !important; }
  .upd-file-label:hover { background:rgba(99,102,241,0.28) !important; }

  .upd-input:focus  { border-color:rgba(129,140,248,0.55) !important; box-shadow:0 0 0 3px rgba(99,102,241,0.12) !important; }
  .upd-select:focus { border-color:rgba(129,140,248,0.55) !important; box-shadow:0 0 0 3px rgba(99,102,241,0.12) !important; }
  .upd-select option { background:#0d0d1a; color:#fff; }

  input[type="color"] { width:0; height:0; padding:0; border:0; }
`;

export default Update;
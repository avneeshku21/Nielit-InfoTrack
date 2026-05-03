import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const letters = "INFONEXT".split("");

const Intro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const taglineRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // Letter stagger reveal
    tl.fromTo(
      lettersRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.4,
        filter: "blur(20px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
      }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )
      .to({}, { duration: 1.2 }) // hold
      .to(lettersRef.current, {
        opacity: 0,
        y: -40,
        scale: 1.2,
        filter: "blur(10px)",
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        taglineRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        "<"
      );
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Radial glow behind text */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div ref={containerRef} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {letters.map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: i < 4 ? "#ffffff" : "#818cf8",
              letterSpacing: "-0.02em",
              display: "inline-block",
              willChange: "transform, opacity, filter",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <p
        ref={taglineRef}
        style={{
          marginTop: "1.5rem",
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        Next-Gen Academic Platform
      </p>

      {/* Google Fonts import via link tag workaround */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </div>
  );
};

export default Intro;
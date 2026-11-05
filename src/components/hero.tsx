"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight } from "lucide-react";
import { DIVISIONS } from "@/lib/divisions";

// Homepage hero — built exactly from the mockup Mark sent on 2026-11-05:
// deep navy background with blue light waves, "SONET" spelled in binary
// digits with a glowing blue line under them, serif tagline with a blue
// bar, blue gradient Get Started button, Watch Overview, and the founder's
// large transparent cutout photo with no circle and no name plate
// (removed 2026-11-05 on Mark's request, along with the circuit brackets
// around the wordmark, to keep the hero clean).
// NO green anywhere. Professional navy + blue only.
// The founder photo is a transparent cutout
// (public/images/founder-cutout.png, background removed with rembg/u2net,
// the lime line from the earlier mockup cleaned out of it).
// No video exists yet, so "Watch Overview" opens a real interactive
// overview instead of pretending to play a video.

const NAVY = "#050D1A";
const BLUE_SOFT = "#7DD3FC";

// 5x7 pixel bitmaps for the binary letters.
const LETTERS: Record<string, string[]> = {
  S: ["01110", "10001", "10000", "01110", "00001", "10001", "01110"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
};

// Deterministic digits (same on server and client — no hydration mismatch).
function digit(row: number, col: number, letter: number): string {
  return (row * 5 + col * 3 + letter * 7) % 2 === 0 ? "1" : "0";
}

function BinaryLetter({ letter, index }: { letter: string; index: number }) {
  const rows = LETTERS[letter];
  return (
    <span aria-hidden style={{ display: "inline-block", marginRight: 18 }}>
      {rows.map((row, r) => (
        <span key={r} style={{ display: "block", whiteSpace: "pre" }}>
          {row.split("").map((cell, c) => (
            <span
              key={c}
              style={{
                color: cell === "1" ? BLUE_SOFT : "rgba(125,211,252,0.07)",
                textShadow: cell === "1" ? "0 0 16px rgba(56,189,248,0.95)" : "none",
              }}
            >
              {digit(r, c, index)}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function BinaryWord() {
  return (
    <div
      role="img"
      aria-label="SONET"
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "clamp(22px, 2.4vw, 32px)",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: 2,
        padding: "8px 4px",
        userSelect: "none",
      }}
    >
      {"SONET".split("").map((letter, i) => (
        <BinaryLetter key={letter + i} letter={letter} index={i} />
      ))}
      {/* Glowing blue line under the binary word */}
      <div
        aria-hidden
        style={{
          height: 3,
          marginTop: 18,
          background: "linear-gradient(90deg, transparent, #38BDF8 20%, #2563EB 80%, transparent)",
          boxShadow: "0 0 24px rgba(37,99,235,0.9), 0 0 48px rgba(56,189,248,0.5)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function Waves() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 240, pointerEvents: "none" }}
    >
      <g filter="url(#waveGlow)">
        <path d="M -40 190 C 300 60, 620 230, 920 130 S 1320 30, 1480 110" fill="none" stroke="#2563EB" strokeWidth="2.5" opacity="0.9" />
        <path d="M -40 215 C 360 130, 760 250, 1120 170 S 1400 120, 1480 160" fill="none" stroke="#1D4ED8" strokeWidth="2" opacity="0.7" />
      </g>
      <defs>
        <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export function Hero() {
  const [overviewOpen, setOverviewOpen] = useState(false);

  useEffect(() => {
    if (!overviewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverviewOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overviewOpen]);

  return (
    <section
      aria-label="SONET Ecosystem overview"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        padding: 0,
        border: "none",
        background: NAVY,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blue glow, top right behind the photo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 65%)",
          pointerEvents: "none",
        }}
      />
      <Waves />
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "56px 40px 80px",
          display: "flex",
          gap: 32,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 600px", minWidth: 340 }}>
          <BinaryWord />
          <p
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 22,
              lineHeight: 1.55,
              color: "#fff",
              maxWidth: 560,
              margin: "36px 0 32px",
              paddingLeft: 20,
              borderLeft: "3px solid #2563EB",
            }}
          >
            A unified platform for learning, creating and earning with AI, digital skills and global opportunities.
          </p>
          <p style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: 0 }}>
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 17,
                minHeight: 52,
              }}
            >
              Get Started <ArrowRight size={19} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOverviewOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={overviewOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 17,
                minHeight: 52,
                border: "1px solid rgba(255,255,255,0.55)",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              <Play size={17} aria-hidden /> Watch Overview
            </button>
          </p>
        </div>

        <div style={{ flex: "1 1 380px", minWidth: 320, maxWidth: 620, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            src="/images/founder-cutout.png"
            alt="Md. Sonet Mia, Founder of SONET Ecosystem, speaking on stage"
            width={737}
            height={830}
            priority
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 560,
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.5))",
              // Bleed the photo off the hero's bottom edge: the cutout is
              // cropped at the waist, so its straight bottom edge must not
              // show. The negative margin pushes it past the hero bottom,
              // where the section's overflow: hidden clips it — the body
              // looks like it continues below the hero instead of being cut.
              marginBottom: -120,
            }}
          />
        </div>
      </div>

      {overviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SONET Ecosystem overview"
          onClick={() => setOverviewOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--bg)", color: "var(--ink)", borderRadius: 16, maxWidth: 640, width: "100%", maxHeight: "85vh", overflow: "auto", padding: 28 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>SONET Ecosystem at a glance</p>
                <h2 style={{ margin: "8px 0 4px" }}>One account. Six divisions.</h2>
                <p className="muted" style={{ margin: 0 }}>No overview video has been published yet, so here is the real thing — open any division to explore it.</p>
              </div>
              <button type="button" onClick={() => setOverviewOpen(false)} aria-label="Close overview" style={{ background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: 8, padding: 8, cursor: "pointer", color: "var(--ink)" }}>
                <X size={18} aria-hidden />
              </button>
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
              {DIVISIONS.map((d) => (
                <Link
                  key={d.slug}
                  href={d.slug === "academy" ? "/academy" : d.slug === "ai" ? "/ai-tools" : `/divisions/${d.slug}`}
                  onClick={() => setOverviewOpen(false)}
                  style={{ display: "block", border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", color: "var(--ink)" }}
                >
                  <strong>{d.name}</strong> — {d.tagline}
                  <span className="muted" style={{ display: "block", fontSize: 14 }}>{d.description}</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 20, marginBottom: 0 }}>
              <Link href="/ai-tools/promptex" onClick={() => setOverviewOpen(false)} className="btn">Try PromptEx →</Link>{" "}
              <Link href="/register" onClick={() => setOverviewOpen(false)} className="btn btn-secondary">Get Started</Link>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

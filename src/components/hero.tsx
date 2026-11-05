"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Layers, TrendingUp, Users, Play, X, ArrowRight } from "lucide-react";
import { DIVISIONS } from "@/lib/divisions";

// Homepage hero, rebuilt from the design Mark provided (dark background,
// lime accent, founder photo). The hero keeps SONET's honest states: no
// video exists yet, so "Watch Overview" opens a real interactive overview
// instead of pretending to play a video.
const LIME = "#A3E635";

const PILLARS = [
  { label: "Learn", icon: GraduationCap, href: "/academy" },
  { label: "Create", icon: Layers, href: "/divisions/studio" },
  { label: "Earn", icon: TrendingUp, href: "/divisions/microstock" },
  { label: "Grow", icon: Users, href: "/skills" },
];

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
    <section aria-label="SONET Ecosystem overview" style={{ padding: 0, border: "none" }}>
      <div
        style={{
          background: "radial-gradient(1200px 500px at 85% 0%, #3a2c14 0%, #171310 45%, #0c0a08 100%)",
          borderRadius: 24,
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            padding: "56px 48px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 420px", minWidth: 280 }}>
            <p style={{ fontWeight: 600, fontSize: 17, margin: "0 0 18px" }}>
              Education <span style={{ color: LIME }}>•</span> Creativity <span style={{ color: LIME }}>•</span> Technology <span style={{ color: LIME }}>•</span> Earning
            </p>
            <h1 style={{ fontSize: "clamp(48px, 7vw, 84px)", lineHeight: 1.02, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              SONET
              <br />
              <span style={{ color: LIME }}>ECOSYSTEM</span>
            </h1>
            <div style={{ width: 72, height: 4, background: LIME, borderRadius: 2, margin: "18px 0" }} />
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "0 0 28px" }}>
              A unified platform for learning, creating and earning with AI, digital skills and global opportunities.
            </p>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap", marginBottom: 32 }}>
              {PILLARS.map(({ label, icon: Icon, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={`${label} — open ${label === "Learn" ? "Academy" : label === "Create" ? "Studio" : label === "Earn" ? "Microstock" : "Skills"}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6,
                    color: "#fff",
                    padding: "4px 22px 4px 0",
                    marginRight: 22,
                    borderRight: i < PILLARS.length - 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
                  }}
                >
                  <Icon size={26} color={LIME} aria-hidden />
                  <span style={{ fontWeight: 700 }}>{label}</span>
                </Link>
              ))}
            </div>
            <p style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: 0 }}>
              <Link
                href="/register"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: LIME, color: "#17191D", padding: "13px 24px", borderRadius: 999, fontWeight: 700 }}
              >
                Get Started <ArrowRight size={18} aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setOverviewOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={overviewOpen}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "13px 24px", borderRadius: 999, fontWeight: 600, border: "1px solid rgba(255,255,255,0.6)", cursor: "pointer", font: "inherit" }}
              >
                <Play size={16} aria-hidden /> Watch Overview
              </button>
            </p>
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 280, maxWidth: 480 }}>
            <Image
              src="/images/founder-hero.jpg"
              alt="Md. Sonet Mia, Founder of SONET Ecosystem, speaking on stage"
              width={737}
              height={830}
              priority
              style={{ width: "100%", height: "auto", borderRadius: 20, display: "block", boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 24px 60px rgba(0,0,0,0.45), 0 0 60px ${LIME}33` }}
            />
            <p style={{ margin: "14px 4px 0", color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
              Md. Sonet Mia — Founder, Writer / Educator / AI Creator ·{" "}
              <Link href="/about" style={{ color: LIME }}>
                Meet the Founder →
              </Link>
            </p>
          </div>
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

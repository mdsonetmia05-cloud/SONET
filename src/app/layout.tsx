import "./globals.css";
import Link from "next/link";
import { Inter, Hind_Siliguri } from "next/font/google";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

export const metadata = {
  title: "SONET Ecosystem — One Ecosystem. Endless Possibilities.",
  description: "Explore AI-powered tools, digital products, professional learning and innovative technology, all connected through one unified platform.",
  openGraph: { title: "SONET Ecosystem", description: "One Account. One Platform. Endless Possibilities.", type: "website" },
};

// Header navigation matches the hero mockup Mark sent on 2026-11-05:
// AI Tools, Academy, Marketplace, Skills, Contact. Home is the logo;
// Divisions and Founder stay reachable from the footer.
const NAV = [
  ["AI Tools", "/ai-tools"], ["Academy", "/academy"], ["Marketplace", "/marketplace"],
  ["Skills", "/skills"], ["Contact", "/contact"],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${hind.variable}`}>
      <body>
        <header style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", position: "sticky", top: 0, background: "#050D1A", zIndex: 10 }}>
          <div className="wrap" style={{ display: "flex", gap: 20, alignItems: "center", paddingTop: 14, paddingBottom: 14, flexWrap: "wrap" }}>
            <Link href="/" aria-label="SONET — home" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, color: "#fff", fontSize: 22, letterSpacing: "0.02em" }}>
              <span aria-hidden style={{ display: "inline-block", width: 13, height: 30, background: "linear-gradient(180deg, #38BDF8, #2563EB)", transform: "skewX(-20deg)", borderRadius: 2 }} />
              SONET
            </Link>
            <nav aria-label="Primary" style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 15, marginLeft: 24 }}>
              {NAV.map(([label, href]) => <Link key={href} href={href} style={{ color: "#fff", padding: "10px 12px", display: "inline-block" }}>{label}</Link>)}
            </nav>
            <span style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
              <span aria-hidden style={{ width: 1, height: 28, background: "rgba(255,255,255,0.2)" }} />
              <Link href="/login" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "10px 20px", borderRadius: 8, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.55)", background: "transparent" }}>Sign In</Link>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "10px 20px", borderRadius: 8, fontWeight: 700, color: "#fff", background: "linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)", border: "1px solid #2563EB" }}>Get Started</Link>
            </span>
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

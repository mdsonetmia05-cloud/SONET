import "./globals.css";
import Link from "next/link";
import { Inter, Hind_Siliguri } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

export const metadata = {
  title: "SONET Ecosystem — One Ecosystem. Endless Possibilities.",
  description: "Explore AI-powered tools, digital products, professional learning and innovative technology, all connected through one unified platform.",
  openGraph: { title: "SONET Ecosystem", description: "One Account. One Platform. Endless Possibilities.", type: "website" },
};

const NAV = [
  ["Home", "/"], ["Divisions", "/divisions"], ["AI Tools", "/ai-tools"], ["Academy", "/academy"],
  ["Marketplace", "/marketplace"], ["Skills", "/skills"], ["Founder", "/about"], ["Contact", "/contact"],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${hind.variable}`}>
      <body>
        <header style={{ borderBottom: "1px solid var(--line)", position: "sticky", top: 0, background: "var(--bg)", zIndex: 10 }}>
          <div className="wrap" style={{ display: "flex", gap: 20, alignItems: "center", paddingTop: 14, paddingBottom: 14, flexWrap: "wrap" }}>
            <Link href="/" style={{ fontWeight: 800, color: "var(--ink)", fontSize: 20 }}>SONET</Link>
            <nav style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 14 }}>
              {NAV.map(([label, href]) => <Link key={href} href={href} style={{ color: "var(--ink)" }}>{label}</Link>)}
            </nav>
            <span style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <Link href="/login" className="btn btn-secondary">Sign In</Link>
              <Link href="/register" className="btn">Get Started</Link>
            </span>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg2)" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            <div>
              <p><strong>SONET</strong></p>
              <p className="muted">One Account. One Unified Dashboard. Six Connected Divisions.</p>
            </div>
            <div>
              <p><strong>Divisions</strong></p>
              <p><Link href="/divisions/ai">AI</Link> · <Link href="/divisions/academy">Academy</Link> · <Link href="/divisions/microstock">Microstock</Link><br /><Link href="/divisions/studio">Studio</Link> · <Link href="/divisions/skills">Skills</Link> · <Link href="/divisions/lab">Lab</Link></p>
            </div>
            <div>
              <p><strong>Platform</strong></p>
              <p><Link href="/marketplace">Marketplace</Link> · <Link href="/pricing">Pricing</Link> · <Link href="/faq">FAQ</Link><br /><Link href="/about">Founder</Link> · <Link href="/contact">Contact</Link> · <Link href="/dashboard">Dashboard</Link></p>
            </div>
            <div>
              <p><strong>Status</strong></p>
              <p className="muted">Integrations that are not configured are labelled Not Configured, never simulated. See docs/INTEGRATIONS.md.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

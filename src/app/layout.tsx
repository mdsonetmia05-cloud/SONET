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
          <div className="wrap">
            <p><strong>SONET</strong> — One Account. One Unified Dashboard. Six Connected Divisions.</p>
            <p className="muted">AI · Academy · Microstock · Studio · Skills · Lab · <Link href="/faq">FAQ</Link> · <Link href="/pricing">Pricing</Link> · <Link href="/contact">Contact</Link></p>
            <p className="muted">Integrations that are not configured are labelled Not Configured, never simulated. See docs/INTEGRATIONS.md.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

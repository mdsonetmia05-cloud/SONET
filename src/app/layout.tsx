import "./globals.css";
import Link from "next/link";
import { DIVISIONS } from "@/lib/divisions";

export const metadata = {
  title: "SONET Ecosystem — One Account. One Platform. Endless Possibilities.",
  description: "Explore AI-powered tools, digital products, professional learning and innovative technology, all connected through one unified platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: "1px solid #E5E5E2", padding: "16px 24px", display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/" style={{ fontWeight: 800, color: "#171717", textDecoration: "none" }}>SONET</Link>
          <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/">Home</Link>
            <Link href="/academy">Academy</Link>
            <Link href="/ai-tools">AI Tools</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ borderTop: "1px solid #E5E5E2", padding: "24px", color: "#666" }}>
          <p>SONET Ecosystem — Build. Learn. Create. Grow.</p>
          <p>Divisions: {DIVISIONS.map((d) => d.name).join(" · ")}</p>
        </footer>
      </body>
    </html>
  );
}

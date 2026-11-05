"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Site footer. Hidden on the homepage ("/") because Mark wants the
// homepage to be the hero only, with nothing below it — the footer
// still shows on every other page, where Divisions and Founder are
// reachable from it.
export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
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
  );
}

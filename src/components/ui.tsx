import Link from "next/link";
import type { ReactNode } from "react";

export function Page({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <section>
      <h1>{title}</h1>
      {intro && <p className="muted">{intro}</p>}
      {children}
    </section>
  );
}
export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid">{children}</div>;
}
export function Card({ title, children, href, hrefLabel }: { title: string; children?: ReactNode; href?: string; hrefLabel?: string }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {children}
      {href && <p><Link href={href}>{hrefLabel ?? "Open →"}</Link></p>}
    </article>
  );
}
export function Empty({ title, body }: { title: string; body: string }) {
  return <div className="empty"><strong>{title}</strong><p>{body}</p></div>;
}
export function NotConfigured({ name }: { name: string }) {
  return <p className="card card-soft"><span className="badge">Not Configured</span> — {name} is not configured yet. This state is shown honestly instead of simulating a working integration.</p>;
}

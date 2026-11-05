import Link from "next/link";
import { DIVISIONS, AI_TOOLS } from "@/lib/divisions";
import { PRODUCTS, COURSES, FAQS } from "@/lib/catalogue";
import { isDatabaseConfigured } from "@/lib/db";
import { Grid, Card, Section } from "@/components/ui";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      {!isDatabaseConfigured && <p className="card card-soft" style={{ marginTop: 24 }}><span className="badge">Not Configured</span> — Neon database is not configured in this build. Set DATABASE_URL in .env.local. No users, revenue or usage are simulated.</p>}
      <Section eyebrow="How it works" title="Start in three steps" intro="No separate accounts, no scattered tools.">
        <Grid>
          <Card title="1 · Create one account"><p>Register once and use the same account across every division.</p></Card>
          <Card title="2 · Choose a division"><p>Open AI, Academy, Microstock, Studio, Skills or Lab from one navigation.</p></Card>
          <Card title="3 · Learn, create, grow"><p>Track courses, products, tools, orders and progress from one dashboard.</p></Card>
        </Grid>
      </Section>
      <Section eyebrow="Ecosystem" title="Six divisions, one account" intro="Each division is independently manageable, with its own catalogue and navigation.">
        <Grid>{DIVISIONS.map((d) => <Card key={d.slug} title={d.name} href={d.slug === "academy" ? "/academy" : d.slug === "ai" ? "/ai-tools" : `/divisions/${d.slug}`}><p className="muted">{d.tagline}</p><p>{d.description}</p></Card>)}</Grid>
      </Section>
      <Section eyebrow="SONET AI" title="Featured AI tools" intro="Access, daily limits and availability are shown per tool. Unconfigured providers are labelled Not Configured.">
        <Grid>{AI_TOOLS.slice(0, 6).map((t) => <Card key={t} title={t} href="/ai-tools"><p className="muted">Server-side calls only. Keys never appear in frontend code.</p></Card>)}</Grid>
      </Section>
      <Section eyebrow="SONET Academy" title="Bangladesh academic learning, done properly">
        <p lang="bn">বাংলাদেশের শিক্ষার্থীদের জন্য প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক লার্নিং।</p>
        <p>NCTB structure, education boards, academic years, groups, subjects, chapters, topics, lessons and examinations — with curriculum versions preserved, never overwritten.</p>
        <p><Link href="/academy" className="btn">Open Academy</Link><Link href="/divisions/academy" className="btn btn-secondary">Academy overview</Link></p>
      </Section>
      <Section eyebrow="Marketplace" title="Featured digital products" intro="Prices are recalculated server-side at checkout. Browser totals are never trusted.">
        <Grid>{PRODUCTS.map((p) => <Card key={p.id} title={p.name} href="/marketplace"><p className="muted">{p.category} · {p.type}</p><p><strong>{p.price === 0 ? "Free" : `$${p.price}`}</strong></p></Card>)}</Grid>
      </Section>
      <Section eyebrow="Skills" title="Skills and learning paths">
        <Grid>{COURSES.map((c) => <Card key={c.id} title={c.name} href="/skills"><p className="muted">{c.division}</p></Card>)}</Grid>
      </Section>
      <Section eyebrow="Updates" title="Latest updates">
        <p className="muted">Updates are published from the admin content module. No update is shown here until it exists in the database.</p>
      </Section>
      <Section eyebrow="Trust" title="Testimonials">
        <p className="muted">Only verified testimonials are shown. None have been verified and published yet, so this section is intentionally left without invented quotes.</p>
      </Section>
      <Section eyebrow="Help" title="Frequently asked questions">
        <Grid>{FAQS.map((f) => <Card key={f.q} title={f.q}><p>{f.a}</p></Card>)}</Grid>
      </Section>
      <section>
        <div className="cta-band">
          <p className="eyebrow">Build · Learn · Create · Grow</p>
          <h2>Join SONET Ecosystem</h2>
          <p>Questions about an account, order or course? <Link href="/contact">Contact SONET</Link> — or, once signed in, use Dashboard → Support to chat with Super Admin.</p>
          <p><Link href="/register" className="btn">Get Started</Link></p>
        </div>
      </section>
    </div>
  );
}

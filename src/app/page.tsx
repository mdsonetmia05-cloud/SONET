import Link from "next/link";
import { DIVISIONS, AI_TOOLS } from "@/lib/divisions";
import { PRODUCTS, COURSES, FAQS } from "@/lib/catalogue";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Grid, Card } from "@/components/ui";

export default function Home() {
  return (
    <div>
      <section>
        <span className="badge">Unified Ecosystem</span>
        <h1>One Ecosystem.<br />Endless Possibilities.</h1>
        <p className="muted">Explore AI-powered tools, digital products, professional learning and innovative technology, all connected through one unified platform.</p>
        <p><Link href="/divisions" className="btn">Explore Ecosystem</Link> <Link href="/register" className="btn btn-secondary">Get Started</Link></p>
        {!isSupabaseConfigured && <p className="card card-soft"><span className="badge">Not Configured</span> — Supabase is not configured in this build. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local. No users, revenue or usage are simulated.</p>}
      </section>
      <section>
        <h2>Six divisions, one account</h2>
        <Grid>{DIVISIONS.map((d) => <Card key={d.slug} title={d.name} href={d.slug === "academy" ? "/academy" : d.slug === "ai" ? "/ai-tools" : `/divisions/${d.slug}`}><p className="muted">{d.tagline}</p><p>{d.description}</p></Card>)}</Grid>
      </section>
      <section>
        <h2>Featured AI tools</h2>
        <Grid>{AI_TOOLS.slice(0, 6).map((t) => <Card key={t} title={t} href="/ai-tools"><p className="muted">Access, daily limit and availability are shown per tool. Unconfigured providers are labelled Not Configured.</p></Card>)}</Grid>
      </section>
      <section>
        <h2>SONET Academy</h2>
        <p lang="bn">বাংলাদেশের শিক্ষার্থীদের জন্য প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক লার্নিং।</p>
        <p>Bangladesh academic LMS with NCTB structure, education boards, academic years, groups, subjects, chapters, topics, lessons and examinations — with curriculum versions preserved, never overwritten.</p>
        <p><Link href="/academy" className="btn">Open Academy</Link></p>
      </section>
      <section>
        <h2>Featured digital products</h2>
        <Grid>{PRODUCTS.map((p) => <Card key={p.id} title={p.name} href="/marketplace"><p className="muted">{p.category} · {p.type}</p><p>{p.price === 0 ? "Free" : `$${p.price}`}</p></Card>)}</Grid>
      </section>
      <section>
        <h2>Skills and learning</h2>
        <Grid>{COURSES.map((c) => <Card key={c.id} title={c.name} href="/skills"><p className="muted">{c.division}</p></Card>)}</Grid>
      </section>
      <section>
        <h2>Latest updates</h2>
        <p className="muted">Updates are published from the admin content module. No update is shown here until it exists in the database.</p>
      </section>
      <section>
        <h2>Testimonials</h2>
        <p className="muted">Only verified testimonials are shown. None have been verified and published yet, so this section is intentionally left without invented quotes.</p>
      </section>
      <section>
        <h2>FAQ</h2>
        <Grid>{FAQS.map((f) => <Card key={f.q} title={f.q}><p>{f.a}</p></Card>)}</Grid>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about an account, order or course? <Link href="/contact">Contact SONET</Link> or, once signed in, use Dashboard → Support to chat with Super Admin.</p>
        <p><Link href="/register" className="btn">Join SONET Ecosystem</Link></p>
      </section>
    </div>
  );
}

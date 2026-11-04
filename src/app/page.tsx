import Link from "next/link";
import { DIVISIONS, AI_TOOLS } from "@/lib/divisions";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Home() {
  return (
    <div>
      <section>
        <h1>One Ecosystem. Endless Possibilities.</h1>
        <p>Explore AI-powered tools, digital products, professional learning and innovative technology, all connected through one unified platform.</p>
        <p>
          <Link href="/academy">Explore Ecosystem</Link> · <Link href="/dashboard">Get Started</Link>
        </p>
        {!isSupabaseConfigured && (
          <p style={{ background: "#FFF7E6", border: "1px solid #F0D48A", padding: 12, borderRadius: 8 }}>
            Supabase: <strong>Not Configured</strong> — set NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local. No data is simulated.
          </p>
        )}
      </section>
      <section>
        <h2>Explore Ecosystem</h2>
        <div className="grid">
          {DIVISIONS.map((d) => (
            <article key={d.slug} className="card">
              <h3>{d.name}</h3>
              <p><small>{d.tagline}</small></p>
              <p>{d.description}</p>
              <Link href={d.slug === "academy" ? "/academy" : d.slug === "ai" ? "/ai-tools" : "/"}>Explore →</Link>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Build. Learn. Create. Grow.</h2>
        <p>Join SONET Ecosystem — one account for every division.</p>
        <p>AI tools in the registry: {AI_TOOLS.join(", ")}.</p>
      </section>
    </div>
  );
}

"use client";
import { useState } from "react";
import { Page, Grid, Card } from "@/components/ui";
import { PRODUCTS } from "@/lib/catalogue";
export default function Marketplace() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const filtered = PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && (p.name + p.category).toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Marketplace" eyebrow="Digital products" intro="Search and filter the real product catalogue. Prices are recalculated server-side at checkout; browser totals are never trusted.">
      <label>Search<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" /></label>
      <label>Category<select value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
      {filtered.length === 0 ? <p className="empty">No products match your search. Try a different term or category.</p> : (
        <Grid>{filtered.map((p) => <Card key={p.id} title={p.name}><p className="muted">{p.category} · {p.type}</p><p><strong>{p.price === 0 ? "Free" : `$${p.price}`}</strong></p></Card>)}</Grid>
      )}
      <p className="muted" style={{ marginTop: 20 }}>Full cart, checkout, order history and secure downloads are connected once Supabase and manual payment verification are configured. Access is granted only after verified payment.</p>
    </Page>
  );
}

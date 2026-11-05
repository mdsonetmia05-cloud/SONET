"use client";
import { useState } from "react";
import { Page, Grid, Card, NotConfigured } from "@/components/ui";
import { AI_TOOLS } from "@/lib/divisions";
export default function AiTools() {
  const [q, setQ] = useState("");
  const filtered = AI_TOOLS.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="SONET AI Tools" eyebrow="AI workspace" intro="Each tool is an independently manageable module. A tool is shown as functional only after its backend integration works.">
      <NotConfigured name="AI providers (Gemini / Groq / Mistral)" />
      <label>Search tools<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search AI tools…" /></label>
      <Grid>{filtered.map((t) => t === "PromptEx" ? (
        <Card key={t} title={t} href="/ai-tools/promptex" hrefLabel="Open PromptEx →">
          <p className="muted">Turn images into sell-ready microstock metadata with your own Gemini key — titles, keywords, captions, or image-generation prompts, downloaded as CSV.</p>
        </Card>
      ) : (
        <Card key={t} title={t}><p className="muted">Free / Premium access, daily limits and documentation are shown per tool once its provider is configured.</p></Card>
      ))}</Grid>
    </Page>
  );
}

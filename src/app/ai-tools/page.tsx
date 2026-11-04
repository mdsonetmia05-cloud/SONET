import { AI_TOOLS } from "@/lib/divisions";

export default function AiToolsPage() {
  return (
    <section>
      <h1>SONET AI Tools</h1>
      <p>Each tool is an independently manageable module. Tools whose provider
      is not configured are labelled Not Configured — they are not simulated.</p>
      <ul>{AI_TOOLS.map((t) => <li key={t}>{t}</li>)}</ul>
      <p>Usage limits, request logging and rate limiting belong server-side.
      API keys must never appear in frontend code.</p>
    </section>
  );
}

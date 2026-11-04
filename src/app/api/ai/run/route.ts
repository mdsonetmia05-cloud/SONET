import { NextResponse } from "next/server";
// AI workspace adapter: server-side only. No provider key is ever read
// from, or returned to, the browser. Until a provider is configured and
// tested, this returns 503 Not Configured — it never fakes a response.
const RATE = new Map<string, { count: number; day: string }>();
export async function POST(req: Request) {
  const provider = process.env.AI_PROVIDER; // gemini | groq | mistral
  if (!provider) return NextResponse.json({ error: "AI provider: Not Configured", configured: false }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const day = new Date().toISOString().slice(0, 10);
  const entry = RATE.get(ip);
  if (entry && entry.day === day && entry.count >= 10) return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
  RATE.set(ip, { count: (entry?.day === day ? entry.count : 0) + 1, day });
  return NextResponse.json({ error: "Provider adapter not yet implemented for this provider" }, { status: 501 });
}

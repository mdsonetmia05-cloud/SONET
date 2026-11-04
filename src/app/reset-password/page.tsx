"use client";
import { useState } from "react";
import { Page, NotConfigured } from "@/components/ui";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
export default function P() {
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) { setMsg("Supabase: Not Configured — configure .env.local first."); return; }
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const { error } = await supabase.auth.updateUser({ password });
    setMsg(error ? error.message : "Check your email / signed in (see Supabase Auth).");
  }
  return (
    <Page title="Reset password" intro="One account for the entire SONET ecosystem.">
      {!isSupabaseConfigured && <NotConfigured name="Supabase Auth" />}
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>Email<input name="email" type="email" required /></label>
        <label>Password<input name="password" type="password" required /></label>
        <button className="btn" type="submit">Continue</button>
      </form>
      {msg && <p>{msg}</p>}
    </Page>
  );
}

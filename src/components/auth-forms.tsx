"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong.";
}

// The auth client returns { data, error } on API failures and throws on
// transport failures; handle both so a failed sign-in always shows a
// real message instead of a blank form.
function resultError(res: unknown): string | null {
  if (!res || typeof res !== "object") return null;
  const err = (res as Record<string, unknown>).error as { message?: unknown } | null | undefined;
  if (!err) return null;
  return typeof err.message === "string" ? err.message : "Request failed.";
}

export function LoginForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    try {
      const res = await authClient.signIn.email({ email, password });
      const err = resultError(res);
      if (err) {
        setMsg(err);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setMsg(messageOf(err));
    }
  }
  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>Email<input name="email" type="email" required /></label>
        <label>Password<input name="password" type="password" required /></label>
        <button className="btn" type="submit">Continue</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>
        <Link href="/register">No account? Create one</Link> · <Link href="/forgot-password">Forgot password?</Link>
      </p>
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    try {
      const res = await authClient.signUp.email({ email, password, name });
      const err = resultError(res);
      if (err) {
        setMsg(err);
        return;
      }
      // Sign-up is immediate while email verification at sign-up is off.
      // If verification is ever turned on, the session will be absent
      // and the user is sent to sign in instead.
      const { data: session } = await authClient.getSession();
      if (session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setMsg("Account created. Please check your email to verify it, then sign in.");
        router.push("/login");
      }
    } catch (err) {
      setMsg(messageOf(err));
    }
  }
  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>Full name<input name="name" type="text" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Password<input name="password" type="password" required /></label>
        <button className="btn" type="submit">Continue</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>
        <Link href="/login">Already have an account? Sign in</Link>
      </p>
    </div>
  );
}

export function ForgotForm() {
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    try {
      // Better Auth 1.7 names this requestPasswordReset (the older
      // forgetPassword name is not exposed by this client).
      const res = await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
      const err = resultError(res);
      if (err) {
        setMsg(err);
        return;
      }
      setMsg("If an account exists for this email, a password reset link has been sent.");
    } catch (err) {
      setMsg(messageOf(err));
    }
  }
  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>Email<input name="email" type="email" required /></label>
        <button className="btn" type="submit">Send reset link</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>
        <Link href="/login">Remembered your password? Sign in</Link>
      </p>
    </div>
  );
}

export function ResetForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Read the token at submit time (it only exists in the browser URL
    // the reset email links to); no effect/state needed for it.
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setMsg("This reset link has no token. Request a new link from the forgot-password page.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    try {
      const res = await authClient.resetPassword({ newPassword: password, token });
      const err = resultError(res);
      if (err) {
        setMsg(err);
        return;
      }
      setMsg("Password updated. You can now sign in.");
      router.push("/login");
    } catch (err) {
      setMsg(messageOf(err));
    }
  }
  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>New password<input name="password" type="password" required /></label>
        <button className="btn" type="submit">Reset password</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>
        <Link href="/forgot-password">Request a new reset link</Link>
      </p>
    </div>
  );
}

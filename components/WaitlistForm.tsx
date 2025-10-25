"use client";
import { useState } from "react";

export default function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setMsg("");

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, source: "schedulerrx.com" }),
    });

    setLoading(false);
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      setMsg("You’re in. Thanks!");
      // or redirect: window.location.href = "/thanks";
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(`Oops — ${data?.error || "try again."}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" type="text" placeholder="Your Name" required
        className="w-full rounded-md px-3 py-2 bg-zinc-900 border border-zinc-700" />
      <input name="email" type="email" placeholder="Your Email Address" required
        className="w-full rounded-md px-3 py-2 bg-zinc-900 border border-zinc-700" />
      <button disabled={loading}
        className="w-full rounded-md px-3 py-2 bg-yellow-400 text-black font-medium disabled:opacity-60">
        {loading ? "Adding…" : "Join Waitlist"}
      </button>
      {msg && <p className="text-sm text-zinc-300">{msg}</p>}
      {/* Honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) setEmail("");
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Enter your email"
        className="input-field"
        required
      />
      <button className="btn-primary whitespace-nowrap" disabled={loading}>{loading ? "Joining..." : "Join Newsletter"}</button>
      {message && <p className="sr-only" aria-live="polite">{message}</p>}
    </form>
  );
}

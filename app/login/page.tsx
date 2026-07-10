"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await login(email, password);
      const nextPath = new URLSearchParams(window.location.search).get("next");
      router.push(nextPath || "/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(role: "admin" | "user") {
    if (role === "admin") {
      setEmail(process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@coursenest.dev");
      setPassword(process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "Admin@12345");
    } else {
      setEmail(process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "learner@coursenest.dev");
      setPassword(process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "Learner@12345");
    }
  }

  return (
    <section className="section-padding">
      <div className="container-page max-w-xl">
        <div className="hover-card-3d card-base p-7">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-600">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">Login to CourseNest</h1>
          <p className="mt-3 text-slate-600">Access your dashboard. Admin accounts can add and manage courses.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => fillDemo("admin")} className="btn-secondary">Use Admin Demo</button>
            <button type="button" onClick={() => fillDemo("user")} className="btn-secondary">Use Learner Demo</button>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">Demo buttons only auto-fill the credentials required for project evaluation.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            {message && <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</div>}
            <div>
              <label className="label-text">Email</label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn-primary" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">New here? <Link href="/register" className="font-bold text-brand-700">Create an account</Link></p>
        </div>
      </div>
    </section>
  );
}

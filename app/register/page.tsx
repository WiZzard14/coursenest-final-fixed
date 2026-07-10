"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="container-page max-w-xl">
        <div className="hover-card-3d card-base p-7">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-600">Create account</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">Register for CourseNest</h1>
          <p className="mt-3 text-slate-600">Create a learner account and access protected catalog tools.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            {message && <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</div>}
            <div>
              <label className="label-text">Full name</label>
              <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
            </div>
            <div>
              <label className="label-text">Email</label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
            <button className="btn-primary" disabled={loading}>{loading ? "Creating account..." : "Register"}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link href="/login" className="font-bold text-brand-700">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

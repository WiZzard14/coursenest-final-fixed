"use client";

export const dynamic = "force-dynamic";

import { FormEvent, useState } from "react";
import SectionHeader from "@/components/SectionHeader";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setStatus(data.message);
    if (response.ok) setForm({ name: "", email: "", message: "" });
    setLoading(false);
  }

  return (
    <section className="section-padding">
      <div className="container-page max-w-5xl">
        <SectionHeader eyebrow="Contact" title="Talk to a learning advisor" description="Use the form for course guidance, partnership questions, or platform support." />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="hover-card-3d card-base p-7">
            <h2 className="text-2xl font-black text-slate-950">Contact information</h2>
            <div className="mt-6 grid gap-4 text-slate-600">
              <p><strong>Email:</strong> support@coursenest.dev</p>
              <p><strong>Phone:</strong> +880 1700 000000</p>
              <p><strong>Office:</strong> Remote-first team serving learners worldwide</p>
              <p><strong>Hours:</strong> Sunday to Thursday, 10:00 AM – 6:00 PM</p>
            </div>
          </div>
          <form onSubmit={submit} className="card-base grid gap-5 p-7">
            {status && <div className="rounded-2xl bg-brand-50 p-4 text-sm font-semibold text-brand-700">{status}</div>}
            <div>
              <label className="label-text">Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="label-text">Email</label>
              <input className="input-field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="label-text">Message</label>
              <textarea className="input-field min-h-36" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            </div>
            <button className="btn-primary" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

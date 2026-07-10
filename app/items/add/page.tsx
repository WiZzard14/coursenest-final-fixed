"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { courseCategories, courseLevels } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

export default function AddCoursePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "59",
    category: "Development",
    level: "Beginner",
    location: "Online",
    duration: "4 weeks",
    instructor: "",
    imageUrl: "",
    skills: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        category: form.category,
        level: form.level,
        location: form.location,
        duration: form.duration,
        instructor: form.instructor,
        images: form.imageUrl ? [form.imageUrl] : undefined,
        skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Unable to add course.");
      return;
    }

    router.push(`/items/${data.item.id}`);
  }

  if (authLoading) {
    return (
      <section className="section-padding">
        <div className="container-page max-w-4xl">
          <div className="card-base p-8 text-center font-semibold text-slate-500">Checking access...</div>
        </div>
      </section>
    );
  }

  if (user?.role !== "admin") {
    return (
      <section className="section-padding">
        <div className="container-page max-w-2xl">
          <div className="hover-card-3d card-base p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-600">Admin only</p>
            <h1 className="mt-3 text-3xl font-black text-slate-950">Course creation is restricted</h1>
            <p className="mt-3 text-slate-600">Learner accounts can explore courses and use the dashboard. Only admin accounts can add catalog items.</p>
            <Link href="/dashboard" className="btn-primary mt-6 inline-flex">Back to dashboard</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-page max-w-4xl">
        <SectionHeader eyebrow="Protected admin" title="Add a new course" description="Only admin users can access this page and submit a new course item." />
        <form onSubmit={onSubmit} className="card-base grid gap-5 p-6">
          {message && <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</div>}

          <div>
            <label className="label-text">Title</label>
            <input className="input-field" value={form.title} onChange={(e) => updateField("title", e.target.value)} required minLength={4} />
          </div>
          <div>
            <label className="label-text">Short description</label>
            <textarea className="input-field min-h-24" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} required minLength={20} />
          </div>
          <div>
            <label className="label-text">Full description</label>
            <textarea className="input-field min-h-36" value={form.fullDescription} onChange={(e) => updateField("fullDescription", e.target.value)} required minLength={60} />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="label-text">Price</label>
              <input type="number" className="input-field" value={form.price} onChange={(e) => updateField("price", e.target.value)} required min={0} />
            </div>
            <div>
              <label className="label-text">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => updateField("category", e.target.value)}>
                {courseCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label className="label-text">Level</label>
              <select className="input-field" value={form.level} onChange={(e) => updateField("level", e.target.value)}>
                {courseLevels.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="label-text">Location</label>
              <input className="input-field" value={form.location} onChange={(e) => updateField("location", e.target.value)} required />
            </div>
            <div>
              <label className="label-text">Duration</label>
              <input className="input-field" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} required />
            </div>
            <div>
              <label className="label-text">Instructor</label>
              <input className="input-field" value={form.instructor} onChange={(e) => updateField("instructor", e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="label-text">Optional image URL</label>
            <input className="input-field" value={form.imageUrl} onChange={(e) => updateField("imageUrl", e.target.value)} placeholder="https://images.unsplash.com/..." />
          </div>
          <div>
            <label className="label-text">Skills, separated by comma</label>
            <input className="input-field" value={form.skills} onChange={(e) => updateField("skills", e.target.value)} placeholder="React, TypeScript, API Design" />
          </div>

          <button className="btn-primary" disabled={loading}>{loading ? "Submitting..." : "Submit Course"}</button>
        </form>
      </div>
    </section>
  );
}

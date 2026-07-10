"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { formatPrice } from "@/lib/format";
import { Course } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export default function ManageCoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadCourses() {
    setLoading(true);
    const response = await fetch("/api/items?limit=50&sort=newest");
    const data = await response.json();
    setCourses(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    if (user?.role === "admin") loadCourses();
  }, [user]);

  async function removeCourse(id: string) {
    const confirmed = window.confirm("Delete this course from the catalog?");
    if (!confirmed) return;
    const response = await fetch(`/api/items/${id}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) setCourses((current) => current.filter((course) => course.id !== id));
  }

  if (authLoading) {
    return (
      <section className="section-padding">
        <div className="container-page">
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
            <h1 className="mt-3 text-3xl font-black text-slate-950">Catalog management is restricted</h1>
            <p className="mt-3 text-slate-600">Learner accounts can view course details and dashboard insights. Only admin accounts can delete catalog items.</p>
            <Link href="/dashboard" className="btn-primary mt-6 inline-flex">Back to dashboard</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader eyebrow="Protected admin" title="Manage course catalog" description="View and delete catalog items through authenticated admin API actions." />
        {message && <div className="card-base mb-5 p-4 text-sm font-semibold text-slate-700">{message}</div>}
        <div className="card-base overflow-hidden">
          <div className="hidden grid-cols-[1.3fr_1fr_0.7fr_0.7fr] gap-4 border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-600 lg:grid">
            <span>Course</span>
            <span>Category</span>
            <span>Price</span>
            <span>Actions</span>
          </div>
          {loading ? (
            <div className="p-10 text-center font-semibold text-slate-500">Loading catalog...</div>
          ) : courses.map((course) => (
            <div key={course.id} className="grid gap-4 border-b border-slate-100 p-5 last:border-b-0 lg:grid-cols-[1.3fr_1fr_0.7fr_0.7fr] lg:items-center">
              <div className="flex items-center gap-4">
                <img src={course.images[0]} alt={course.title} className="h-16 w-20 rounded-2xl object-cover" />
                <div>
                  <p className="font-black text-slate-950">{course.title}</p>
                  <p className="text-sm text-slate-500">{course.instructor} • {course.updatedAt}</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-600">{course.category} / {course.level}</div>
              <div className="font-black text-slate-950">{formatPrice(course.price)}</div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/items/${course.id}`} className="btn-secondary px-4 py-2">View</Link>
                <button onClick={() => removeCourse(course.id)} className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

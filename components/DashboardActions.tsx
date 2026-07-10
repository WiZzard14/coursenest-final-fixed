"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardActions() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="hover-card-3d card-base p-7">
        <div className="h-7 w-40 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
      </div>
    );
  }

  if (user?.role === "admin") {
    return (
      <div className="hover-card-3d card-base p-7">
        <h2 className="text-2xl font-black text-slate-950">Admin quick actions</h2>
        <p className="mt-3 text-slate-600">Use these protected links to add a new course or review the current catalog.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/items/add" className="btn-primary">Add Course</Link>
          <Link href="/items/manage" className="btn-secondary">Manage Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="hover-card-3d card-base p-7">
      <h2 className="text-2xl font-black text-slate-950">Learner quick actions</h2>
      <p className="mt-3 text-slate-600">Explore the course catalog, compare learning paths, and contact support for enrollment help.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href="/explore" className="btn-primary">Explore Courses</Link>
        <Link href="/support" className="btn-secondary">Get Support</Link>
      </div>
    </div>
  );
}

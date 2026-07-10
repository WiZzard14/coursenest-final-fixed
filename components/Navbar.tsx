"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

const learnerLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" }
];

const adminLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/items/add", label: "Add Course" },
  { href: "/items/manage", label: "Manage" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/support", label: "Support" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const links = user ? (user.role === "admin" ? adminLinks : learnerLinks) : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)} aria-label="CourseNest home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
                pathname === link.href ? "bg-brand-50 text-brand-700 shadow-inner" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!loading && user ? (
            <>
              <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {user.role === "admin" ? "Admin" : user.name}
              </span>
              <button onClick={logout} className="btn-secondary py-2">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary py-2">Login</Link>
              <Link href="/register" className="btn-primary py-2">Register</Link>
            </>
          )}
        </div>

        <button
          className="rounded-2xl border border-slate-200 p-3 text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === link.href ? "bg-brand-50 text-brand-700 shadow-inner" : "text-slate-700"}`}
              >
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <button onClick={logout} className="btn-secondary mt-2">Logout</button>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link href="/login" className="btn-secondary" onClick={() => setOpen(false)}>Login</Link>
                <Link href="/register" className="btn-primary" onClick={() => setOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

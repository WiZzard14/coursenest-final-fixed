"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RatingStars from "@/components/RatingStars";
import { formatPrice } from "@/lib/format";
import { Course } from "@/types";

export default function HeroShowcase({ courses }: { courses: Course[] }) {
  const slides = useMemo(() => courses.slice(0, 3), [courses]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = slides[activeIndex] || courses[0];

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!active) return null;

  return (
    <div className="perspective-scene relative min-h-[460px] lg:min-h-[520px]">
      <div className="absolute -left-6 top-10 z-10 hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-soft backdrop-blur-xl sm:block float-soft">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Live metric</p>
        <p className="mt-1 text-3xl font-black text-white">4.8</p>
        <p className="text-xs text-slate-300">average learner rating</p>
      </div>

      <div className="course-device-3d relative z-20 overflow-hidden rounded-[2rem] border border-white/20 bg-white/15 p-3 shadow-2xl shadow-brand-900/30 backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.5rem] bg-white text-slate-950">
          <div className="relative h-64 overflow-hidden sm:h-72">
            <img src={active.images[0]} alt={active.title} className="h-full w-full object-cover transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-brand-700 shadow-lg">
              {active.category}
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-100">Interactive course slider</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">{active.title}</h2>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-600">{active.shortDescription}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
                <RatingStars rating={active.rating} />
                <span>{active.duration}</span>
                <span>{active.level}</span>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Price</p>
              <p className="text-2xl font-black text-brand-700">{formatPrice(active.price)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 bottom-12 z-30 w-60 rounded-3xl border border-white/30 bg-white/15 p-4 text-white shadow-soft backdrop-blur-xl float-delay sm:right-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Skill path</p>
        <div className="mt-3 grid gap-2">
          {active.skills.slice(0, 3).map((skill) => (
            <div key={skill} className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold">{skill}</div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((course, index) => (
          <button
            key={course.id}
            onClick={() => setActiveIndex(index)}
            className={`h-3 rounded-full transition-all ${index === activeIndex ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Show ${course.title}`}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href={`/items/${active.id}`} className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">Open Featured Course</Link>
      </div>
    </div>
  );
}

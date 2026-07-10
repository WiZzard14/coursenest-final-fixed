import Link from "next/link";
import RatingStars from "@/components/RatingStars";
import { formatPrice } from "@/lib/format";
import { Course } from "@/types";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="hover-card-3d card-base card-shine group relative flex h-full min-h-[520px] flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img src={course.images[0]} alt={course.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-brand-700 shadow">{course.category}</span>
          <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-black text-white shadow">{course.level}</span>
        </div>
        <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-3 py-2 shadow">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Starts from</p>
          <p className="text-lg font-black text-brand-700">{formatPrice(course.price)}</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>{course.location}</span>
          <span>{course.updatedAt}</span>
        </div>
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-black leading-7 text-slate-950">{course.title}</h3>
        <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">{course.shortDescription}</p>

        <div className="mt-4 grid gap-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2">
            <span className="font-semibold">Instructor</span>
            <span className="max-w-[9rem] truncate font-bold text-slate-950">{course.instructor}</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2">
            <RatingStars rating={course.rating} />
            <span className="font-semibold">{course.duration}</span>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link href={`/items/${course.id}`} className="btn-primary w-full">View Details</Link>
        </div>
      </div>
    </article>
  );
}

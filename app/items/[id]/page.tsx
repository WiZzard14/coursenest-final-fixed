import Link from "next/link";
import { notFound } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import RatingStars from "@/components/RatingStars";
import { formatPrice } from "@/lib/format";
import { getCourseById, getRelatedCourses } from "@/lib/items-service";

export const dynamic = "force-dynamic";

export default async function CourseDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = await getCourseById(id);
  if (!course) notFound();
  const related = await getRelatedCourses(course);

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <Link href="/explore" className="hover:text-brand-700">Explore</Link>
          <span>/</span>
          <span>{course.category}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="grid gap-4">
              <img src={course.images[0]} alt={course.title} className="h-[420px] w-full rounded-3xl object-cover shadow-soft" />
              <div className="grid grid-cols-3 gap-4">
                {course.images.slice(0, 3).map((image) => (
                  <img key={image} src={image} alt={`${course.title} media`} className="h-32 w-full rounded-3xl object-cover" />
                ))}
              </div>
            </div>

            <div className="mt-10 card-base p-7">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brand-600">Overview</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{course.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{course.fullDescription}</p>
            </div>

            <div className="mt-8 card-base p-7">
              <h2 className="text-2xl font-black text-slate-950">Reviews and ratings</h2>
              <div className="mt-4 flex items-center gap-3">
                <RatingStars rating={course.rating} />
                <p className="font-semibold text-slate-500">Based on {course.reviewCount} learner reviews</p>
              </div>
              <div className="mt-6 grid gap-4">
                {course.reviews.length ? course.reviews.map((review) => (
                  <div key={`${review.user}-${review.date}`} className="rounded-3xl border border-slate-200 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-black text-slate-950">{review.user}</p>
                      <RatingStars rating={review.rating} />
                    </div>
                    <p className="mt-3 leading-7 text-slate-600">{review.comment}</p>
                    <p className="mt-2 text-sm text-slate-400">{review.date}</p>
                  </div>
                )) : <p className="text-slate-600">This newly added course is waiting for its first learner review.</p>}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card-base p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-4xl font-black text-brand-700">{formatPrice(course.price)}</p>
                <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-bold text-emerald-700">Open</span>
              </div>
              <p className="mt-3 text-slate-600">Instructor: <span className="font-bold text-slate-950">{course.instructor}</span></p>
              <div className="mt-6 grid gap-3 text-sm">
                {[
                  ["Category", course.category],
                  ["Level", course.level],
                  ["Duration", course.duration],
                  ["Location", course.location],
                  ["Language", course.language],
                  ["Updated", course.updatedAt]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                    <span className="font-semibold text-slate-500">{label}</span>
                    <span className="font-bold text-slate-950">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="mb-3 font-black text-slate-950">Skills covered</p>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">{skill}</span>
                  ))}
                </div>
              </div>
              <Link href="/login" className="btn-primary mt-7 w-full">Start Enrollment</Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-black text-slate-950">Related courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => <CourseCard key={item.id} course={item} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

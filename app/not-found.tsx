import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-page max-w-2xl text-center">
        <div className="card-base p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-600">404</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">Page or course not found</h1>
          <p className="mt-3 text-slate-600">The page may have moved, or the course item may no longer be available.</p>
          <Link href="/explore" className="btn-primary mt-6">Back to Explore</Link>
        </div>
      </div>
    </section>
  );
}

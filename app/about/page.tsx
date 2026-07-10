export const dynamic = "force-dynamic";

import SectionHeader from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader eyebrow="About" title="CourseNest is built for focused practical learning" description="This project demonstrates a complete full-stack TypeScript workflow through a realistic course marketplace." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Mission", "Help learners compare courses by outcome, difficulty, rating, duration, and practical skills."],
            ["Quality", "Every catalog item includes clear descriptions, useful metadata, reviews, and transparent pricing."],
            ["Technology", "The platform uses Next.js, TypeScript, Tailwind CSS, MongoDB, JWT cookies, and route handlers."]
          ].map(([title, text]) => (
            <div key={title} className="hover-card-3d card-base p-7">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

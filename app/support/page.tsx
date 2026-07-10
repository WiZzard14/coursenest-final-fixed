export const dynamic = "force-dynamic";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function SupportPage() {
  return (
    <section className="section-padding">
      <div className="container-page max-w-5xl">
        <SectionHeader eyebrow="Support" title="CourseNest help center" description="Find quick support options for account access, catalog management, and deployment setup." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Account access", "Use the demo login buttons on the login page if you need immediate access to protected routes.", "/login"],
            ["Catalog management", "Add courses from the protected form and remove courses from the responsive manage table.", "/items/manage"],
            ["Explore filters", "Test search, category, level, rating, price, sorting, and pagination from one page.", "/explore"]
          ].map(([title, text, href]) => (
            <div key={title} className="hover-card-3d card-base p-7">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <Link href={href} className="mt-5 inline-flex font-bold text-brand-700">Open →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

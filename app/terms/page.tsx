export const dynamic = "force-dynamic";

import SectionHeader from "@/components/SectionHeader";

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-page max-w-4xl">
        <SectionHeader eyebrow="Terms" title="Terms of Service" description="Simple terms for using the CourseNest demo marketplace." />
        <div className="card-base space-y-5 p-7 leading-7 text-slate-600">
          <p>CourseNest is a project submission application for demonstrating full-stack engineering skills, course discovery, authentication, and protected management workflows.</p>
          <p>Users should enter accurate information when creating accounts and should not upload harmful, misleading, or unrelated catalog items.</p>
          <p>Administrators may remove catalog entries that are incomplete, unsafe, or outside the learning marketplace context.</p>
        </div>
      </div>
    </section>
  );
}

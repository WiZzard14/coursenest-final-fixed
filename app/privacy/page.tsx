export const dynamic = "force-dynamic";

import SectionHeader from "@/components/SectionHeader";

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container-page max-w-4xl">
        <SectionHeader eyebrow="Privacy" title="Privacy Policy" description="A clear policy page for a professional submission-ready application." />
        <div className="card-base space-y-5 p-7 leading-7 text-slate-600">
          <p>CourseNest collects account information only for authentication and platform access. Passwords are hashed before storage when MongoDB is enabled.</p>
          <p>JWT tokens are stored in HTTP-only cookies to reduce client-side exposure. Users can log out at any time to clear the active session cookie.</p>
          <p>Contact and newsletter forms validate submitted information and return clear messages. This demo application does not sell user data.</p>
        </div>
      </div>
    </section>
  );
}

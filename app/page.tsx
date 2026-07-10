import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import HeroShowcase from "@/components/HeroShowcase";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/SectionHeader";
import StatsChart from "@/components/StatsChart";
import { blogPosts, courseCategories, faqs, testimonials } from "@/lib/data";
import { getCourses } from "@/lib/items-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getCourses({ limit: 8, sort: "rating-desc" });

  return (
    <>
      <section className="hero-grid-bg relative min-h-[68vh] overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-8rem] top-[-8rem] h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-success/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-sun/20 blur-3xl" />
        </div>

        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
          <div className="reveal-up">
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-brand-100 shadow-soft backdrop-blur">
              Production-ready TypeScript full-stack project
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn practical skills through a polished marketplace experience.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CourseNest demonstrates frontend UI/UX, secure backend APIs, MongoDB data management, JWT authentication, role-based authorization, filters, charts, and protected admin workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/explore" className="btn-primary">Explore Courses</Link>
              <Link href="/login" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">Try Demo Login</Link>
              <a href="#features" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">See Features ↓</a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["JWT", "secure cookie auth"],
                ["MongoDB", "real database models"],
                ["Recharts", "dashboard analytics"]
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs font-semibold text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up reveal-delay-2">
            <HeroShowcase courses={featured.items} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/70 bg-white/80 py-8 backdrop-blur">
        <div className="container-page grid gap-4 text-center sm:grid-cols-4">
          {[
            ["3,400+", "active learners"],
            ["120+", "portfolio projects"],
            ["4.8/5", "average rating"],
            ["24/7", "self-paced access"]
          ].map(([value, label], index) => (
            <div key={label} className={`hover-card-3d rounded-3xl bg-slate-50 p-6 reveal-up reveal-delay-${Math.min(index, 3)}`}>
              <p className="text-3xl font-black text-brand-700">{value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="section-padding">
        <div className="container-page">
          <SectionHeader
            eyebrow="Platform features"
            title="A professional full-stack marketplace experience"
            description="Every major feature is designed to match common full-stack project review criteria: clean UI, safe APIs, reusable cards, filters, and protected actions."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Search and filtering", "Visitors can search by title, category, instructor, price, rating, and level.", "⌕"],
              ["Secure protected pages", "JWT cookies protect dashboard routes while admin authorization controls add and manage workflows.", "🔐"],
              ["Responsive UI system", "Cards, forms, tables, and sections use consistent spacing, radius, and visual style.", "▣"]
            ].map(([title, description, icon], index) => (
              <div key={title} className={`hover-card-3d card-base p-7 reveal-up reveal-delay-${index + 1}`}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-xl shadow-inner">{icon}</div>
                <h3 className="text-xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 backdrop-blur">
        <div className="container-page">
          <SectionHeader eyebrow="Categories" title="Explore focused skill areas" description="Meaningful categories connect cards, filters, statistics, and related course suggestions." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {courseCategories.map((category) => (
              <Link key={category} href={`/explore?category=${category}`} className="hover-card-3d card-base card-shine relative overflow-hidden p-5 text-center font-bold transition hover:text-brand-700">
                <span className="relative z-10">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <SectionHeader
            eyebrow="Featured courses"
            title="Popular learning paths"
            description="Same-sized responsive course cards with real images, descriptions, meta information, rating, price, and detail links."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.items.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
          <div className="mt-10 text-center">
            <Link href="/explore" className="btn-secondary">View Full Catalog</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 backdrop-blur">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow mb-3">Analytics</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Learning demand by category</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Recharts powers a clean data visualization block. The dashboard uses the same visual language for professional product analytics.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="hover-card-3d rounded-3xl bg-slate-50 p-5"><p className="text-2xl font-black">92%</p><p className="text-sm text-slate-500">course completion satisfaction</p></div>
              <div className="hover-card-3d rounded-3xl bg-slate-50 p-5"><p className="text-2xl font-black">38%</p><p className="text-sm text-slate-500">more learners choose project tracks</p></div>
            </div>
          </div>
          <StatsChart />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <SectionHeader eyebrow="Learner feedback" title="Trusted by practical learners" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="hover-card-3d card-base p-7">
                <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
                <div className="mt-6">
                  <p className="font-black text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 backdrop-blur">
        <div className="container-page">
          <SectionHeader eyebrow="Blog" title="Learning advice and career notes" />
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="hover-card-3d card-base p-7">
                <p className="text-sm font-bold text-brand-600">{post.date}</p>
                <h3 className="mt-3 text-xl font-black text-slate-950">{post.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{post.excerpt}</p>
                <Link href="/blog" className="mt-5 inline-flex font-bold text-brand-700">Read article →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <SectionHeader eyebrow="FAQ" title="Clear answers before sign-up" />
          <div className="mx-auto grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card-base p-6 transition hover:border-brand-200">
                <summary className="cursor-pointer text-lg font-black text-slate-950">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-16 text-white">
        <div className="absolute left-10 top-0 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-64 w-64 rounded-full bg-success/30 blur-3xl" />
        <div className="container-page relative text-center">
          <h2 className="text-3xl font-black sm:text-4xl">Get weekly course updates and project ideas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Join the newsletter for curated learning paths, portfolio project ideas, and product updates.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

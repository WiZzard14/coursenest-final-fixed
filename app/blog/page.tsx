export const dynamic = "force-dynamic";

import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader eyebrow="Blog" title="Learning strategy articles" description="Helpful articles for choosing courses, planning projects, and studying consistently." />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="hover-card-3d card-base p-7">
              <p className="text-sm font-bold text-brand-600">{post.date}</p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">{post.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import SectionHeader from "@/components/SectionHeader";
import StatsChart from "@/components/StatsChart";
import DashboardActions from "@/components/DashboardActions";
import { getCourses } from "@/lib/items-service";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getCourses({ limit: 50 });
  const averageRating = data.items.length
    ? (data.items.reduce((sum, item) => sum + item.rating, 0) / data.items.length).toFixed(1)
    : "0";

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader eyebrow="Protected dashboard" title="CourseNest analytics overview" description="A protected analytics page showing catalog signals and quick management actions." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [data.total, "catalog items"],
            [averageRating, "average rating"],
            ["6", "active categories"]
          ].map(([value, label]) => (
            <div key={label} className="hover-card-3d card-base p-7 text-center">
              <p className="text-4xl font-black text-brand-700">{value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <StatsChart />
          <DashboardActions />
        </div>
      </div>
    </section>
  );
}

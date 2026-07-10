export default function SkeletonCard() {
  return (
    <div className="card-base min-h-[520px] overflow-hidden">
      <div className="skeleton-shimmer h-52 w-full" />
      <div className="grid gap-4 p-5">
        <div className="skeleton-shimmer h-4 w-24 rounded-full" />
        <div className="skeleton-shimmer h-6 w-4/5 rounded-full" />
        <div className="skeleton-shimmer h-4 w-full rounded-full" />
        <div className="skeleton-shimmer h-4 w-5/6 rounded-full" />
        <div className="mt-4 grid gap-3">
          <div className="skeleton-shimmer h-10 rounded-2xl" />
          <div className="skeleton-shimmer h-10 rounded-2xl" />
        </div>
        <div className="skeleton-shimmer mt-8 h-12 rounded-2xl" />
      </div>
    </div>
  );
}

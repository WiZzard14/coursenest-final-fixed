export default function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < fullStars ? "text-sun" : "text-slate-300"}>★</span>
      ))}
      <span className="ml-1 text-sm font-bold text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
}

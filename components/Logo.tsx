type LogoProps = {
  compact?: boolean;
  inverted?: boolean;
};

export default function Logo({ compact = false, inverted = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="logo-glow relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-3xl shadow-soft">
        <img src="/logo.svg" alt="CourseNest logo" className="h-12 w-12" />
      </span>
      {!compact && (
        <div className="leading-tight">
          <p className={`text-lg font-black tracking-tight ${inverted ? "text-white" : "text-slate-950"}`}>CourseNest</p>
          <p className={`text-xs font-semibold ${inverted ? "text-slate-400" : "text-slate-500"}`}>Learn. Build. Grow.</p>
        </div>
      )}
    </div>
  );
}

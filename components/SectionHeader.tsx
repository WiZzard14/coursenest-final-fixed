export default function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="reveal-up mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <p className="section-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

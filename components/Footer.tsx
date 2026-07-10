import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-success/20 blur-3xl" />
      <div className="container-page relative grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4">
            <Logo inverted />
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            CourseNest helps learners compare practical courses, review details, and build a focused learning path with real outcomes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
            <a href="mailto:support@coursenest.dev" className="hover:text-white">support@coursenest.dev</a>
            <span>•</span>
            <a href="tel:+8801700000000" className="hover:text-white">+880 1700 000000</a>
          </div>
        </div>

        <div>
          <p className="mb-4 font-bold">Pages</p>
          <div className="grid gap-2 text-sm text-slate-300">
            <Link href="/explore" className="hover:text-white">Explore Courses</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/support" className="hover:text-white">Support</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 font-bold">Legal & Social</p>
          <div className="grid gap-2 text-sm text-slate-300">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5">
        <div className="container-page flex flex-col justify-between gap-3 text-sm text-slate-400 md:flex-row">
          <p>© 2026 CourseNest. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS, MongoDB, and JWT.</p>
        </div>
      </div>
    </footer>
  );
}

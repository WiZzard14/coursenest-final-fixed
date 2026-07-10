import { Course, Review } from "@/types";

type RawCourse = Partial<Omit<Course, "id">> & {
  _id?: unknown;
  id?: unknown;
  reviews?: Review[];
};

const defaultLevel: Course["level"] = "Beginner";

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

function toLevel(value: unknown): Course["level"] {
  return value === "Beginner" || value === "Intermediate" || value === "Advanced" ? value : defaultLevel;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeCourse(value: unknown): Course {
  const raw = value as RawCourse;
  return {
    id: String(raw._id || raw.id),
    title: String(raw.title || "Untitled course"),
    slug: String(raw.slug || "untitled-course"),
    shortDescription: String(raw.shortDescription || ""),
    fullDescription: String(raw.fullDescription || ""),
    price: Number(raw.price || 0),
    category: String(raw.category || "Development"),
    level: toLevel(raw.level),
    rating: Number(raw.rating || 0),
    reviewCount: Number(raw.reviewCount || 0),
    location: String(raw.location || "Online"),
    duration: String(raw.duration || "Self-paced"),
    instructor: String(raw.instructor || "CourseNest Instructor"),
    images: toStringArray(raw.images),
    skills: toStringArray(raw.skills),
    language: String(raw.language || "English"),
    updatedAt: String(raw.updatedAt || todayISO()),
    createdBy: raw.createdBy ? String(raw.createdBy) : undefined,
    reviews: Array.isArray(raw.reviews) ? raw.reviews : []
  };
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

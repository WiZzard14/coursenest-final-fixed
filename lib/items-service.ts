import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import CourseModel from "@/models/Course";
import { seedCourses } from "@/lib/data";
import { normalizeCourse, slugify, todayISO } from "@/lib/format";
import { Course, CourseQuery, PaginatedCourses } from "@/types";

type CourseFilter = {
  $or?: Array<Record<string, RegExp>>;
  category?: string;
  level?: string;
  rating?: { $gte?: number };
  price?: { $gte?: number; $lte?: number };
  createdBy?: string;
  _id?: string;
  slug?: string;
};

type CourseLookupFilter = {
  $or?: Array<{ _id?: string; slug?: string }>;
  slug?: string;
};

declare global {
  var fallbackCourses: Course[] | undefined;
}

function getFallbackCourses() {
  if (!global.fallbackCourses) {
    global.fallbackCourses = [...seedCourses];
  }
  return global.fallbackCourses;
}

function applyFallbackQuery(items: Course[], query: CourseQuery): PaginatedCourses {
  let filtered = [...items];

  if (query.search) {
    const text = query.search.toLowerCase();
    filtered = filtered.filter((item) =>
      [item.title, item.shortDescription, item.category, item.instructor, item.location]
        .join(" ")
        .toLowerCase()
        .includes(text)
    );
  }

  if (query.category && query.category !== "All") {
    filtered = filtered.filter((item) => item.category === query.category);
  }

  if (query.level && query.level !== "All") {
    filtered = filtered.filter((item) => item.level === query.level);
  }

  if (typeof query.minPrice === "number") {
    filtered = filtered.filter((item) => item.price >= Number(query.minPrice));
  }

  if (typeof query.maxPrice === "number") {
    filtered = filtered.filter((item) => item.price <= Number(query.maxPrice));
  }

  if (typeof query.minRating === "number") {
    filtered = filtered.filter((item) => item.rating >= Number(query.minRating));
  }

  const sort = query.sort || "rating-desc";
  filtered.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (sort === "title-asc") return a.title.localeCompare(b.title);
    return b.rating - a.rating;
  });

  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.max(Number(query.limit || 8), 1);
  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;

  return {
    items: filtered.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages
  };
}

export async function getCourses(query: CourseQuery = {}): Promise<PaginatedCourses> {
  const db = await connectDB();
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.max(Number(query.limit || 8), 1);

  if (!db) {
    return applyFallbackQuery(getFallbackCourses(), query);
  }

  const mongoQuery: CourseFilter = {};

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    mongoQuery.$or = [
      { title: regex },
      { shortDescription: regex },
      { category: regex },
      { instructor: regex },
      { location: regex }
    ];
  }

  if (query.category && query.category !== "All") mongoQuery.category = query.category;
  if (query.level && query.level !== "All") mongoQuery.level = query.level;
  if (typeof query.minRating === "number") mongoQuery.rating = { ...(mongoQuery.rating || {}), $gte: query.minRating };
  if (typeof query.minPrice === "number" || typeof query.maxPrice === "number") {
    mongoQuery.price = {};
    if (typeof query.minPrice === "number") mongoQuery.price.$gte = query.minPrice;
    if (typeof query.maxPrice === "number") mongoQuery.price.$lte = query.maxPrice;
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    newest: { updatedAt: -1 },
    "title-asc": { title: 1 },
    "rating-desc": { rating: -1 }
  };

  const sort = sortMap[query.sort || "rating-desc"] || sortMap["rating-desc"];
  const [items, total] = await Promise.all([
    CourseModel.find(mongoQuery)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    CourseModel.countDocuments(mongoQuery)
  ]);

  return {
    items: items.map(normalizeCourse),
    total,
    page,
    limit,
    totalPages: Math.max(Math.ceil(total / limit), 1)
  };
}

export async function getCourseById(id: string): Promise<Course | null> {
  const db = await connectDB();

  if (!db) {
    return getFallbackCourses().find((course) => course.id === id || course.slug === id) || null;
  }

  const query: CourseLookupFilter = mongoose.Types.ObjectId.isValid(id)
    ? { $or: [{ _id: id }, { slug: id }] }
    : { slug: id };

  const item = await CourseModel.findOne(query).lean();
  return item ? normalizeCourse(item) : null;
}

export async function getRelatedCourses(course: Course, limit = 4): Promise<Course[]> {
  const result = await getCourses({ category: course.category, limit: 12, sort: "rating-desc" });
  return result.items.filter((item) => item.id !== course.id).slice(0, limit);
}

export async function createCourse(input: Partial<Course>, userId: string): Promise<Course> {
  const title = String(input.title || "").trim();
  const shortDescription = String(input.shortDescription || "").trim();
  const fullDescription = String(input.fullDescription || "").trim();
  const price = Number(input.price);

  if (title.length < 4) throw new Error("Title must be at least 4 characters.");
  if (shortDescription.length < 20) throw new Error("Short description must be at least 20 characters.");
  if (fullDescription.length < 60) throw new Error("Full description must be at least 60 characters.");
  if (!Number.isFinite(price) || price < 0) throw new Error("Price must be a valid positive number.");

  const images = input.images?.filter(Boolean).length
    ? input.images.filter(Boolean)
    : ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"];

  const payload = {
    title,
    slug: `${slugify(title)}-${Date.now()}`,
    shortDescription,
    fullDescription,
    price,
    category: input.category || "Development",
    level: input.level || "Beginner",
    rating: input.rating || 4.6,
    reviewCount: 0,
    location: input.location || "Online",
    duration: input.duration || "4 weeks",
    instructor: input.instructor || "CourseNest Instructor",
    images,
    skills: input.skills?.length ? input.skills : ["Practical Projects", "Guided Learning", "Portfolio Output"],
    language: input.language || "English",
    updatedAt: todayISO(),
    createdBy: userId,
    reviews: []
  };

  const db = await connectDB();

  if (!db) {
    const course = { ...payload, id: `local-${Date.now()}` } as Course;
    getFallbackCourses().unshift(course);
    return course;
  }

  const created = await CourseModel.create(payload);
  return normalizeCourse(created.toObject());
}

export async function deleteCourse(id: string, userId: string, role: string): Promise<boolean> {
  const db = await connectDB();

  if (!db) {
    const items = getFallbackCourses();
    const index = items.findIndex((course) => course.id === id);
    if (index === -1) return false;
    if (role !== "admin" && items[index].createdBy && items[index].createdBy !== userId) return false;
    items.splice(index, 1);
    return true;
  }

  const query: CourseFilter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
  if (role !== "admin") query.createdBy = userId;
  const result = await CourseModel.deleteOne(query);
  return result.deletedCount === 1;
}

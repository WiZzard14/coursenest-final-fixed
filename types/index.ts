export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  location: string;
  duration: string;
  instructor: string;
  images: string[];
  skills: string[];
  language: string;
  updatedAt: string;
  createdBy?: string;
  reviews: Review[];
}

export interface CourseQuery {
  search?: string;
  category?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedCourses {
  items: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

import { NextRequest, NextResponse } from "next/server";
import { createCourse, getCourses } from "@/lib/items-service";
import { getAuthFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

function numberOrUndefined(value: string | null) {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const result = await getCourses({
    search: params.get("search") || undefined,
    category: params.get("category") || undefined,
    level: params.get("level") || undefined,
    minPrice: numberOrUndefined(params.get("minPrice")),
    maxPrice: numberOrUndefined(params.get("maxPrice")),
    minRating: numberOrUndefined(params.get("minRating")),
    sort: params.get("sort") || undefined,
    page: numberOrUndefined(params.get("page")) || 1,
    limit: numberOrUndefined(params.get("limit")) || 8
  });
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const user = getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ message: "Admin permission required." }, { status: 403 });

  try {
    const body = await request.json();
    const item = await createCourse(body, user.id);
    return NextResponse.json({ item, message: "Course added successfully." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to add course." }, { status: 400 });
  }
}

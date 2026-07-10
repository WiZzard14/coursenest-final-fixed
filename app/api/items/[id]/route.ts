import { NextRequest, NextResponse } from "next/server";
import { deleteCourse, getCourseById, getRelatedCourses } from "@/lib/items-service";
import { getAuthFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getCourseById(id);
  if (!item) return NextResponse.json({ message: "Course not found." }, { status: 404 });
  const related = await getRelatedCourses(item);
  return NextResponse.json({ item, related });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ message: "Admin permission required." }, { status: 403 });

  const { id } = params;
  const deleted = await deleteCourse(id, user.id, user.role);
  if (!deleted) return NextResponse.json({ message: "Course not found or you do not have permission." }, { status: 404 });
  return NextResponse.json({ message: "Course deleted successfully." });
}

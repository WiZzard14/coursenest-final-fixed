"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/CourseCard";
import SkeletonCard from "@/components/SkeletonCard";
import SectionHeader from "@/components/SectionHeader";
import { courseCategories, courseLevels } from "@/lib/data";
import { Course, PaginatedCourses } from "@/types";

const initialData: PaginatedCourses = { items: [], total: 0, page: 1, limit: 8, totalPages: 1 };

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100");
  const [sort, setSort] = useState("rating-desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PaginatedCourses>(initialData);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: "8", sort });
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);
    if (level !== "All") params.set("level", level);
    if (Number(minRating) > 0) params.set("minRating", minRating);
    if (Number(maxPrice) < 100) params.set("maxPrice", maxPrice);
    return params.toString();
  }, [search, category, level, minRating, maxPrice, sort, page]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl && courseCategories.includes(categoryFromUrl)) {
      setCategory(categoryFromUrl);
      setPage(1);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?${query}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .finally(() => setLoading(false));
  }, [query]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setMinRating("0");
    setMaxPrice("100");
    setSort("rating-desc");
    setPage(1);
  }

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader
          eyebrow="Explore"
          title="Find the right course for your next project"
          description="Search, filter by multiple fields, sort results, and browse paginated course cards."
        />

        <div className="card-base mb-8 grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="label-text">Search</label>
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="input-field" placeholder="Search title, instructor, location" />
          </div>
          <div>
            <label className="label-text">Category</label>
            <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="input-field">
              <option>All</option>
              {courseCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="label-text">Level</label>
            <select value={level} onChange={(event) => { setLevel(event.target.value); setPage(1); }} className="input-field">
              <option>All</option>
              {courseLevels.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="label-text">Minimum Rating</label>
            <select value={minRating} onChange={(event) => { setMinRating(event.target.value); setPage(1); }} className="input-field">
              <option value="0">Any</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
              <option value="4.8">4.8+</option>
            </select>
          </div>
          <div>
            <label className="label-text">Max Price</label>
            <select value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); setPage(1); }} className="input-field">
              <option value="100">Any</option>
              <option value="50">$50</option>
              <option value="70">$70</option>
              <option value="90">$90</option>
            </select>
          </div>
          <div>
            <label className="label-text">Sort</label>
            <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="input-field">
              <option value="rating-desc">Top rated</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="title-asc">Title A-Z</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={resetFilters} className="btn-secondary w-full">Reset</button>
          </div>
        </div>

        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-semibold text-slate-600">Showing {data.items.length} of {data.total} courses</p>
          <p className="text-sm text-slate-500">Page {data.page} of {data.totalPages}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
            : data.items.map((course: Course) => <CourseCard key={course.id} course={course} />)}
        </div>

        {!loading && data.items.length === 0 && (
          <div className="card-base mt-8 p-10 text-center">
            <p className="text-xl font-black text-slate-950">No matching courses found</p>
            <p className="mt-2 text-slate-600">Try changing the category, rating, price, or search term.</p>
            <button onClick={resetFilters} className="btn-primary mt-5">Clear Filters</button>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <button disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">{page}</span>
          <button disabled={page >= data.totalPages || loading} onClick={() => setPage((value) => value + 1)} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </section>
  );
}

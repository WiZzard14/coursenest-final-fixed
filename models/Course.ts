import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true }
  },
  { _id: false }
);

const CourseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    fullDescription: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    location: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    instructor: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
    skills: [{ type: String }],
    language: { type: String, required: true, trim: true },
    updatedAt: { type: String, required: true },
    createdBy: { type: String },
    reviews: [ReviewSchema]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default Course;

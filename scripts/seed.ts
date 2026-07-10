import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { seedCourses } from "../lib/data";
import Course from "../models/Course";
import User from "../models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "coursenest";
  if (!uri || uri.includes("USERNAME:PASSWORD") || uri.includes("<")) {
    throw new Error("Please set a valid MONGODB_URI before running npm run seed.");
  }

  const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@coursenest.dev").toLowerCase().trim();
  const adminPasswordRaw = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "Admin@12345";
  const adminName = process.env.ADMIN_NAME || "CourseNest Admin";
  const learnerEmail = (process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "learner@coursenest.dev").toLowerCase().trim();
  const learnerPasswordRaw = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "Learner@12345";

  await mongoose.connect(uri, { dbName });
  await Promise.all([Course.deleteMany({}), User.deleteMany({})]);

  const adminPassword = await bcrypt.hash(adminPasswordRaw, 10);
  const userPassword = await bcrypt.hash(learnerPasswordRaw, 10);

  const [admin] = await User.create([
    { name: adminName, email: adminEmail, password: adminPassword, role: "admin" },
    { name: "Demo Learner", email: learnerEmail, password: userPassword, role: "user" }
  ]);

  await Course.insertMany(seedCourses.map((course) => ({ ...course, createdBy: admin._id.toString() })));

  console.log("Seed complete");
  console.log(`Database: ${dbName}`);
  console.log(`Admin: ${adminEmail} / ${adminPasswordRaw}`);
  console.log(`User: ${learnerEmail} / ${learnerPasswordRaw}`);
  console.log(`Created ${seedCourses.length} courses and 2 users.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

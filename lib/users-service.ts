import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";
import { AuthUser, UserRole } from "@/types";

type StoredUser = AuthUser & { password: string };
type RawStoredUser = Partial<StoredUser> & { _id?: unknown; id?: unknown };

declare global {
  var fallbackUsers: StoredUser[] | undefined;
}

function getFallbackUsers() {
  if (!global.fallbackUsers) {
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@coursenest.dev").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "Admin@12345";
    const adminName = process.env.ADMIN_NAME || "CourseNest Admin";
    const learnerEmail = (process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "learner@coursenest.dev").toLowerCase().trim();
    const learnerPassword = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "Learner@12345";
    global.fallbackUsers = [
      { id: "admin-demo", name: adminName, email: adminEmail, password: adminPassword, role: "admin" },
      { id: "learner-demo", name: "Demo Learner", email: learnerEmail, password: learnerPassword, role: "user" }
    ];
  }
  return global.fallbackUsers;
}

function normalizeUser(value: unknown): StoredUser {
  const raw = value as RawStoredUser;
  return {
    id: String(raw._id || raw.id),
    name: String(raw.name || "CourseNest User"),
    email: String(raw.email || ""),
    role: raw.role === "admin" ? "admin" : "user",
    password: String(raw.password || "")
  };
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const normalized = email.toLowerCase().trim();
  const db = await connectDB();

  if (!db) {
    return getFallbackUsers().find((user) => user.email === normalized) || null;
  }

  const user = await UserModel.findOne({ email: normalized }).lean();
  return user ? normalizeUser(user) : null;
}

export async function createUser(name: string, email: string, password: string, role: UserRole = "user") {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing) throw new Error("An account with this email already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const db = await connectDB();

  if (!db) {
    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role
    };
    getFallbackUsers().push(user);
    return user;
  }

  const created = await UserModel.create({ name, email: normalizedEmail, password: hashedPassword, role });
  return normalizeUser(created.toObject());
}

export async function comparePassword(password: string, storedPassword: string) {
  if (storedPassword.startsWith("$2")) {
    return bcrypt.compare(password, storedPassword);
  }
  return password === storedPassword;
}

export function toAuthUser(user: StoredUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

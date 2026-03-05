import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim();
    const username = (body.username || "").toString().trim();
    const password = (body.password || "").toString();

    if (!email || !username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await db.select().from(users).where(or(eq(users.email, email), eq(users.username, username)));
    if (existing.length) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, username, passwordHash: hashed });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

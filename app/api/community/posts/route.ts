import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { communityPosts } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

// GET  /api/community/posts  — list all posts newest-first
export async function GET() {
  try {
    const posts = await db
      .select()
      .from(communityPosts)
      .orderBy(desc(communityPosts.createdAt));
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/community/posts  — create new post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authorId, authorName, title, content, imageUrl, tags } = body;

    if (!authorId || !authorName || !title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [post] = await db
      .insert(communityPosts)
      .values({ authorId, authorName, title: title.trim(), content: content.trim(), imageUrl: imageUrl || null, tags: tags || null })
      .returning();

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

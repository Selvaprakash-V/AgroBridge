import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { communityComments, communityPosts } from "@/drizzle/schema";
import { eq, asc } from "drizzle-orm";

// GET  /api/community/posts/[postId]/comments
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const comments = await db
      .select()
      .from(communityComments)
      .where(eq(communityComments.postId, postId))
      .orderBy(asc(communityComments.createdAt));
    return NextResponse.json(comments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/community/posts/[postId]/comments
export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const body = await req.json();
    const { authorId, authorName, content } = body;

    if (!authorId || !authorName || !content?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const [comment] = await db
      .insert(communityComments)
      .values({ postId, authorId, authorName, content: content.trim() })
      .returning();

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/community/posts/[postId]/comments  — delete entire post and its comments
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    await db.delete(communityComments).where(eq(communityComments.postId, postId));
    await db.delete(communityPosts).where(eq(communityPosts.id, postId));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { communityLikes, communityPosts } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

// POST /api/community/posts/[postId]/like
// body: { userId }  — toggles the like on/off
export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const existing = await db
      .select()
      .from(communityLikes)
      .where(and(eq(communityLikes.postId, postId), eq(communityLikes.userId, userId)));

    if (existing.length) {
      // unlike
      await db.delete(communityLikes).where(and(eq(communityLikes.postId, postId), eq(communityLikes.userId, userId)));
      await db.update(communityPosts).set({ likesCount: sql`${communityPosts.likesCount} - 1` }).where(eq(communityPosts.id, postId));
      return NextResponse.json({ liked: false });
    } else {
      // like
      await db.insert(communityLikes).values({ postId, userId });
      await db.update(communityPosts).set({ likesCount: sql`${communityPosts.likesCount} + 1` }).where(eq(communityPosts.id, postId));
      return NextResponse.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

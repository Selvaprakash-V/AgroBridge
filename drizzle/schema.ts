import { pgTable, text, timestamp, uuid, real } from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  role: text("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  thinkingText: text("thinking_text"),
  audioBase64: text("audio_base64"),
  imageUrl: text("image_url"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const userSettings = pgTable("user_settings", {
  sessionId: text("session_id").primaryKey(),
  language: text("language").notNull().default("en-IN"),
  lat: text("lat"),
  lon: text("lon"),
});

export const plantAnalysisHistory = pgTable("plant_analysis_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  imageUrl: text("image_url").notNull(),
  plantName: text("plant_name"),
  plantDescription: text("plant_description"),
  plantProbability: real("plant_probability"),
  disease: text("disease").notNull(),
  probability: real("probability").notNull(),
  symptoms: text("symptoms"),
  treatment: text("treatment"),
  prevention: text("prevention"),
  isHealthy: text("is_healthy").notNull(), // stored as 'true' or 'false'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityPosts = pgTable("community_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("author_id").notNull(),
  authorName: text("author_name").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  tags: text("tags"), // comma-separated e.g. "disease,tomato"
  likesCount: real("likes_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityComments = pgTable("community_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").notNull(),
  authorId: uuid("author_id").notNull(),
  authorName: text("author_name").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityLikes = pgTable("community_likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").notNull(),
  userId: uuid("user_id").notNull(),
});

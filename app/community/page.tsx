"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Heart, MessageCircle, Send, Plus, X, Tag, ArrowLeft,
  Leaf, AlertTriangle, Droplets, Sun, Bug, Sprout, ImagePlus, Trash2,
} from "lucide-react";
import { compressImage } from "@/lib/image-compression";
import ProfileHeader from "@/components/ProfileHeader";
import { useStore } from "@/store/useStore";

/* ── types ─────────────────────────────────────────────────── */
interface Post {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  tags?: string | null;
  likesCount: number;
  createdAt: string;
}

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface StoredUser {
  id: string;
  username: string;
  email: string;
}

/* ── helpers ────────────────────────────────────────────────── */
const TAG_OPTIONS = [
  { label: "Disease", key: 'tag_disease', icon: <AlertTriangle className="w-3 h-3" />, color: "bg-red-100 text-red-700 border-red-200" },
  { label: "Healthy", key: 'tag_healthy', icon: <Leaf className="w-3 h-3" />, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "Irrigation", key: 'tag_irrigation', icon: <Droplets className="w-3 h-3" />, color: "bg-sky-100 text-sky-700 border-sky-200" },
  { label: "Pest", key: 'tag_pest', icon: <Bug className="w-3 h-3" />, color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Sunlight", key: 'tag_sunlight', icon: <Sun className="w-3 h-3" />, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { label: "Growth", key: 'tag_growth', icon: <Sprout className="w-3 h-3" />, color: "bg-teal-100 text-teal-700 border-teal-200" },
];

function tagStyle(tag: string) {
  const found = TAG_OPTIONS.find((t) => t.label.toLowerCase() === tag.toLowerCase());
  return found ? found.color : "bg-gray-100 text-gray-600 border-gray-200";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function Avatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  const hue = (name.charCodeAt(0) * 40) % 360;
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow"
      style={{ background: `hsl(${hue},60%,48%)` }}
    >
      {initials}
    </div>
  );
}

/* ── sub-components ─────────────────────────────────────────── */
function CommentThread({ postId, user }: { postId: string; user: StoredUser }) {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/community/posts/${postId}/comments`)
      .then((r) => r.json())
      .then(setComments)
      .finally(() => setFetching(false));
  }, [postId]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/community/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorId: user.id, authorName: user.username, content: text }),
    });
    if (res.ok) {
      const c = await res.json();
      setComments((prev) => [...prev, c]);
      setText("");
    }
    setLoading(false);
  }

  return (
    <div className="mt-3 border-t border-white/40 pt-3 space-y-3">
      {fetching ? (
        <p className="text-xs text-gray-400">{t('loadingComments')}</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-gray-400">{t('noCommentsYet')}</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="flex gap-2">
            <Avatar name={c.authorName} />
            <div className="bg-white/60 rounded-2xl px-3 py-2 flex-1">
              <p className="text-xs font-semibold text-gray-800">{c.authorName} <span className="font-normal text-gray-400 ml-1">{timeAgo(c.createdAt)}</span></p>
              <p className="text-sm text-gray-700 mt-0.5">{c.content}</p>
            </div>
          </div>
        ))
      )}

      <form onSubmit={submitComment} className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('addCommentPlaceholder')}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white/80 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="p-2 rounded-xl text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function PostCard({ post, user, onLike }: { post: Post; user: StoredUser; onLike: (id: string) => void }) {
  const { t } = useTranslation();
  const [showComments, setShowComments] = useState(false);
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={post.authorName} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{post.authorName}</p>
          <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
        </div>
        {tags.map((tag) => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${tagStyle(tag)}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* body */}
      <h3 className="font-bold text-gray-900 mb-1">{post.title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.content}</p>

      {post.imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-3 max-h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.imageUrl} alt="Post" className="w-full object-cover" />
        </div>
      )}

      {/* actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span>{post.likesCount}</span>
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{showComments ? t('hideBtn') : t('commentsBtn')}</span>
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <CommentThread postId={post.id} user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── new-post modal ─────────────────────────────────────────── */
function NewPostModal({ user, onCreated, onClose }: { user: StoredUser; onCreated: (p: Post) => void; onClose: () => void }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleTag(label: string) {
    setSelectedTags((prev) => prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select a valid image file."); return; }
    setError(null);
    setImageFile(file);
    try {
      const preview = await compressImage(file, 2, 1280);
      setImagePreview(preview);
    } catch {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) { setError(t('titleRequired')); return; }
    setError(null);
    setLoading(true);

    // Store compressed image as a data URL directly (no external blob service needed)
    const imageUrl: string | null = imagePreview ?? null;

    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorId: user.id,
        authorName: user.username,
        title,
        content,
        tags: selectedTags.join(","),
        imageUrl,
      }),
    });
    if (res.ok) {
      const post = await res.json();
      onCreated(post);
      onClose();
    } else {
      const d = await res.json();
      setError(d.error || t('failedToPost'));
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">{t('shareWithCommunity')}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition"><X className="w-5 h-5 text-gray-500" /></button>
        </div>

        {error && <div className="mb-4 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('postTitleLabel')}</label>
            <input
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={t('postTitleLabel')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('postDescLabel')}</label>
            <textarea
              value={content} onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder={t('postDescLabel')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('photoLabel')} <span className="text-gray-400 font-normal">({t('optional')})</span></label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 py-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-emerald-300 transition-all text-gray-400 hover:text-emerald-500"
              >
                <ImagePlus className="w-7 h-7" />
                <span className="text-xs font-medium">{t('tapToAddPhoto')}</span>
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('tagsLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map(({ label, key, icon, color }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleTag(label)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-all ${
                    selectedTags.includes(label) ? color + " ring-2 ring-offset-1 ring-emerald-400" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {icon}{t(key)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}
          >
            {loading ? t('postingBtn') : t('postToCommunity')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── main page ──────────────────────────────────────────────── */
export default function CommunityPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLanguage = useStore((state) => state.currentLanguage);
  const [user] = useState<StoredUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("user");
      return raw ? (JSON.parse(raw) as StoredUser) : null;
    } catch {
      return null;
    }
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (!user) router.push("/landing");
  }, [user, router]);

  useEffect(() => {
    fetch("/api/community/posts")
      .then((r) => r.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  function handleLike(postId: string) {
    if (!user) return;
    fetch(`/api/community/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    })
      .then((r) => r.json())
      .then(({ liked }) => {
        setPosts((prev) =>
          prev.map((p) => p.id === postId ? { ...p, likesCount: liked ? p.likesCount + 1 : p.likesCount - 1 } : p)
        );
      });
  }

  const filteredPosts = activeFilter === "all"
    ? posts
    : posts.filter((p) => p.tags?.split(',').map((x) => x.trim()).includes(activeFilter));

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
      <ProfileHeader />

      <div className="container mx-auto px-3 md:px-4 py-4 max-w-3xl pb-24">

        {/* page header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push("/")} className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">{t('farmerCommunity')}</h1>
            <p className="text-xs text-gray-500">{t('shareLearnGrow')} 🌱</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}
          >
            <Plus className="w-4 h-4" /> {t('newPost')}
          </button>
        </div>

        {/* filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {['all', ...TAG_OPTIONS.map((tag) => tag.label)].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeFilter === f
                  ? "text-white border-transparent shadow-md"
                  : "bg-white/60 text-gray-600 border-gray-200 hover:bg-white"
              }`}
              style={activeFilter === f ? { background: "linear-gradient(135deg,#10b981,#06b6d4)" } : {}}
            >
              {f === 'all' ? t('all') : t(`tag_${f.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* feed */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-3xl bg-white/50 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌾</div>
            <p className="text-gray-500 font-medium">{t('noPostsYet')}</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-5 px-6 py-2.5 rounded-xl text-white font-semibold"
              style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}
            >
              {t('createFirstPost')}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} user={user} onLike={handleLike} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <NewPostModal
            user={user}
            onCreated={(p) => setPosts((prev) => [p, ...prev])}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

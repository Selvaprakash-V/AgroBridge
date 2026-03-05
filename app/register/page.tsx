"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 1400);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-cyan-50 flex items-center justify-center px-4">
      {/* background emojis */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.07] select-none z-0">
        <div className="absolute top-10 left-10 text-[90px]">🌱</div>
        <div className="absolute bottom-16 right-10 text-[100px]">🌾</div>
        <div className="absolute top-1/3 left-20 text-[80px]">🍃</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-2xl"
             style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.7),rgba(236,253,245,0.6))" }}>

          {/* logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-lg"
                 style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>🌱</div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-cyan-600">AgroBridge</h1>
            <p className="text-sm text-gray-500 mt-1">Create your free account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center">
              🎉 Account created! Redirecting to sign in…
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input
                type="text" required
                value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="farmerhero123"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
            <button
              type="submit" disabled={loading || success}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}
            >
              {loading ? "Creating account…" : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-600 hover:underline">Sign in</Link>
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">
            <Link href="/landing" className="hover:underline">← Back to home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

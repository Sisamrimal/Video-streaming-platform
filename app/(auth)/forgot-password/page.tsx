"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    // always show success (security reason)
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-5
        rounded-2xl bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl text-white"
      >
        <h1 className="text-2xl font-bold text-center">
          Forgot Password
        </h1>

        {sent ? (
          <p className="text-center text-green-400">
            If this email exists, a reset link was sent ✅
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg
              bg-white/5 border border-white/20
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full p-3 rounded-lg
              bg-red-500 hover:bg-red-600 transition"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
}

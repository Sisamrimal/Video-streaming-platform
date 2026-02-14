"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({
        token,
        password,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Password updated!");
      router.push("/login");
    } else {
      alert("Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">

      <form
        onSubmit={handleReset}
        className="w-full max-w-md p-8 space-y-5
        rounded-2xl bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl text-white"
      >
        <h1 className="text-2xl font-bold text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg
          bg-white/5 border border-white/20
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg
          bg-red-500 hover:bg-red-600 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

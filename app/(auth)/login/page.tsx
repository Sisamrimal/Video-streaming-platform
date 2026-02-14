"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle redirect manually
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/"); // redirect to home page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-5
        rounded-2xl bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-300">
            Login to continue your journey 🚀
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg
          bg-white/5 border border-white/20
          text-white placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg
          bg-white/5 border border-white/20
          text-white placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg font-semibold
          bg-red-500 hover:bg-red-600
          transition-all duration-200 text-white shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-red-400 cursor-pointer hover:text-red-300"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.ok) {
      alert("Account created!");
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };
  

return (
  <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">

    <form
      onSubmit={handleSignup}
      className="w-full max-w-md p-8 space-y-5
      rounded-2xl bg-white/10 backdrop-blur-xl
      border border-white/20 shadow-2xl"
    >
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>
        <p className="text-sm text-slate-300">
          Start your creator journey 🚀
        </p>
      </div>

      <input
        placeholder="Name"
        className="w-full p-3 rounded-lg
        bg-white/5 border border-white/20
        text-white placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-red-500"
        onChange={(e) => setName(e.target.value)}
      />

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
        className="w-full p-3 rounded-lg font-semibold
        bg-red-500 hover:bg-red-600
        transition-all duration-200 text-white shadow-lg"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-red-400 cursor-pointer hover:text-red-300"
        >
          Login
        </span>
      </p>
    </form>
  </div>
);
}

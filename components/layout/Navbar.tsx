"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function Navbar({ user }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${query}`);
    setQuery("");
  };

  return (
    <div
      className="h-14 border-b border-white/10
      flex items-center justify-between px-6
      bg-slate-900 text-white"
    >
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="font-semibold text-lg text-red-500 cursor-pointer"
      >
        YouClone
      </h1>

      {/* 🔎 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-xl mx-6"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full px-4 py-2 rounded-l-full
          bg-slate-800 border border-slate-700
          focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="px-5 rounded-r-full
          bg-slate-700 hover:bg-slate-600 transition"
        >
          🔍
        </button>
      </form>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">
          {user?.email}
        </span>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
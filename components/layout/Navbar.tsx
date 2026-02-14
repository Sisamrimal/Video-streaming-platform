"use client";

import { signOut } from "next-auth/react";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function Navbar({ user }: Props) {
  return (
    <div className="h-14 border-b border-white/10
      flex items-center justify-between px-6 bg-slate-900 text-white">

      <h1 className="font-semibold text-lg text-red-500">
        YouClone
      </h1>

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

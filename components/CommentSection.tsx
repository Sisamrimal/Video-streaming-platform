"use client";

import { useState } from "react";

type Comment = {
  id: string;
  text: string;
  user: {
    name: string | null;
  };
};

export default function CommentSection({
  videoId,
  initialComments,
}: {
  videoId: string;
  initialComments: Comment[];
}) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(initialComments);

  const submitComment = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/video/comment", {
      method: "POST",
      body: JSON.stringify({ videoId, text }),
    });

    const newComment = await res.json();

    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* COMMENT INPUT */}
      <div className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="
            w-full
            p-3
            rounded-xl
            bg-neutral-900
            border border-neutral-700
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
          "
        />

        <button
          onClick={submitComment}
          className="self-end bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium"
        >
          Comment
        </button>
      </div>

      {/* COMMENT LIST */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="border-b border-neutral-800 pb-3"
          >
            <p className="font-semibold text-sm">
              {c.user.name || "User"}
            </p>
            <p className="text-sm text-neutral-300 mt-1">
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

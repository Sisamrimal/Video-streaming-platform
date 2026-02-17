"use client";

import { useState } from "react";

export default function LikeButton({
  videoId,
  initialLikes,
}: {
  videoId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const res = await fetch("/api/video/like", {
      method: "POST",
      body: JSON.stringify({ videoId }),
    });

    const data = await res.json();
    setLikes(data.likeCount);
  };

  return (
    <button
      onClick={handleLike}
      className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700"
    >
      👍 {likes}
    </button>
  );
}

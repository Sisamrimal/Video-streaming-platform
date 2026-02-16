"use client";

import { useEffect } from "react";

export default function ViewUpdater({ videoId }: { videoId: string }) {
  useEffect(() => {
    fetch("/api/video/view", {
      method: "POST",
      body: JSON.stringify({ videoId }),
    });
  }, [videoId]);

  return null;
}

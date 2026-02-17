"use client";

import { useState } from "react";

export default function SubscribeButton({
  creatorId,
  initialSubscribed,
}: {
  creatorId: string;
  initialSubscribed: boolean;
}) {
  const [subscribed, setSubscribed] =
    useState(initialSubscribed);
  const [loading, setLoading] = useState(false);

  const toggleSubscribe = async () => {
    if (loading) return;

    // ✅ OPTIMISTIC UPDATE
    setSubscribed(!subscribed);
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ creatorId }),
      });

      const data = await res.json();
      setSubscribed(data.subscribed);
    } catch {
      // rollback if error
      setSubscribed((prev) => !prev);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={toggleSubscribe}
      className={`px-5 py-2 rounded-full font-medium transition
        ${
          subscribed
            ? "bg-neutral-700 hover:bg-neutral-600"
            : "bg-red-600 hover:bg-red-700"
        }`}
    >
      {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

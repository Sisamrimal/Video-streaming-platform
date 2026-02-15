// app/page.tsx

import { db } from "@/lib/db";
import VideoCard from "@/components/video-card";

export default async function HomePage() {
  const videos = await db.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Recommended Videos
      </h1>

      <div className="grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4"
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}

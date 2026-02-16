// app/page.tsx

import { db } from "@/lib/db";
import Link from "next/link";

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

      <div
        className="grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4"
      >
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`}>
            <div className="cursor-pointer">
              <img
                src={
                  video.thumbnailUrl || "/default-video-thumbnail.jpg"
                }
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-medium">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {video.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

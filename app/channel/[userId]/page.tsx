import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function ChannelPage({ params }: PageProps) {
  // ✅ await params (fixes Next 15/16 async params warning)
  const { userId } = await params;

  // get creator
  const creator = await db.user.findUnique({
    where: { id: userId },
  });
 
  if (!creator) return notFound();

  // get creator videos
  const videos = await db.video.findMany({
    where: {
      userId,
      status: "READY",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* CHANNEL HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />

        <div>
          <h1 className="text-2xl font-bold">
            {creator.name || "Creator"}
          </h1>

          <p className="text-gray-500 text-sm">
            {videos.length} videos
          </p>
        </div>
      </div>

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`}>
            <div className="cursor-pointer group">
              
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {video.thumbnailUrl && (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                )}
              </div>

              <h3 className="mt-2 font-semibold line-clamp-2">
                {video.title}
              </h3>

              <p className="text-sm text-gray-500">
                {video.views} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

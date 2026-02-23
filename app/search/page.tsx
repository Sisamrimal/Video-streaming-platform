import { db } from "@/lib/db";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    return <div className="p-10">Search something...</div>;
  }

  const videos = await db.video.findMany({
  where: {
    OR: [
      {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        user: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      },
    ],
  },
  include: {
    user: true,
  },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Results for "{q}"
      </h1>

      {videos.length === 0 && (
        <p>No videos found.</p>
      )}

      {videos.map((video) => (
        <a
          key={video.id}
          href={`/watch/${video.id}`}
          className="flex gap-4 border-b pb-4"
        >
          <img
           src={video.thumbnailUrl || ""}
            className="w-60 rounded-lg"
          />

          <div>
            <h2 className="font-semibold text-lg">
              {video.title}
            </h2>

            <p className="text-sm text-gray-500">
              {video.user.name}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
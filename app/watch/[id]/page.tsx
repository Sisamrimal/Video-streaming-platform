import { db } from "@/lib/db";
import Image from "next/image";
import ViewUpdater from "@/components/ViewUpdater";


async function getVideo(id: string) {
  return db.video.findUnique({
    where: { id },
  });
}

async function getRecommended(currentId: string) {
  return db.video.findMany({
    where: {
      NOT: { id: currentId },
    },
    take: 8,
  });
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideo(id);
  const recommended = await getRecommended(id);

  if (!video) return <div>Video not found</div>;

  return (
    <div className="flex gap-6 p-6">

        <ViewUpdater videoId={video.id} />

      
      {/* LEFT SIDE */}
      <div className="flex-1 space-y-4">

        {/* VIDEO PLAYER */}
        <video
          controls
          className="w-full rounded-xl bg-black"
          src={video.videoUrl}
        />

        {/* TITLE */}
        <h1 className="text-xl font-semibold">
          {video.title}
        </h1>

        {/* CHANNEL + SUBSCRIBE */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-medium">Creator Channel</p>
            <p className="text-sm text-gray-500">
              {video.views} views
            </p>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full">
            Subscribe
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-700 whitespace-pre-line">
          {video.description}
        </p>

      </div>

      {/* RIGHT SIDE — RECOMMENDED */}
      <div className="w-[350px] space-y-4">
        {recommended.map((vid) => (
          <div key={vid.id} className="flex gap-3 cursor-pointer">
            <Image
              src={vid.thumbnailUrl ?? "/default-video-thumbnail.jpg"}

              alt={vid.title}
              width={160}
              height={90}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-medium line-clamp-2">
                {vid.title}
              </p>
              <p className="text-xs text-gray-500">
                {vid.views} views
              </p>
            </div>
          </div>

          
        ))}
      </div>

    </div>
  );
}

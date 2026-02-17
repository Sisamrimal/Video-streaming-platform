import {db} from "@/lib/db";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import ViewUpdater from "@/components/ViewUpdater";

export default async function WatchPage({
  params,
}: {
 params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const video = await db.video.findUnique({
    where: { id},
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!video) {
    return <div className="p-10">Video not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* VIEW COUNT UPDATER */}
      <ViewUpdater videoId={video.id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE — MAIN CONTENT */}
        <div className="lg:col-span-2">
          {/* VIDEO PLAYER */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold mt-4">
            {video.title}
          </h1>

          {/* CHANNEL + ACTIONS */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-4">
            {/* Channel info */}
            <div>
              <p className="font-medium">{video.user.name}</p>
              <p className="text-sm text-neutral-400">
                {video.views} views
              </p>
            </div>

            {/* Like Button */}
            <LikeButton
              videoId={video.id}
              initialLikes={video._count.likes}
            />
          </div>

          {/* DESCRIPTION */}
          {video.description && (
            <div className="mt-4 p-4 rounded-xl bg-orange-200 text-sm">
              {video.description}
            </div>
          )}

          {/* COMMENTS */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Comments
            </h2>

            <CommentSection
              videoId={video.id}
              initialComments={video.comments}
            />
          </div>
        </div>

        {/* RIGHT SIDE — RECOMMENDED (placeholder) */}
        <div className="space-y-4">
          <p className="font-semibold">Recommended</p>
          <p className="text-sm text-neutral-400">
            Recommended videos coming in next phase...
          </p>
        </div>
      </div>
    </div>
  );
}

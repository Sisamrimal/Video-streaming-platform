import {db} from "@/lib/db";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import SubscribeButton from "@/components/SubscribeButton";
import ViewUpdater from "@/components/ViewUpdater";


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  /* ================= SESSION ================= */
  const session = await getServerSession(authOptions);
  const { id } = await params

  /* ================= VIDEO QUERY ================= */
  const video = await db.video.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          subscribers: session?.user?.id
            ? {
                where: {
                  subscriberId: session.user.id,
                },
              }
            : false,
        },
      },

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

  /* ================= SUBSCRIBE STATE ================= */
  const isSubscribed =
    (video.user as any).subscribers?.length > 0;

     console.log("session user:", session?.user?.id);
  console.log("video owner:", video.user.id);
  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* updates view count silently */}
      <ViewUpdater videoId={video.id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE ================= */}
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
          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            {/* CHANNEL INFO */}
            <div>
              <p className="font-medium text-lg">
                {video.user.name || "Creator"}
              </p>

              <p className="text-sm text-neutral-400">
                {video.views} views
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              <LikeButton
                videoId={video.id}
                initialLikes={video._count.likes}
              />

              {session?.user?.id !== video.user.id ?  (
                <p className="text-sm text-gray-400">Your video</p>
) : (
                <SubscribeButton
                  creatorId={video.user.id}
                  initialSubscribed={isSubscribed}
                />
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          {video.description && (
            <div className="mt-4 p-4 rounded-xl bg-neutral-900 text-sm leading-relaxed">
              {video.description}
            </div>
          )}

          {/* COMMENTS */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">
              Comments
            </h2>

            <CommentSection
              videoId={video.id}
              initialComments={video.comments}
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="space-y-4">
          <p className="font-semibold text-lg">
            Recommended
          </p>

          <div className="text-sm text-neutral-400">
            Recommendation system coming in next phase...
          </div>
        </div>
      </div>
    </div>
  );
}

import VideoSkeleton from "@/components/video-skeleton";

export default function Loading() {
  return (
    <div className="p-6 grid gap-6 grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <VideoSkeleton key={i} />
      ))}
    </div>
  );
}

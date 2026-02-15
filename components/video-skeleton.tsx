export default function VideoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-gray-300 rounded-xl" />
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

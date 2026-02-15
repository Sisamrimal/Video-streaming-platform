import Image from "next/image";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string | null
    videoUrl: string;
    createdAt: Date;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group cursor-pointer">
      
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
       

<Image
 src={video.thumbnailUrl ?? "/default-video-thumbnail.jpg"}

  alt={video.title}
  fill 
  className="object-cover w-full h-full rounded-xl"
/>

      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="font-medium line-clamp-2">
          {video.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Uploaded recently
        </p>
      </div>
    </div>
  );
}

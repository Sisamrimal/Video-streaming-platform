import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await req.json();

  const existingLike = await db.like.findUnique({
    where: {
      userId_videoId: {
        userId: session.user.id,
        videoId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await db.like.create({
      data: {
        userId: session.user.id,
        videoId,
      },
    });
  }

  const likeCount = await db.like.count({
    where: { videoId },
  });

  return NextResponse.json({ likeCount });
}

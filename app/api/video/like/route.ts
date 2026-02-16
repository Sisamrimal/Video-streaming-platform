import { NextResponse } from "next/server";

import {db} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await req.json();

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_videoId: {
        userId: session.user.id,
        videoId,
      },
    },
  });

  // Toggle Like
  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        videoId,
      },
    });
  }

  const likeCount = await prisma.like.count({
    where: { videoId },
  });

  return NextResponse.json({ likeCount });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();

  await db.video.update({
    where: { id: videoId },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ success: true });
}

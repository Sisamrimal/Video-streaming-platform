import { NextResponse } from "next/server";
import  {db} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { videoId, text } = await req.json();

  const comment = await db.comment.create({
    data: {
      text,
      videoId,
      userId: session.user.id,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(comment);
}

import { NextResponse } from "next/server";
import{db} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { creatorId } = await req.json();

  const existing = await db.subscription.findUnique({
    where: {
      subscriberId_creatorId: {
        subscriberId: session.user.id,
        creatorId,
      },
    },
  });

  // TOGGLE
  if (existing) {
    await db.subscription.delete({
      where: { id: existing.id },
    });
    return NextResponse.json({ subscribed: false });
  }

  await db.subscription.create({
    data: {
      subscriberId: session.user.id,
      creatorId,
    },
  });

  return NextResponse.json({ subscribed: true });
}

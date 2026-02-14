import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await db.user.findUnique({
    where: { email },
  });

  // don't reveal if user exists (security)
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // ✅ create secure token
  const token = crypto.randomBytes(32).toString("hex");

  // expires in 15 minutes
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  await db.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });

  // 👉 later we send email here
  console.log(
    `Reset link: http://localhost:3000/reset-password?token=${token}`
  );

  return NextResponse.json({ ok: true });
}

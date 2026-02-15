import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("video") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No video uploaded" },
        { status: 400 }
      );
    }


     // convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    // upload to cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "youtube-clone",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });


     // ✅ save video metadata
    const video = await db.video.create({
      data: {
        title,
        description,
        videoUrl: uploadResult.secure_url,
        userId: session.user.id,
        status: "PROCESSING",
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

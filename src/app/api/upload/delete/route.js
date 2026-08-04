import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { requireAuth } from "@/lib/requireAuth";

const utapi = new UTApi();

function extractFileKey(url) {
  const match = url.match(/\/f\/([^/?]+)/);
  return match ? match[1] : null;
}

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL là bắt buộc" }, { status: 400 });
    }

    const fileKey = extractFileKey(url);

    if (!fileKey) {
      return NextResponse.json(
        { error: "Không thể trích xuất file key" },
        { status: 400 },
      );
    }

    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

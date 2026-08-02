import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title } = body;

    return NextResponse.json(
      {
        createdAt: new Date().toISOString(),
        id: Date.now(),
        title,
      },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

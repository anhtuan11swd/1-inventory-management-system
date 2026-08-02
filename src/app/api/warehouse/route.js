import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, location, description, type } = body;

    return NextResponse.json(
      {
        createdAt: new Date().toISOString(),
        description,
        id: Date.now(),
        location,
        title,
        type,
      },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

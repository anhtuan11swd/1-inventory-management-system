import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, abbreviation } = body;

    return NextResponse.json(
      {
        abbreviation,
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

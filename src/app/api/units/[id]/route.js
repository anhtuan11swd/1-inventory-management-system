import { NextResponse } from "next/server";
import { unitSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const unit = await db.unit.findUnique({ where: { id } });

    if (!unit) {
      return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(unit);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = unitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { title, abbreviation } = result.data;
    const unit = await db.unit.update({
      data: { abbreviation, title },
      where: { id },
    });

    return NextResponse.json(unit);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

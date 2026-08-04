import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { db } from "@/libs/db";

export async function DELETE(_request, { params }) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID là bắt buộc" }, { status: 400 });
    }

    await db.addStockAdjustment.delete({ where: { id } });

    return NextResponse.json({
      message: "Điều chỉnh nhập kho đã xóa thành công",
    });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

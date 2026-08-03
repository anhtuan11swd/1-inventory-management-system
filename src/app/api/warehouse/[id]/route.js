import { NextResponse } from "next/server";
import { warehouseSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const warehouse = await db.warehouse.findUnique({ where: { id } });

    if (!warehouse) {
      return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(warehouse);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = warehouseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { title, location, description, type } = result.data;
    const warehouse = await db.warehouse.update({
      data: {
        description: description || null,
        location,
        title,
        warehouseType: type,
      },
      where: { id },
    });

    return NextResponse.json(warehouse);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID là bắt buộc" }, { status: 400 });
    }

    await db.warehouse.delete({ where: { id } });

    return NextResponse.json({ message: "Kho hàng đã xóa thành công" });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { categorySchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({ where: { id } });

    if (!category) {
      return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { title, description } = result.data;
    const category = await db.category.update({
      data: { description: description || null, title },
      where: { id },
    });

    return NextResponse.json(category);
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

    await db.category.delete({ where: { id } });

    return NextResponse.json({ message: "Danh mục đã xóa thành công" });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

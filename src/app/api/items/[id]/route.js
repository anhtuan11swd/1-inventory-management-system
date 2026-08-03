import { NextResponse } from "next/server";
import { itemSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const item = await db.item.findUnique({
      include: { brand: true, category: true, supplier: true, unit: true },
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = itemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const data = result.data;

    const existingItem = await db.item.findUnique({
      select: { imageUrl: true },
      where: { id },
    });

    const item = await db.item.update({
      data: {
        barcode: data.barcode || null,
        brandId: data.brandId,
        buyingPrice: data.buyingPrice,
        categoryId: data.categoryId,
        description: data.description || null,
        dimensions: data.dimensions || null,
        imageUrl: data.imageUrl || existingItem?.imageUrl || null,
        notes: data.notes || null,
        quantity: data.quantity ?? null,
        reorderPoint: data.reorderPoint ?? null,
        sellingPrice: data.sellingPrice,
        sku: data.sku || null,
        supplierId: data.supplierId || null,
        taxRate: data.taxRate ?? null,
        title: data.title,
        unitId: data.unitId,
        weight: data.weight ?? null,
      },
      where: { id },
    });

    return NextResponse.json(item);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

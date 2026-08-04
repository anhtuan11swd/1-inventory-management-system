import { NextResponse } from "next/server";
import { itemSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = itemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const data = result.data;

    if (data.warehouseId) {
      const warehouse = await db.warehouse.findUnique({
        where: { id: data.warehouseId },
      });

      if (warehouse) {
        const newStock =
          Number.parseInt(warehouse.stockQuantity ?? 0, 10) +
          Number.parseInt(data.quantity ?? 0, 10);

        await db.warehouse.update({
          data: { stockQuantity: newStock },
          where: { id: data.warehouseId },
        });
      }
    }

    const item = await db.item.create({
      data: {
        barcode: data.barcode || null,
        brandId: data.brandId,
        buyingPrice: data.buyingPrice,
        categoryId: data.categoryId,
        description: data.description || null,
        dimensions: data.dimensions || null,
        imageUrl: data.imageUrl || null,
        notes: data.notes || null,
        quantity: data.quantity ?? null,
        reorderPoint: data.reorderPoint ?? null,
        sellingPrice: data.sellingPrice,
        sku: data.sku || null,
        supplierId: data.supplierId || null,
        taxRate: data.taxRate ?? null,
        title: data.title,
        unitId: data.unitId,
        warehouseId: data.warehouseId || null,
        weight: data.weight ?? null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const items = await db.item.findMany({
      include: {
        brand: true,
        category: true,
        supplier: true,
        unit: true,
        warehouse: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

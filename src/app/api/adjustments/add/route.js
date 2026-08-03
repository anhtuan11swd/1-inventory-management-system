import { NextResponse } from "next/server";
import { addStockSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = addStockSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { addStockQuantity, receivingWarehouseId, referenceNumber, notes } =
      result.data;

    const adjustment = await db.addStockAdjustment.create({
      data: {
        notes: notes || null,
        referenceNumber: referenceNumber || null,
        stockQuantity: addStockQuantity,
        warehouseId: receivingWarehouseId,
      },
    });

    return NextResponse.json(adjustment, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

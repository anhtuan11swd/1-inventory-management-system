import { NextResponse } from "next/server";
import { transferStockSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = transferStockSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const {
      transferStockQuantity,
      givingWarehouseId,
      receivingWarehouseId,
      referenceNumber,
      notes,
    } = result.data;

    const adjustment = await db.transferStockAdjustment.create({
      data: {
        fromWarehouseId: givingWarehouseId,
        notes: notes || null,
        referenceNumber: referenceNumber || null,
        stockQuantity: transferStockQuantity,
        toWarehouseId: receivingWarehouseId,
      },
    });

    return NextResponse.json(adjustment, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

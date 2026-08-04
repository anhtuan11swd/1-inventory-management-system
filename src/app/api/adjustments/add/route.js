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

    const {
      addStockQuantity,
      receivingWarehouseId,
      referenceNumber,
      notes,
      itemId,
      supplierId,
    } = result.data;

    const addQty = Number.parseInt(addStockQuantity, 10);

    if (itemId) {
      const item = await db.item.findUnique({ where: { id: itemId } });

      if (item) {
        const newQty = Number.parseInt(item.quantity ?? 0, 10) + addQty;

        await db.item.update({
          data: { quantity: newQty },
          where: { id: itemId },
        });
      }
    }

    const receivingWarehouse = await db.warehouse.findUnique({
      where: { id: receivingWarehouseId },
    });

    if (receivingWarehouse) {
      const newStock =
        Number.parseInt(receivingWarehouse.stockQuantity ?? 0, 10) + addQty;

      await db.warehouse.update({
        data: { stockQuantity: newStock },
        where: { id: receivingWarehouseId },
      });
    }

    const adjustment = await db.addStockAdjustment.create({
      data: {
        itemId: itemId || null,
        notes: notes || null,
        referenceNumber: referenceNumber || null,
        stockQuantity: addStockQuantity,
        supplierId: supplierId || null,
        warehouseId: receivingWarehouseId,
      },
    });

    return NextResponse.json(adjustment, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const adjustments = await db.addStockAdjustment.findMany({
      orderBy: { createdAt: "desc" },
    });

    const warehouseIds = [
      ...new Set(adjustments.map((a) => a.warehouseId).filter(Boolean)),
    ];

    const warehouses = await db.warehouse.findMany({
      select: { id: true, title: true },
      where: { id: { in: warehouseIds } },
    });

    const warehouseMap = Object.fromEntries(
      warehouses.map((w) => [w.id, w.title]),
    );

    const resolved = adjustments.map((a) => ({
      ...a,
      warehouseName: warehouseMap[a.warehouseId] || "Không tìm thấy kho",
    }));

    return NextResponse.json(resolved);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

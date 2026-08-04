import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { transferStockSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

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
      itemId,
    } = result.data;

    const transferQty = Number.parseInt(transferStockQuantity, 10);

    const givingWarehouse = await db.warehouse.findUnique({
      where: { id: givingWarehouseId },
    });

    if (
      !givingWarehouse ||
      Number.parseInt(givingWarehouse.stockQuantity ?? 0, 10) < transferQty
    ) {
      return NextResponse.json(
        { error: "Kho gửi không đủ hàng" },
        { status: 409 },
      );
    }

    const newGivingStock =
      Number.parseInt(givingWarehouse.stockQuantity ?? 0, 10) - transferQty;

    await db.warehouse.update({
      data: { stockQuantity: newGivingStock },
      where: { id: givingWarehouseId },
    });

    const receivingWarehouse = await db.warehouse.findUnique({
      where: { id: receivingWarehouseId },
    });

    if (receivingWarehouse) {
      const newReceivingStock =
        Number.parseInt(receivingWarehouse.stockQuantity ?? 0, 10) +
        transferQty;

      await db.warehouse.update({
        data: { stockQuantity: newReceivingStock },
        where: { id: receivingWarehouseId },
      });
    }

    const adjustment = await db.transferStockAdjustment.create({
      data: {
        fromWarehouseId: givingWarehouseId,
        itemId: itemId || null,
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

export async function GET() {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const adjustments = await db.transferStockAdjustment.findMany({
      orderBy: { createdAt: "desc" },
    });

    const warehouseIds = [
      ...new Set([
        ...adjustments.map((a) => a.fromWarehouseId).filter(Boolean),
        ...adjustments.map((a) => a.toWarehouseId).filter(Boolean),
      ]),
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
      fromWarehouseName:
        warehouseMap[a.fromWarehouseId] || "Không tìm thấy kho",
      toWarehouseName: warehouseMap[a.toWarehouseId] || "Không tìm thấy kho",
    }));

    return NextResponse.json(resolved);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

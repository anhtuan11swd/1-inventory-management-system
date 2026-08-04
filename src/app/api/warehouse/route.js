import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { warehouseSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const body = await request.json();
    const result = warehouseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { title, location, description, type } = result.data;
    const warehouse = await db.warehouse.create({
      data: {
        description: description || null,
        location,
        title,
        warehouseType: type,
      },
    });

    return NextResponse.json(warehouse, { status: 201 });
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

    const warehouses = await db.warehouse.findMany({
      include: {
        items: {
          select: {
            buyingPrice: true,
            id: true,
            imageUrl: true,
            quantity: true,
            sellingPrice: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(warehouses);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

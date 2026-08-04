import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { unitSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const body = await request.json();
    const result = unitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { title, abbreviation } = result.data;
    const unit = await db.unit.create({
      data: { abbreviation, title },
    });

    return NextResponse.json(unit, { status: 201 });
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

    const units = await db.unit.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(units);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

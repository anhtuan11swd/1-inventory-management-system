import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { supplierSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const body = await request.json();
    const result = supplierSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const data = result.data;
    const supplier = await db.supplier.create({
      data: {
        address: data.address || null,
        contactPerson: data.contactPerson || null,
        email: data.email || null,
        notes: data.notes || null,
        paymentTerms: data.paymentTerms || null,
        phone: data.phone || null,
        supplierCode: data.supplierCode || null,
        taxId: data.taxId || null,
        title: data.title,
      },
    });

    return NextResponse.json(supplier, { status: 201 });
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

    const suppliers = await db.supplier.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(suppliers);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

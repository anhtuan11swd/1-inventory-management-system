import { NextResponse } from "next/server";
import { supplierSchema } from "@/lib/validations";
import { db } from "@/libs/db";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const supplier = await db.supplier.findUnique({ where: { id } });

    if (!supplier) {
      return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = supplierSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { details: result.error.flatten(), error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const data = result.data;
    const supplier = await db.supplier.update({
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
      where: { id },
    });

    return NextResponse.json(supplier);
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

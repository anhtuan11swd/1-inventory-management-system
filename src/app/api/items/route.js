import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      barcode,
      brandId,
      buyingPrice,
      categoryId,
      description,
      dimensions,
      imageUrl,
      notes,
      quantity,
      reorderPoint,
      sellingPrice,
      sku,
      supplierId,
      taxRate,
      title,
      unitId,
      warehouseId,
      weight,
    } = body;

    return NextResponse.json(
      {
        barcode,
        brandId,
        buyingPrice: buyingPrice ? Number(buyingPrice) : null,
        categoryId,
        createdAt: new Date().toISOString(),
        description,
        dimensions: dimensions || null,
        id: Date.now(),
        imageUrl: imageUrl || null,
        notes,
        quantity: quantity ? Number(quantity) : null,
        reorderPoint: reorderPoint ? Number(reorderPoint) : null,
        sellingPrice: sellingPrice ? Number(sellingPrice) : null,
        sku,
        supplierId,
        taxRate: taxRate ? Number(taxRate) : null,
        title,
        unitId,
        warehouseId,
        weight: weight ? Number(weight) : null,
      },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

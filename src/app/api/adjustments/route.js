import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";

const MOCK_ADJUSTMENTS = [
  {
    createdAt: "2026-07-20T10:30:00.000Z",
    id: 1,
    notes: "Chuyển hàng từ kho chính sang chi nhánh A",
    receivingBranchId: "1",
    receivingBranchName: "Chi nhánh A",
    transferStockQty: 50,
  },
  {
    createdAt: "2026-07-21T14:15:00.000Z",
    id: 2,
    notes: "Bổ sung hàng cho chi nhánh B",
    receivingBranchId: "2",
    receivingBranchName: "Chi nhánh B",
    transferStockQty: 30,
  },
  {
    createdAt: "2026-07-22T09:00:00.000Z",
    id: 3,
    notes: "Điều chỉnh tồn kho định kỳ",
    receivingBranchId: "1",
    receivingBranchName: "Chi nhánh A",
    transferStockQty: 20,
  },
];

export async function GET() {
  const unauthorized = await requireAuth();

  if (unauthorized) {
    return unauthorized;
  }

  return NextResponse.json(MOCK_ADJUSTMENTS);
}

export async function POST(request) {
  try {
    const unauthorized = await requireAuth();

    if (unauthorized) {
      return unauthorized;
    }

    const body = await request.json();
    const { transferStockQty, receivingBranchId, notes } = body;

    const branch = MOCK_ADJUSTMENTS.find(
      (b) => b.receivingBranchId === receivingBranchId,
    );

    return NextResponse.json(
      {
        createdAt: new Date().toISOString(),
        id: Date.now(),
        notes,
        receivingBranchId,
        receivingBranchName: branch?.receivingBranchName || "Chi nhánh",
        transferStockQty: transferStockQty ? Number(transferStockQty) : null,
      },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

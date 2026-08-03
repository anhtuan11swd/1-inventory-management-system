import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function AdjustmentsPage() {
  const [addAdjustments, transferAdjustments, warehouses] = await Promise.all([
    getData("/api/adjustments/add"),
    getData("/api/adjustments/transfer"),
    getData("/api/warehouse"),
  ]);

  const warehouseMap = Object.fromEntries(
    warehouses.map((w) => [w.id, w.title]),
  );

  const resolvedAdd = addAdjustments.map((a) => ({
    ...a,
    warehouseId: warehouseMap[a.warehouseId] || a.warehouseId,
  }));

  const resolvedTransfer = transferAdjustments.map((a) => ({
    ...a,
    fromWarehouseId: warehouseMap[a.fromWarehouseId] || a.fromWarehouseId,
    toWarehouseId: warehouseMap[a.toWarehouseId] || a.toWarehouseId,
  }));

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/adjustments/new"
        title="Tất cả điều chỉnh kho"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Điều chỉnh kho</h1>
        <p className="mt-1 text-slate-500">Quản lý điều chỉnh tồn kho.</p>
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h2 className="mb-3 font-bold text-lg">Nhập kho</h2>
          <DataTable
            columns={[
              "stockQuantity",
              "warehouseId",
              "referenceNumber",
              "notes",
              "createdAt",
            ]}
            data={resolvedAdd}
            headerLabels={{
              createdAt: "Ngày tạo",
              notes: "Ghi chú",
              referenceNumber: "Số tham chiếu",
              stockQuantity: "Số lượng",
              warehouseId: "Kho nhận",
            }}
          />
        </div>

        <div>
          <h2 className="mb-3 font-bold text-lg">Chuyển kho</h2>
          <DataTable
            columns={[
              "stockQuantity",
              "fromWarehouseId",
              "toWarehouseId",
              "referenceNumber",
              "notes",
              "createdAt",
            ]}
            data={resolvedTransfer}
            headerLabels={{
              createdAt: "Ngày tạo",
              fromWarehouseId: "Kho gửi",
              notes: "Ghi chú",
              referenceNumber: "Số tham chiếu",
              stockQuantity: "Số lượng",
              toWarehouseId: "Kho nhận",
            }}
          />
        </div>
      </div>
    </div>
  );
}

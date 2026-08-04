import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function AdjustmentsPage() {
  const [addAdjustments, transferAdjustments] = await Promise.all([
    getData("/api/adjustments/add"),
    getData("/api/adjustments/transfer"),
  ]);

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
              "warehouseName",
              "referenceNumber",
              "notes",
              "createdAt",
            ]}
            data={addAdjustments}
            endpoint="adjustments/add"
            headerLabels={{
              createdAt: "Ngày tạo",
              notes: "Ghi chú",
              referenceNumber: "Số tham chiếu",
              stockQuantity: "Số lượng",
              warehouseName: "Kho nhận",
            }}
            resourceName="điều chỉnh nhập kho"
          />
        </div>

        <div>
          <h2 className="mb-3 font-bold text-lg">Chuyển kho</h2>
          <DataTable
            columns={[
              "stockQuantity",
              "fromWarehouseName",
              "toWarehouseName",
              "referenceNumber",
              "notes",
              "createdAt",
            ]}
            data={transferAdjustments}
            endpoint="adjustments/transfer"
            headerLabels={{
              createdAt: "Ngày tạo",
              fromWarehouseName: "Kho gửi",
              notes: "Ghi chú",
              referenceNumber: "Số tham chiếu",
              stockQuantity: "Số lượng",
              toWarehouseName: "Kho nhận",
            }}
            resourceName="điều chỉnh chuyển kho"
          />
        </div>
      </div>
    </div>
  );
}

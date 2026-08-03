import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const WAREHOUSE_TYPE_MAP = { branch: "Chi nhánh", main: "Chính" };

export default async function WarehousePage() {
  const warehouses = await getData("/api/warehouse");

  const resolvedWarehouses = warehouses.map((w) => ({
    ...w,
    warehouseType: WAREHOUSE_TYPE_MAP[w.warehouseType] || w.warehouseType,
  }));

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/warehouse/new"
        title="Tất cả kho hàng"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Kho hàng</h1>
        <p className="mt-1 text-slate-500">Quản lý kho hàng và vị trí.</p>
      </div>
      <div className="mt-6">
        <DataTable
          actions={[
            {
              href: "/dashboard/inventory/warehouse/update/{id}",
              label: "Sửa",
            },
          ]}
          columns={["title", "location", "warehouseType", "createdAt"]}
          data={resolvedWarehouses}
          endpoint="warehouse"
          headerLabels={{
            createdAt: "Ngày tạo",
            location: "Vị trí",
            title: "Tên kho",
            warehouseType: "Loại kho",
          }}
          resourceName="kho hàng"
        />
      </div>
    </div>
  );
}

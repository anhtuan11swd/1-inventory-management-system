import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function WarehousePage() {
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
    </div>
  );
}

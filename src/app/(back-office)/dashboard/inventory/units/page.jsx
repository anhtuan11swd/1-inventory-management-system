import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function UnitsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/units/new"
        title="Tất cả đơn vị tính"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Đơn vị tính</h1>
        <p className="mt-1 text-slate-500">Quản lý đơn vị tính hàng hóa.</p>
      </div>
    </div>
  );
}

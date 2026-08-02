import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function ShipmentsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả vận chuyển" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Vận chuyển</h1>
        <p className="mt-1 text-slate-500">Quản lý vận chuyển.</p>
      </div>
    </div>
  );
}

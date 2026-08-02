import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function PackagesPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả gói hàng" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Gói hàng</h1>
        <p className="mt-1 text-slate-500">Quản lý gói hàng.</p>
      </div>
    </div>
  );
}

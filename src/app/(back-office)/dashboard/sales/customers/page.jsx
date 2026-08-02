import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function CustomersPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả khách hàng" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Khách hàng</h1>
        <p className="mt-1 text-slate-500">Quản lý thông tin khách hàng.</p>
      </div>
    </div>
  );
}

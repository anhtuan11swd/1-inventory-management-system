import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function SalesOrdersPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả đơn hàng bán" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Đơn hàng bán</h1>
        <p className="mt-1 text-slate-500">Quản lý đơn hàng bán.</p>
      </div>
    </div>
  );
}

import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function SalesReturnsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả trả hàng bán" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Trả hàng bán</h1>
        <p className="mt-1 text-slate-500">Quản lý trả hàng bán.</p>
      </div>
    </div>
  );
}

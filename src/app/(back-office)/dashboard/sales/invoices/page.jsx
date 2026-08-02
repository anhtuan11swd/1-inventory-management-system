import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function InvoicesPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả hóa đơn" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Hóa đơn</h1>
        <p className="mt-1 text-slate-500">Quản lý hóa đơn.</p>
      </div>
    </div>
  );
}

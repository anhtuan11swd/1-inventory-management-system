import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function CreditNotesPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả ghi có" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Ghi có</h1>
        <p className="mt-1 text-slate-500">Quản lý phiếu ghi có.</p>
      </div>
    </div>
  );
}

import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function SalesReceiptsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả biên nhận bán" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Biên nhận bán</h1>
        <p className="mt-1 text-slate-500">Quản lý biên nhận bán.</p>
      </div>
    </div>
  );
}

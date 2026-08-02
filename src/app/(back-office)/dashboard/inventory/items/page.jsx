import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function ItemsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/items/new"
        title="Tất cả hàng hóa"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Hàng hóa</h1>
        <p className="mt-1 text-slate-500">Danh sách hàng hóa trong kho.</p>
      </div>
    </div>
  );
}

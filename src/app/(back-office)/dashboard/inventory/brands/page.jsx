import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function BrandsPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/brands/new"
        title="Tất cả thương hiệu"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Thương hiệu</h1>
        <p className="mt-1 text-slate-500">Quản lý thương hiệu hàng hóa.</p>
      </div>
    </div>
  );
}

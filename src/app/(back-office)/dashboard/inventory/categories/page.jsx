import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function CategoriesPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/categories/new"
        title="Tất cả danh mục"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Danh mục</h1>
        <p className="mt-1 text-slate-500">Quản lý danh mục hàng hóa.</p>
      </div>
    </div>
  );
}

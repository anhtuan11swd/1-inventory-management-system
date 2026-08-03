import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function CategoriesPage() {
  const categories = await getData("/api/categories");

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
      <div className="mt-6">
        <DataTable
          columns={["title", "description"]}
          data={categories}
          headerLabels={{ description: "Mô tả", title: "Tên danh mục" }}
        />
      </div>
    </div>
  );
}

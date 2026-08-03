import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function BrandsPage() {
  const brands = await getData("/api/brands");

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/brands/new"
        title="Tất cả thương hiệu"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Thương hiệu</h1>
        <p className="mt-1 text-slate-500">Quản lý thương hiệu sản phẩm.</p>
      </div>
      <div className="mt-6">
        <DataTable
          columns={["title", "createdAt"]}
          data={brands}
          headerLabels={{ createdAt: "Ngày tạo", title: "Tên thương hiệu" }}
        />
      </div>
    </div>
  );
}

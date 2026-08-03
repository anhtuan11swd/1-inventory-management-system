import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function UnitsPage() {
  const units = await getData("/api/units");

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/units/new"
        title="Tất cả đơn vị tính"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Đơn vị tính</h1>
        <p className="mt-1 text-slate-500">Quản lý đơn vị đo lường.</p>
      </div>
      <div className="mt-6">
        <DataTable
          columns={["title", "abbreviation", "createdAt"]}
          data={units}
          headerLabels={{
            abbreviation: "Viết tắt",
            createdAt: "Ngày tạo",
            title: "Tên đơn vị",
          }}
        />
      </div>
    </div>
  );
}

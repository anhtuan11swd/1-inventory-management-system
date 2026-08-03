import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function SuppliersPage() {
  const suppliers = await getData("/api/suppliers");

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/suppliers/new"
        title="Tất cả nhà cung cấp"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Nhà cung cấp</h1>
        <p className="mt-1 text-slate-500">Quản lý nhà cung cấp.</p>
      </div>
      <div className="mt-6">
        <DataTable
          actions={[
            {
              href: "/dashboard/inventory/suppliers/update/{id}",
              label: "Sửa",
            },
          ]}
          columns={["title", "supplierCode", "phone", "email", "address"]}
          data={suppliers}
          endpoint="suppliers"
          headerLabels={{
            address: "Địa chỉ",
            email: "Email",
            phone: "Điện thoại",
            supplierCode: "Mã NCC",
            title: "Tên nhà cung cấp",
          }}
          resourceName="nhà cung cấp"
        />
      </div>
    </div>
  );
}

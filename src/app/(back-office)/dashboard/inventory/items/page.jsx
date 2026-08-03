import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function ItemsPage() {
  const items = await getData("/api/items");

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
      <div className="mt-6">
        <DataTable
          actions={[
            {
              href: "/dashboard/inventory/items/update/{id}",
              label: "Sửa",
            },
          ]}
          columns={[
            "imageUrl",
            "title",
            "category.title",
            "sellingPrice",
            "buyingPrice",
            "quantity",
            "createdAt",
            "updatedAt",
          ]}
          data={items}
          endpoint="items"
          headerLabels={{
            buyingPrice: "Giá mua",
            "category.title": "Danh mục",
            createdAt: "Ngày tạo",
            imageUrl: "Ảnh",
            quantity: "Số lượng",
            sellingPrice: "Giá bán",
            title: "Tên mặt hàng",
            updatedAt: "Cập nhật",
          }}
          resourceName="hàng hóa"
        />
      </div>
    </div>
  );
}

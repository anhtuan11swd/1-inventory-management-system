import { Layers, LayoutGrid, Truck, Warehouse } from "lucide-react";
import SalesOverview from "@/components/dashboard/SalesOverview";
import { getData } from "@/lib/getData";

export default async function OverviewPage() {
  const [items, categories, warehouses, suppliers] = await Promise.all([
    getData("/api/items"),
    getData("/api/categories"),
    getData("/api/warehouse"),
    getData("/api/suppliers"),
  ]);

  const salesActivity = [
    {
      color: "text-blue-600",
      icon: Layers,
      link: "/dashboard/inventory/items",
      number: items.length,
      title: "Hàng hóa",
    },
    {
      color: "text-emerald-600",
      icon: LayoutGrid,
      link: "/dashboard/inventory/categories",
      number: categories.length,
      title: "Danh mục",
    },
    {
      color: "text-orange-600",
      icon: Warehouse,
      link: "/dashboard/inventory/warehouse",
      number: warehouses.length,
      title: "Kho hàng",
    },
    {
      color: "text-purple-600",
      icon: Truck,
      link: "/dashboard/inventory/suppliers",
      number: suppliers.length,
      title: "Nhà cung cấp",
    },
  ];

  const inventorySummary = [
    { number: items.length, title: "Tổng hàng hóa" },
    ...warehouses.map((warehouse) => ({
      number: warehouse.stockQuantity,
      title: warehouse.title,
    })),
  ];

  const allItems = warehouses.flatMap((warehouse) =>
    warehouse.items.map((item) => ({
      ...item,
      warehouse: warehouse.title,
    })),
  );

  return (
    <div>
      <h1 className="font-semibold text-2xl">Tổng quan</h1>
      <p className="mt-1 text-slate-500">
        Tổng quan hoạt động kinh doanh và tình trạng kho hàng.
      </p>
      <div className="mt-6">
        <SalesOverview
          allItems={allItems}
          inventorySummary={inventorySummary}
          salesActivity={salesActivity}
          warehouses={warehouses}
        />
      </div>
    </div>
  );
}

import InventorySummaryCard from "@/components/dashboard/InventorySummaryCard";
import SalesActivityCard from "@/components/dashboard/SalesActivityCard";
import StockTable from "@/components/dashboard/StockTable";

export default function SalesOverview({
  allItems,
  inventorySummary,
  salesActivity,
  warehouses,
}) {
  return (
    <div>
      <div className="rounded-lg bg-blue-50 py-4 sm:py-8">
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-12 sm:gap-6 sm:px-8">
          <div className="col-span-12 sm:col-span-8">
            <h2 className="mb-4 font-semibold text-lg text-slate-900 sm:mb-6 sm:text-xl">
              Hoạt động bán hàng
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {salesActivity.map((item) => (
                <SalesActivityCard item={item} key={item.title} />
              ))}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4">
            <h2 className="mb-4 font-semibold text-lg text-slate-900 sm:mb-6 sm:text-xl">
              Tóm tắt kho hàng
            </h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              {inventorySummary.map((item) => (
                <InventorySummaryCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <StockTable items={allItems} title="Hàng tồn kho hiện có" />

      {warehouses.map((warehouse) => (
        <StockTable
          items={warehouse.items}
          key={warehouse.id}
          title={`Tồn kho tại ${warehouse.title}`}
        />
      ))}
    </div>
  );
}

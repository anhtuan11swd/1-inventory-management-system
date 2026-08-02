"use client";

import { useState } from "react";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import InventorySummaryCard from "@/components/dashboard/InventorySummaryCard";
import SalesActivityCard from "@/components/dashboard/SalesActivityCard";

const SALES_ACTIVITY = [
  { color: "text-blue-600", number: 10, title: "Chờ đóng gói", unit: "cái" },
  {
    color: "text-red-600",
    number: 0,
    title: "Chờ giao hàng",
    unit: "gói",
  },
  {
    color: "text-green-600",
    number: 0,
    title: "Chờ giao",
    unit: "gói",
  },
  {
    color: "text-orange-600",
    number: 0,
    title: "Chờ xuất hóa đơn",
    unit: "cái",
  },
];

const INVENTORY_SUMMARY = [
  { number: 10, title: "Số lượng tồn kho" },
  { number: 0, title: "Số lượng chờ nhận" },
];

export default function SalesOverview() {
  const [bannerHidden, setBannerHidden] = useState(false);

  return (
    <div>
      {!bannerHidden && (
        <DashboardBanner onClose={() => setBannerHidden(true)} />
      )}

      <div className="mt-6 rounded-lg bg-blue-50 py-8">
        <div className="grid grid-cols-12 gap-6 px-8">
          <div className="col-span-12 sm:col-span-8">
            <h2 className="mb-6 font-semibold text-slate-900 text-xl">
              Hoạt động bán hàng
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SALES_ACTIVITY.map((item) => (
                <SalesActivityCard item={item} key={item.title} />
              ))}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4">
            <h2 className="mb-6 font-semibold text-slate-900 text-xl">
              Tóm tắt kho hàng
            </h2>
            <div className="flex flex-col gap-3">
              {INVENTORY_SUMMARY.map((item) => (
                <InventorySummaryCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

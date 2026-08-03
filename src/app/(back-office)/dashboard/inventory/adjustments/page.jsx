"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function AdjustmentsPage() {
  const [adjustments, setAdjustments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/adjustments")
      .then((res) => res.json())
      .then((data) => setAdjustments(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/adjustments/new"
        title="Tất cả điều chỉnh kho"
      />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Điều chỉnh kho</h1>
        <p className="mt-1 text-slate-500">Quản lý điều chỉnh tồn kho.</p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Số lượng chuyển
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Chi nhánh nhận
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Ghi chú
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-slate-500"
                  colSpan={5}
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : adjustments.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-slate-500"
                  colSpan={5}
                >
                  Chưa có điều chỉnh kho nào.
                </td>
              </tr>
            ) : (
              adjustments.map((item) => (
                <tr
                  className="transition-colors hover:bg-slate-50"
                  key={item.id}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm">
                    #{item.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm">
                    {item.transferStockQty}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm">
                    {item.receivingBranchName}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-500 text-sm">
                    {item.notes || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

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

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Tên
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Mã NCC
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Điện thoại
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Địa chỉ
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
            ) : suppliers.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-slate-500"
                  colSpan={5}
                >
                  Chưa có nhà cung cấp nào.
                </td>
              </tr>
            ) : (
              suppliers.map((item) => (
                <tr
                  className="transition-colors hover:bg-slate-50"
                  key={item.id}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 text-sm">
                    {item.supplierCode || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 text-sm">
                    {item.phone || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 text-sm">
                    {item.email || "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-500 text-sm">
                    {item.address || "—"}
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

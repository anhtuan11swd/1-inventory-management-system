"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("vi-VN");
}

export default function DataTable({
  data,
  columns,
  headerLabels,
  actions,
  onDelete,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <p className="px-4 py-8 text-center text-slate-500">
          Không có dữ liệu.
        </p>
      </div>
    );
  }

  const headers = columns || Object.keys(data[0]);
  const showActions = actions || onDelete;

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((key) => (
              <th
                className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider"
                key={key}
              >
                {headerLabels?.[key] || key}
              </th>
            ))}
            {showActions && (
              <th className="px-4 py-3 text-left font-medium text-slate-600 text-xs uppercase tracking-wider">
                Thao tác
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row, index) => (
            <tr
              className="transition-colors hover:bg-slate-50"
              key={row.id || index}
            >
              {headers.map((key) => {
                const value = getNestedValue(row, key);
                const isDate = key === "createdAt" || key === "updatedAt";
                return (
                  <td
                    className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm"
                    key={key}
                  >
                    {isDate ? formatDate(value) : (value ?? "—")}
                  </td>
                );
              })}
              {showActions && (
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex items-center gap-1">
                    {actions?.map((action) => (
                      <Link
                        className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                        href={action.href(row)}
                        key={action.label}
                      >
                        <Pencil size={16} />
                      </Link>
                    ))}
                    {onDelete && (
                      <button
                        className="rounded p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        onClick={() => onDelete(row)}
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

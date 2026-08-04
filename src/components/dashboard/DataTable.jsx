"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteBtn from "./DeleteBtn";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("vi-VN");
}

function resolveHref(pattern, row) {
  return pattern.replace(/\{(\w+)\}/g, (_, key) => row[key] ?? "");
}

export default function DataTable({
  data,
  columns,
  headerLabels,
  actions,
  endpoint,
  resourceName,
}) {
  const [deletedIds, setDeletedIds] = useState(new Set());

  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <p className="bg-white py-4 text-center text-2xl text-slate-500">
          Không có dữ liệu để hiển thị
        </p>
      </div>
    );
  }

  const headers = columns || Object.keys(data[0]);
  const showActions = actions || endpoint;
  const isAdjustment = resourceName?.toLowerCase().includes("adjustment");
  const visibleData = data.filter((row) => !deletedIds.has(row.id));

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((key) => (
              <th
                className="px-2 py-2 text-left font-medium text-slate-600 text-xs uppercase tracking-wider sm:px-4 sm:py-3"
                key={key}
              >
                {headerLabels?.[key] || key}
              </th>
            ))}
            {showActions && (
              <th className="px-2 py-2 text-left font-medium text-slate-600 text-xs uppercase tracking-wider sm:px-4 sm:py-3">
                Thao tác
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {visibleData.map((row, index) => (
            <tr
              className="transition-colors hover:bg-slate-50"
              key={row.id || index}
            >
              {headers.map((key) => {
                const value = getNestedValue(row, key);
                const isDate = key === "createdAt" || key === "updatedAt";
                const isImage = key === "imageUrl" && value;
                return (
                  <td
                    className="whitespace-nowrap px-2 py-2 text-slate-900 text-xs sm:px-4 sm:py-3 sm:text-sm"
                    key={key}
                  >
                    {isImage ? (
                      <Image
                        alt="Ảnh"
                        className="h-10 w-10 rounded object-cover"
                        height={40}
                        src={value}
                        width={40}
                      />
                    ) : isDate ? (
                      formatDate(value)
                    ) : (
                      (value ?? "—")
                    )}
                  </td>
                );
              })}
              {showActions && (
                <td className="whitespace-nowrap px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                  <div className="flex items-center gap-1">
                    {!isAdjustment &&
                      actions?.map((action) => (
                        <Link
                          className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                          href={resolveHref(action.href, row)}
                          key={action.label}
                        >
                          <Pencil size={16} />
                        </Link>
                      ))}
                    {endpoint && (
                      <DeleteBtn
                        endpoint={endpoint}
                        id={row.id}
                        onOptimisticDelete={(id) =>
                          setDeletedIds((prev) => new Set([...prev, id]))
                        }
                        onRollback={(id) =>
                          setDeletedIds((prev) => {
                            const next = new Set(prev);
                            next.delete(id);
                            return next;
                          })
                        }
                        resourceName={resourceName}
                      />
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

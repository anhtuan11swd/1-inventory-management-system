"use client";

export default function DataTable({ data, columns, headerLabels }) {
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
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row, index) => (
            <tr
              className="transition-colors hover:bg-slate-50"
              key={row.id || index}
            >
              {headers.map((key) => (
                <td
                  className="whitespace-nowrap px-4 py-3 text-slate-900 text-sm"
                  key={key}
                >
                  {row[key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

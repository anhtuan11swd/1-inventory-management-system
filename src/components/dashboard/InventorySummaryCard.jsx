export default function InventorySummaryCard({ item }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-500 hover:shadow-md">
      <p className="font-medium text-slate-700 text-sm">{item.title}</p>
      <p className="font-bold text-slate-900 text-sm">{item.number}</p>
    </div>
  );
}

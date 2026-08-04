import Link from "next/link";

export default function InventorySummaryCard({ item }) {
  const content = (
    <>
      <p className="font-medium text-slate-700 text-sm">{item.title}</p>
      <p className="font-bold text-slate-900 text-sm">{item.number}</p>
    </>
  );

  const className =
    "flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-500 hover:shadow-md";

  return item.link ? (
    <Link className={className} href={item.link}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

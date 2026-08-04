import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SalesActivityCard({ item }) {
  const { color, icon: Icon, link, number, title } = item;

  const content = (
    <>
      <div className="flex items-center justify-between">
        <p className={cn("font-bold text-2xl", color)}>{number}</p>
        {Icon ? <Icon aria-hidden="true" className={color} size={20} /> : null}
      </div>
      <p className="mt-1 font-medium text-slate-700 text-sm">{title}</p>
      {item.unit ? (
        <p className="mt-0.5 text-slate-400 text-xs">{item.unit}</p>
      ) : null}
    </>
  );

  const className =
    "block rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-md";

  return link ? (
    <Link className={className} href={link}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
